import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Paiement à la livraison",
  description: "Comment fonctionne le paiement à la livraison chez Alo au Maroc.",
};

export default function Page() {
  return (
    <PageShell
      title="Paiement à la livraison"
      intro="Vous ne payez rien en ligne : le règlement se fait en espèces, au moment de la réception."
    >
      <h2>Comment ça se passe</h2>
      <ul>
        <li>Vous validez votre commande sans aucun paiement en ligne.</li>
        <li>Le livreur vous contacte avant de se présenter.</li>
        <li>Vous vérifiez votre colis, puis vous réglez en espèces.</li>
      </ul>
      <p>Aucun frais supplémentaire n’est appliqué pour ce mode de paiement.</p>
    </PageShell>
  );
}
