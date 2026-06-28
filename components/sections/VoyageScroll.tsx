"use client";

import { Fragment, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * VoyageScroll — the day aboard, told as you scroll.
 *
 * A split section in the manner of thebendclub.com: the copy reads down the
 * LEFT while the photography holds a tall panel on the RIGHT, crossfading from
 * beat to beat as you scroll (arrive → cast off → supper → night → dawn). Clean
 * bone background, editorial type.
 *
 * Respects prefers-reduced-motion: falls back to plain stacked copy/photo rows
 * (no sticky, no scrubbing). The two implementations live in separate child
 * components so the motion hooks stay unconditional.
 */

interface Beat {
  /** The time-of-day eyebrow above each headline. */
  time: string;
  /** Display headline. */
  title: string;
  /** Substring of `title` to italicize in gold for emphasis. */
  emphasis: string;
  /** Body copy — read it aloud; it should sound like Josh or Donna. */
  copy: string;
  image: string;
  alt: string;
}

const BEATS: Beat[] = [
  {
    time: "15:00 — Arrival",
    title: "You arrive at three.",
    emphasis: "three",
    copy: "A cocktail is in your hand before your bag is down. The dock lines are still cleated. Marina Del Rey hums behind you — and then it doesn’t.",
    image: "/images/hero/catamaran-aerial.jpg",
    alt: "Catamaran at the dock in Marina Del Rey, golden afternoon light",
  },
  {
    time: "Cast off — Underway",
    title: "The lines drop.",
    emphasis: "drop",
    copy: "Engines, then sail. The marina goes small. Six of you, twenty-seven feet of beam, an afternoon with nowhere to be. The captain has the boat. You have nothing to do.",
    image: "/images/pillars/sail.jpg",
    alt: "Catamaran under full sail on the open Pacific",
  },
  {
    time: "Golden hour — Supper",
    title: "Supper at the water’s edge.",
    emphasis: "water’s edge",
    copy: "Josh sends out the first of six courses as the light turns amber. You eat on the foredeck. The wine is poured twice. No one reaches for a phone.",
    image: "/images/pillars/supper.jpg",
    alt: "Plated multi-course supper served on deck at sunset",
  },
  {
    time: "After dark — Night",
    title: "Anchored under everything.",
    emphasis: "everything",
    copy: "We set the hook in a quiet cove. The boat rocks once and settles. Overhead, the sky does what it can’t do over the city.",
    image: "/images/vessel/exterior-anchored.jpg",
    alt: "Catamaran anchored in a quiet cove beneath a night sky",
  },
  {
    time: "First light — Dawn",
    title: "Breath before coffee.",
    emphasis: "Breath",
    // TODO: Replace with real photography from the launch shoot (breathwork on the foredeck at dawn).
    copy: "Donna meets you on the foredeck at first light. Twenty minutes of breath, then the smell of something on the galley stove. You come back a little quieter than you left.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=85",
    alt: "Breathwork practice on deck at sunrise",
  },
];

const N = BEATS.length;
/** The progress value where each beat's image is fully dominant. */
const MIDS = BEATS.map((_, i) => (i + 0.5) / N);

/** Render a headline with one gold italic word, matching the hero/manifesto. */
function renderTitle(title: string, emphasis: string): ReactNode {
  if (!emphasis || !title.includes(emphasis)) return title;
  const [before, after] = title.split(emphasis);
  return (
    <>
      {before}
      <em className="italic text-gold-deep">{emphasis}</em>
      {after}
    </>
  );
}

export function VoyageScroll() {
  const prefersReduced = useReducedMotion();
  // Treat the server/first-render `null` as "animate"; only branch to the
  // static stack when reduced motion is explicitly requested.
  if (prefersReduced) return <StaticStack />;
  return <SplitScroll />;
}

/* -------------------------------------------------------------------------- */
/*  Animated implementation — copy scrolls left, photo holds + crossfades right */
/* -------------------------------------------------------------------------- */

function SplitScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      id="the-voyage"
      aria-label="A day aboard, hour by hour"
      className="relative bg-bone"
    >
      <h2 className="sr-only">A day aboard, hour by hour</h2>
      <div className="grid md:grid-cols-2">
        {/* LEFT — copy, read down the page */}
        <div>
          {BEATS.map((beat) => (
            <div
              key={beat.title}
              className="flex min-h-[70vh] md:min-h-screen flex-col justify-center px-[clamp(1.5rem,6vw,6rem)] py-16 md:py-24"
            >
              {/* Photo inline on mobile (the sticky right panel is desktop-only) */}
              <div className="md:hidden relative mb-9 aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                <Image
                  src={beat.image}
                  alt={beat.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="font-mono text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold-deep mb-6">
                {beat.time}
              </div>
              <h3 className="font-display font-light text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-ocean text-balance">
                {renderTitle(beat.title, beat.emphasis)}
              </h3>
              <p className="mt-7 max-w-[460px] text-[1.0625rem] leading-[1.75] font-light text-ink-soft">
                {beat.copy}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT — photography holds a tall panel, crossfading beat to beat */}
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen overflow-hidden bg-sand">
            {BEATS.map((beat, i) => (
              <StickyImage
                key={beat.title}
                beat={beat}
                index={i}
                progress={scrollYProgress}
              />
            ))}
            {/* Quiet signature + progress hairline */}
            <span className="absolute bottom-7 left-[clamp(1.5rem,3vw,3rem)] z-[3] font-mono text-[0.65rem] tracking-[0.24em] uppercase text-white/70">
              Two days. One night.
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-[3]">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full w-full origin-left bg-gold"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyImage({
  beat,
  index,
  progress,
}: {
  beat: Beat;
  index: number;
  progress: MotionValue<number>;
}) {
  const lo = index === 0 ? 0 : MIDS[index - 1];
  const hi = index === N - 1 ? 1 : MIDS[index + 1];

  const opacity = useTransform(
    progress,
    [lo, MIDS[index], hi],
    [index === 0 ? 1 : 0, 1, index === N - 1 ? 1 : 0]
  );
  // Subtle Ken Burns — scale >= 1 always covers.
  const scale = useTransform(progress, [lo, hi], [1.07, 1]);

  return (
    <motion.div
      style={{ opacity, scale, willChange: "opacity, transform" }}
      className="absolute inset-0"
    >
      <Image
        src={beat.image}
        alt={beat.alt}
        fill
        priority={index === 0}
        sizes="50vw"
        className="object-cover"
      />
      {/* Whisper of a gradient so the signature stays legible at the foot. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/30 to-transparent" />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reduced-motion fallback — plain stacked copy/photo rows                    */
/* -------------------------------------------------------------------------- */

function StaticStack() {
  return (
    <section
      id="the-voyage"
      aria-label="A day aboard, hour by hour"
      className="bg-bone"
    >
      <h2 className="sr-only">A day aboard, hour by hour</h2>
      {BEATS.map((beat) => (
        <Fragment key={beat.title}>
          <div className="grid md:grid-cols-2 items-center">
            <div className="flex flex-col justify-center px-[clamp(1.5rem,6vw,6rem)] py-16 md:py-24">
              <div className="font-mono text-[0.7rem] font-medium tracking-[0.3em] uppercase text-gold-deep mb-6">
                {beat.time}
              </div>
              <h3 className="font-display font-light text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.02em] text-ocean text-balance">
                {renderTitle(beat.title, beat.emphasis)}
              </h3>
              <p className="mt-7 max-w-[460px] text-[1.0625rem] leading-[1.75] font-light text-ink-soft">
                {beat.copy}
              </p>
            </div>
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[88vh] bg-sand">
              <Image
                src={beat.image}
                alt={beat.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Fragment>
      ))}
    </section>
  );
}
