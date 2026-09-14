import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente d’Alo Maroc.",
};

export default function Page() {
  return (
    <PageShell
      title="Conditions générales de vente"
      intro="Ce modèle doit être complété et validé par votre conseil juridique avant la mise en ligne."
    >
      <h2>1. Objet</h2>
      <p>Les présentes conditions régissent les ventes conclues sur ce site auprès de clients situés au Maroc.</p>
      <h2>2. Prix</h2>
      <p>Les prix sont indiqués en dirhams marocains (MAD), toutes taxes comprises. La livraison est offerte au Maroc.</p>
      <h2>3. Commande et paiement</h2>
      <p>Le paiement s’effectue en espèces à la livraison. La commande est ferme à compter de sa confirmation par nos services.</p>
      <h2>4. Livraison</h2>
      <p>Les délais indicatifs sont de 24 à 48 heures dans les grandes villes et de 2 à 4 jours ouvrés ailleurs au Maroc.</p>
      <h2>5. Échanges</h2>
      <p>Un échange peut être demandé dans les 14 jours suivant la réception, article non porté et emballage d’origine.</p>
      <h2>6. Contact</h2>
      <p>Toute réclamation peut être adressée par WhatsApp ou par e-mail à notre service client.</p>
    </PageShell>
  );
}
