import Image from "next/image";
import type { Product } from "@/data/products";

/**
 * Rendu du visuel produit.
 *
 * — Si `product.image` est défini, le fichier de /public/images/ est utilisé tel quel.
 * — Sinon, un rendu 3D sculpté en SVG prend le relais, dans la couleur réelle de la
 *   variante sélectionnée. Chaque produit est un calque indépendant, remplaçable par
 *   un visuel HD sans toucher au reste du code.
 */
export function ProductArt({
  product,
  variantId,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
  align = "center",
}: {
  product: Product;
  variantId?: string;
  priority?: boolean;
  sizes?: string;
  /** "bottom" fait reposer le produit sur son podium plutôt que de le centrer. */
  align?: "center" | "bottom";
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={
          align === "bottom" ? "object-contain object-bottom" : "object-contain object-center"
        }
      />
    );
  }

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div
      className={`absolute inset-0 flex justify-center ${
        align === "bottom" ? "items-end" : "items-center"
      }`}
      role="img"
      aria-label={product.alt}
    >
      <ArtShape art={product.art} color={variant.swatch} />
    </div>
  );
}

const wordmark = {
  fontFamily: "var(--font-logo)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
} as const;

/** Le logo apposé sur le produit doit rester lisible sur toutes les couleurs. */
function inkFor(color: string) {
  const hex = color.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1F1D1D" : "#FBF8F5";
}

function ArtShape({ art, color }: { art: Product["art"]; color: string }) {
  switch (art) {
    case "bag":
      return <BagArt color={color} />;
    case "headband":
      return <HeadbandArt color={color} />;
    case "visor":
      return <VisorArt color={color} />;
    case "socks":
      return <SocksArt color={color} />;
  }
}

/** Tote bag : toile structurée, deux anses droites, logo centré. */
function BagArt({ color }: { color: string }) {
  const ink = inkFor(color);
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[86%] w-[86%] drop-shadow-[0_20px_28px_rgba(31,29,29,0.3)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.88" />
          <stop offset="42%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Anses */}
      <path d="M74 62V44a12 12 0 0 1 24 0v18" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path d="M102 62V44a12 12 0 0 1 24 0v18" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
      {/* Corps de la toile */}
      <path d="M46 62h108a6 6 0 0 1 6 6v90a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6V68a6 6 0 0 1 6-6Z" fill="url(#bagBody)" />
      {/* Pli supérieur */}
      <path d="M46 62h108a6 6 0 0 1 6 6v6H40v-6a6 6 0 0 1 6-6Z" fill="#fff" opacity="0.12" />
      <text x="100" y="126" textAnchor="middle" fill={ink} fontSize="30" style={wordmark}>
        alo
      </text>
    </svg>
  );
}

/** Bandeau large, forme bombée, logo sur la face. */
function HeadbandArt({ color }: { color: string }) {
  const ink = inkFor(color);
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[80%] w-[80%] drop-shadow-[0_18px_26px_rgba(31,29,29,0.22)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bandBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* Face avant du bandeau */}
      <path d="M44 108c0-30 25-50 56-50s56 20 56 50v18c0 8-6 12-14 10-12-4-26-6-42-6s-30 2-42 6c-8 2-14-2-14-10v-18Z" fill="url(#bandBody)" />
      {/* Arête supérieure */}
      <path d="M44 110c0-30 25-50 56-50s56 20 56 50" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" />
      {/* Nervures de la maille */}
      <g opacity="0.16" stroke="#000" strokeWidth="2" strokeLinecap="round">
        <path d="M64 86v40" /><path d="M80 74v50" /><path d="M120 74v50" /><path d="M136 86v40" />
      </g>
      <text x="100" y="106" textAnchor="middle" fill={ink} fontSize="24" style={wordmark}>
        alo
      </text>
    </svg>
  );
}

/** Visière : bandeau frontal + brim incurvé, logo sur le bandeau. */
function VisorArt({ color }: { color: string }) {
  const ink = inkFor(color);
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[82%] w-[82%] drop-shadow-[0_18px_28px_rgba(31,29,29,0.26)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="visorBrim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="visorBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      {/* Bandeau frontal, profil bas */}
      <path d="M54 110c0-22 20-38 46-38s46 16 46 38v6H54v-6Z" fill="url(#visorBand)" />
      {/* Arête haute du bandeau (la visière est ouverte sur le dessus) */}
      <path d="M56 100c4-18 21-30 44-30s40 12 44 30" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="2.5" />
      {/* Brim : crescent projeté vers l’avant, plus étroit que sur un chapeau */}
      <path d="M36 120c0-5 5-8 11-8h106c6 0 11 3 11 8 0 13-24 21-64 21s-64-8-64-21Z" fill="url(#visorBrim)" />
      <path d="M46 116h108c-2 9-22 15-54 15s-52-6-54-15Z" fill="#fff" opacity="0.07" />
      <text x="100" y="104" textAnchor="middle" fill={ink} fontSize="20" style={wordmark}>
        alo
      </text>
    </svg>
  );
}

/** Paire de chaussettes : tissu dans la couleur choisie, picots antidérapants contrastés. */
function SocksArt({ color }: { color: string }) {
  const ink = inkFor(color);
  const grip = inkFor(color);
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-[86%] w-[86%] drop-shadow-[0_18px_26px_rgba(31,29,29,0.22)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sockBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      {/* Chaussette arrière */}
      <g opacity="0.9" transform="translate(-20 6) scale(0.94)">
        <path d="M68 40h30a6 6 0 0 1 6 6v52c0 9 4 14 12 18l20 10a17 17 0 0 1-15 30l-30-15c-15-8-23-23-23-40V46a6 6 0 0 1 6-6Z" fill="url(#sockBody)" />
        <rect x="62" y="40" width="42" height="12" rx="6" fill={color} />
        <rect x="62" y="40" width="42" height="12" rx="6" fill="#000" opacity="0.1" />
      </g>
      {/* Chaussette avant */}
      <g transform="translate(24 0)">
        <path d="M68 40h30a6 6 0 0 1 6 6v52c0 9 4 14 12 18l20 10a17 17 0 0 1-15 30l-30-15c-15-8-23-23-23-40V46a6 6 0 0 1 6-6Z" fill="url(#sockBody)" />
        <rect x="62" y="40" width="42" height="12" rx="6" fill={color} />
        <rect x="62" y="40" width="42" height="12" rx="6" fill="#000" opacity="0.1" />
        <text x="84" y="82" textAnchor="middle" fill={ink} fontSize="17" style={wordmark}>
          alo
        </text>
        {/* Picots antidérapants */}
        <g fill={grip}>
          <circle cx="92" cy="128" r="3.4" /><circle cx="105" cy="134" r="3.4" />
          <circle cx="88" cy="142" r="3.4" /><circle cx="101" cy="148" r="3.4" />
          <circle cx="116" cy="142" r="3.4" /><circle cx="113" cy="156" r="3.4" />
          <circle cx="99" cy="161" r="3.4" /><circle cx="126" cy="152" r="3.4" />
        </g>
      </g>
    </svg>
  );
}
