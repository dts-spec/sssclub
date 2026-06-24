import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  excursions,
  getExcursionBySlug,
} from "@/content/excursions";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExcursionCard } from "@/components/shared/ExcursionCard";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return excursions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const excursion = getExcursionBySlug(slug);
  if (!excursion) return {};
  return {
    title: `${excursion.name} — Sail, Supper, & Soul Club`,
    description: excursion.tagline,
  };
}

export default async function ExcursionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const excursion = getExcursionBySlug(slug);

  if (!excursion) notFound();

  const isBookable = excursion.status === "now-booking";
  const other = excursions.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-ocean-deep on-dark">
        <Image
          src={excursion.heroImage}
          alt={excursion.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-transparent to-ocean-deep/85" />
        <div className="absolute bottom-0 left-0 right-0 p-[clamp(2rem,5vw,5rem)] pt-32 z-[2] text-white">
          <div className="container-app !px-0">
            <RevealOnScroll>
              <div className="flex items-center gap-3.5 font-mono text-[0.7rem] tracking-[0.32em] uppercase text-gold mb-6 flex-wrap">
                <span className="w-8 h-px bg-gold" />
                <span>{excursion.duration}</span>
                <span className="text-gold/50">·</span>
                <span>{excursion.season}</span>
                <span className="text-gold/50">·</span>
                <span>
                  {excursion.status === "now-booking"
                    ? "Now Booking"
                    : `Launches ${excursion.launchYear}`}
                </span>
              </div>
              <h1 className="font-display font-light text-[clamp(2.5rem,8vw,7rem)] leading-[0.98] tracking-[-0.02em] mb-6 text-white text-balance">
                {excursion.name}
              </h1>
              <p className="font-display italic text-[clamp(1.25rem,2vw,1.75rem)] text-gold-soft max-w-[700px]">
                {excursion.tagline}
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
              {excursion.paragraph}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Waypoints */}
      {excursion.waypoints.length > 0 && (
        <section className="py-[clamp(5rem,11vw,9rem)] bg-ocean text-white on-dark">
          <div className="container-app">
            <RevealOnScroll>
              <div className="mb-[clamp(2.5rem,5vw,4rem)]">
                <div className="eyebrow light mb-6">The Route</div>
                <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.015em]">
                  {excursion.waypoints.length} anchorages,
                  <br />
                  <em className="italic text-gold-soft">one boat between them.</em>
                </h2>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-white/60">
                  <span>Departs {excursion.portOfDeparture}</span>
                  <span className="text-mist">·</span>
                  <span>Returns {excursion.portOfReturn}</span>
                  <span className="text-mist">·</span>
                  <span>Airport: {excursion.airport}</span>
                </div>
              </div>
            </RevealOnScroll>
            <div className="space-y-6">
              {excursion.waypoints.map((w, i) => (
                <RevealOnScroll key={w.name} delay={i * 0.05} as="div">
                  <div className="grid grid-cols-[60px_180px_1fr] md:grid-cols-[80px_240px_1fr] gap-4 md:gap-8 items-baseline py-6 border-b border-white/10">
                    <div className="font-display italic text-gold text-[1.4rem]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.3rem] md:text-[1.5rem] text-white leading-tight">
                        {w.name}
                      </h3>
                      <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-gold-soft mt-1">
                        {w.region}
                      </div>
                    </div>
                    <p className="text-[0.95rem] leading-[1.7] font-light text-white/75 max-w-[560px]">
                      {w.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Itinerary + What's Included */}
      <section className="py-[clamp(5rem,11vw,9rem)] bg-sand">
        <div className="container-app grid lg:grid-cols-[1.4fr_1fr] gap-16">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">Day by Day</div>
              <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean mb-12 tracking-[-0.015em]">
                {excursion.itinerary.length}{" "}
                <em className="italic">stops along the way.</em>
              </h2>
              <div className="space-y-8">
                {excursion.itinerary.map((step, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[140px_1fr] gap-6 pb-8 border-b border-ink/10 last:border-b-0"
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
                {isBookable ? "What's Included" : "When It Opens"}
              </div>
              {isBookable ? (
                <>
                  <div className="font-display italic text-[1.75rem] text-ocean mb-2">
                    {excursion.priceFrom}
                  </div>
                  {excursion.perCouplePrice && (
                    <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft mb-6">
                      Or {excursion.perCouplePrice}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="font-display italic text-[1.75rem] text-ocean mb-2">
                    Launches {excursion.launchYear}
                  </div>
                  <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-soft mb-6">
                    {excursion.season} · {excursion.priceFrom}
                  </div>
                </>
              )}
              <ul className="space-y-3 mb-10 text-[0.95rem] leading-[1.6] text-ink-soft font-light">
                {excursion.included.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-gold mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="dark" className="w-full">
                <Link href={isBookable ? "#book" : "#waitlist"}>
                  {isBookable ? "Reserve This Excursion" : "Join the Waitlist"}
                </Link>
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Add-Ons */}
      {excursion.addOns.length > 0 && (
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
              {excursion.addOns.map((addon, i) => (
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
              <div className="eyebrow mb-6">Other Excursions</div>
              <h2 className="font-display font-normal text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-ocean tracking-[-0.015em]">
                Two more <em className="italic">stretches of water.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {other.map((e) => (
              <ExcursionCard key={e.slug} excursion={e} variant="standard" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
