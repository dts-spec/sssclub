/**
 * Expansion roadmap — when each cruising ground opens.
 *
 * Year 1 (2026): Marina Del Rey home + Catalina excursion launch.
 * Year 2 (2027): Catalina program expansion (more frequency, longer season).
 * Year 3 (2028): Mexico (Puerto Vallarta) and Pacific Northwest (Inside Passage).
 * Year 4 (2029): Mediterranean (Greek Islands) and Caribbean (BVI).
 *
 * This file drives the timeline section on the homepage and destinations page.
 * Keep it in sync with launch years in /content/excursions.ts.
 */

export interface RoadmapMilestone {
  year: 2026 | 2027 | 2028 | 2029;
  /** Two-line headline */
  title: { line1: string; line2: string };
  /** Editorial paragraph */
  description: string;
  /** Status pill displayed on the card */
  status: "now" | "next" | "horizon" | "future";
  /** Regions / destinations that open this year */
  regions: string[];
  /** Slugs of excursions that launch this year (links to /excursions/[slug]) */
  excursionSlugs: string[];
}

export const roadmap: RoadmapMilestone[] = [
  {
    year: 2026,
    title: { line1: "Year One.", line2: "California." },
    description:
      "We launch out of Marina Del Rey in spring 2026. Local experiences from day one — evening dinners, day sails, breathwork, business charters. The Catalina excursion opens in May, sailing through October.",
    status: "now",
    regions: ["Marina Del Rey", "Catalina Island"],
    excursionSlugs: ["catalina"],
  },
  {
    year: 2027,
    title: { line1: "Year Two.", line2: "California, deeper." },
    description:
      "More Catalina dates, a longer season, and the first regular Channel Islands sails. The local experience calendar expands to year-round Friday and Sunday programming.",
    status: "next",
    regions: ["Channel Islands", "Catalina (expanded)"],
    excursionSlugs: ["catalina"],
  },
  {
    year: 2028,
    title: { line1: "Year Three.", line2: "Mexico & Alaska." },
    description:
      "The boat winters in Puerto Vallarta for a Banderas Bay charter season. Summer brings a one-way passage from Seattle to Campbell River — ten days through the San Juans, Princess Louisa, and Desolation Sound.",
    status: "horizon",
    regions: ["Puerto Vallarta", "Inside Passage"],
    excursionSlugs: ["puerto-vallarta", "inside-passage"],
  },
  {
    year: 2029,
    title: { line1: "Year Four.", line2: "The two seas." },
    description:
      "A Mediterranean season out of Athens — seven-day Cyclades loops between May and October. The boat winters in the British Virgin Islands for Caribbean charters from November through May.",
    status: "future",
    regions: ["Greek Islands", "British Virgin Islands"],
    excursionSlugs: ["greek-islands", "bvi"],
  },
];

/**
 * Helper: get the milestone for a specific year.
 */
export function getMilestoneByYear(year: number): RoadmapMilestone | undefined {
  return roadmap.find((m) => m.year === year);
}
