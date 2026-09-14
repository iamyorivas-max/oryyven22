import Link from "next/link";
import type { ReactNode } from "react";

/** Gabarit des pages secondaires : fil d'Ariane, H1 unique, contenu. */
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <article className="scene-ivory">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label="Fil d’Ariane" className="text-[12px] text-charcoal-soft">
          <Link href="/" className="transition hover:text-bordeaux">
            Accueil
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-charcoal">{title}</span>
        </nav>
        <h1 className="font-display mt-4 text-[clamp(1.9rem,5vw,3rem)] font-semibold tracking-tight text-charcoal">
          {title}
        </h1>
        {intro && <p className="mt-4 text-lg leading-relaxed text-charcoal-soft">{intro}</p>}
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal-soft [&_h2]:font-display [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-charcoal [&_a]:text-bordeaux [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-11 items-center rounded-full border border-charcoal/25 px-6 text-[12px] font-semibold tracking-[0.14em] text-charcoal uppercase transition hover:border-charcoal"
        >
          Retour à l’accueil
        </Link>
      </div>
    </article>
  );
}
