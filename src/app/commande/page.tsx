import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Commander",
  description: "Finalisez votre commande Alo avec paiement à la livraison partout au Maroc.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell
      title="Finaliser votre commande"
      intro="Le tunnel de commande (coordonnées, adresse, confirmation) se branche ici. Votre panier est conservé pendant toute l’opération."
    >
      <h2>Ce qui vous attend</h2>
      <ul>
        <li>Vos coordonnées et votre adresse de livraison.</li>
        <li>Le récapitulatif de votre panier et du montant à régler.</li>
        <li>Le paiement en espèces au livreur, à réception du colis.</li>
      </ul>
      <p>
        Une question avant de valider ? Écrivez-nous sur WhatsApp, nous répondons 7 jours sur 7.
      </p>
    </PageShell>
  );
}
