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
    <section id="essentiels" className="scroll-mt-20 bg-ivory py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-charcoal-soft uppercase">
              Nos incontournables
            </p>
            <h2 className="font-display mt-2 text-[clamp(1.75rem,4.5vw,2.5rem)] font-bold tracking-[-0.03em] text-charcoal">
              LES 4 ESSENTIELS
            </h2>
          </div>
          <p className="flex items-center gap-5 text-[13px] leading-relaxed text-charcoal-soft sm:max-w-sm">
            <span aria-hidden="true" className="hidden h-px w-14 shrink-0 bg-line sm:block" />
            <span>Des accessoires pensés pour vous accompagner sur chaque mouvement.</span>
          </p>
        </Reveal>

        <div ref={ref} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
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
