"use client";

import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Scène 3D du héros : grand anneau translucide balayant le cadre, podium minéral,
 * sphère rose, et les quatre produits dans leurs couleurs réelles en lévitation maîtrisée.
 */
function HeroScene() {
  const [bag, headband, visor, socks] = products;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grand anneau translucide */}
      <div className="ring-3d absolute -right-[14%] top-[-12%] h-[118%] w-[92%] rounded-full" />
      <div className="ring-3d absolute left-[4%] top-[26%] h-[62%] w-[48%] rounded-full opacity-70" />

      {/* Podium minéral */}
      <div className="podium-stone absolute bottom-[8%] left-[12%] h-[14%] w-[46%] rounded-[26px]" />
      <div className="podium-stone absolute bottom-[12%] left-[48%] h-[11%] w-[26%] rounded-[22px] opacity-95" />

      {/* Sac noir, pièce maîtresse posée sur le podium */}
      <div className="absolute bottom-[20%] left-[15%] h-[56%] w-[40%] animate-levitate">
        <ProductArt product={bag} priority align="bottom" sizes="(max-width: 1024px) 60vw, 32vw" />
      </div>
      <div className="ground-shadow absolute bottom-[19%] left-[20%] h-[4%] w-[30%]" />

      {/* Bandeau crème en lévitation */}
      <div
        className="absolute left-[47%] top-[6%] h-[26%] w-[26%] animate-levitate"
        style={{ animationDelay: "-1.5s" }}
      >
        <ProductArt product={headband} sizes="(max-width: 1024px) 34vw, 18vw" />
      </div>

      {/* Visière bordeaux */}
      <div
        className="absolute right-[8%] top-[24%] h-[26%] w-[30%] animate-levitate"
        style={{ animationDelay: "-3s" }}
      >
        <ProductArt product={visor} sizes="(max-width: 1024px) 36vw, 18vw" />
      </div>

      {/* Chaussettes blanches */}
      <div
        className="absolute bottom-[12%] right-[6%] h-[34%] w-[26%] animate-levitate"
        style={{ animationDelay: "-4.4s" }}
      >
        <ProductArt product={socks} align="bottom" sizes="(max-width: 1024px) 32vw, 16vw" />
      </div>
      <div className="ground-shadow absolute bottom-[11%] right-[10%] h-[4%] w-[18%]" />

      {/* Sphère rose et petits volumes */}
      <div className="sphere absolute bottom-[22%] left-[52%] h-[12%] w-[12%] rounded-full" />
      <div className="sphere absolute right-[34%] top-[10%] h-[5%] w-[5%] rounded-full opacity-80" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative bg-ivory" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(0,46%)_minmax(0,54%)]">
        {/* Colonne éditoriale */}
        <div className="order-2 flex flex-col justify-center px-4 py-12 animate-rise sm:px-8 lg:order-1 lg:py-24 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:pr-12">
          <p className="text-[10px] font-semibold leading-[2] tracking-[0.26em] text-charcoal-soft uppercase">
            Plus qu’un accessoire
            <br />
            Un art de vivre
          </p>

          <h1
            id="hero-title"
            className="font-display mt-5 text-[clamp(3rem,8vw,5.25rem)] font-bold leading-[0.94] tracking-[-0.03em] text-charcoal"
          >
            MOVE
            <br />
            <span className="text-bordeaux">DIFFERENT</span>
          </h1>

          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-charcoal-soft sm:text-base">
            Les essentiels qui donnent du style
            <br className="hidden sm:inline" /> à chaque mouvement.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => scrollTo("essentiels")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bordeaux px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.99] sm:w-auto"
            >
              Découvrir la collection
              <ArrowRight size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("essentiels")}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-charcoal/25 bg-white px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] text-charcoal uppercase transition hover:border-charcoal active:scale-[0.99] sm:w-auto"
            >
              Voir les 4 essentiels
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-rose uppercase">
            <li>Yoga</li>
            <li aria-hidden="true">×</li>
            <li>Bien-être</li>
            <li aria-hidden="true">×</li>
            <li>Au quotidien</li>
          </ul>
        </div>

        {/* Scène 3D */}
        <div className="scene-blush relative order-1 aspect-[4/3] w-full animate-rise lg:order-2 lg:aspect-auto lg:min-h-[640px]">
          <HeroScene />
          <p
            className="side-label absolute right-5 top-10 hidden text-right lg:block"
            aria-hidden="true"
          >
            Small
            <br />
            accessories
            <br />
            big
            <br />
            difference
          </p>
        </div>
      </div>
    </section>
  );
}
