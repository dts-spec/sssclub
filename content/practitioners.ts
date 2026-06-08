/**
 * Practitioner profiles — Donna and Josh.
 * Used by the homepage practitioner-feature sections and the /our-story page.
 */

export interface Practitioner {
  slug: "donna" | "josh";
  /** Title eyebrow, e.g. "Wellbeing at Sea" */
  pillarLabel: string;
  /** Two-line headline */
  title: { line1: string; line2: string };
  /** Pull quote attributed to them */
  quote: string;
  /** Multi-paragraph long-form bio */
  body: string[];
  /** Two credential blocks */
  credentials: { label: string; value: string[] }[];
  /** Closing CTA title */
  ctaTitle: { line1: string; line2: string };
  /** Hero portrait */
  image: string;
  /** Visual variant — dark navy or warm bone background */
  variant: "dark" | "light";
}

export const practitioners: Practitioner[] = [
  {
    slug: "donna",
    pillarLabel: "Wellbeing at Sea",
    title: { line1: "Learning to Breathe", line2: "with Donna Otten." },
    quote:
      "Through the ancient practice of breathwork, the body learns to remember what it has been trying to forget. The ocean is a good place to start.",
    body: [
      "Donna has been teaching breathwork, Pilates, and meditation in Los Angeles for over fifteen years. Her clients are tech founders, actors, surgeons, and mothers — people whose nervous systems have been operating at the edge of their range for too long.",
      "On the boat, her practice is integrated into the rhythm of each voyage rather than scheduled into it. The morning session is on the foredeck before breakfast, when the marina is still asleep and the only sound is rigging. The evening session is at anchor, as the sun drops, with the boat slowly settling into the cove.",
      "Couples Staycations include an optional 45-minute private session. Mini Digital Detoxes are built entirely around her two-session format. Custom voyages can extend her practice into sound bath, breath ceremony, and somatic guidance.",
    ],
    credentials: [
      {
        label: "Certifications",
        value: ["Pilates Method Alliance", "ACE Breathwork", "Meditation Teacher (Insight LA)"],
      },
      {
        label: "Practicing Since",
        value: ["2010, Los Angeles", "Aboard Since 2026"],
      },
    ],
    ctaTitle: { line1: "A breath, taken slowly,", line2: "at the edge of California." },
    // TODO: Replace with real portrait of Donna leading breathwork
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=2400&q=85",
    variant: "dark",
  },
  {
    slug: "josh",
    pillarLabel: "Supper at Sea",
    title: { line1: "Cooking at the Edge", line2: "with Joshua Otten." },
    quote:
      "I cook on the boat the same way I'd cook for friends in our kitchen. Six courses, two cuisines I love, and an ocean view that we didn't have to design.",
    body: [
      "Twenty-five years on the water and almost as many behind a stove. Josh's cooking is shaped by long sailing trips through the Mediterranean and Japan — two cuisines built around the sea, around patience, around showing the ingredient as itself.",
      "Aboard, the galley produces two distinct multi-course menus. The Mediterranean menu builds from a local-caught crudo, through a hand-rolled pasta, to a wood-feeling grilled fish course. The Japanese menu opens with seasonal otsumami, moves through Edomae-style nigiri made to order, and lands on a clear soup that resets everything.",
      "Wine pairings are sourced from his Westside merchant relationships. Cocktails are spirit-forward with house bitters Josh blends in Marina Del Rey. Dietary restrictions become opportunities, not obstacles. There has not yet been a guest who left hungry.",
    ],
    credentials: [
      {
        label: "Cuisines",
        value: ["Mediterranean", "Japanese Edomae", "California Coastal"],
      },
      {
        label: "On the Water Since",
        value: ["2001, Annapolis", "USCG Master 100T (in progress)"],
      },
    ],
    ctaTitle: { line1: "Six courses, at golden hour,", line2: "at three knots." },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85",
    variant: "light",
  },
];

export function getPractitionerBySlug(slug: "donna" | "josh"): Practitioner | undefined {
  return practitioners.find((p) => p.slug === slug);
}
