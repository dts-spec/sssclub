/**
 * Testimonials — guest quotes for the homepage carousel.
 * Replace placeholders with real testimonials after Year 1 voyages.
 */

export interface Testimonial {
  /** The quote (italicized in display) */
  text: string;
  /** Display name (or initials for privacy) */
  name: string;
  /** Location detail under name */
  location: string;
  /** Voyage type they took, e.g. "Couples Staycation" */
  voyage: string;
  /** Optional date string */
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "We hadn't eaten dinner together without our phones on the table in three years. The fact that we ate six courses, watched a sunset, and slept on the water is now a story we tell people. It will be on our anniversary list forever.",
    name: "M. & K.",
    location: "Pacific Palisades, CA",
    voyage: "Couples Staycation",
  },
  {
    text: "Donna's breathwork on the foredeck at sunrise was the kind of experience I usually pay a Costa Rican retreat fee to get. The fact that I drove ten minutes from my apartment to do it on a 51-foot Lagoon is still hard to explain to friends.",
    name: "A. R.",
    location: "Venice, CA",
    voyage: "Mini Digital Detox",
  },
  {
    text: "We booked it for my partner's 50th. Six of us, two nights, Two Harbors. Josh fed us like family. Donna led a sunrise session that three of the friends are still texting me about. Best gift I've ever given anyone.",
    name: "D. L.",
    location: "Manhattan Beach, CA",
    voyage: "Catalina Excursion",
  },
];
