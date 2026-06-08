import { excursions } from "@/content/excursions";
import { roadmap } from "@/content/roadmap";
import { ExcursionCard } from "@/components/shared/ExcursionCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "Excursions — Sail, Supper & Soul Club",
  description:
    "Multi-day destination voyages. Catalina from 2026. Puerto Vallarta and the Inside Passage from 2028. The Greek Islands and BVI from 2029.",
};

export default function ExcursionsIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-bone">
        <div className="container-app">
          <RevealOnScroll>
            <div className="eyebrow mb-8">Excursions · 2026 → 2029</div>
            <h1 className="font-display font-light text-[clamp(3rem,9vw,8rem)] leading-[0.98] tracking-[-0.025em] text-ocean mb-8 text-balance">
              Five destinations.
              <br />
              <em className="italic">Four years.</em>
            </h1>
            <p className="font-display italic text-[clamp(1.25rem,2vw,1.75rem)] text-ink-soft max-w-[820px] leading-[1.4]">
              Catalina opens this season. The boat moves to Puerto Vallarta and
              the Inside Passage in 2028, then to the Mediterranean and Caribbean
              in 2029. Every excursion: six guests, captain and deckhand,
              everything included.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* All excursions */}
      <section className="pb-24 bg-bone">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {excursions.map((e) => (
              <RevealOnScroll key={e.slug} as="div">
                <ExcursionCard excursion={e} variant="standard" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-[clamp(5rem,11vw,9rem)] bg-sand">
        <div className="container-app">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="eyebrow mb-6">The Roadmap</div>
              <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean tracking-[-0.015em]">
                Four years.
                <br />
                <em className="italic">One boat. Five seas.</em>
              </h2>
            </div>
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
                  <p className="text-[0.9375rem] leading-[1.65] font-light text-ink-soft mb-4">
                    {milestone.description}
                  </p>
                  <ul className="space-y-1 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft">
                    {milestone.regions.map((r) => (
                      <li key={r}>· {r}</li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
