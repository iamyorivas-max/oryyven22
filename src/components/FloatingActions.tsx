"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useCart } from "@/components/CartProvider";
import { formatPrice, products } from "@/data/products";
import { trackWhatsappClick } from "@/lib/analytics";

/** Bouton WhatsApp flottant, discret. */
export function WhatsappButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Bonjour, j’ai une question sur les accessoires Alo.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick("floating_button")}
      aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-[5.5rem] right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-charcoal text-white shadow-[var(--shadow-float)] transition hover:bg-bordeaux sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.02c-.25.69-1.44 1.33-1.98 1.38-.53.06-1.02.25-3.44-.72-2.9-1.16-4.74-4.13-4.88-4.32-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.37.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.25.6.83 2.07.9 2.22.07.14.12.31.02.5-.1.2-.14.32-.28.49l-.42.49c-.14.14-.28.3-.12.58.16.29.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.2.7-.81.88-1.09.19-.29.37-.24.63-.14.25.09 1.62.76 1.9.9.28.15.46.22.53.34.07.12.07.68-.18 1.36Z" />
      </svg>
    </a>
  );
}

/** Barre d'achat sticky sur mobile — apparaît après le héros. */
export function MobileBuyBar() {
  const [visible, setVisible] = useState(false);
  const { openCart, count, subtotal, hydrated, addItem } = useCart();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const hasItems = hydrated && count > 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand/70 bg-ivory/95 px-4 py-3 backdrop-blur-md sm:hidden">
      {hasItems ? (
        <button
          type="button"
          onClick={() => openCart("sticky_bar")}
          className="flex min-h-12 w-full items-center justify-between rounded-full bg-bordeaux px-6 text-[12px] font-semibold tracking-[0.14em] text-white uppercase"
        >
          <span>Voir le panier ({count})</span>
          <span>{formatPrice(subtotal)}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addItem(products[0], products[0].variants[0])}
          className="min-h-12 w-full rounded-full bg-bordeaux px-6 text-[12px] font-semibold tracking-[0.14em] text-white uppercase"
        >
          Ajouter le tote bag — {formatPrice(products[0].price)}
        </button>
      )}
    </div>
  );
}
