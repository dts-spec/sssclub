"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { offers } from "@/content/offers";
import { easings } from "@/lib/tokens";

/**
 * HeroBanner — the full-bleed image layer behind the hero.
 *
 * Controlled by `index`: the Hero owns the rotation so the imagery and the
 * offer copy stay in sync. Crossfades between offer images with a gentle Ken
 * Burns drift on the active slide. Under prefers-reduced-motion it shows a
 * single still image.
 *
 * TODO: Replace Unsplash placeholders (see content/offers.ts) with real
 * photography from the launch shoot.
 */

const FADE_S = 1.6;

export function HeroBanner({
  index,
  revealed = true,
}: {
  index: number;
  /** Until the intro reveals, hold the active slide at scale 1 so the zoom-to-fill
   * handoff lands on the exact same framing (no scale pop). */
  revealed?: boolean;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="absolute inset-0">
        <Image
          src={offers[0].image}
          alt={offers[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {offers.map((offer, i) => {
        const active = i === index;
        return (
          <motion.div
            key={offer.image}
            className="absolute inset-0"
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1 }}
            animate={{
              opacity: active ? 1 : 0,
              scale: active && revealed ? 1.06 : 1,
            }}
            transition={{
              opacity: { duration: FADE_S, ease: easings.premium },
              scale: { duration: 7, ease: "linear" },
            }}
            style={{ willChange: "opacity, transform" }}
          >
            <Image
              src={offer.image}
              alt={offer.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
