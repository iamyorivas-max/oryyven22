import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Alo Maroc collecte et utilise vos données personnelles.",
};

export default function Page() {
  return (
    <PageShell
      title="Politique de confidentialité"
      intro="Ce modèle doit être complété et validé par votre conseil juridique, notamment au regard de la loi 09-08 et de la déclaration CNDP."
    >
      <h2>Données collectées</h2>
      <p>Nom, téléphone, adresse de livraison et, si vous vous y inscrivez, votre adresse e-mail.</p>
      <h2>Finalités</h2>
      <p>Traitement et livraison des commandes, service après-vente, et envoi de la newsletter si vous y avez consenti.</p>
      <h2>Mesure d’audience et publicité</h2>
      <p>
        Le site peut déposer des cookies de mesure d’audience et de publicité (Google Analytics,
        Google Tag Manager, Meta, TikTok, Microsoft Clarity) lorsque les identifiants
        correspondants sont configurés.
      </p>
      <h2>Vos droits</h2>
      <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous écrivant.</p>
    </PageShell>
  );
}
