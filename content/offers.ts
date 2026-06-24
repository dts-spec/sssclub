/**
 * Hero offers — the rotating packages shown in the homepage hero banner.
 * Image and copy rotate together; each slide sells one offer.
 *
 * Images mix local assets (/public/images) with Unsplash placeholders.
 * TODO: Replace Unsplash placeholders with real photography from the launch shoot.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export interface HeroOffer {
  /** Package name — shown as the eyebrow. */
  name: string;
  /** Headline / tagline. */
  title: string;
  /** Word or phrase within `title` to italicize in gold. */
  emphasis: string;
  /** One-line description, in the founders' voice. */
  blurb: string;
  /** Render a five-star flourish beside the name (the Catalina staycation). */
  stars?: boolean;
  image: string;
  alt: string;
}

export const offers: HeroOffer[] = [
  {
    name: "The Romantic Getaway",
    title: "Just you two, and the sunset.",
    emphasis: "you two",
    blurb:
      "A private chef, a sunset sail, and the whole catamaran to yourselves.",
    image: unsplash("photo-1414437384035-787b9df782d7"),
    alt: "A catamaran under sail at sunset",
  },
  {
    name: "The Dinner Party",
    title: "Omakase, at anchor.",
    emphasis: "Omakase",
    blurb:
      "A sushi counter for six on the water — every course set down by hand as the light goes.",
    image: unsplash("photo-1717988732486-285ea23a6f88"),
    alt: "An omakase sushi course, plated by hand",
  },
  {
    name: "Rest, Relax & Reset",
    title: "Where the coast finally slows down.",
    emphasis: "slows down",
    blurb:
      "Breathwork on the foredeck with Donna, a slow sail, and a day with nowhere to be.",
    image: unsplash("photo-1772801974466-16908658183c"),
    alt: "A yoga pose held on the water at golden hour",
  },
  {
    name: "The Pitch",
    title: "Take the meeting to sea.",
    emphasis: "to sea",
    blurb:
      "Six seats for the clients who matter — a half-day under sail, lunch from the galley, and a room you never have to book.",
    image: "/images/pillars/sail.jpg",
    alt: "A catamaran under full sail by day",
  },
  {
    name: "The Ultimate Staycation",
    title: "Three days to Catalina.",
    emphasis: "Catalina",
    blurb:
      "Sleep aboard, wake at anchor, and never pack a bag twice. One island, three days, no schedule.",
    stars: true,
    image: "/images/destinations/catalina-island.jpg",
    alt: "The cliffs of Catalina Island seen from the water",
  },
];
