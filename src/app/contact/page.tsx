import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Une question sur nos accessoires de yoga ? L’équipe Alo répond 7j/7 sur WhatsApp.",
};

export default function Page() {
  return (
    <PageShell
      title="Nous contacter"
      intro="Une question sur une taille, une couleur ou une livraison ? Nous répondons tous les jours."
    >
      <h2>WhatsApp</h2>
      <p>
        Le plus rapide : <a href={`https://wa.me/${site.whatsapp}`}>écrivez-nous sur WhatsApp</a>,
        7 jours sur 7.
      </p>
      <h2>E-mail</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a> — réponse sous 24 heures ouvrées.
      </p>
    </PageShell>
  );
}
