import { practitioners } from "@/content/practitioners";
import { PractitionerFeature } from "@/components/sections/PractitionerFeature";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "Our Story — Sail, Supper, & Soul Club",
  description: "Donna and Josh Otten. Twenty-two years together.",
};

export default function OurStoryPage() {
  const donna = practitioners.find((p) => p.slug === "donna")!;
  const josh = practitioners.find((p) => p.slug === "josh")!;

  return (
    <>
      <section className="pt-40 pb-20 bg-bone">
        <div className="container-app max-w-[900px]">
          <RevealOnScroll>
            <div className="eyebrow mb-8">Our Story</div>
            <h1 className="font-display font-light text-[clamp(3rem,9vw,8rem)] leading-[0.98] tracking-[-0.025em] text-ocean mb-12 text-balance">
              Twenty-two years,
              <br />
              <em className="italic">and counting.</em>
            </h1>
            <p className="font-display italic font-light text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.45] text-ocean">
              We started Sail, Supper, &amp; Soul Club because everyone we know
              was telling us they couldn&apos;t remember the last time they
              actually rested. We thought we could fix that, six guests at a
              time.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <PractitionerFeature practitioner={donna} />
      <PractitionerFeature practitioner={josh} />
    </>
  );
}
