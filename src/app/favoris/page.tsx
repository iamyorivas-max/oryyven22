import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mes favoris",
  description: "Retrouvez les accessoires Alo que vous avez mis de côté.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <PageShell
      title="Mes favoris"
      intro="Vos favoris sont enregistrés dans votre navigateur pendant votre visite. La synchronisation entre appareils arrivera avec l’espace client."
    >
      <p>
        Pour mettre un article de côté, touchez le cœur en haut à droite de sa carte produit sur la
        page d’accueil.
      </p>
    </PageShell>
  );
}
