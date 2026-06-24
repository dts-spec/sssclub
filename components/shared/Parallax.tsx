"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { parallax } from "@/lib/tokens";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Vertical travel in px. The moving layer drifts from +distance to
   * -distance as the element crosses the viewport. Keep it subtle.
   */
  distance?: number;
  /**
   * Classes for the clip box. This wrapper is always `relative overflow-hidden`;
   * pass sizing (e.g. `aspect-[4/5]`, `h-[90vh]`) and anything else here.
   */
  className?: string;
}

/**
 * Wraps a full-bleed child (usually a Next `<Image fill>`) and gives it a
 * subtle scroll-linked parallax drift for depth.
 *
 * The moving layer is grown beyond the clip box by `distance` on the top and
 * bottom, so the drift never exposes an edge — callers don't need to scale or
 * oversize the image themselves. Just hand it an `<Image fill className="object-cover" />`.
 *
 * Respects `prefers-reduced-motion`: renders the child static and centered.
 */
export function Parallax({
  children,
  distance = parallax.distance,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Hooks must run unconditionally — we simply don't bind `y` when reduced.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {prefersReduced ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <motion.div
          className="absolute inset-x-0"
          style={{
            y,
            top: `${-distance}px`,
            bottom: `${-distance}px`,
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
