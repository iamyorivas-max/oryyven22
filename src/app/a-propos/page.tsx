import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Alo : des accessoires de yoga et de Pilates pensés pour bouger, livrés au Maroc.",
};

export default function Page() {
  return (
    <PageShell
      title="Notre histoire"
      intro="Quatre pièces, choisies parce qu’elles servent à chaque séance — et rien de plus."
    >
      <p>
        Nous sommes partis d’un constat simple : on achète beaucoup d’équipement de yoga, on
        n’utilise vraiment qu’une poignée d’accessoires. Nous avons donc réduit la collection à
        quatre essentiels : un sac qui porte tout, un bandeau qui tient, une visière pour dehors,
        et des chaussettes qui accrochent.
      </p>
      <p>
        Chaque pièce est testée sur de vraies séances avant d’entrer au catalogue. Si elle glisse,
        si elle serre ou si elle se déforme, elle n’y entre pas.
      </p>
    </PageShell>
  );
}
