"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { easings } from "@/lib/tokens";
import { introReveal } from "@/lib/intro";
import { offers } from "@/content/offers";

/**
 * IntroOverlay — the opening animation (inspired by thebendclub.com).
 *
 * 1. "SAIL, SUPPER, SOUL CLUB" grows in from the middle of a chalk page
 * 2. the COPY splits to open a window in the middle
 * 3. the Opening Slides flash inside the window, one at a time
 * 4. the LAST slide is the homepage carousel's opening frame; it zooms out to
 *    fill the screen and the carousel takes over on that exact image — no cut.
 *    The hero copy then animates in (via introReveal).
 *
 * Plays on every page load (no sessionStorage). Click-to-skip, reduced-motion
 * safe, and auto-dismisses on a hard timer so it can never block the page.
 */

const IMAGES = [
  "/images/intro/sailing.jpg",
  "/images/intro/catamaran.jpg",
  "/images/intro/cockpit.jpg",
  "/images/intro/dining.jpg",
  // The final slide IS the hero carousel's first frame, so the zoom-to-fill
  // hands off seamlessly — the same image becomes the homepage. Stays in sync
  // automatically if the carousel's lead image changes.
  offers[0].image,
];
const LAST = IMAGES[IMAGES.length - 1];

/** How long each image holds, in ms. */
const FLASH_MS = 1000;
/** How long the last image takes to zoom to fill, in ms. */
const ZOOM_MS = 1200;

type Phase = "pop" | "split" | "flash" | "zoom" | "reveal";

const LEFT = "SAIL, SUPPER,";
const RIGHT = "SOUL CLUB";
const wordmark =
  "font-display font-medium text-ocean text-[clamp(1.1rem,4.8vw,4.25rem)] tracking-[0.08em] leading-none whitespace-nowrap";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")";

export function IntroOverlay() {
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("pop");
  const [img, setImg] = useState(0);

  // Main sequence: pop (hold) → split → flash. Plays every load.
  useEffect(() => {
    introReveal.reset();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(false);
      introReveal.fire();
      return;
    }
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setPhase("split"), 2000),
      setTimeout(() => setPhase("flash"), 3000),
      setTimeout(() => {
        setActive(false);
        introReveal.fire();
        document.body.style.overflow = "";
      }, 16000),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // Advance the flashing images; after the last, zoom it to fill.
  useEffect(() => {
    if (phase !== "flash") return;
    const last = img >= IMAGES.length - 1;
    const t = setTimeout(
      () => (last ? setPhase("zoom") : setImg((i) => i + 1)),
      FLASH_MS
    );
    return () => clearTimeout(t);
  }, [phase, img]);

  // Zoom → reveal.
  useEffect(() => {
    if (phase !== "zoom") return;
    const t = setTimeout(() => setPhase("reveal"), ZOOM_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // Reveal → hand off (hero copy animates in) and unmount.
  useEffect(() => {
    if (phase !== "reveal") return;
    introReveal.fire();
    const t = setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  if (!active) return null;

  const skip = () => {
    setActive(false);
    introReveal.fire();
    document.body.style.overflow = "";
  };

  const open = phase === "split" || phase === "flash" || phase === "zoom";
  const showImages = open;
  const zooming = phase === "zoom" || phase === "reveal";

  return (
    <motion.div
      onClick={skip}
      aria-hidden
      className="fixed inset-0 z-[300] flex cursor-pointer items-center justify-center overflow-hidden bg-bone"
      animate={{ opacity: phase === "reveal" ? 0 : 1 }}
      transition={{ duration: 0.9, ease: easings.premium }}
    >
      {/* Chalk grain (fades as the image takes over) */}
      <motion.div
        className="absolute inset-0 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: GRAIN }}
        animate={{ opacity: zooming ? 0 : 0.4 }}
        transition={{ duration: 0.6, ease: easings.premium }}
      />

      {/* Wordmark — grows in from the middle, then splits; fades as it zooms */}
      <motion.div
        className="relative z-10 flex w-full items-center px-6 text-[clamp(1.1rem,4.8vw,4.25rem)]"
        initial={{ opacity: 0, scale: 0.82, y: 18 }}
        animate={{ opacity: zooming ? 0 : 1, scale: 1, y: 0 }}
        transition={{ duration: zooming ? 0.5 : 1.0, ease: easings.premium }}
      >
        <span className={`flex-1 text-right ${wordmark}`}>{LEFT}</span>

        {/* Center window — opens between the copy; the slides flash inside */}
        <motion.div
          className="relative mx-[0.3em] h-[4.1em] shrink-0 overflow-hidden rounded-[3px] bg-ocean-deep shadow-xl ring-1 ring-ocean/10"
          initial={{ width: "0em" }}
          animate={{ width: open ? "6.2em" : "0em" }}
          transition={{ duration: 1.0, ease: easings.premium }}
        >
          {IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: showImages && i <= img ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easings.premium }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 30vw, 220px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <span className={`flex-1 text-left ${wordmark}`}>{RIGHT}</span>
      </motion.div>

      {/* Last slide zooms from the window to fill the whole screen */}
      {zooming && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.45, ease: easings.premium },
            scale: { duration: ZOOM_MS / 1000, ease: easings.premium },
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <Image src={LAST} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      )}
    </motion.div>
  );
}
