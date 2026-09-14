"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { Stars } from "@/components/Stars";
import { useCart } from "@/components/CartProvider";
import { trackSelectItem } from "@/lib/analytics";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [favorite, setFavorite] = useState(false);
  const { addItem } = useCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 shadow-[var(--shadow-card)] ring-1 ring-sand/50 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(110,31,42,0.45)]">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-blush-soft/60 to-ivory-deep">
        <div className="podium absolute bottom-[10%] left-1/2 h-[9%] w-[62%] -translate-x-1/2 rounded-[999px] opacity-80" />
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          <ProductArt product={product} variantId={variantId} priority={index < 2} />
        </div>
        <button
          type="button"
          onClick={() => setFavorite((v) => !v)}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Retirer ${product.name} des favoris`
              : `Ajouter ${product.name} aux favoris`
          }
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-charcoal shadow-sm backdrop-blur transition hover:bg-white"
        >
          <Heart
            size={17}
            aria-hidden="true"
            className={favorite ? "fill-bordeaux text-bordeaux" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="text-sm font-semibold leading-snug text-charcoal sm:text-base">
            <a
              href={`/produits/${product.slug}`}
              onClick={() =>
                trackSelectItem(
                  {
                    item_id: product.id,
                    item_name: product.name,
                    price: product.price,
                    item_variant: variantId,
                    item_category: product.category,
                    index,
                  },
                  "Les 4 essentiels",
                )
              }
              className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline"
            >
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm font-medium text-bordeaux">{formatPrice(product.price)}</p>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-charcoal-soft">
          <Stars rating={product.rating} />
          <span>
            {product.rating.toFixed(1).replace(".", ",")} · {product.reviewCount} avis
          </span>
        </div>

        <fieldset className="relative z-10">
          <legend className="sr-only">Couleur de {product.name}</legend>
          <div className="flex items-center gap-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={active}
                  aria-label={`Couleur ${v.name}`}
                  title={v.name}
                  className={`h-7 w-7 rounded-full transition ${
                    active
                      ? "ring-2 ring-bordeaux ring-offset-2 ring-offset-white"
                      : "ring-1 ring-sand hover:ring-charcoal/40"
                  }`}
                  style={{
                    backgroundColor: v.swatch,
                    boxShadow: v.border ? `inset 0 0 0 1px ${v.border}` : undefined,
                  }}
                />
              );
            })}
            <span className="ml-1 text-[12px] text-charcoal-soft">{variant.name}</span>
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => addItem(product, variant)}
          className="relative z-10 mt-auto min-h-11 w-full rounded-full bg-charcoal px-4 py-3 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-bordeaux active:scale-[0.98]"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
