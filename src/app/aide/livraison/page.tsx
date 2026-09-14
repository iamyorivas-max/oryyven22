import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Livraison",
  description: "Délais et zones de livraison Alo au Maroc. Livraison gratuite partout.",
};

export default function Page() {
  return (
    <PageShell title="Livraison" intro="Livraison gratuite dans tout le Maroc, sans minimum d’achat.">
      <h2>Délais</h2>
      <ul>
        <li>Casablanca, Rabat, Marrakech : 24 à 48 heures.</li>
        <li>Reste du Maroc : 2 à 4 jours ouvrés.</li>
      </ul>
      <h2>Préparation</h2>
      <p>
        Les commandes passées avant 16 h sont préparées le jour même. Vous recevez un message dès
        que votre colis part.
      </p>
    </PageShell>
  );
}
