"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easings, durations, viewportDefaults } from "@/lib/tokens";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Stagger delay in seconds. Use for sibling reveals. */
  delay?: number;
  /** Animation duration override */
  duration?: number;
  /** Custom variants override */
  variants?: Variants;
  /** Wrapper className */
  className?: string;
  /** Element to render as. Defaults to div. */
  as?: "div" | "section" | "article" | "header" | "li";
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Wraps children in a motion element that fades up when scrolled into view.
 * The standard reveal pattern used throughout the site.
 *
 * @example
 *   <RevealOnScroll delay={0.1}>
 *     <h2>Heading</h2>
 *   </RevealOnScroll>
 */
export function RevealOnScroll({
  children,
  delay = 0,
  duration = durations.slow,
  variants = defaultVariants,
  className,
  as = "div",
}: RevealOnScrollProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefaults}
      transition={{
        duration,
        delay,
        ease: easings.premium,
      }}
    >
      {children}
    </MotionTag>
  );
}
