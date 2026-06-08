import Image from "next/image";
import { destinations } from "@/content/destinations";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { cn } from "@/lib/utils";

/**
 * Destinations section.
 * Editorial alternating layout — image left, text right; then flipped; repeat.
 * Pulls from content/destinations.ts.
 */
export function Destinations() {
  return (
    <section id="destinations" className="py-[clamp(5rem,11vw,10rem)] bg-sand">
      <div className="container-app">
        {/* Head */}
        <div className="grid md:grid-cols-2 gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">Where We Sail</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-ocean">
                Five waters,
                <br />
                <em className="italic">one boat.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[1.125rem] leading-[1.75] font-light text-ink-soft">
              Our Year-One territory is Marina Del Rey to Catalina, with Malibu
              day trips in between. Years Two and Three open Baja and the Sea of
              Cortez; Year Four, the Inside Passage to Vancouver Island.
            </p>
          </RevealOnScroll>
        </div>

        {/* List */}
        <div>
          {destinations.map((destination, i) => {
            const isFlipped = i % 2 === 1;
            return (
              <RevealOnScroll
                key={destination.slug}
                as="article"
                className={cn(
                  "grid gap-8 md:gap-20 items-center py-[clamp(3rem,6vw,5rem)] border-b border-ink/10 last:border-b-0",
                  isFlipped
                    ? "md:grid-cols-[1fr_1.2fr]"
                    : "md:grid-cols-[1.2fr_1fr]"
                )}
              >
                <div
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden group",
                    isFlipped && "md:order-2"
                  )}
                >
                  <Image
                    src={destination.image}
                    alt={`${destination.title.line1} ${destination.title.line2}`}
                    fill
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/30 to-transparent pointer-events-none" />
                  <span className="absolute bottom-5 left-5 font-mono text-[0.6875rem] tracking-[0.2em] text-white/90">
                    {destination.coordinates}
                  </span>
                </div>

                <div className={cn(isFlipped && "md:order-1")}>
                  <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-teal mb-5">
                    — {destination.positionLabel}
                  </div>
                  <h3 className="font-display font-normal text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] text-ocean mb-5 tracking-[-0.02em]">
                    {destination.title.line1}
                    <br />
                    <em className="italic">{destination.title.line2}</em>
                  </h3>
                  <p className="font-display italic text-xl text-gold-deep mb-6">
                    {destination.region}
                  </p>
                  <p className="text-[1.0625rem] leading-[1.75] text-ink-soft font-light mb-8 max-w-[480px]">
                    {destination.description}
                  </p>

                  <div className="grid grid-cols-3 gap-8 mb-8 max-w-md">
                    <div>
                      <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-teal mb-1.5">
                        Sail Time
                      </div>
                      <div className="font-display italic text-[1.1rem] text-ocean">
                        {destination.facts.sailTime}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-teal mb-1.5">
                        Season
                      </div>
                      <div className="font-display italic text-[1.1rem] text-ocean">
                        {destination.facts.season}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-teal mb-1.5">
                        Best For
                      </div>
                      <div className="font-display italic text-[1.1rem] text-ocean">
                        {destination.facts.bestFor}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
