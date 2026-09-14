import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Nos matières",
  description: "Les matières utilisées dans les accessoires de yoga Alo.",
};

export default function Page() {
  return (
    <PageShell title="Nos matières" intro="Des matières simples, choisies pour leur tenue dans le temps.">
      <ul>
        <li><strong>Toile structurée</strong> — le corps du tote bag, renforcé aux points d’usure des anses.</li>
        <li><strong>Maille côtelée</strong> — le bandeau, extensible mais qui reprend sa forme au lavage.</li>
        <li><strong>Tissu technique absorbant</strong> — la doublure de la visière.</li>
        <li><strong>Coton mélangé et picots de silicone</strong> — les chaussettes antidérapantes.</li>
      </ul>
      <p>Tous nos articles se lavent en machine à 30 °C, à l’exception de la visière, à nettoyer à la main.</p>
    </PageShell>
  );
}
