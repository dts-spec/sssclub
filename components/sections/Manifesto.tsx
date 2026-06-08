import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Editorial manifesto statement. Centered, large display type.
 * Follows the hero + press strip; introduces the brand thesis.
 */
export function Manifesto() {
  return (
    <section className="py-[clamp(5rem,11vw,10rem)] bg-bone text-center">
      <div className="container-app max-w-[1080px]">
        <RevealOnScroll>
          <div className="eyebrow center">An Introduction</div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="my-12 font-display font-light text-[clamp(2rem,5.5vw,4.75rem)] leading-[1.08] tracking-[-0.02em] text-ocean text-balance">
            A quieter kind of <em className="italic text-gold-deep">luxury</em>—
            where the boat goes somewhere, the meals are made by hand, and there
            are{" "}
            <em className="italic text-gold-deep">never more than six of you.</em>
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="max-w-[640px] mx-auto mt-10 text-[1.0625rem] leading-[1.8] text-ink-soft font-light">
            We are not a charter company. Charter is logistics. What we offer is
            the rare collision of slow time on water, considered hospitality, and
            a certified breathwork practice—built for couples who haven&apos;t
            truly disconnected in years, seekers between transitions, and small
            groups who want one experience they&apos;ll keep talking about. Six
            guests is a hard ceiling. We&apos;ve made it the brand.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div
            className="w-px h-16 mx-auto mt-16"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--color-gold), transparent)",
            }}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
