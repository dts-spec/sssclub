import { Hero } from "@/components/sections/Hero";
import { PressStrip } from "@/components/sections/PressStrip";
import { Manifesto } from "@/components/sections/Manifesto";
import { Pillars } from "@/components/sections/Pillars";
import { Vessel } from "@/components/sections/Vessel";
import { Experiences } from "@/components/sections/Experiences";
import { Excursions } from "@/components/sections/Excursions";
import { PractitionerFeature } from "@/components/sections/PractitionerFeature";
import { ExcursionVideo } from "@/components/sections/ExcursionVideo";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { practitioners } from "@/content/practitioners";

/**
 * Homepage.
 *
 * Section order is intentional — sets the editorial pacing:
 *  1.  Hero                  — cinematic intro
 *  2.  PressStrip            — instant trust
 *  3.  Manifesto             — the thesis
 *  4.  Pillars               — Sail, Supper, Soul
 *  5.  Vessel (+ carousel)   — the object, scrolled through
 *  6.  Experiences           — local offerings out of Marina Del Rey
 *  7.  Excursions            — multi-day destination voyages + roadmap
 *  8.  Donna feature         — wellness pillar in depth
 *  9.  Josh feature          — supper pillar in depth
 *  10. ExcursionVideo        — proof of concept
 *  11. Testimonials          — social proof
 *  12. Newsletter            — the long game
 */
export default function HomePage() {
  const donna = practitioners.find((p) => p.slug === "donna")!;
  const josh = practitioners.find((p) => p.slug === "josh")!;

  return (
    <>
      <Hero />
      <PressStrip />
      <Manifesto />
      <Pillars />
      <Vessel />
      <Experiences />
      <Excursions />
      <PractitionerFeature practitioner={donna} />
      <PractitionerFeature practitioner={josh} />
      <ExcursionVideo />
      <Testimonials />
      <Newsletter />
    </>
  );
}
