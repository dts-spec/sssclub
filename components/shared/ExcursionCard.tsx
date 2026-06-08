import Image from "next/image";
import Link from "next/link";
import type { Excursion, ExcursionStatus } from "@/content/excursions";
import { cn } from "@/lib/utils";

interface ExcursionCardProps {
  excursion: Excursion;
  /** Visual variant — "featured" gets a larger card */
  variant?: "featured" | "standard";
  /** Optional className override */
  className?: string;
}

const statusLabels: Record<ExcursionStatus, string> = {
  "now-booking": "Now Booking",
  "coming-soon": "Coming 2028",
  future: "Year 2029",
};

const statusColor: Record<ExcursionStatus, string> = {
  "now-booking": "text-gold",
  "coming-soon": "text-mist",
  future: "text-mist-soft",
};

/**
 * Card for a single multi-day excursion.
 *
 * Excursion cards lead with region and status (Now / 2028 / 2029) instead
 * of pricing, since the long-distance offerings are sold on the destination
 * narrative first and the calendar second.
 */
export function ExcursionCard({
  excursion,
  variant = "standard",
  className,
}: ExcursionCardProps) {
  const isFeatured = variant === "featured";
  const isBookable = excursion.status === "now-booking";

  return (
    <Link
      href={`/excursions/${excursion.slug}`}
      className={cn(
        "group flex flex-col bg-bone text-ink no-underline",
        className
      )}
    >
      {/* Media */}
      <div
        className={cn(
          "relative overflow-hidden",
          isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={excursion.cardImage}
          alt={excursion.name}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          sizes={isFeatured ? "(max-width: 1020px) 100vw, 70vw" : "(max-width: 1020px) 100vw, 45vw"}
        />
        {!isBookable && (
          <div className="absolute inset-0 bg-ocean-deep/30" />
        )}
        {/* Status pill */}
        <div className="absolute top-5 left-5">
          <span
            className={cn(
              "font-mono text-[0.65rem] font-medium tracking-[0.22em] uppercase px-3 py-1.5 bg-ocean-deep/85 backdrop-blur-sm",
              statusColor[excursion.status]
            )}
          >
            {statusLabels[excursion.status]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="pt-6 flex flex-col">
        <div className="flex gap-4 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-teal">
          <span>{excursion.duration}</span>
          <span className="text-mist">·</span>
          <span>Up to {excursion.maxGuests}</span>
          {isFeatured && (
            <>
              <span className="text-mist">·</span>
              <span>{excursion.season}</span>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-between items-baseline gap-4">
          <h3
            className={cn(
              "font-display font-normal leading-[1.1] text-ocean tracking-[-0.01em]",
              isFeatured
                ? "text-[clamp(2rem,4vw,3.25rem)]"
                : "text-[clamp(1.5rem,2.5vw,2.125rem)]"
            )}
          >
            {excursion.name}
          </h3>
          {isBookable && (
            <span className="font-display italic text-[1.0625rem] text-gold-deep whitespace-nowrap">
              {excursion.priceFrom}
            </span>
          )}
        </div>

        <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft font-light mb-5">
          {excursion.tagline}
        </p>

        {/* Waypoint preview */}
        {isFeatured && excursion.waypoints.length > 0 && (
          <div className="mb-5 pb-5 border-b border-ink/10 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ink-soft">
            {excursion.waypoints.slice(0, 4).map((w, i) => (
              <span key={w.name} className="flex items-center gap-3">
                {i > 0 && <span className="text-mist">→</span>}
                <span>{w.name}</span>
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ocean transition-all duration-300 group-hover:gap-6">
          {isBookable ? "View the route" : "Preview the route"}
          <span className="font-display text-base tracking-normal">→</span>
        </span>
      </div>
    </Link>
  );
}
