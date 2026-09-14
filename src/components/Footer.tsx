import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Boutique",
    links: [
      { label: "Nouveautés", href: "/#essentiels" },
      { label: "Accessoires", href: "/#essentiels" },
      { label: "Notre univers", href: "/#univers" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Suivi de commande", href: "/compte" },
      { label: "FAQ", href: "/#faq-title" },
      { label: "Échanges et retours", href: "/aide/echanges" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Notre histoire", href: "/a-propos" },
      { label: "Nos valeurs", href: "/a-propos/engagements" },
      { label: "Le Maroc, notre inspiration", href: "/a-propos/matieres" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 5.3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm5.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z",
  },
  {
    label: "TikTok",
    href: site.social.tiktok,
    path: "M16.5 2h-2.9v13.2a2.4 2.4 0 1 1-2.4-2.4c.2 0 .4 0 .6.1v-3a5.5 5.5 0 1 0 4.8 5.4V8.9a6.6 6.6 0 0 0 3.9 1.2V7.2a3.8 3.8 0 0 1-3.9-3.7V2Z",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    path: "M12 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.7 4.9-1.3A9.9 9.9 0 1 0 12 2Zm5.8 14c-.25.7-1.44 1.34-2 1.4-.53.05-1.02.24-3.44-.72-2.9-1.16-4.74-4.13-4.88-4.33-.14-.2-1.16-1.54-1.16-2.94s.73-2.1 1-2.38c.25-.28.56-.35.75-.35h.55c.18 0 .42-.07.65.5.25.6.83 2.07.9 2.22.07.14.12.31.02.5-.1.2-.15.32-.29.49l-.42.49c-.14.14-.28.3-.12.58.16.28.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.21 1.36.28.14.44.12.6-.07.17-.2.7-.81.89-1.09.18-.28.37-.24.62-.14.26.1 1.62.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.18 1.37Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_repeat(3,minmax(0,1fr))_auto]">
          <div>
            <Logo className="h-8 w-[62px]" tone="light" />
            <p className="mt-4 text-[13px] leading-relaxed text-ivory/65">
              Move Different.
              <br />
              Au Maroc.
            </p>
            <ul className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 transition hover:border-ivory hover:bg-ivory/10"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[11px] font-semibold tracking-[0.18em] text-ivory uppercase">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-ivory/65 transition hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Marché et devise */}
          <div className="lg:border-l lg:border-ivory/15 lg:pl-8">
            <label htmlFor="market" className="sr-only">
              Marché et devise
            </label>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-full bg-[#C1272D] text-[10px] font-bold text-white"
              >
                ★
              </span>
              <select
                id="market"
                defaultValue="ma"
                className="cursor-pointer rounded-md border border-ivory/25 bg-transparent py-1.5 pl-2 pr-7 text-[13px] text-ivory outline-none"
              >
                <option value="ma" className="text-charcoal">
                  Maroc (MAD)
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-ivory/15 pt-5 text-[12px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ALO. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
