import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Échanges et retours",
  description: "Échange facile sous 14 jours sur tous les accessoires Alo.",
};

export default function Page() {
  return (
    <PageShell
      title="Échanges et retours"
      intro="Vous disposez de 14 jours après réception pour demander un échange."
    >
      <h2>Conditions</h2>
      <ul>
        <li>L’article doit être non porté et dans son emballage d’origine.</li>
        <li>Les chaussettes ne sont échangées que si l’emballage est intact, pour des raisons d’hygiène.</li>
      </ul>
      <h2>Démarche</h2>
      <p>
        Écrivez-nous sur WhatsApp avec votre numéro de commande. Nous organisons le retour et vous
        envoyons la nouvelle couleur ou la nouvelle taille.
      </p>
    </PageShell>
  );
}
