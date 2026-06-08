import { testimonials } from "@/content/testimonials";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function Testimonials() {
  return (
    <section className="py-[clamp(5rem,11vw,10rem)] bg-ocean-rich text-white relative overflow-hidden on-dark">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(201,169,110,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="container-app relative">
        {/* Head */}
        <div className="grid md:grid-cols-2 gap-16 items-end mb-[clamp(3rem,6vw,5rem)]">
          <RevealOnScroll>
            <div>
              <div className="eyebrow light mb-6">Stories From Aboard</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-white">
                From the
                <br />
                first <em className="italic text-gold">voyagers.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[1.125rem] leading-[1.75] font-light text-white/75">
              Our beta season is ongoing. These are the early voices — couples,
              wellness retreats, friend groups who said yes before the website
              even had a logo.
            </p>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <RevealOnScroll
              key={i}
              delay={i * 0.1}
              as="article"
              className="flex flex-col gap-8 p-10 bg-white/[0.04] border border-white/[0.08]"
            >
              <div className="font-display italic text-[5rem] leading-[0.5] text-gold">
                &ldquo;
              </div>
              <p className="font-display italic font-normal text-[1.2rem] leading-[1.55] text-white/92 flex-1">
                {t.text}
              </p>
              <div className="flex justify-between items-end pt-6 border-t border-white/12">
                <div>
                  <div className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-white mb-1">
                    {t.name}
                  </div>
                  <div className="font-mono text-[0.65rem] tracking-[0.18em] text-white/50">
                    {t.location}
                  </div>
                </div>
                <div className="font-display italic text-[0.95rem] text-gold text-right max-w-[80px]">
                  {t.voyage}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
