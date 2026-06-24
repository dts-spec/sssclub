import Image from "next/image";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Parallax } from "@/components/shared/Parallax";

interface Pillar {
  num: string;
  tag: string;
  name: string;
  blurb: string;
  image: string;
  alt: string;
}

const pillars: Pillar[] = [
  {
    num: "— 01",
    tag: "First Pillar",
    name: "Sail",
    blurb:
      "Slow, sun-led time on the open Pacific. The captain handles it. You read, you nap, you watch the coast slide by.",
    image:
      "/images/pillars/sail.jpg",
    alt: "Catamaran under sail at golden hour",
  },
  {
    num: "— 02",
    tag: "Second Pillar",
    name: "Supper",
    blurb:
      "Multi-course meals from Josh's galley. Mediterranean or Japanese. Wine pairings on request. Always at golden hour.",
    image:
      "/images/pillars/supper.jpg",
    alt: "Plated multi-course meal aboard",
  },
  {
    num: "— 03",
    tag: "Third Pillar",
    name: "Soul",
    blurb:
      "Donna's breathwork, Pilates, and meditation practice—integrated into voyages, not bolted on. Fifteen years of credentialed instruction.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    alt: "Breathwork meditation pose at sunrise",
  },
];

export function Pillars() {
  return (
    <section
      id="pillars"
      className="bg-bone pb-[clamp(5rem,10vw,9rem)]"
    >
      {/* Head */}
      <div className="container-app grid md:grid-cols-2 gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
        <RevealOnScroll>
          <div>
            <div className="eyebrow mb-6">The Three Things</div>
            <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-ocean">
              Done <em className="italic">well,</em>
              <br />
              three at a time.
            </h2>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="text-[1.125rem] leading-[1.75] font-light text-ink-soft">
            The name is the menu. Each pillar is led by someone credentialed,
            considered, and present. There is no mass-market version of this.
          </p>
        </RevealOnScroll>
      </div>

      {/* Grid */}
      <div className="container-app grid md:grid-cols-3 gap-4 md:gap-8">
        {pillars.map((pillar, i) => (
          <RevealOnScroll key={pillar.name} delay={i * 0.1}>
            <article className="relative overflow-hidden cursor-pointer group bg-ocean">
              <Parallax distance={40} className="aspect-[4/5]">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Parallax>

              {/* Shade gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-0 p-[clamp(1.5rem,3vw,2.5rem)] flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] text-gold">
                    {pillar.num}
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-white/70 uppercase">
                    {pillar.tag}
                  </span>
                </div>
                <div className="max-w-[280px]">
                  <h3 className="font-display italic font-light text-[clamp(3rem,5vw,5rem)] leading-[0.95] mb-4 text-white tracking-[-0.01em]">
                    {pillar.name}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.55] font-light text-white/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-2 opacity-85 group-hover:translate-y-0 group-hover:opacity-100">
                    {pillar.blurb}
                  </p>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
