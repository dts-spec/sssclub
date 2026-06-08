import { experiences } from "@/content/experiences";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

/**
 * Experiences section on the homepage.
 *
 * Local, present-tense offerings out of Marina Del Rey — dinners, day sails,
 * breathwork, yoga, business charters, small events, and private buyouts.
 * Anything you can do on the boat without flying somewhere.
 *
 * For multi-day destination trips, see the Excursions section below.
 */
export function Experiences() {
  // The first 7 experiences in display order — feature, then standard, then tertiary
  const feature = experiences.find((e) => e.homepageLayout === "feature");
  const standards = experiences.filter((e) => e.homepageLayout === "standard");
  const tertiaries = experiences.filter((e) => e.homepageLayout === "tertiary");

  return (
    <section id="experiences" className="py-[clamp(5rem,11vw,10rem)] bg-bone">
      <div className="container-app">
        {/* Head */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">Experiences · Marina Del Rey</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-ocean">
                Seven ways
                <br />
                to spend <em className="italic">a day.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[1.125rem] leading-[1.75] font-light text-ink-soft">
              Dinners, sails, breathwork, yoga, business charters, small events,
              private buyouts. Every experience launches from Marina Del Rey, runs
              the same day, and never carries more than six guests.
            </p>
          </RevealOnScroll>
        </div>

        {/* Feature row — single hero card */}
        {feature && (
          <div className="mb-8 md:mb-12">
            <RevealOnScroll>
              <ExperienceCard experience={feature} layout="feature" />
            </RevealOnScroll>
          </div>
        )}

        {/* Standard row — 2 medium cards */}
        {standards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
            {standards.map((e, i) => (
              <RevealOnScroll key={e.slug} delay={i * 0.08} as="div">
                <ExperienceCard experience={e} layout="standard" />
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Tertiary row — 4 compact cards */}
        {tertiaries.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {tertiaries.map((e, i) => (
              <RevealOnScroll key={e.slug} delay={i * 0.06} as="div">
                <ExperienceCard experience={e} layout="tertiary" />
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* CTA */}
        <RevealOnScroll>
          <div className="flex justify-center mt-[clamp(3rem,6vw,5rem)]">
            <Button asChild variant="dark">
              <Link href="/experiences">All seven experiences →</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
