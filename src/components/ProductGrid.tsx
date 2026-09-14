"use client";

import { useEffect, useRef } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { trackViewItemList } from "@/lib/analytics";

const LIST_NAME = "Les 4 essentiels";

export function ProductGrid() {
  const sent = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !sent.current) {
          sent.current = true;
          trackViewItemList(
            products.map((p, index) => ({
              item_id: p.id,
              item_name: p.name,
              price: p.price,
              item_category: p.category,
              index,
            })),
            LIST_NAME,
          );
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="essentiels" className="scroll-mt-20 bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(1.85rem,5vw,3rem)] font-semibold tracking-tight text-charcoal">
            LES 4 ESSENTIELS
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal-soft">
            Quatre pièces, pensées pour durer et pour se porter tous les jours.
          </p>
        </Reveal>

        <div ref={ref} className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 70} className="h-full">
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
