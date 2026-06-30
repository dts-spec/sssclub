import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Mission statement — a single clean line on bone, centered, with a small star
 * accent above. Mirrors thebendclub.com's introductory statement: who we are,
 * where, and what we're for, in one breath.
 */
export function Manifesto() {
  return (
    <section className="py-[clamp(5rem,12vw,11rem)] bg-bone text-center">
      <div className="container-app max-w-[960px]">
        <RevealOnScroll>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="mx-auto h-5 w-5 text-gold"
            fill="currentColor"
          >
            <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" />
          </svg>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mt-9 font-display font-light text-[clamp(1.6rem,3.9vw,3.1rem)] leading-[1.22] tracking-[-0.01em] text-ocean text-balance">
            Anchored in Marina Del Rey, the Sail, Supper &amp; Soul Club offers
            private access to a{" "}
            <em className="italic text-gold-deep">luxury catamaran</em> — designed
            for restorative days on the water, romantic staycations, weekend
            getaways, corporate off-sites, and multi-course omakase dinners at
            the water&apos;s edge.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div
            className="mx-auto mt-14 h-16 w-px"
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
