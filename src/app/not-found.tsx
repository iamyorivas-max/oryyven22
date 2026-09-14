import Link from "next/link";

export default function NotFound() {
  return (
    <section className="scene-ivory flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-sm text-charcoal-soft">
        Cette page n’existe pas ou a été déplacée. Retrouvez nos quatre essentiels sur la page
        d’accueil.
      </p>
      <Link
        href="/"
        className="mt-7 min-h-12 rounded-full bg-bordeaux px-8 py-3.5 text-[12px] font-semibold tracking-[0.16em] text-white uppercase"
      >
        Retour à l’accueil
      </Link>
    </section>
  );
}
