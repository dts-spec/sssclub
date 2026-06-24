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
import { voyage } from "@/lib/tokens";

/**
 * VoyageScroll — the cinematic open.
 *
 * A pinned, scroll-driven narrative that introduces the club by walking the
 * arc of a single voyage: arrive → cast off → supper → night → dawn. As you
 * scroll, full-bleed backgrounds cross-fade behind time-stamped vignettes, a
 * left-hand "chapter" rail tracks where you are, and a hairline fills along the
 * bottom. The whole thing is one `scrollYProgress` fanned out across the beats.
 *
 * Respects prefers-reduced-motion: falls back to a plain stacked editorial
 * sequence (no pinning, no scrubbing) so the story is fully readable without
 * any motion. The two implementations live in separate child components so the
 * motion hooks stay unconditional.
 */

interface Beat {
  /** Vertical "chapter" label in the left rail. */
  phase: string;
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
    phase: "Arrival",
    time: "15:00",
    title: "You arrive at three.",
    emphasis: "three",
    copy: "A cocktail is in your hand before your bag is down. The dock lines are still cleated. Marina Del Rey hums behind you — and then it doesn’t.",
    image: "/images/hero/catamaran-aerial.jpg",
    alt: "Catamaran at the dock in Marina Del Rey, golden afternoon light",
  },
  {
    phase: "Underway",
    time: "Cast off",
    title: "The lines drop.",
    emphasis: "drop",
    copy: "Engines, then sail. The marina goes small. Six of you, twenty-seven feet of beam, an afternoon with nowhere to be. The captain has the boat. You have nothing to do.",
    image: "/images/pillars/sail.jpg",
    alt: "Catamaran under full sail on the open Pacific",
  },
  {
    phase: "Supper",
    time: "Golden hour",
    title: "Supper at the water’s edge.",
    emphasis: "water’s edge",
    copy: "Josh sends out the first of six courses as the light turns amber. You eat on the foredeck. The wine is poured twice. No one reaches for a phone.",
    image: "/images/pillars/supper.jpg",
    alt: "Plated multi-course supper served on deck at sunset",
  },
  {
    phase: "Night",
    time: "After dark",
    title: "Anchored under everything.",
    emphasis: "everything",
    copy: "We set the hook in a quiet cove. The boat rocks once and settles. Overhead, the sky does what it can’t do over the city.",
    image: "/images/vessel/exterior-anchored.jpg",
    alt: "Catamaran anchored in a quiet cove beneath a night sky",
  },
  {
    phase: "Dawn",
    time: "First light",
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
const SEG = 1 / N;
/** The progress value where each beat is at its peak (fully dominant). */
const MIDS = BEATS.map((_, i) => (i + 0.5) / N);
/** Subtle grain, matched to the hero treatment. */
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")";

/** Render a headline with one gold-soft italic word, matching the hero/manifesto. */
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

export function VoyageScroll() {
  const prefersReduced = useReducedMotion();
  // Treat the server/first-render `null` as "animate"; only branch to the
  // static stack when reduced motion is explicitly requested.
  if (prefersReduced) return <StaticStack />;
  return <PinnedScrub />;
}

/* -------------------------------------------------------------------------- */
/*  Animated implementation                                                   */
/* -------------------------------------------------------------------------- */

function PinnedScrub() {
  const ref = useRef<HTMLDivElement>(null);
  // Ref lives on the TALL outer container — the sticky stage barely moves.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      id="the-voyage"
      aria-label="A day aboard, hour by hour"
      className="relative bg-ocean-deep"
      style={{ height: `${voyage.scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden on-dark">
        {/* Backgrounds — cross-fading, slowly zooming */}
        {BEATS.map((beat, i) => (
          <BackgroundLayer
            key={beat.phase}
            beat={beat}
            index={i}
            progress={scrollYProgress}
          />
        ))}

        {/* Grain */}
        <div
          className="absolute inset-0 z-[1] opacity-40 pointer-events-none"
          style={{ backgroundImage: GRAIN_BG }}
        />

        {/* Chapter rail */}
        <nav
          aria-hidden
          className="absolute left-[clamp(1.5rem,4vw,3rem)] top-1/2 -translate-y-1/2 z-[3] hidden md:flex flex-col gap-5"
        >
          {BEATS.map((beat, i) => (
            <ChapterLabel
              key={beat.phase}
              label={beat.phase}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </nav>

        {/* Vignettes — one visible at a time */}
        <h2 className="sr-only">A day aboard, hour by hour</h2>
        {BEATS.map((beat, i) => (
          <Vignette
            key={beat.phase}
            beat={beat}
            index={i}
            progress={scrollYProgress}
          />
        ))}

        {/* Quiet signature */}
        <span className="absolute bottom-7 right-[clamp(1.5rem,4vw,4rem)] z-[3] font-mono text-[0.65rem] tracking-[0.24em] uppercase text-white/40">
          Two days. One night.
        </span>

        {/* Bottom progress hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15 z-[3]">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full w-full origin-left bg-gold"
          />
        </div>
      </div>
    </section>
  );
}

function BackgroundLayer({
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
  // Ken Burns: ease the zoom out as the beat settles. scale >= 1 always covers.
  const scale = useTransform(progress, [lo, hi], [voyage.zoom[0], voyage.zoom[1]]);

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
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility: left-weighted so the text side stays dark. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-deep/55 to-ocean-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 to-transparent" />
    </motion.div>
  );
}

function Vignette({
  beat,
  index,
  progress,
}: {
  beat: Beat;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * SEG;
  const end = (index + 1) * SEG;
  const fade = SEG * 0.28;

  // Non-overlapping windows so two vignettes never show at once.
  const isFirst = index === 0;
  const isLast = index === N - 1;
  const inRange = isFirst
    ? [0, end - fade, end]
    : isLast
      ? [start, start + fade, 1]
      : [start, start + fade, end - fade, end];
  const outRange = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];

  const opacity = useTransform(progress, inRange, outRange);
  const y = useTransform(progress, [start, start + SEG / 2, end], voyage.drift);

  return (
    <motion.div
      style={{ opacity, y, willChange: "opacity, transform" }}
      className="absolute inset-0 z-[2] flex items-center pointer-events-none"
    >
      <div className="container-app w-full">
        <div className="md:pl-[clamp(5rem,13vw,11rem)] max-w-[820px]">
          <div className="eyebrow light mb-6">{beat.time}</div>
          <h3 className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance">
            {renderTitle(beat.title, beat.emphasis)}
          </h3>
          <p className="mt-7 max-w-[480px] text-[1.0625rem] leading-[1.75] font-light text-white/85">
            {beat.copy}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ChapterLabel({
  label,
  index,
  progress,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index * SEG;
  const end = (index + 1) * SEG;
  const goldOpacity = useTransform(progress, [start, MIDS[index], end], [0, 1, 0]);

  return (
    <div className="relative font-mono text-[0.65rem] tracking-[0.24em] uppercase leading-none">
      <span className="text-white/30">{label}</span>
      <motion.span
        aria-hidden
        style={{ opacity: goldOpacity }}
        className="absolute inset-0 text-gold"
      >
        {label}
      </motion.span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reduced-motion fallback — a plain, fully readable stacked sequence        */
/* -------------------------------------------------------------------------- */

function StaticStack() {
  return (
    <section
      id="the-voyage"
      aria-label="A day aboard, hour by hour"
      className="bg-ocean-deep text-white on-dark"
    >
      <h2 className="sr-only">A day aboard, hour by hour</h2>
      {BEATS.map((beat) => (
        <Fragment key={beat.phase}>
          <article className="relative flex min-h-[80vh] items-center overflow-hidden">
            <Image
              src={beat.image}
              alt={beat.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-deep/60 to-ocean-deep/30" />
            <div className="container-app relative">
              <div className="max-w-[760px]">
                <div className="eyebrow light mb-6">{beat.time}</div>
                <h3 className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] text-white text-balance">
                  {renderTitle(beat.title, beat.emphasis)}
                </h3>
                <p className="mt-7 max-w-[480px] text-[1.0625rem] leading-[1.75] font-light text-white/85">
                  {beat.copy}
                </p>
              </div>
            </div>
          </article>
        </Fragment>
      ))}
    </section>
  );
}
