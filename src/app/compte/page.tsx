import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Suivez vos commandes Alo et gérez vos informations de livraison.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell
      title="Mon compte"
      intro="L’espace client arrive prochainement. En attendant, le suivi de commande se fait directement sur WhatsApp."
    >
      <h2>Suivre une commande</h2>
      <p>
        Envoyez-nous votre numéro de commande sur WhatsApp : nous vous indiquons immédiatement où
        en est votre colis.
      </p>
      <h2>Modifier une commande</h2>
      <p>
        Tant que votre colis n’a pas été remis au livreur, nous pouvons changer la couleur, la
        quantité ou l’adresse de livraison.
      </p>
    </PageShell>
  );
}
