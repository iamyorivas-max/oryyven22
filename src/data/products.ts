export type Variant = {
  id: string;
  /** Nom de la couleur affiché au client */
  name: string;
  /** Couleur réelle du produit (ne jamais tout passer en rose) */
  swatch: string;
  /** Bordure du pastille si la couleur est claire */
  border?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  category: string;
  variants: Variant[];
  /**
   * Visuel produit. Remplacer par un fichier HD dans /public/images/.
   * Tant que `image` est absent, un rendu 3D CSS (`art`) est utilisé.
   */
  image?: string;
  alt: string;
  art: "bag" | "headband" | "visor" | "socks";
};

export const products: Product[] = [
  {
    id: "alo-tote-bag",
    slug: "alo-tote-bag",
    name: "Alo Tote Bag",
    shortName: "Tote Bag",
    price: 749,
    description:
      "Le sac qui suit votre journée : tapis, gourde, ordinateur. Toile structurée noire, anses renforcées et poche intérieure zippée.",
    rating: 4.9,
    reviewCount: 128,
    category: "Sacs",
    variants: [
      { id: "noir", name: "Noir", swatch: "#1C1A19" },
      { id: "creme", name: "Crème", swatch: "#EDE3D2", border: "#D9C7B2" },
    ],
    alt: "Sac Alo Tote Bag noir en toile structurée avec anses renforcées",
    art: "bag",
  },
  {
    id: "alo-yoga-headband",
    slug: "alo-yoga-headband",
    name: "Alo Yoga Headband",
    shortName: "Headband",
    price: 299,
    description:
      "Bandeau large en maille côtelée crème. Il reste en place du premier échauffement à la dernière posture.",
    rating: 4.8,
    reviewCount: 96,
    category: "Accessoires",
    variants: [
      { id: "creme", name: "Crème", swatch: "#EDE3D2", border: "#D9C7B2" },
      { id: "bordeaux", name: "Bordeaux", swatch: "#6E1F2A" },
    ],
    alt: "Bandeau de yoga Alo crème en maille côtelée",
    art: "headband",
  },
  {
    id: "alo-visor",
    slug: "alo-visor",
    name: "Alo Visor",
    shortName: "Visière",
    price: 349,
    description:
      "Visière bordeaux profond, bandeau absorbant et courbure ajustée. Pensée pour le studio comme pour la marche en ville.",
    rating: 4.9,
    reviewCount: 74,
    category: "Accessoires",
    variants: [
      { id: "bordeaux", name: "Bordeaux", swatch: "#6E1F2A" },
      { id: "noir", name: "Noir", swatch: "#1C1A19" },
    ],
    alt: "Visière Alo bordeaux avec bandeau absorbant",
    art: "visor",
  },
  {
    id: "alo-grip-socks",
    slug: "alo-non-slip-grip-socks",
    name: "Alo Non-Slip Grip Socks",
    shortName: "Chaussettes",
    price: 279,
    description:
      "Chaussettes blanches à picots noirs antidérapants. Une accroche franche sur le tapis, sans perdre la sensation du pied nu.",
    rating: 4.9,
    reviewCount: 152,
    category: "Accessoires",
    variants: [
      { id: "blanc", name: "Blanc", swatch: "#FBF8F3", border: "#D9C7B2" },
      { id: "noir", name: "Noir", swatch: "#1C1A19" },
    ],
    alt: "Chaussettes de yoga Alo blanches avec picots antidérapants noirs",
    art: "socks",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(value)} MAD`;
