import Image from "next/image";
import type { Product } from "@/data/products";

/**
 * Rendu du visuel produit.
 *
 * — Si `product.image` est défini, le fichier de /public/images/ est utilisé tel quel
 *   (cadrage via object-fit / object-position, aucune retouche).
 * — Sinon, un rendu 3D sculpté en CSS prend le relais, dans la couleur réelle
 *   de la variante sélectionnée. Chaque bloc `art` est remplaçable indépendamment
 *   par un visuel HD sans toucher au reste du code.
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
        className={align === "bottom" ? "object-contain object-bottom" : "object-contain object-center"}
      />
    );
  }

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

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

const glow = "rgba(255,255,255,0.35)";

/** Sac tote — corps structuré + anses */
function BagArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-[78%] w-[78%] drop-shadow-[0_18px_26px_rgba(28,26,25,0.28)]" aria-hidden="true">
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M62 62h76a10 10 0 0 1 10 9l8 86a12 12 0 0 1-12 13H56a12 12 0 0 1-12-13l8-86a10 10 0 0 1 10-9Z" fill="url(#bagBody)" />
      <path d="M62 62h76a10 10 0 0 1 10 9l1 8H51l1-8a10 10 0 0 1 10-9Z" fill={glow} opacity="0.25" />
      <path d="M76 66V50a24 24 0 0 1 48 0v16" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
      <path d="M76 66V50a24 24 0 0 1 48 0v16" fill="none" stroke={glow} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <rect x="86" y="120" width="28" height="8" rx="4" fill={glow} opacity="0.3" />
    </svg>
  );
}

/** Bandeau large en maille côtelée */
function HeadbandArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-[76%] w-[76%] drop-shadow-[0_16px_24px_rgba(28,26,25,0.22)]" aria-hidden="true">
      <defs>
        <linearGradient id="bandBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="30%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M100 42c34 0 62 22 62 46 0 12-7 20-18 20-14 0-18-14-44-14s-30 14-44 14c-11 0-18-8-18-20 0-24 28-46 62-46Z" fill="url(#bandBody)" />
      <g opacity="0.28" stroke="#000" strokeWidth="2" strokeLinecap="round">
        <path d="M62 76 58 100" /><path d="M78 66 74 96" /><path d="M100 62v32" />
        <path d="M122 66l4 30" /><path d="M138 76l4 24" />
      </g>
      <path d="M100 42c34 0 62 22 62 46" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" />
    </svg>
  );
}

/** Visière : bandeau + casquette courbée */
function VisorArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-[76%] w-[76%] drop-shadow-[0_16px_26px_rgba(28,26,25,0.26)]" aria-hidden="true">
      <defs>
        <linearGradient id="visorBrim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M30 118c0-30 30-52 70-52s70 22 70 52c0 8-8 12-16 9-18-7-34-11-54-11s-36 4-54 11c-8 3-16-1-16-9Z" fill="url(#visorBrim)" />
      <path d="M52 92c14-10 30-15 48-15s34 5 48 15" fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <path d="M46 122c16-7 34-11 54-11s38 4 54 11l3 13c-18-8-37-12-57-12s-39 4-57 12Z" fill={color} opacity="0.85" />
      <ellipse cx="100" cy="70" rx="10" ry="5" fill="#fff" opacity="0.25" />
    </svg>
  );
}

/** Chaussettes antidérapantes : couleur du tissu + picots toujours noirs */
function SocksArt({ color }: { color: string }) {
  const isDark = color.toLowerCase() === "#1c1a19";
  const gripColor = isDark ? "#EDE3D2" : "#1C1A19";
  return (
    <svg viewBox="0 0 200 200" className="h-[78%] w-[78%] drop-shadow-[0_16px_24px_rgba(28,26,25,0.22)]" aria-hidden="true">
      <defs>
        <linearGradient id="sockBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="35%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <path d="M70 38h34a8 8 0 0 1 8 8v56c0 10 5 15 14 20l20 11a20 20 0 0 1-18 36l-42-22c-16-9-24-24-24-42V46a8 8 0 0 1 8-8Z" fill="url(#sockBody)" />
      <rect x="62" y="38" width="50" height="14" rx="7" fill={color} />
      <rect x="62" y="38" width="50" height="14" rx="7" fill="#000" opacity="0.12" />
      <g fill={gripColor}>
        <circle cx="104" cy="132" r="4" /><circle cx="118" cy="140" r="4" />
        <circle cx="98" cy="148" r="4" /><circle cx="114" cy="156" r="4" />
        <circle cx="130" cy="150" r="4" /><circle cx="128" cy="164" r="4" />
      </g>
    </svg>
  );
}
