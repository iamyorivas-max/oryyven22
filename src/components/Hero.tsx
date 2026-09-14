"use client";

import { products } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Composition 3D du héros : podiums roses, anneaux translucides, petits volumes,
 * ombres portées au sol, produits en lévitation maîtrisée dans leurs couleurs réelles.
 * Chaque produit est un calque indépendant, remplaçable par un visuel HD.
 */
export function HeroScene({ compact = false }: { compact?: boolean }) {
  const [bag, headband, visor, socks] = products;

  return (
    <div
      className={`relative mx-auto w-full ${compact ? "max-w-xl" : "max-w-2xl"} aspect-square`}
      aria-hidden={false}
    >
      {/* Halo de fond */}
      <div className="absolute inset-[6%] rounded-full bg-blush-soft/70 blur-2xl" />
      {/* Anneaux translucides */}
      <div className="ring-3d absolute left-[8%] top-[14%] h-[46%] w-[46%] rounded-full" />
      <div className="ring-3d absolute right-[6%] top-[30%] h-[30%] w-[30%] rounded-full" />
      {/* Forme organique sculptée */}
      <div className="blob absolute -left-[4%] bottom-[16%] h-[26%] w-[26%]" />

      {/* Podium central + sac noir */}
      <div className="absolute left-1/2 top-[44%] h-[18%] w-[46%] -translate-x-1/2 rounded-[999px] podium" />
      <div className="absolute left-1/2 top-[62%] h-[6%] w-[34%] -translate-x-1/2 ground-shadow" />
      <div className="absolute left-1/2 top-[6%] h-[46%] w-[46%] -translate-x-1/2 animate-levitate">
        <ProductArt product={bag} priority sizes="(max-width: 768px) 60vw, 30vw" />
      </div>

      {/* Podium gauche + bandeau crème */}
      <div className="podium absolute left-[4%] top-[70%] h-[12%] w-[30%] rounded-[999px]" />
      <div
        className="absolute left-[6%] top-[44%] h-[28%] w-[26%] animate-levitate"
        style={{ animationDelay: "-1.4s" }}
      >
        <ProductArt product={headband} sizes="(max-width: 768px) 40vw, 20vw" />
      </div>

      {/* Podium droit + visière bordeaux */}
      <div className="podium absolute right-[4%] top-[66%] h-[12%] w-[30%] rounded-[999px]" />
      <div
        className="absolute right-[4%] top-[38%] h-[30%] w-[28%] animate-levitate"
        style={{ animationDelay: "-2.8s" }}
      >
        <ProductArt product={visor} sizes="(max-width: 768px) 40vw, 20vw" />
      </div>

      {/* Chaussettes blanches en avant-plan */}
      <div
        className="absolute bottom-[2%] left-1/2 h-[26%] w-[24%] -translate-x-1/2 animate-levitate"
        style={{ animationDelay: "-4.1s" }}
      >
        <ProductArt product={socks} sizes="(max-width: 768px) 36vw, 18vw" />
      </div>
      <div className="absolute bottom-[1%] left-1/2 h-[5%] w-[22%] -translate-x-1/2 ground-shadow" />

      {/* Petits volumes 3D */}
      <div className="absolute right-[22%] top-[8%] h-[7%] w-[7%] rounded-full bg-gradient-to-br from-white to-blush shadow-[var(--shadow-float)]" />
      <div className="absolute left-[20%] top-[4%] h-[5%] w-[5%] rounded-[30%] bg-gradient-to-br from-blush-soft to-blush-deep shadow-[var(--shadow-float)]" />
      <div className="absolute bottom-[24%] right-[14%] h-[6%] w-[6%] rounded-full bg-gradient-to-br from-white to-sand shadow-[var(--shadow-float)]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="scene-ivory relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="order-2 text-center animate-rise lg:order-1 lg:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-bordeaux uppercase">
            Plus qu’un accessoire
          </p>
          <h1
            id="hero-title"
            className="font-display mt-4 text-[clamp(2.75rem,10vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-charcoal"
          >
            MOVE
            <br />
            DIFFERENT
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg lg:mx-0">
            Les essentiels qui donnent du style à chaque mouvement.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => scrollTo("essentiels")}
              className="min-h-12 rounded-full bg-bordeaux px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.98]"
            >
              Découvrir la collection
            </button>
            <button
              type="button"
              onClick={() => scrollTo("essentiels")}
              className="min-h-12 rounded-full border border-charcoal/25 px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-charcoal uppercase transition hover:border-charcoal hover:bg-white/60 active:scale-[0.98]"
            >
              Voir les 4 essentiels
            </button>
          </div>

          <p className="mt-6 text-[13px] text-charcoal-soft">
            Livraison gratuite au Maroc · Paiement à la livraison
          </p>
        </div>

        <div className="order-1 animate-rise lg:order-2">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
