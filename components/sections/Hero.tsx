"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { easings } from "@/lib/tokens";

/**
 * Hero section.
 *
 * Full-bleed YouTube background video (Lagoon 51 footage), static poster
 * fallback while it loads, animated word-by-word headline reveal.
 *
 * To swap the background video:
 * - Replace `HERO_VIDEO_ID` with another YouTube ID.
 * - Or replace with an MP4 in /public/videos/ and swap iframe for <video>.
 */

const HERO_VIDEO_ID = "3TVWXZW1XuU"; // Lagoon 51 video (user-provided)

const HERO_HEADLINE_WORDS = ["Coastal", "restoration,", "six guests at a time."];

export function Hero() {
  return (
    <section className="relative h-screen min-h-[720px] max-h-[1100px] overflow-hidden bg-ocean-deep flex items-end on-dark">
      {/* Static poster while video loads */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(6,24,41,0.35) 0%, rgba(6,24,41,0.25) 40%, rgba(6,24,41,0.75) 100%),
            url('/images/hero/catamaran-aerial.jpg')
          `,
        }}
      />

      {/* Background YouTube video */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1`}
          title="Lagoon 51 at sea"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-screen min-h-[56.25vw] border-0 pointer-events-none"
          allow="autoplay; encrypted-media; fullscreen"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,24,41,0.25) 0%, rgba(6,24,41,0.15) 30%, rgba(6,24,41,0.7) 100%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[3] opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-[4] w-full px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(3rem,7vw,6rem)] text-white">
        <div className="container-app !px-0 max-w-[1440px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2, ease: easings.premium }}
            className="flex items-center gap-3.5 font-mono text-[0.7rem] font-medium tracking-[0.32em] uppercase text-gold mb-[clamp(1.5rem,3vw,2.5rem)]"
          >
            <span className="w-9 h-px bg-gold" />
            Marina Del Rey · California · Est. 2026
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <h1 className="font-display font-light text-[clamp(3rem,10.5vw,10rem)] leading-[0.95] tracking-[-0.025em] mb-[clamp(1.5rem,2.5vw,2rem)] text-balance">
            {HERO_HEADLINE_WORDS.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`inline-block ${i === 1 ? "italic text-gold-soft" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 1.4 + i * 0.15,
                    duration: 1.6,
                    ease: easings.premium,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Foot: tagline + CTAs separated by hairline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1.2, ease: easings.premium }}
            className="flex justify-between items-end flex-wrap gap-10 mt-[clamp(2rem,4vw,4rem)] pt-[clamp(1.5rem,3vw,2.5rem)] border-t border-white/20"
          >
            <p className="max-w-[480px] text-base font-light leading-[1.7] text-white/90">
              Slow voyages from Marina Del Rey aboard a 51-foot catamaran.
              Considered meals from Josh&apos;s galley. Breathwork at sea with Donna.
              Never crowded. Never rushed.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Button asChild variant="primary">
                <Link href="#voyages">View Voyages</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#book">Hold a Date</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1, ease: easings.premium }}
        className="absolute bottom-8 left-[clamp(1.5rem,4vw,4rem)] z-[4] hidden sm:flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-white/60"
      >
        <div className="relative w-[60px] h-px bg-white/40 overflow-hidden">
          <div
            className="absolute inset-0 bg-gold"
            style={{
              animation: "scrollLine 3s cubic-bezier(0.16, 1, 0.3, 1) infinite",
              transform: "translateX(-100%)",
            }}
          />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
