import Link from "next/link";
import { excursions } from "@/content/excursions";
import { roadmap } from "@/content/roadmap";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExcursionCard } from "@/components/shared/ExcursionCard";
import { Button } from "@/components/ui/Button";

/**
 * Excursions section on the homepage.
 *
 * Multi-day destination voyages, presented as a four-year roadmap.
 * Catalina launches with the brand in 2026. Mexico and the Pacific Northwest
 * open in 2028. The Mediterranean and Caribbean follow in 2029.
 *
 * Visually: featured card for the now-booking Catalina, then a row of the
 * future excursions, then a short roadmap timeline that ties them all together.
 */
export function Excursions() {
  const featured = excursions.find((e) => e.status === "now-booking");
  const upcoming = excursions.filter((e) => e.status !== "now-booking");

  return (
    <section id="excursions" className="py-[clamp(5rem,11vw,10rem)] bg-sand">
      <div className="container-app">
        {/* Head */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">Excursions · 2026 → 2029</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-ocean">
                Five destinations.
                <br />
                <em className="italic">Four years.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[1.125rem] leading-[1.75] font-light text-ink-soft">
              Catalina opens this season. The boat winters in Puerto Vallarta
              starting 2028 and runs a Seattle-to-Campbell-River passage that
              summer. Athens and Tortola follow in 2029. Each excursion is six
              guests, one boat, your choice of buyout or per-couple.
            </p>
          </RevealOnScroll>
        </div>

        {/* Featured — Catalina, now booking */}
        {featured && (
          <div className="mb-[clamp(3rem,6vw,5rem)]">
            <RevealOnScroll>
              <ExcursionCard excursion={featured} variant="featured" />
            </RevealOnScroll>
          </div>
        )}

        {/* Upcoming row — 4 cards in a 2x2 or 4-col grid */}
        {upcoming.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-[clamp(3rem,6vw,5rem)]">
            {upcoming.map((e, i) => (
              <RevealOnScroll key={e.slug} delay={i * 0.08} as="div">
                <ExcursionCard excursion={e} variant="standard" />
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Roadmap timeline */}
        <div className="border-t border-ink/10 pt-[clamp(2.5rem,5vw,4rem)]">
          <RevealOnScroll>
            <div className="eyebrow mb-8">The Roadmap</div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {roadmap.map((milestone, i) => (
              <RevealOnScroll key={milestone.year} delay={i * 0.08} as="div">
                <div className="border-t-2 border-gold pt-5">
                  <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-gold-deep mb-3">
                    {milestone.status === "now"
                      ? "Now · " + milestone.year
                      : milestone.status === "next"
                      ? "Next · " + milestone.year
                      : milestone.year}
                  </div>
                  <h3 className="font-display font-normal text-[1.5rem] md:text-[1.75rem] leading-[1.1] text-ocean mb-3">
                    {milestone.title.line1}
                    <br />
                    <em className="italic">{milestone.title.line2}</em>
                  </h3>
                  <p className="text-[0.9375rem] leading-[1.65] font-light text-ink-soft">
                    {milestone.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealOnScroll>
          <div className="flex justify-center mt-[clamp(3rem,6vw,5rem)]">
            <Button asChild variant="dark">
              <Link href="/excursions">All five excursions →</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
