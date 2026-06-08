import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { VideoEmbed } from "@/components/shared/VideoEmbed";

/**
 * Excursion video section.
 * Embedded YouTube clip of a Catalina-style voyage to give viewers
 * a tangible sense of what they're booking.
 */
export function ExcursionVideo() {
  return (
    <section className="py-[clamp(5rem,11vw,10rem)] bg-bone">
      <div className="container-app">
        <div className="grid md:grid-cols-2 gap-16 items-end mb-12">
          <RevealOnScroll>
            <div>
              <div className="eyebrow mb-6">A Closer Look</div>
              <h2 className="font-display font-normal text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.015em] text-ocean">
                What a Catalina
                <br />
                <em className="italic">weekend looks like.</em>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-[1.125rem] leading-[1.75] font-light text-ink-soft">
              Three days, two nights, six guests aboard. Below is the kind of
              voyage a Catalina excursion produces — filmed on a recent passage
              from Marina Del Rey to Avalon and Two Harbors.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll>
          <VideoEmbed
            videoId="PNvn94prPZs"
            posterSrc="/images/excursion/poster.jpg"
            posterAlt="Catalina excursion film"
            label="Catalina Excursion · 4:12"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
