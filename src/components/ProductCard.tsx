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
    <article className="group flex h-full flex-col">
      <div className="scene-blush relative aspect-square overflow-hidden rounded-lg">
        <div className="podium-blush absolute bottom-[8%] left-1/2 h-[13%] w-[66%] -translate-x-1/2 rounded-[999px]" />
        <div className="ground-shadow absolute bottom-[16%] left-1/2 h-[5%] w-[44%] -translate-x-1/2" />
        <div className="absolute inset-[3%] bottom-[17%] transition-transform duration-500 group-hover:scale-[1.05]">
          <ProductArt
            product={product}
            variantId={variantId}
            align="bottom"
            priority={index < 2}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
          />
        </div>
        <button
          type="button"
          onClick={() => setFavorite((v) => !v)}
          aria-pressed={favorite}
          aria-label={
            favorite ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`
          }
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-charcoal shadow-sm transition hover:bg-white"
        >
          <Heart size={16} aria-hidden="true" className={favorite ? "fill-bordeaux text-bordeaux" : ""} />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col gap-2 pt-3.5">
        <h3 className="text-[14px] font-medium leading-snug text-charcoal">
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
            className="outline-none after:absolute after:inset-x-0 after:-top-[100%] after:bottom-14 after:content-[''] focus-visible:underline"
          >
            {product.name}
          </a>
        </h3>

        <p className="text-[15px] font-semibold text-bordeaux">{formatPrice(product.price)}</p>

        <div className="flex items-center gap-1.5 text-[11px] text-charcoal-soft">
          <Stars rating={product.rating} size={12} />
          <span>
            {product.rating.toFixed(1).replace(".", ",")} ({product.reviewCount})
          </span>
        </div>

        <fieldset className="relative z-10">
          <legend className="sr-only">Couleur de {product.name}</legend>
          <div className="flex items-center gap-1.5">
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
                  className={`h-[18px] w-[18px] rounded-full transition ${
                    active
                      ? "ring-[1.5px] ring-charcoal ring-offset-2 ring-offset-ivory"
                      : "ring-1 ring-line hover:ring-charcoal/40"
                  }`}
                  style={{
                    backgroundColor: v.swatch,
                    boxShadow: v.border ? `inset 0 0 0 1px ${v.border}` : undefined,
                  }}
                />
              );
            })}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => addItem(product, variant)}
          className="relative z-10 mt-3 min-h-11 w-full rounded-md bg-bordeaux px-3 py-3 text-[10.5px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.99]"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
