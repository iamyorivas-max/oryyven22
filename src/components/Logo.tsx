/**
 * Logotype « alo ».
 * Dessiné en SVG pour rester net à toute taille et remplaçable d’un seul fichier :
 * déposez le logo officiel dans /public/images/logo.svg et échangez ce composant.
 */
export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const fill = tone === "light" ? "#FBF8F5" : "#1F1D1D";
  return (
    <svg viewBox="0 0 96 40" className={className} role="img" aria-label="alo">
      <text
        x="0"
        y="31"
        fill={fill}
        style={{
          fontFamily: "var(--font-logo)",
          fontSize: "38px",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        alo
      </text>
    </svg>
  );
}
