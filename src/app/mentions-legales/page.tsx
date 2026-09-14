import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Alo Maroc.",
};

export default function Page() {
  return (
    <PageShell
      title="Mentions légales"
      intro="À compléter avec la raison sociale, le RC, l’ICE, l’adresse du siège et l’hébergeur avant la mise en ligne."
    >
      <h2>Éditeur</h2>
      <p>Raison sociale, forme juridique, capital social, adresse du siège, RC, ICE, IF.</p>
      <h2>Directeur de la publication</h2>
      <p>Nom et prénom du responsable de la publication.</p>
      <h2>Hébergeur</h2>
      <p>Nom, adresse et contact de l’hébergeur du site.</p>
    </PageShell>
  );
}
