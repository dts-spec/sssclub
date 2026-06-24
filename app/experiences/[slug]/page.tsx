import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  experiences,
  getExperienceBySlug,
} from "@/content/experiences";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExperienceCard } from "@/components/shared/ExperienceCard";
import { Button } from "@/components/ui/Button";

/**
 * Static params: pre-render every experience detail page at build time.
 */
export async function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  if (!experience) return {};
  return {
    title: `${experience.name} — Sail, Supper, & Soul Club`,
    description: experience.tagline,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) notFound();

  const other = experiences.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-ocean-deep on-dark">
        <Image
          src={experience.heroImage}
          alt={experience.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-transparent to-ocean-deep/85" />
        <div className="absolute bottom-0 left-0 right-0 p-[clamp(2rem,5vw,5rem)] pt-32 z-[2] text-white">
          <div className="container-app !px-0">
            <RevealOnScroll>
              <div className="flex items-center gap-3.5 font-mono text-[0.7rem] tracking-[0.32em] uppercase text-gold mb-6">
                <span className="w-8 h-px bg-gold" />
                {experience.duration} · {experience.departurePort}
              </div>
              <h1 className="font-display font-light text-[clamp(2.5rem,8vw,7rem)] leading-[0.98] tracking-[-0.02em] mb-6 text-white text-balance">
                {experience.name}
              </h1>
              <p className="font-display italic text-[clamp(1.25rem,2vw,1.75rem)] text-gold-soft max-w-[700px]">
                {experience.tagline}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-[clamp(5rem,11vw,9rem)] bg-bone">
        <div className="container-app max-w-[900px]">
          <RevealOnScroll>
            <p className="font-display italic font-light text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.45] text-ocean tracking-[-0.005em]">
              {experience.paragraph}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Itinerary + What's Included */}
      <section className="py-[clamp(5rem,11vw,9rem)] bg-sand">
        <div className="container-app grid lg:grid-cols-[1.4fr_1fr] gap-16">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">The Day</div>
              <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean mb-12 tracking-[-0.015em]">
                Hour by hour,
                <br />
                <em className="italic">step by step.</em>
              </h2>
              <div className="space-y-8">
                {experience.itinerary.map((step, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[120px_1fr] gap-6 pb-8 border-b border-ink/10 last:border-b-0"
                  >
                    <div className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-gold-deep pt-1">
                      {step.time}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.4rem] text-ocean mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[0.95rem] leading-[1.7] text-ink-soft font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="lg:sticky lg:top-32 bg-bone p-10 border border-ink/10">
              <div className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-gold-deep mb-4">
                What&apos;s Included
              </div>
              <div className="font-display italic text-[1.75rem] text-ocean mb-2">
                {experience.priceFrom}
              </div>
              {experience.buyoutPrice && (
                <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft mb-6">
                  {experience.buyoutPrice}
                </div>
              )}
              <ul className="space-y-3 mb-10 text-[0.95rem] leading-[1.6] text-ink-soft font-light">
                {experience.included.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-gold mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="dark" className="w-full">
                <Link href="#book">Reserve This Experience</Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Add-Ons */}
      {experience.addOns.length > 0 && (
        <section className="py-[clamp(5rem,11vw,9rem)] bg-bone">
          <div className="container-app">
            <RevealOnScroll>
              <div className="mb-12">
                <div className="eyebrow mb-6">Optional Additions</div>
                <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean tracking-[-0.015em]">
                  Make it <em className="italic">yours.</em>
                </h2>
              </div>
            </RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-6">
              {experience.addOns.map((addon, i) => (
                <RevealOnScroll
                  key={addon.name}
                  delay={i * 0.05}
                  as="div"
                  className="p-8 bg-sand"
                >
                  <div className="flex justify-between items-baseline mb-3 gap-4">
                    <h3 className="font-display text-[1.5rem] text-ocean">
                      {addon.name}
                    </h3>
                    <span className="font-display italic text-[1.1rem] text-gold-deep whitespace-nowrap">
                      {addon.price}
                    </span>
                  </div>
                  <p className="text-[0.95rem] leading-[1.65] text-ink-soft font-light">
                    {addon.description}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="py-[clamp(5rem,11vw,9rem)] bg-sand">
        <div className="container-app">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="eyebrow mb-6">You Might Also Consider</div>
              <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean tracking-[-0.015em]">
                Two more <em className="italic">days at sea.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {other.map((e) => (
              <ExperienceCard key={e.slug} experience={e} layout="standard" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
