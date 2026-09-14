"use client";

import { useEffect, useState } from "react";
import { formatPrice, type Product } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { Stars } from "@/components/Stars";
import { useCart } from "@/components/CartProvider";
import { trackViewItem } from "@/lib/analytics";
import { reassurance } from "@/data/faq";

export function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const { addItem } = useCart();
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  useEffect(() => {
    trackViewItem({
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
    });
  }, [product]);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush-soft to-ivory-deep shadow-[var(--shadow-card)]">
        <div className="ring-3d absolute left-[8%] top-[10%] h-[38%] w-[38%] rounded-full" />
        <div className="podium absolute bottom-[12%] left-1/2 h-[10%] w-[56%] -translate-x-1/2 rounded-[999px]" />
        <div className="absolute inset-0 animate-levitate">
          <ProductArt
            product={product}
            variantId={variantId}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold tracking-[0.24em] text-bordeaux uppercase">
          {product.category}
        </p>
        <h1 className="font-display mt-3 text-[clamp(1.9rem,5vw,3rem)] font-semibold tracking-tight text-charcoal">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-2 text-[13px] text-charcoal-soft">
          <Stars rating={product.rating} size={16} />
          <span>
            {product.rating.toFixed(1).replace(".", ",")} · {product.reviewCount} avis
          </span>
        </div>
        <p className="mt-5 text-2xl font-semibold text-bordeaux">{formatPrice(product.price)}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-charcoal-soft">{product.description}</p>

        <fieldset className="mt-7">
          <legend className="text-[13px] font-semibold text-charcoal">
            Couleur : {variant.name}
          </legend>
          <div className="mt-3 flex items-center gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={v.id === variantId}
                aria-label={`Couleur ${v.name}`}
                className={`h-9 w-9 rounded-full transition ${
                  v.id === variantId
                    ? "ring-2 ring-bordeaux ring-offset-2 ring-offset-ivory"
                    : "ring-1 ring-sand hover:ring-charcoal/40"
                }`}
                style={{
                  backgroundColor: v.swatch,
                  boxShadow: v.border ? `inset 0 0 0 1px ${v.border}` : undefined,
                }}
              />
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => addItem(product, variant)}
          className="mt-8 min-h-12 w-full rounded-full bg-bordeaux px-8 py-4 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.99] sm:w-auto"
        >
          Ajouter au panier — {formatPrice(product.price)}
        </button>

        <ul className="mt-8 grid gap-3 border-t border-sand/70 pt-6 sm:grid-cols-2">
          {reassurance.map((item) => (
            <li key={item.id} className="text-[13px] text-charcoal-soft">
              <strong className="block text-charcoal">{item.title}</strong>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
