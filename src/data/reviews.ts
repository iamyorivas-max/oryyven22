/**
 * Avis clients — source unique de vérité.
 * IMPORTANT : ces avis sont des exemples de démonstration.
 * Remplacez-les par de vrais avis vérifiés avant toute mise en production.
 */
export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  verified: boolean;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Sarah K.",
    city: "Casablanca",
    rating: 5,
    verified: true,
    text: "Une qualité incroyable ! Le tote est spacieux et élégant, je l’utilise tous les jours.",
  },
  {
    id: "r2",
    name: "Inès M.",
    city: "Rabat",
    rating: 5,
    verified: true,
    text: "Confortable, stylé et pratique. Le headband reste bien en place même pendant les séances intenses !",
  },
  {
    id: "r3",
    name: "Nora A.",
    city: "Marrakech",
    rating: 5,
    verified: true,
    text: "Livraison rapide et service au top. Les chaussettes sont super confortables et le visor est magnifique !",
  },
];

export const reviewSummary = {
  average: 4.9,
  total: 423,
};
