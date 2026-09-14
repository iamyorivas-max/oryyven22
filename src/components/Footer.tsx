import Link from "next/link";
import { site } from "@/data/site";

const columns = [
  {
    title: "Boutique",
    links: [
      { label: "Les 4 essentiels", href: "/#essentiels" },
      { label: "Nouveautés", href: "/#essentiels" },
      { label: "Accessoires", href: "/#essentiels" },
      { label: "Notre univers", href: "/#univers" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Livraison", href: "/aide/livraison" },
      { label: "Paiement à la livraison", href: "/aide/paiement" },
      { label: "Échanges et retours", href: "/aide/echanges" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Notre histoire", href: "/a-propos" },
      { label: "Nos matières", href: "/a-propos/matieres" },
      { label: "Engagements", href: "/a-propos/engagements" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-2xl tracking-[0.3em]">ALO</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
              Des accessoires de yoga et de Pilates pensés pour bouger : sac, bandeau, visière et
              chaussettes antidérapantes. Livrés partout au Maroc.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3 text-[12px] font-medium tracking-[0.1em] uppercase">
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ivory/25 px-4 py-2 transition hover:border-ivory hover:bg-ivory/10"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ivory/25 px-4 py-2 transition hover:border-ivory hover:bg-ivory/10"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ivory/25 px-4 py-2 transition hover:border-ivory hover:bg-ivory/10"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[12px] font-semibold tracking-[0.16em] text-ivory uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/70 transition hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-[12px] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Maroc — MAD · © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/conditions-generales" className="transition hover:text-ivory">
                Conditions générales
              </Link>
            </li>
            <li>
              <Link href="/politique-de-confidentialite" className="transition hover:text-ivory">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="transition hover:text-ivory">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
