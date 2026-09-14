/**
 * Configuration du site.
 *
 * Les valeurs proviennent de variables d’environnement et sont normalisées ici :
 * une variable mal formée (URL sans schéma, seuil non numérique, numéro avec
 * espaces) ne doit jamais faire échouer le build, seulement retomber sur la
 * valeur par défaut.
 */

const DEFAULT_URL = "https://alo-maroc.ma";

/** Normalise une URL de site : ajoute le schéma si besoin, retire le slash final. */
function normalizeUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_URL;

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    return url.origin + (url.pathname === "/" ? "" : url.pathname.replace(/\/$/, ""));
  } catch {
    // URL inexploitable : on garde la valeur par défaut plutôt que de casser le build.
    return DEFAULT_URL;
  }
}

/** Numéro WhatsApp au format international, chiffres uniquement. */
function normalizePhone(value: string | undefined, fallback: string): string {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length >= 8 ? digits : fallback;
}

/** Seuil de livraison gratuite ; toute valeur non numérique désactive la barre. */
function normalizeThreshold(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export const site = {
  name: "Alo",
  legalName: "Alo Maroc",
  url: normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      // Repli automatique sur le domaine fourni par Vercel en préproduction.
      (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL),
  ),
  locale: "fr_MA",
  currency: "MAD",
  country: "Maroc",
  whatsapp: normalizePhone(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "212600000000"),
  email: "contact@alo-maroc.ma",
  /** Seuil de livraison gratuite en MAD. Mettre à 0 pour désactiver la barre de progression. */
  freeShippingThreshold: normalizeThreshold(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD, 500),
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
  },
} as const;

export const announcement =
  "LIVRAISON GRATUITE AU MAROC · PAIEMENT À LA LIVRAISON";

export const nav = [
  { label: "Nouveautés", href: "/#essentiels" },
  { label: "Accessoires", href: "/#essentiels" },
  { label: "Notre univers", href: "/#univers" },
] as const;
