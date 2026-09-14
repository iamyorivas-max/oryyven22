"use client";

import { useId, useState } from "react";
import {
  BadgeCheck,
  Banknote,
  Heart,
  MapPin,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Truck,
} from "lucide-react";
import { benefits, faq, reassurance } from "@/data/faq";
import { reviews, reviewSummary } from "@/data/reviews";
import { products } from "@/data/products";
import { ProductArt } from "@/components/ProductArt";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/Stars";
import { trackNewsletterSignup } from "@/lib/analytics";

const reassuranceIcons = { shipping: Truck, cod: Banknote, exchange: RefreshCw, support: MessageCircle };
const benefitIcons = { confort: Heart, style: Sparkles, livraison: MapPin };

/* ---------------------------------- Réassurance --------------------------------- */

export function Reassurance() {
  return (
    <section aria-label="Nos engagements" className="border-y border-sand/60 bg-cream/60">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {reassurance.map((item) => {
          const Icon = reassuranceIcons[item.id];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blush-soft text-bordeaux">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-charcoal">{item.title}</span>
                <span className="block text-[12px] text-charcoal-soft">{item.text}</span>
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
    <section className="scene-ivory relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          {/* Les quatre accessoires posés sur des podiums sculptés de hauteurs différentes */}
          <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
            <div className="blob absolute right-[6%] top-[2%] h-[26%] w-[26%]" />
            <div className="ring-3d absolute left-[2%] top-[6%] h-[30%] w-[30%] rounded-full" />
            <div className="absolute inset-x-[4%] bottom-[6%] top-[26%] grid grid-cols-4 gap-2 sm:gap-4">
              {products.map((product, i) => {
                const podiumHeight = [26, 40, 18, 33][i];
                return (
                  <div key={product.id} className="flex h-full flex-col justify-end">
                    <div
                      className="relative aspect-square w-full animate-levitate"
                      style={{ animationDelay: `${-i * 1.3}s` }}
                    >
                      <ProductArt
                        product={product}
                        align="bottom"
                        sizes="(max-width: 768px) 22vw, 12vw"
                      />
                    </div>
                    <div className="ground-shadow mx-auto -mt-1 h-2 w-2/3 shrink-0" />
                    <div
                      className="podium w-full shrink-0 rounded-t-xl"
                      style={{ height: `${podiumHeight}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display text-[clamp(1.85rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-charcoal">
            CONÇUS POUR BOUGER
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Du studio à la ville, nos accessoires vous accompagnent dans tous les moments qui
            comptent.
          </p>
          <a
            href="#essentiels"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-charcoal px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-bordeaux"
          >
            Explorer
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- Avantages ---------------------------------- */

export function Benefits() {
  return (
    <section aria-labelledby="avantages-title" className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="avantages-title" className="sr-only">
          Nos avantages
        </h2>
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
          {benefits.map((benefit, i) => {
            const Icon = benefitIcons[benefit.id];
            return (
              <Reveal key={benefit.id} delay={i * 80}>
                <div className="flex flex-col gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush-soft text-bordeaux">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-charcoal">{benefit.title}</h3>
                  <p className="text-[15px] leading-relaxed text-charcoal-soft">{benefit.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Lifestyle ---------------------------------- */

export function Lifestyle() {
  const bag = products[0];
  const visor = products[2];

  return (
    <section
      id="univers"
      className="scroll-mt-20 bg-ivory py-16 sm:py-20 lg:py-24"
      aria-labelledby="univers-title"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          {/*
            Décor architectural rose + silhouette féminine + visière bordeaux portée + sac noir au bras.
            Le repère de la silhouette est un viewBox 400×500, identique au ratio du cadre :
            les calques produits sont donc positionnés en pourcentages directement comparables.
          */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush-soft to-blush shadow-[var(--shadow-podium)]">
            {/* Arches architecturales */}
            <div className="absolute inset-x-[14%] top-[8%] h-[66%] rounded-t-full bg-blush-deep/30" />
            <div className="absolute inset-x-[26%] top-[18%] h-[58%] rounded-t-full bg-white/25" />
            <div className="absolute inset-x-0 bottom-0 h-[16%] bg-blush-deep/35" />
            <div className="ground-shadow absolute bottom-[13%] left-1/2 h-[5%] w-[46%] -translate-x-1/2" />

            {/* Silhouette */}
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Silhouette d’une femme portant la visière Alo bordeaux et le tote bag noir"
            >
              <defs>
                <linearGradient id="figure" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A4442" />
                  <stop offset="50%" stopColor="#1C1A19" />
                  <stop offset="100%" stopColor="#0B0A0A" />
                </linearGradient>
              </defs>
              {/* Chignon */}
              <circle cx="200" cy="98" r="14" fill="url(#figure)" />
              {/* Tête */}
              <ellipse cx="200" cy="136" rx="30" ry="35" fill="url(#figure)" />
              {/* Cou */}
              <rect x="189" y="164" width="22" height="22" fill="url(#figure)" />
              {/* Buste, taille marquée puis hanches */}
              <path
                d="M200 184c21 0 36 12 42 32l8 44c3 16 4 32 4 48l2 152H144l2-152c0-16 1-32 4-48l8-44c6-20 21-32 42-32Z"
                fill="url(#figure)"
              />
              {/* Bras le long du corps, main à hauteur du sac */}
              <path
                d="M242 212c11 12 15 27 17 44l9 62a12 12 0 0 1-24 3l-11-60Z"
                fill="url(#figure)"
              />
              {/* Lumière rasante côté gauche */}
              <path
                d="M200 184c-21 0-36 12-42 32l-8 44c-3 16-4 32-4 48l-1 76c3-80 23-142 55-200Z"
                fill="#fff"
                opacity="0.08"
              />
            </svg>

            {/* Halo clair pour détacher le sac de la silhouette */}
            <div className="absolute left-[55%] top-[62%] h-[17%] w-[19%] rounded-full bg-white/25 blur-xl" />

            {/* Visière bordeaux, portée sur le front */}
            <div className="absolute left-[31%] top-[9%] h-[28%] w-[38%]">
              <ProductArt product={visor} sizes="(max-width: 1024px) 38vw, 19vw" />
            </div>

            {/* Sac noir tenu à la main */}
            <div className="absolute left-[53%] top-[61%] h-[20%] w-[24%]">
              <ProductArt product={bag} sizes="(max-width: 1024px) 24vw, 12vw" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="univers-title"
            className="font-display text-[clamp(1.85rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-charcoal"
          >
            DU STUDIO À LA VILLE
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Les mêmes essentiels. Une même confiance. Partout avec vous.
          </p>
          <a
            href="#essentiels"
            className="mt-8 inline-flex min-h-12 items-center rounded-full border border-charcoal/25 px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-charcoal uppercase transition hover:border-charcoal hover:bg-white/70"
          >
            Notre univers
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Témoignages --------------------------------- */

export function Testimonials() {
  return (
    <section aria-labelledby="avis-title" className="bg-cream/70 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="avis-title"
            className="font-display text-[clamp(1.7rem,4.5vw,2.75rem)] font-semibold tracking-tight text-charcoal"
          >
            ELLES EN PARLENT MIEUX QUE NOUS
          </h2>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-charcoal-soft">
            <Stars rating={reviewSummary.average} size={18} />
            <span className="font-semibold text-charcoal">
              {reviewSummary.average.toFixed(1).replace(".", ",")}/5
            </span>
            <span>· {reviewSummary.total} avis clients</span>
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} as="li" delay={i * 80} className="h-full">
              <figure className="flex h-full flex-col gap-4 rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-card)] ring-1 ring-sand/50">
                <Stars rating={review.rating} />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-charcoal-soft">
                  « {review.text} »
                </blockquote>
                <figcaption className="flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="font-semibold text-charcoal">{review.firstName}</span>
                  <span className="text-charcoal-soft">— {review.city}</span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blush-soft px-2.5 py-1 text-[11px] font-medium text-bordeaux">
                      <BadgeCheck size={13} aria-hidden="true" />
                      Achat vérifié
                    </span>
                  )}
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
  const [openId, setOpenId] = useState<string | null>(faq[0].id);

  return (
    <section aria-labelledby="faq-title" className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="faq-title"
            className="font-display text-center text-[clamp(1.7rem,4.5vw,2.5rem)] font-semibold tracking-tight text-charcoal"
          >
            QUESTIONS FRÉQUENTES
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-sand/70 border-y border-sand/70">
          {faq.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-semibold text-charcoal transition hover:text-bordeaux sm:text-base"
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush-soft text-bordeaux transition-transform duration-300 ${
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
                    <p className="pb-6 pr-10 text-[15px] leading-relaxed text-charcoal-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Newsletter --------------------------------- */

export function Newsletter() {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Merci d’indiquer une adresse e-mail valide.");
      return;
    }
    if (!consent) {
      setError("Merci d’accepter de recevoir nos e-mails pour continuer.");
      return;
    }
    setError(null);
    setDone(true);
    trackNewsletterSignup("newsletter_banner");
  };

  return (
    <section aria-labelledby="newsletter-title" className="bg-ivory pb-20 pt-4 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-soft via-blush to-blush-deep p-8 shadow-[var(--shadow-podium)] sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="ring-3d pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full opacity-60" />

            <div className="relative">
              <h2
                id="newsletter-title"
                className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold leading-tight tracking-tight text-bordeaux-deep"
              >
                −10 % SUR VOTRE PREMIÈRE COMMANDE
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-bordeaux-deep/80">
                Inscrivez-vous pour recevoir votre code de bienvenue et suivre nos nouveautés.
                Un e-mail utile, jamais plus d’un par semaine.
              </p>

              {done ? (
                <p
                  role="status"
                  className="mt-6 rounded-2xl bg-white/85 px-5 py-4 text-[15px] font-medium text-bordeaux-deep"
                >
                  Merci ! Votre code de −10 % arrive dans votre boîte mail.
                </p>
              ) : (
                <form onSubmit={submit} noValidate className="mt-6 max-w-md">
                  <label htmlFor={emailId} className="block text-[13px] font-medium text-bordeaux-deep">
                    Votre adresse e-mail
                  </label>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${emailId}-error` : undefined}
                      placeholder="prenom@exemple.ma"
                      className="h-12 flex-1 rounded-full border border-white/70 bg-white px-5 text-sm outline-none placeholder:text-charcoal-soft/60"
                    />
                    <button
                      type="submit"
                      className="h-12 shrink-0 rounded-full bg-bordeaux px-7 text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.98]"
                    >
                      Je m’inscris
                    </button>
                  </div>

                  <div className="mt-3 flex items-start gap-2.5">
                    <input
                      id={consentId}
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#6E1F2A]"
                    />
                    <label htmlFor={consentId} className="text-[12px] leading-relaxed text-bordeaux-deep/85">
                      J’accepte de recevoir les e-mails marketing d’Alo. Je peux me désinscrire à
                      tout moment.
                    </label>
                  </div>

                  {error && (
                    <p id={`${emailId}-error`} role="alert" className="mt-3 text-[13px] font-medium text-bordeaux-deep">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Enveloppe 3D */}
            <div className="relative mx-auto aspect-square w-full max-w-[260px]">
              <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
              <div className="absolute inset-[14%] animate-levitate">
                <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-white to-cream shadow-[var(--shadow-float)]">
                  <div
                    className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-br from-cream to-sand"
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  />
                  <div className="absolute bottom-4 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full bg-bordeaux text-center text-[11px] font-bold leading-9 text-white">
                    10%
                  </div>
                </div>
              </div>
              <div className="ground-shadow absolute bottom-[6%] left-1/2 h-4 w-[52%] -translate-x-1/2" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
