/**
 * Design tokens for Sail, Supper & Soul Club.
 *
 * This is the canonical TypeScript representation of the brand system.
 * Import from here when you need a color in JS (e.g. inline styles,
 * SVG fills, motion animation properties). For Tailwind class names,
 * the same tokens are defined in `app/globals.css` under @theme.
 *
 * Keep these two in sync. If a token changes here it must change there too.
 */

export const colors = {
  // Primary palette
  ocean: "#0A2540",
  oceanDeep: "#061829",
  oceanRich: "#0D2E4A",
  teal: "#2C5F70",
  tealSoft: "#4A7B8A",
  gold: "#C9A96E",
  goldDeep: "#A08454",
  goldSoft: "#D9BE89",

  // Neutrals
  sand: "#F5EFE6",
  sandDeep: "#EDE3D2",
  bone: "#FBF8F3",
  boneWarm: "#F8F3EA",
  mist: "#A8B5BF",
  mistSoft: "#C8CFD5",
  ink: "#1F2428",
  inkSoft: "#2A2D31",
} as const;

export const fonts = {
  display: 'var(--font-cormorant), Georgia, "Times New Roman", serif',
  body: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
  mono: 'var(--font-jetbrains), "SF Mono", Menlo, monospace',
} as const;

export const easings = {
  /** Premium ease-out used for hero reveals and most page motion. */
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Softer ease for nav bar and other UI transitions. */
  soft: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const durations = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
  cinematic: 1.6,
} as const;

/**
 * Standard motion variants used across the site.
 * Import in any component that uses motion.div.
 */
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  staggerChildren: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  },
} as const;

/**
 * The default viewport options used with motion's `whileInView`.
 * Triggers animations slightly before the element enters the viewport.
 */
export const viewportDefaults = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const;
