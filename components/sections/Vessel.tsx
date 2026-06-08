import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { VideoEmbed } from "@/components/shared/VideoEmbed";
import { VesselCarousel } from "@/components/shared/VesselCarousel";
import { Button } from "@/components/ui/Button";

interface Spec {
  num: string;
  unit?: string;
  label: string;
}

const specs: Spec[] = [
  { num: "51", unit: "ft", label: "Length" },
  { num: "27", unit: "ft", label: "Beam" },
  { num: "6", label: "Guests Maximum" },
  { num: "1", label: "Master Suite" },
];

export function Vessel() {
  return (
    <section
      id="vessel"
      className="py-[clamp(5rem,11vw,10rem)] bg-ocean text-white relative overflow-hidden on-dark"
    >
      {/* Subtle radial gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center right, rgba(201,169,110,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-app relative">
        {/* Head */}
        <div className="grid md:grid-cols-2 gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div>
              <div className="eyebrow light mb-6">The Vessel</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em]">
                A 51-foot Lagoon,
                <br />
                <em className="italic text-gold">cared for like home.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="max-w-[480px] text-[1.0625rem] leading-[1.75] font-light text-white/85">
              French-built, owner-version Lagoon 51. A master suite with its own
              deck, a galley Josh actually cooks in, and 27 feet of beam that
              turns the foredeck into a yoga studio at sunrise. Six guests is
              the ceiling — not by accident.
            </p>
          </RevealOnScroll>
        </div>

        {/* Embedded vessel tour video */}
        <RevealOnScroll>
          <VideoEmbed
            videoId="3TVWXZW1XuU"
            posterSrc="/images/vessel/vessel-aft.jpg"
            posterAlt="Lagoon 51 vessel tour"
            label="Aboard · 3:42"
            className="mb-[clamp(3rem,6vw,5rem)]"
          />
        </RevealOnScroll>

        {/* Specs row */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-[clamp(2rem,4vw,3rem)] border-y border-white/15">
            {specs.map((spec) => (
              <div key={spec.label}>
                <div className="font-display italic font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-gold mb-2.5 tracking-[-0.02em]">
                  {spec.num}
                  {spec.unit && (
                    <sup className="text-[0.45em] align-super ml-0.5 not-italic">
                      {spec.unit}
                    </sup>
                  )}
                </div>
                <div className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-white/55 font-medium">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Carousel — scroll through the spaces */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
              <div>
                <div className="eyebrow light mb-4">A Tour, At Your Pace</div>
                <h3 className="font-display font-normal text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.01em] text-white">
                  Ten spaces,
                  <br />
                  <em className="italic text-gold-soft">scrolled through.</em>
                </h3>
              </div>
              <p className="max-w-[420px] text-[0.95rem] leading-[1.7] font-light text-white/65">
                The aft deck, the helm, the saloon, the galley, the cabins.
                Each one is a different room — and a different reason to slow
                down. Drag the carousel, or use the arrows.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <VesselCarousel />
          </RevealOnScroll>
        </div>

        {/* CTAs */}
        <RevealOnScroll>
          <div className="flex gap-4 mt-[clamp(2.5rem,5vw,4rem)] flex-wrap">
            <Button asChild variant="primary">
              <Link href="/vessel">Tour the Vessel</Link>
            </Button>
            <Button asChild variant="link" className="text-white">
              <Link href="#specs">Download Specifications →</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
