import Image from "next/image";
import Link from "next/link";
import type { Experience, ExperienceLayout } from "@/content/experiences";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  /** Visual layout variant for asymmetric grids */
  layout?: ExperienceLayout;
  /** Optional className override */
  className?: string;
}

const categoryLabels: Record<Experience["category"], string> = {
  supper: "Supper",
  sail: "Sailing",
  wellness: "Wellness",
  events: "Events",
  business: "Business",
  charter: "Charter",
};

/**
 * Card for a single experience.
 *
 * Used in the homepage experiences grid, the /experiences index, and
 * "related experiences" rows on detail pages.
 */
export function ExperienceCard({
  experience,
  layout = "standard",
  className,
}: ExperienceCardProps) {
  const mediaAspect = {
    feature: "aspect-[5/4]",
    standard: "aspect-[4/3]",
    tertiary: "aspect-square",
  }[layout];

  const nameSize = {
    feature: "text-[clamp(1.75rem,3.5vw,2.75rem)]",
    standard: "text-[clamp(1.5rem,2.5vw,2.125rem)]",
    tertiary: "text-[clamp(1.25rem,1.8vw,1.625rem)]",
  }[layout];

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className={cn(
        "group flex flex-col bg-bone text-ink no-underline",
        className
      )}
    >
      {/* Media */}
      <div className={cn("relative overflow-hidden", mediaAspect)}>
        <Image
          src={experience.cardImage}
          alt={experience.name}
          fill
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          sizes={
            layout === "feature"
              ? "(max-width: 1020px) 100vw, 60vw"
              : layout === "standard"
              ? "(max-width: 1020px) 100vw, 45vw"
              : "(max-width: 1020px) 50vw, 33vw"
          }
        />
      </div>

      {/* Body */}
      <div className="pt-6 flex flex-col">
        <div className="flex flex-wrap gap-3 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-teal">
          <span>{categoryLabels[experience.category]}</span>
          <span className="text-mist">·</span>
          <span>{experience.duration}</span>
          {layout === "feature" && (
            <>
              <span className="text-mist">·</span>
              <span>
                {experience.maxGuests === 6 ? "Up to 6" : `${experience.maxGuests} guests`}
              </span>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-between items-baseline gap-4">
          <h3
            className={cn(
              "font-display font-normal leading-[1.1] text-ocean tracking-[-0.01em]",
              nameSize
            )}
          >
            {experience.name}
          </h3>
          <span className="font-display italic text-[1.0625rem] text-gold-deep whitespace-nowrap">
            {experience.priceFrom}
          </span>
        </div>

        <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-soft font-light mb-5">
          {experience.tagline}
        </p>

        <span className="inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ocean transition-all duration-300 group-hover:gap-6">
          {layout === "tertiary" ? "Details" : "See the day"}
          <span className="font-display text-base tracking-normal">→</span>
        </span>
      </div>
    </Link>
  );
}
