export const site = {
  name: "Alo",
  legalName: "Alo Maroc",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alo-maroc.ma",
  locale: "fr_MA",
  currency: "MAD",
  country: "Maroc",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",
  email: "contact@alo-maroc.ma",
  /** Seuil de livraison gratuite en MAD. Mettre à 0 pour désactiver la barre de progression. */
  freeShippingThreshold: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD ?? 500),
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
