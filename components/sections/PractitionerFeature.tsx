import Image from "next/image";
import Link from "next/link";
import type { Practitioner } from "@/content/practitioners";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PractitionerFeatureProps {
  practitioner: Practitioner;
}

/**
 * Full-bleed practitioner feature.
 * Used for both Donna and Josh sections — same template, different data,
 * dark/light variant determined by the practitioner data.
 *
 * Structure:
 * 1. Hero — full-bleed portrait with overlaid headline
 * 2. Content — pull quote left, body + credentials right
 * 3. CTA strip — closing line + reserve button
 */
export function PractitionerFeature({ practitioner }: PractitionerFeatureProps) {
  const isDark = practitioner.variant === "dark";

  return (
    <section
      id={practitioner.slug}
      className={cn(
        "relative overflow-hidden",
        isDark ? "bg-ocean text-white on-dark" : "bg-bone-warm text-ink"
      )}
    >
      {/* HERO */}
      <div className="relative h-[90vh] min-h-[640px] overflow-hidden">
        <Image
          src={practitioner.image}
          alt={`${practitioner.title.line1} ${practitioner.title.line2}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className={cn(
            "absolute inset-0",
            isDark
              ? "bg-gradient-to-b from-ocean-deep/35 via-transparent to-ocean-deep/80"
              : "bg-gradient-to-b from-ink/20 via-transparent to-ink/50"
          )}
        />

        <div className="absolute bottom-0 left-0 right-0 p-[clamp(1.5rem,4vw,4rem)] z-[2] text-white">
          <div className="container-app !px-0 max-w-[1440px]">
            <RevealOnScroll>
              <div className="flex items-center gap-3.5 font-mono text-[0.7rem] tracking-[0.32em] uppercase text-gold mb-6">
                <span className="w-8 h-px bg-gold" />
                {practitioner.pillarLabel}
              </div>
              <h2 className="font-display font-light text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.02em] mb-6 text-balance text-white">
                {practitioner.title.line1}
                <br />
                with{" "}
                <em className="italic text-gold-soft">
                  {practitioner.title.line2}
                </em>
              </h2>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-[clamp(5rem,11vw,8rem)]">
        <div className="container-app grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-24 items-start">
          <RevealOnScroll>
            <div>
              <div
                className={cn(
                  "font-mono text-[0.7rem] tracking-[0.28em] uppercase mb-6",
                  isDark ? "text-gold" : "text-gold-deep"
                )}
              >
                {practitioner.slug === "donna"
                  ? "Meet the Practitioner"
                  : "Meet the Cook"}
              </div>
              <p
                className={cn(
                  "font-display italic font-normal text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.4] tracking-[-0.005em] mb-8",
                  isDark ? "text-white" : "text-ocean"
                )}
              >
                &ldquo;{practitioner.quote}&rdquo;
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div
              className={cn(
                "text-[1.0625rem] leading-[1.85] font-light",
                isDark ? "text-white/85" : "text-ink-soft"
              )}
            >
              {practitioner.body.map((para, i) => (
                <p key={i} className="mb-6 last:mb-0">
                  {para}
                </p>
              ))}

              {/* Credentials grid */}
              <div
                className={cn(
                  "grid grid-cols-2 gap-6 mt-12 pt-10 border-t",
                  isDark ? "border-white/15" : "border-ink/10"
                )}
              >
                {practitioner.credentials.map((cred) => (
                  <div key={cred.label}>
                    <div
                      className={cn(
                        "font-mono text-[0.65rem] tracking-[0.18em] uppercase mb-2",
                        isDark ? "text-gold" : "text-gold-deep"
                      )}
                    >
                      {cred.label}
                    </div>
                    <div
                      className={cn(
                        "font-display italic text-[1.1rem] leading-[1.4]",
                        isDark ? "text-white" : "text-ocean"
                      )}
                    >
                      {cred.value.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* CTA strip */}
      <div
        className={cn(
          "py-[clamp(4rem,8vw,7rem)] text-center",
          isDark ? "bg-ocean-deep" : "bg-sand-deep"
        )}
      >
        <h3
          className={cn(
            "font-display italic font-light text-[clamp(2rem,5vw,4rem)] leading-[1.1] max-w-[800px] mx-auto mb-10 tracking-[-0.015em]",
            isDark ? "text-white" : "text-ocean"
          )}
        >
          {practitioner.ctaTitle.line1}
          <br />
          {practitioner.ctaTitle.line2}
        </h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild variant={isDark ? "primary" : "dark"}>
            <Link href="#book">Reserve a Voyage</Link>
          </Button>
          <Button asChild variant={isDark ? "ghost" : "link"}>
            <Link href={isDark ? "#newsletter" : "#menus"}>
              {isDark ? "Be in the Know" : "See Sample Menus"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
