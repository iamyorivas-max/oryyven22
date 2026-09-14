/**
 * Avis clients — source unique de vérité.
 * IMPORTANT : ces avis sont des exemples de démonstration.
 * Remplacez-les par de vrais avis vérifiés avant toute mise en production.
 */
export type Review = {
  id: string;
  firstName: string;
  city: string;
  rating: number;
  verified: boolean;
  product: string;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    firstName: "Salma",
    city: "Casablanca",
    rating: 5,
    verified: true,
    product: "Alo Tote Bag",
    text: "Le sac tient vraiment tout : tapis, gourde et ordinateur. La toile ne se déforme pas après trois mois d'utilisation quotidienne.",
  },
  {
    id: "r2",
    firstName: "Imane",
    city: "Rabat",
    rating: 5,
    verified: true,
    product: "Alo Non-Slip Grip Socks",
    text: "Les picots accrochent parfaitement, même en chien tête en bas. Je ne glisse plus du tout et le lavage n'abîme rien.",
  },
  {
    id: "r3",
    firstName: "Nadia",
    city: "Marrakech",
    rating: 5,
    verified: true,
    product: "Alo Visor",
    text: "Commandée avec paiement à la livraison, reçue en deux jours. La visière est légère et la couleur bordeaux est superbe en vrai.",
  },
];

export const reviewSummary = {
  average: 4.9,
  total: reviews.length > 0 ? 450 : 0,
};
