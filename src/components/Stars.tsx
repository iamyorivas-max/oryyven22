import { Star } from "lucide-react";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Note ${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={
            i <= Math.round(rating)
              ? "fill-bordeaux text-bordeaux"
              : "fill-transparent text-sand"
          }
        />
      ))}
    </span>
  );
}
