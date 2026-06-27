"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/tokens";

/**
 * IntroOverlay — a one-time opening animation (inspired by thebendclub.com).
 *
 * Sequence:
 *   1. "SAIL, SUPPER, SOUL CLUB" pops up on a light "chalk" page
 *   2. the page opens like a doorway — two halves slide apart left/right
 *   3. our photos flash in one at a time, ~1 second each
 *   4. it fades to reveal the main banner
 *
 * Plays once per browser session (sessionStorage), can be clicked to skip,
 * auto-dismisses on a hard safety timer so it can never block the page, and is
 * skipped entirely under prefers-reduced-motion.
 */

// The image the doorway opens onto — the Lagoon 55 cove shot.
const MAIN_IMAGE = "/images/hero/lagoon-55.jpg";

const IMAGES = [
  MAIN_IMAGE,
  "/images/destinations/catalina-island.jpg",
  "/images/pillars/supper.jpg",
  "/images/vessel/exterior-anchored.jpg",
  "/images/pillars/sail.jpg",
];

/** How long each image holds, in ms (~1 second each, per request). */
const FLASH_MS = 1000;

type Phase = "pop" | "doorway" | "flash" | "reveal";

const wordmark =
  "whitespace-nowrap font-display font-medium text-ocean text-[clamp(1.1rem,5vw,3.75rem)] tracking-[0.12em] leading-none";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")";

/** One half of the chalk doorway, carrying its half of the centered wordmark. */
function Door({ side }: { side: "left" | "right" }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: GRAIN }}
      />
      {/* Full-viewport-wide wordmark, pinned to the screen edge so it centers on
          screen; the door's overflow-hidden shows only this side's half. */}
      <div
        className={`absolute top-0 h-full w-[100vw] flex items-center justify-center ${
          side === "left" ? "left-0" : "right-0"
        }`}
      >
        <motion.div
          className={wordmark}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.premium }}
        >
          SAIL, SUPPER, SOUL CLUB
        </motion.div>
      </div>
    </>
  );
}

export function IntroOverlay() {
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("pop");
  const [img, setImg] = useState(0);

  // Main sequence: pop → doorway → flash, plus a hard safety dismiss.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("sssc-intro-seen")) {
      setActive(false);
      return;
    }
    sessionStorage.setItem("sssc-intro-seen", "1");
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setPhase("doorway"), 900),
      setTimeout(() => setPhase("flash"), 2450),
      setTimeout(() => {
        setActive(false);
        document.body.style.overflow = "";
      }, 12000),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // Advance the flashing images one at a time, then reveal.
  useEffect(() => {
    if (phase !== "flash") return;
    const last = img >= IMAGES.length - 1;
    const t = setTimeout(
      () => (last ? setPhase("reveal") : setImg((i) => i + 1)),
      FLASH_MS
    );
    return () => clearTimeout(t);
  }, [phase, img]);

  // Reveal → unmount.
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  if (!active) return null;

  const skip = () => {
    setActive(false);
    document.body.style.overflow = "";
  };

  const doorsOpen = phase !== "pop";
  const showImages = phase === "flash" || phase === "reveal";

  return (
    <motion.div
      onClick={skip}
      aria-hidden
      className="fixed inset-0 z-[300] cursor-pointer overflow-hidden"
      animate={{ opacity: phase === "reveal" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: easings.premium }}
    >
      {/* Stage behind the doors — the doorway opens onto the main image,
          then photos flash in one at a time on top of it */}
      <div className="absolute inset-0 bg-ocean-deep">
        <Image
          src={MAIN_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <AnimatePresence>
          {showImages && (
            <motion.div
              key={img}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.45, ease: easings.premium },
                scale: { duration: 1.4, ease: "linear" },
              }}
            >
              <Image
                src={IMAGES[img]}
                alt=""
                fill
                priority={img === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Left door */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 overflow-hidden bg-bone"
        animate={{ x: doorsOpen ? "-100%" : "0%" }}
        transition={{ duration: 1.45, ease: easings.premium }}
      >
        <Door side="left" />
      </motion.div>

      {/* Right door */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 overflow-hidden bg-bone"
        animate={{ x: doorsOpen ? "100%" : "0%" }}
        transition={{ duration: 1.45, ease: easings.premium }}
      >
        <Door side="right" />
      </motion.div>
    </motion.div>
  );
}
