"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { trackNewsletterSignup } from "@/lib/analytics";

/** Enveloppe 3D de la bannière newsletter. */
function EnvelopeArt() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <svg
        viewBox="0 0 120 100"
        className="absolute inset-0 h-full w-full animate-levitate drop-shadow-[0_18px_26px_rgba(123,36,54,0.28)]"
      >
        <defs>
          <linearGradient id="envBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1DCDD" />
          </linearGradient>
          <linearGradient id="envFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBEEEE" />
            <stop offset="100%" stopColor="#E9CBCC" />
          </linearGradient>
          <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7E5E6" />
            <stop offset="100%" stopColor="#E2B9BB" />
          </linearGradient>
        </defs>
        {/* Dos de l’enveloppe */}
        <rect x="10" y="22" width="100" height="60" rx="6" fill="url(#envBody)" />
        {/* Panneau avant, plis en V */}
        <path d="M10 82h100a6 6 0 0 0 6-6V34L60 66 4 34v42a6 6 0 0 0 6 6Z" fill="url(#envFront)" />
        {/* Rabat supérieur */}
        <path d="M16 22h88a6 6 0 0 1 6 6L60 60 10 28a6 6 0 0 1 6-6Z" fill="url(#envFlap)" />
        <path d="M16 22h88a6 6 0 0 1 6 6L60 60 10 28a6 6 0 0 1 6-6Z" fill="none" stroke="#fff" strokeOpacity="0.7" />
      </svg>
      <div className="ground-shadow absolute bottom-[2%] left-1/2 h-[10%] w-[58%] -translate-x-1/2" />
    </div>
  );
}

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
    <section aria-labelledby="newsletter-title" className="bg-ivory pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="scene-blush grid items-center gap-6 rounded-2xl px-6 py-8 sm:px-10 lg:grid-cols-[140px_minmax(0,1fr)_minmax(0,420px)] lg:gap-10 lg:py-7">
            <div className="mx-auto aspect-square w-28 lg:w-full">
              <EnvelopeArt />
            </div>

            <div>
              <h2
                id="newsletter-title"
                className="font-display text-[clamp(1.3rem,3.4vw,1.9rem)] font-bold leading-tight tracking-[-0.02em] text-bordeaux"
              >
                -10 % SUR VOTRE
                <br className="hidden sm:inline" /> PREMIÈRE COMMANDE
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal-soft">
                Rejoignez notre communauté et recevez des offres exclusives.
              </p>
            </div>

            {done ? (
              <p
                role="status"
                className="rounded-md bg-white/90 px-5 py-4 text-[14px] font-medium text-bordeaux"
              >
                Merci ! Votre code de −10 % arrive dans votre boîte mail.
              </p>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <label htmlFor={emailId} className="sr-only">
                    Votre adresse e-mail
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${emailId}-error` : undefined}
                    placeholder="Votre adresse e-mail"
                    className="h-12 flex-1 rounded-md border border-white/80 bg-white px-4 text-sm outline-none placeholder:text-charcoal-soft/70"
                  />
                  <button
                    type="submit"
                    className="h-12 shrink-0 rounded-md bg-bordeaux px-6 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-bordeaux-deep active:scale-[0.99]"
                  >
                    Je m’inscris
                  </button>
                </div>

                <div className="mt-2.5 flex items-start gap-2">
                  <input
                    id={consentId}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#7B2436]"
                  />
                  <label htmlFor={consentId} className="text-[11px] leading-relaxed text-charcoal-soft">
                    J’accepte de recevoir les e-mails marketing d’Alo. Je peux me désinscrire à tout
                    moment.
                  </label>
                </div>

                {error && (
                  <p id={`${emailId}-error`} role="alert" className="mt-2 text-[12px] font-medium text-bordeaux">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
