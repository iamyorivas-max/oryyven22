"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product, type Variant } from "@/data/products";
import {
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  type EcommerceItem,
} from "@/lib/analytics";

const STORAGE_KEY = "alo-cart-v1";

export type CartLine = {
  /** Clé unique produit + variante */
  key: string;
  productId: string;
  variantId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  isOpen: boolean;
  hydrated: boolean;
  openCart: (source?: string) => void;
  closeCart: () => void;
  addItem: (product: Product, variant: Variant, quantity?: number) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (productId: string, variantId: string) => `${productId}::${variantId}`;

function toEcommerceItem(product: Product, variantId: string, quantity: number): EcommerceItem {
  return {
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    quantity,
    item_variant: variantId,
    item_category: product.category,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restauration depuis localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        // On ne garde que les lignes dont le produit existe encore
        setLines(
          parsed.filter(
            (line) =>
              typeof line?.productId === "string" &&
              products.some((p) => p.id === line.productId) &&
              Number.isFinite(line.quantity) &&
              line.quantity > 0,
          ),
        );
      }
    } catch {
      // localStorage indisponible (navigation privée) : panier en mémoire uniquement
    }
    setHydrated(true);
  }, []);

  // Persistance
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const detailed = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          const variant =
            product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
          return { line, product, variant };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null),
    [lines],
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const subtotal = useMemo(
    () => detailed.reduce((sum, { line, product }) => sum + product.price * line.quantity, 0),
    [detailed],
  );

  const savings = useMemo(
    () =>
      detailed.reduce(
        (sum, { line, product }) =>
          product.compareAtPrice
            ? sum + (product.compareAtPrice - product.price) * line.quantity
            : sum,
        0,
      ),
    [detailed],
  );

  const openCart = useCallback(
    (_source?: string) => {
      setIsOpen(true);
      const items = detailed.map(({ line, product }) =>
        toEcommerceItem(product, line.variantId, line.quantity),
      );
      trackViewCart(items, subtotal);
    },
    [detailed, subtotal],
  );

  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, variant: Variant, quantity = 1) => {
    const key = lineKey(product.id, variant.id);
    setLines((current) => {
      const existing = current.find((l) => l.key === key);
      if (existing) {
        return current.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...current, { key, productId: product.id, variantId: variant.id, quantity }];
    });
    trackAddToCart(toEcommerceItem(product, variant.id, quantity));
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    setLines((current) => {
      const line = current.find((l) => l.key === key);
      const product = line && products.find((p) => p.id === line.productId);
      if (line && product) {
        trackRemoveFromCart(toEcommerceItem(product, line.variantId, line.quantity));
      }
      return current.filter((l) => l.key !== key);
    });
  }, []);

  const setQuantity = useCallback(
    (key: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(key);
        return;
      }
      setLines((current) =>
        current.map((l) => (l.key === key ? { ...l, quantity: Math.min(quantity, 99) } : l)),
      );
    },
    [removeItem],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      savings,
      isOpen,
      hydrated,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
    }),
    [lines, count, subtotal, savings, isOpen, hydrated, openCart, closeCart, addItem, removeItem, setQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}

export function useCartLines() {
  const { lines } = useCart();
  return useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          const variant =
            product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
          return { line, product, variant };
        })
        .filter((e): e is NonNullable<typeof e> => e !== null),
    [lines],
  );
}
