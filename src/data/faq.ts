export const faq = [
  {
    id: "livraison",
    label: "Livraison",
    icon: "truck",
    question: "Quels sont les délais de livraison ?",
    answer:
      "Votre commande est préparée sous 24 heures ouvrées. Comptez 24 à 48 heures pour Casablanca, Rabat et Marrakech, et 2 à 4 jours ouvrés pour le reste du Maroc. La livraison est gratuite partout au Maroc.",
  },
  {
    id: "paiement",
    label: "Paiement",
    icon: "card",
    question: "Comment fonctionne le paiement à la livraison ?",
    answer:
      "Vous ne payez rien en ligne. Vous réglez en espèces au livreur, au moment où vous recevez le colis. Vous pouvez ouvrir et vérifier votre commande avant de payer.",
  },
  {
    id: "echanges",
    label: "Échanges",
    icon: "clock",
    question: "Comment effectuer un échange ?",
    answer:
      "Vous disposez de 14 jours après réception pour demander un échange. Écrivez-nous sur WhatsApp avec votre numéro de commande : nous organisons le retour et vous envoyons la nouvelle taille ou la nouvelle couleur.",
  },
] as const;

export const benefits = [
  {
    id: "confort",
    title: "Confort au quotidien",
    text: "Des matières douces et durables pour vous accompagner toute la journée.",
  },
  {
    id: "style",
    title: "Style qui vous suit",
    text: "Des essentiels minimalistes et élégants pour un look toujours juste.",
  },
  {
    id: "livraison",
    title: "Livraison partout au Maroc",
    text: "Vos accessoires préférés, où que vous soyez dans tout le Maroc.",
  },
] as const;

export const reassurance = [
  { id: "shipping", line1: "Livraison gratuite", line2: "au Maroc" },
  { id: "cod", line1: "Paiement à la livraison", line2: "" },
  { id: "exchange", line1: "Échange facile", line2: "sous 14 jours" },
  { id: "support", line1: "Assistance WhatsApp", line2: "7j/7" },
] as const;
