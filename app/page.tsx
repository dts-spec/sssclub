import { Hero } from "@/components/sections/Hero";
import { IntroOverlay } from "@/components/shared/IntroOverlay";
import { PressStrip } from "@/components/sections/PressStrip";
import { VoyageScroll } from "@/components/sections/VoyageScroll";
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
 *  3.  VoyageScroll          — the open: a voyage told on scroll
 *  4.  Manifesto             — the thesis
 *  5.  Pillars               — Sail, Supper, Soul
 *  6.  Vessel (+ carousel)   — the object, scrolled through
 *  7.  Experiences           — local offerings out of Marina Del Rey
 *  8.  Excursions            — multi-day destination voyages + roadmap
 *  9.  Donna feature         — wellness pillar in depth
 *  10. Josh feature          — supper pillar in depth
 *  11. ExcursionVideo        — proof of concept
 *  12. Testimonials          — social proof
 *  13. Newsletter            — the long game
 */
export default function HomePage() {
  const donna = practitioners.find((p) => p.slug === "donna")!;
  const josh = practitioners.find((p) => p.slug === "josh")!;

  return (
    <>
      <IntroOverlay />
      <Hero />
      <PressStrip />
      <VoyageScroll />
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
