"use client";

import { useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { formatPrice } from "@/data/products";
import { site } from "@/data/site";
import { useCart, useCartLines } from "@/components/CartProvider";
import { ProductArt } from "@/components/ProductArt";
import { trackBeginCheckout } from "@/lib/analytics";

export function CartDrawer() {
  const { isOpen, closeCart, subtotal, savings, count, removeItem, setQuantity } = useCart();
  const lines = useCartLines();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const threshold = site.freeShippingThreshold;
  const remaining = Math.max(threshold - subtotal, 0);
  const progress = threshold > 0 ? Math.min((subtotal / threshold) * 100, 100) : 0;

  const checkout = () => {
    trackBeginCheckout(
      lines.map(({ line, product }) => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: line.quantity,
        item_variant: line.variantId,
        item_category: product.category,
      })),
      subtotal,
    );
    window.location.href = "/commande";
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Votre panier">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/45 animate-fade-in"
        aria-label="Fermer le panier"
        onClick={closeCart}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl outline-none animate-slide-in"
      >
        <div className="flex items-center justify-between border-b border-sand/70 px-5 py-4">
          <h2 className="text-[13px] font-semibold tracking-[0.16em] text-charcoal uppercase">
            Panier ({count})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-blush-soft/70"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {threshold > 0 && (
          <div className="border-b border-sand/70 px-5 py-4">
            <p className="flex items-center gap-2 text-[13px] text-charcoal-soft">
              <Truck size={15} aria-hidden="true" className="text-bordeaux" />
              {remaining > 0 ? (
                <>
                  Plus que <strong className="text-charcoal">{formatPrice(remaining)}</strong> pour
                  la livraison offerte
                </>
              ) : (
                <strong className="text-charcoal">Livraison offerte débloquée</strong>
              )}
            </p>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand/60"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression vers la livraison gratuite"
            >
              <div
                className="h-full rounded-full bg-bordeaux transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={32} aria-hidden="true" className="text-blush-deep" />
            <p className="text-[15px] text-charcoal-soft">Votre panier est vide pour le moment.</p>
            <button
              type="button"
              onClick={closeCart}
              className="min-h-11 rounded-full bg-charcoal px-7 py-3 text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
            >
              Découvrir les essentiels
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-sand/60 overflow-y-auto px-5">
            {lines.map(({ line, product, variant }) => (
              <li key={line.key} className="flex gap-4 py-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-blush-soft/70 to-ivory-deep">
                  <ProductArt product={product} variantId={variant.id} sizes="80px" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-semibold text-charcoal">{product.name}</p>
                  <p className="text-[12px] text-charcoal-soft">Couleur : {variant.name}</p>
                  <p className="text-sm font-medium text-bordeaux">{formatPrice(product.price)}</p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-full border border-sand">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity - 1)}
                        aria-label={`Diminuer la quantité de ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-blush-soft/60"
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.key, line.quantity + 1)}
                        aria-label={`Augmenter la quantité de ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-blush-soft/60"
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.key)}
                      aria-label={`Retirer ${product.name} du panier`}
                      className="grid h-9 w-9 place-items-center rounded-full text-charcoal-soft transition hover:bg-blush-soft/60 hover:text-bordeaux"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="border-t border-sand/70 bg-cream/60 px-5 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal-soft">Sous-total</dt>
                <dd className="font-semibold text-charcoal">{formatPrice(subtotal)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-charcoal-soft">Économies</dt>
                  <dd className="font-semibold text-bordeaux">−{formatPrice(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-charcoal-soft">Livraison</dt>
                <dd className="font-medium text-charcoal">Gratuite au Maroc</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-xl bg-blush-soft/70 px-3 py-2 text-[12px] text-bordeaux-deep">
              Paiement à la livraison : vous réglez en espèces à réception de votre colis.
            </p>
            <button
              type="button"
              onClick={checkout}
              className="mt-4 min-h-12 w-full rounded-full bg-bordeaux py-3.5 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.99]"
            >
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
