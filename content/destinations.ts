/**
 * Destinations content — 5 cruising grounds for SSSC.
 *
 * Year 1: Marina Del Rey (home) + Catalina.
 * Year 2-3: La Paz, Puerto Vallarta.
 * Year 4: Vancouver Island / Inside Passage.
 */

export interface Destination {
  slug: string;
  /** Display number, e.g. "01 / Home Port" */
  positionLabel: string;
  /** Just the position number, e.g. 1 */
  position: number;
  /** Two-line title, italicized second line */
  title: { line1: string; line2: string };
  /** Region subtitle */
  region: string;
  /** Lat/long coordinate display string */
  coordinates: string;
  /** Editorial paragraph */
  description: string;
  /** Travel facts grid */
  facts: {
    sailTime: string;
    season: string;
    bestFor: string;
  };
  /** Hero image */
  image: string;
  /** When in our roadmap this destination opens */
  availability: "year-1" | "year-2-3" | "year-4";
}

export const destinations: Destination[] = [
  {
    slug: "marina-del-rey",
    positionLabel: "01 / Home Port",
    position: 1,
    title: { line1: "Marina", line2: "Del Rey." },
    region: "Los Angeles, California",
    coordinates: "33°58′N · 118°27′W",
    description:
      "The largest man-made small-craft harbor in the country, and our home waters. Every voyage departs and returns here. Sunset cruises down to Venice and the Palos Verdes peninsula are the local rhythm.",
    facts: {
      sailTime: "0 hours",
      season: "Year-round",
      bestFor: "All voyages",
    },
    image: "https://images.unsplash.com/photo-1568659585050-83e7894636d8?auto=format&fit=crop&w=1400&q=85",
    availability: "year-1",
  },
  {
    slug: "catalina-island",
    positionLabel: "02 / Signature",
    position: 2,
    title: { line1: "Catalina", line2: "Island." },
    region: "Avalon & Twin Harbors",
    coordinates: "33°20′N · 118°19′W",
    description:
      "26 miles across the channel, the only Mediterranean-feeling island in California. Friday afternoons we leave Marina Del Rey and by sunset we're moored off Avalon with the village lit up against the hills. Saturday we move to Two Harbors — wilder, quieter, with the kind of coves where you swim before breakfast.",
    facts: {
      sailTime: "4–5 hours",
      season: "May–October",
      bestFor: "3-day excursion",
    },
    image: "/images/destinations/catalina-island.jpg",
    availability: "year-1",
  },
  {
    slug: "la-paz-sea-of-cortez",
    positionLabel: "03 / Year Two",
    position: 3,
    title: { line1: "La Paz & the", line2: "Sea of Cortez." },
    region: "Baja California Sur, Mexico",
    coordinates: "24°08′N · 110°18′W",
    description:
      "Jacques Cousteau called it 'the world's aquarium.' A week between Isla Espíritu Santo and the Sierra de la Giganta, anchoring in coves where the only soundtrack is sea lions barking on distant rocks. Whale season (January–March) is the marquee window.",
    facts: {
      sailTime: "Fly & sail",
      season: "Nov–April",
      bestFor: "7-day charter",
    },
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1400&q=85",
    availability: "year-2-3",
  },
  {
    slug: "puerto-vallarta",
    positionLabel: "04 / Year Three",
    position: 4,
    title: { line1: "Puerto", line2: "Vallarta." },
    region: "Banderas Bay, Mexico",
    coordinates: "20°37′N · 105°13′W",
    description:
      "The largest bay in Mexico, rimmed by the Sierra Madre. We sail from La Cruz to Yelapa to Las Caletas — the kind of trip that ends with dinner on a beach with no road access, candles in the sand, the boat at anchor a hundred meters out.",
    facts: {
      sailTime: "Fly & sail",
      season: "Dec–April",
      bestFor: "7–10 day",
    },
    image: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=1400&q=85",
    availability: "year-2-3",
  },
  {
    slug: "vancouver-island",
    positionLabel: "05 / Year Four",
    position: 5,
    title: { line1: "Vancouver", line2: "Island." },
    region: "Inside Passage, British Columbia",
    coordinates: "49°15′N · 123°06′W",
    description:
      "A summer voyage through the Salish Sea and into the deep fjords north of Desolation Sound. Bears on the beach at low tide, orcas at the bow, rivers of meltwater pouring directly off granite cliffs into the ocean. Cool, wild, and unlike anywhere else on the Pacific Coast.",
    facts: {
      sailTime: "Delivery sail",
      season: "June–August",
      bestFor: "10–14 day",
    },
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1400&q=85",
    availability: "year-4",
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
