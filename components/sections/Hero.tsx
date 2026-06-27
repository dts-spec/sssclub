"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { offers } from "@/content/offers";
import { easings } from "@/lib/tokens";
import { introReveal } from "@/lib/intro";

/**
 * Hero section.
 *
 * A full-bleed rotating banner where the image AND the copy advance together —
 * each slide showcases one offer (the dinner party, the reset, the pitch, the
 * romantic getaway, the Catalina staycation). Parallax / scroll-out treatment
 * carries it into the voyage section below.
 *
 * The offers live in content/offers.ts. The Hero owns the rotation index and
 * hands it to <HeroBanner> so imagery and text never drift out of sync.
 */

/** How long each offer holds before advancing, in ms. */
const HOLD_MS = 6000;

/** Render a headline with one gold-soft italic word for emphasis. */
function renderTitle(title: string, emphasis: string): ReactNode {
  if (!emphasis || !title.includes(emphasis)) return title;
  const [before, after] = title.split(emphasis);
  return (
    <>
      {before}
      <em className="italic text-gold-soft">{emphasis}</em>
      {after}
    </>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [copyIn, setCopyIn] = useState(false);

  // Advance the offers — but only once the intro has handed off, so the carousel
  // stays on its first frame (the image the intro zooms to) until the reveal.
  // Paused under reduced motion.
  useEffect(() => {
    if (prefersReduced || !copyIn) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % offers.length),
      HOLD_MS
    );
    return () => clearInterval(id);
  }, [prefersReduced, copyIn]);

  // Animate the hero copy in when the intro reveals (the last image zooming to
  // fill). Shows immediately if there's no intro / reduced motion; a fallback
  // timer guarantees it can never stay hidden.
  useEffect(() => {
    if (prefersReduced || introReveal.done()) {
      setCopyIn(true);
      return;
    }
    const unsub = introReveal.subscribe(() => setCopyIn(true));
    const fallback = setTimeout(() => setCopyIn(true), 13000);
    return () => {
      unsub();
      clearTimeout(fallback);
    };
  }, [prefersReduced]);

  // Scroll-linked parallax: the background drifts and zooms slowly while the
  // content lifts away and fades — a cinematic handoff into the voyage section.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const offer = offers[index];

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[720px] max-h-[1100px] overflow-hidden bg-ocean-deep flex items-end on-dark"
    >
      {/* Parallax background stack (rotating banner → gradient → grain) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
      >
        {/* Rotating image banner — synced to the offer index. `revealed` holds
            the Ken-Burns zoom until the intro hands off, so the takeover is seamless. */}
        <HeroBanner index={index} revealed={copyIn} />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,24,41,0.30) 0%, rgba(6,24,41,0.20) 30%, rgba(6,24,41,0.78) 100%)",
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-[4] w-full px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(3rem,7vw,6rem)] text-white"
        style={prefersReduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="container-app !px-0 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={copyIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 1.0, ease: easings.premium }}
          >
          {/* Rotating offer: eyebrow → headline → blurb */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: easings.premium }}
            >
              {/* Eyebrow — offer name (+ stars for the staycation) */}
              <div className="flex items-center gap-3.5 font-mono text-[0.7rem] font-medium tracking-[0.32em] uppercase text-gold mb-[clamp(1.25rem,2.5vw,2rem)]">
                <span className="w-9 h-px bg-gold" />
                <span>{offer.name}</span>
                {offer.stars && (
                  <span className="tracking-[0.25em] text-gold-soft" aria-label="Five stars">
                    ★★★★★
                  </span>
                )}
              </div>

              {/* Headline */}
              <h1 className="font-display font-light text-[clamp(2.75rem,8vw,7rem)] leading-[0.98] tracking-[-0.025em] text-balance max-w-[15ch]">
                {renderTitle(offer.title, offer.emphasis)}
              </h1>

              {/* Blurb */}
              <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[520px] text-[1.0625rem] font-light leading-[1.7] text-white/90">
                {offer.blurb}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Fixed foot: location + CTAs, separated by a hairline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: easings.premium }}
            className="flex justify-between items-end flex-wrap gap-8 mt-[clamp(2rem,4vw,3.5rem)] pt-[clamp(1.5rem,3vw,2.5rem)] border-t border-white/20"
          >
            <div className="font-mono text-[0.7rem] tracking-[0.28em] uppercase text-white/60">
              Marina Del Rey · California · Six guests
            </div>
            <div className="flex gap-3.5 flex-wrap">
              <Button asChild variant="primary">
                <Link href="#voyages">View Voyages</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#book">Hold a Date</Link>
              </Button>
            </div>
          </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: easings.premium }}
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
