import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Nos engagements",
  description: "Les engagements d’Alo envers ses clientes et clients au Maroc.",
};

export default function Page() {
  return (
    <PageShell title="Nos engagements" intro="Ce sur quoi nous ne transigeons pas.">
      <ul>
        <li>Des prix affichés en dirhams, sans frais cachés à l’étape finale.</li>
        <li>Aucune fausse urgence, aucun faux compteur de stock.</li>
        <li>Un catalogue volontairement court, revu plutôt qu’élargi.</li>
        <li>Une réponse humaine sur WhatsApp, 7 jours sur 7.</li>
      </ul>
    </PageShell>
  );
}
