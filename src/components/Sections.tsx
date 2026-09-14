"use client";

import { useState } from "react";
import {
  ArrowRight,
  Clock,
  CreditCard,
  Flower,
  Gem,
  MessageCircle,
  Truck,
  Wallet,
} from "lucide-react";
import { benefits, faq, reassurance } from "@/data/faq";
import { reviews, reviewSummary } from "@/data/reviews";
import { products } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { Newsletter } from "@/components/Newsletter";

export { Newsletter };

const reassuranceIcons = { shipping: Truck, cod: Wallet, exchange: Clock, support: MessageCircle };
const benefitIcons = { confort: Flower, style: Gem, livraison: Truck };
const faqIcons = { truck: Truck, card: CreditCard, clock: Clock };

/* ---------------------------------- Réassurance --------------------------------- */

export function Reassurance() {
  return (
    <section aria-label="Nos engagements" className="border-y border-line bg-ivory">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-4 py-7 sm:px-6 lg:grid-cols-4 lg:px-8">
        {reassurance.map((item) => {
          const Icon = reassuranceIcons[item.id];
          return (
            <li key={item.id} className="flex items-center gap-3">
              <Icon size={22} strokeWidth={1.4} aria-hidden="true" className="shrink-0 text-charcoal" />
              <span className="text-[13px] leading-snug font-medium text-charcoal">
                {item.line1}
                {item.line2 && (
                  <>
                    <br />
                    {item.line2}
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------- Section 3D « Conçus pour bouger » ------------------------ */

export function BuiltToMove() {
  return (
    <section className="scene-blush relative overflow-hidden" aria-labelledby="bouger-title">
      <div className="mx-auto grid max-w-[1600px] items-center lg:grid-cols-[minmax(0,44%)_minmax(0,56%)]">
        <Reveal className="px-4 py-12 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:pr-10">
          <p className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-bordeaux uppercase">
            <span aria-hidden="true" className="h-px w-7 bg-bordeaux/50" />
            Mind · Body · Everywhere
          </p>
          <h2
            id="bouger-title"
            className="font-display mt-4 text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          >
            CONÇUS
            <br />
            POUR BOU<span className="text-bordeaux">GER</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-charcoal-soft">
            Du studio à la ville, nos accessoires vous accompagnent dans tous les moments qui
            comptent.
          </p>
          <a
            href="#essentiels"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-bordeaux px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux-deep"
          >
            Explorer
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Reveal>

        {/* Composition : les quatre accessoires sur des podiums minéraux */}
        <Reveal delay={80} className="relative aspect-[4/3] w-full lg:aspect-[16/11]">
          <div className="absolute inset-0">
            <div className="ring-3d absolute left-[6%] top-[4%] h-[86%] w-[62%] rounded-full" />
            <div className="sphere absolute bottom-[26%] left-[10%] h-[9%] w-[7%] rounded-full" />

            {/* Podiums */}
            <div className="podium-stone absolute bottom-[10%] left-[14%] h-[14%] w-[34%] rounded-[22px]" />
            <div className="podium-stone absolute bottom-[14%] left-[44%] h-[11%] w-[24%] rounded-[20px]" />
            <div className="podium-stone absolute bottom-[8%] right-[8%] h-[12%] w-[26%] rounded-[20px]" />

            {/* Bandeau crème */}
            <div className="absolute bottom-[23%] left-[15%] h-[24%] w-[24%] animate-levitate">
              <ProductArt product={products[1]} align="bottom" sizes="(max-width:1024px) 30vw, 15vw" />
            </div>
            {/* Sac noir */}
            <div
              className="absolute bottom-[24%] left-[34%] h-[46%] w-[32%] animate-levitate"
              style={{ animationDelay: "-1.4s" }}
            >
              <ProductArt product={products[0]} align="bottom" sizes="(max-width:1024px) 36vw, 18vw" />
            </div>
            {/* Visière bordeaux */}
            <div
              className="absolute bottom-[24%] left-[44%] h-[24%] w-[24%] animate-levitate"
              style={{ animationDelay: "-2.6s" }}
            >
              <ProductArt product={products[2]} sizes="(max-width:1024px) 28vw, 14vw" />
            </div>
            {/* Chaussettes blanches */}
            <div
              className="absolute bottom-[19%] right-[8%] h-[32%] w-[24%] animate-levitate"
              style={{ animationDelay: "-4s" }}
            >
              <ProductArt product={products[3]} align="bottom" sizes="(max-width:1024px) 28vw, 14vw" />
            </div>
          </div>

          <p className="side-label absolute right-5 top-8 hidden text-right lg:block" aria-hidden="true">
            Même
            <br />
            énergie
            <br />
            partout
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Avantages ---------------------------------- */

export function Benefits() {
  return (
    <section aria-labelledby="avantages-title" className="bg-ivory py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="avantages-title" className="sr-only">
          Nos avantages
        </h2>
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-0">
          {benefits.map((benefit, i) => {
            const Icon = benefitIcons[benefit.id];
            return (
              <Reveal
                key={benefit.id}
                as="li"
                delay={i * 80}
                className={`px-6 text-center ${i > 0 ? "sm:border-l sm:border-line" : ""}`}
              >
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="mx-auto text-charcoal"
                />
                <h3 className="mt-3 text-[12px] font-semibold tracking-[0.14em] text-charcoal uppercase">
                  {benefit.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[26ch] text-[13px] leading-relaxed text-charcoal-soft">
                  {benefit.text}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- Lifestyle ---------------------------------- */

export function Lifestyle() {
  const bag = products[0];
  const visor = products[2];

  return (
    <section id="univers" className="scroll-mt-20 bg-cream" aria-labelledby="univers-title">
      <div className="mx-auto grid max-w-[1600px] items-stretch lg:grid-cols-[minmax(0,34%)_minmax(0,66%)]">
        <Reveal className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-1440px)/2+2rem))] lg:pr-10">
          <h2
            id="univers-title"
            className="font-display text-[clamp(2rem,5.5vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-charcoal"
          >
            DU STUDIO
            <br />À LA VILLE
          </h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-charcoal-soft">
            Les mêmes essentiels.
            <br />
            Une même confiance.
            <br />
            Partout avec vous.
          </p>
          <a
            href="#essentiels"
            className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-charcoal/30 px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-charcoal uppercase transition hover:border-charcoal hover:bg-white"
          >
            Notre univers
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </Reveal>

        {/*
          Décor architectural rose, silhouette portant la visière bordeaux et le tote noir.
          À remplacer par la photo lifestyle HD : /public/images/lifestyle-studio-ville.webp
        */}
        <Reveal delay={80} className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[520px]">
          <div className="scene-blush absolute inset-0">
            {/* Arches */}
            <div className="absolute inset-y-0 left-[6%] w-[22%] rounded-t-full bg-white/22" />
            <div className="absolute inset-y-0 left-[32%] w-[26%] rounded-t-full bg-white/16" />
            <div className="absolute inset-y-0 right-[8%] w-[24%] rounded-t-full bg-white/22" />
            <div className="sphere absolute bottom-[14%] right-[12%] h-[16%] w-[11%] rounded-full opacity-80" />
            <div className="absolute inset-x-0 bottom-0 h-[14%] bg-[#E2B9BB]/50" />

            {/* Silhouette (repère 400×500, calqué sur le cadre) */}
            <svg
              viewBox="0 0 400 500"
              preserveAspectRatio="xMidYMax meet"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Silhouette d’une femme portant la visière Alo bordeaux et le tote bag noir"
            >
              <defs>
                <linearGradient id="figure" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A4442" />
                  <stop offset="50%" stopColor="#1F1D1D" />
                  <stop offset="100%" stopColor="#0B0A0A" />
                </linearGradient>
              </defs>
              <path d="M186 92c22-8 42 2 44 22 2 18-6 34-6 34l-38-4Z" fill="url(#figure)" />
              <ellipse cx="200" cy="136" rx="30" ry="35" fill="url(#figure)" />
              <rect x="189" y="164" width="22" height="22" fill="url(#figure)" />
              <path
                d="M200 184c21 0 36 12 42 32l8 44c3 16 4 32 4 48l2 192H144l2-192c0-16 1-32 4-48l8-44c6-20 21-32 42-32Z"
                fill="url(#figure)"
              />
              <path d="M242 212c11 12 15 27 17 44l9 62a12 12 0 0 1-24 3l-11-60Z" fill="url(#figure)" />
              <path
                d="M200 184c-21 0-36 12-42 32l-8 44c-3 16-4 32-4 48l-1 116c3-120 23-182 55-240Z"
                fill="#fff"
                opacity="0.08"
              />
            </svg>

            <div className="absolute left-[55%] top-[62%] h-[17%] w-[19%] rounded-full bg-white/25 blur-xl" />
            <div className="absolute left-[31%] top-[9%] h-[28%] w-[38%]">
              <ProductArt product={visor} sizes="(max-width:1024px) 38vw, 19vw" />
            </div>
            <div className="absolute left-[53%] top-[61%] h-[20%] w-[24%]">
              <ProductArt product={bag} sizes="(max-width:1024px) 24vw, 12vw" />
            </div>
          </div>

          <p className="side-label absolute right-5 top-8 hidden text-right lg:block" aria-hidden="true">
            Mouvement
            <br />
            style
            <br />
            confiance
            <br />
            partout
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Témoignages --------------------------------- */

export function Testimonials() {
  return (
    <section aria-labelledby="avis-title" className="bg-ivory py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="avis-title"
            className="font-display max-w-2xl text-[clamp(1.35rem,3vw,1.85rem)] font-bold tracking-[-0.02em] text-charcoal"
          >
            ELLES EN PARLENT MIEUX QUE NOUS
          </h2>
          <p className="flex flex-wrap items-center gap-2 text-[13px] text-charcoal-soft">
            <span className="font-display text-2xl font-bold text-charcoal">
              {reviewSummary.average.toFixed(1).replace(".", ",")}/5
            </span>
            <Stars rating={reviewSummary.average} size={15} />
            <span>Basé sur {reviewSummary.total} avis clients</span>
          </p>
        </Reveal>

        <ul className="mt-7 grid gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} as="li" delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col gap-3 rounded-lg border border-line bg-white p-5">
                <Stars rating={review.rating} size={13} />
                <blockquote className="flex-1 text-[13.5px] leading-relaxed text-charcoal">
                  “{review.text}”
                </blockquote>
                <figcaption className="text-[13px]">
                  <span className="block font-semibold text-charcoal">{review.name}</span>
                  <span className="block text-charcoal-soft">{review.city}</span>
                  {review.verified && <span className="sr-only">Achat vérifié</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ------------------------------------- */

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section aria-labelledby="faq-title" className="bg-ivory pb-14 sm:pb-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)] lg:gap-10 lg:px-8">
        <Reveal>
          <p className="text-[10px] font-semibold tracking-[0.22em] text-charcoal-soft uppercase">
            Vos questions, nos réponses
          </p>
          <h2
            id="faq-title"
            className="font-display mt-2 text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em] text-charcoal"
          >
            FAQ
          </h2>
        </Reveal>

        <Reveal delay={80} className="flex flex-col gap-2.5">
          {faq.map((item) => {
            const open = openId === item.id;
            const Icon = faqIcons[item.icon];
            return (
              <div key={item.id} className="rounded-lg border border-line bg-white">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex min-h-12 w-full items-center gap-3 px-4 py-3.5 text-left text-[14px] font-medium text-charcoal transition hover:text-bordeaux"
                  >
                    <Icon size={18} strokeWidth={1.4} aria-hidden="true" className="shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`text-lg leading-none text-charcoal-soft transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className="faq-panel"
                  data-open={open}
                >
                  <div>
                    <p className="px-4 pb-4 pl-[52px] text-[13.5px] leading-relaxed text-charcoal-soft">
                      <span className="mb-1 block font-medium text-charcoal">{item.question}</span>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
