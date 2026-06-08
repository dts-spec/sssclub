import { experiences } from "@/content/experiences";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "Experiences — Sail, Supper & Soul Club",
  description:
    "Seven local offerings out of Marina Del Rey: evening dinners, day sails, breathwork, yoga, business charters, small events, and private buyouts. Always six guests, never more.",
};

export default function ExperiencesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-bone">
        <div className="container-app">
          <RevealOnScroll>
            <div className="eyebrow mb-8">Experiences · Marina Del Rey</div>
            <h1 className="font-display font-light text-[clamp(3rem,9vw,8rem)] leading-[0.98] tracking-[-0.025em] text-ocean mb-8 text-balance">
              Seven ways
              <br />
              to <em className="italic">spend a day.</em>
            </h1>
            <p className="font-display italic text-[clamp(1.25rem,2vw,1.75rem)] text-ink-soft max-w-[820px] leading-[1.4]">
              Dinners, day sails, breathwork, yoga, business charters, small
              events, and private buyouts. Every experience launches from
              Marina Del Rey. Always six guests. Never more.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* All experiences */}
      <section className="pb-32 bg-bone">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {experiences.map((e) => (
              <RevealOnScroll key={e.slug} as="div">
                <ExperienceCard experience={e} layout="standard" />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
