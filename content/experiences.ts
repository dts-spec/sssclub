/**
 * Experiences — what you can DO aboard, when you're not crossing an ocean.
 *
 * Experiences are the daily-life offerings out of Marina Del Rey: dinners,
 * sails, breathwork, yoga, business charters, small events. Most are
 * half-day to overnight. None require flying anywhere.
 *
 * For multi-day destination trips, see /content/excursions.ts.
 *
 * EDITING NOTES:
 *   - Change a price → edit `priceFrom` here. It propagates automatically.
 *   - Add an experience → push a new object to the array.
 *   - Copy follows the brand voice in CLAUDE.md §Voice Principles.
 *     Sensory specifics. Numbers over claims. Verbs over adjectives.
 */

export type ExperienceCategory =
  | "supper"
  | "sail"
  | "wellness"
  | "events"
  | "business"
  | "charter";

export type ExperienceLayout = "feature" | "standard" | "tertiary";

export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface AddOn {
  name: string;
  price: string;
  description: string;
}

export interface Experience {
  /** URL slug: /experiences/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** Category for filtering and eyebrow labels */
  category: ExperienceCategory;
  /** One-line teaser for cards (12 words max) */
  tagline: string;
  /** Lede paragraph for detail page */
  paragraph: string;
  /** Long-form description for booking flow */
  fullDescription: string;
  /** Display price, e.g. "From $295/pp" */
  priceFrom: string;
  /** Buyout price (if different from per-person) */
  buyoutPrice?: string;
  /** Internal numeric for sorting */
  basePrice: number;
  /** Duration string */
  duration: string;
  /** Max guests (always 6 per PVSA) */
  maxGuests: number;
  /** Seasonality */
  season: string;
  /** Where it sails from */
  departurePort: string;
  /** Homepage grid layout hint */
  homepageLayout: ExperienceLayout;
  /** Hero image */
  heroImage: string;
  /** Card image */
  cardImage: string;
  /** Hour-by-hour breakdown */
  itinerary: ItineraryStep[];
  /** What's included */
  included: string[];
  /** Add-ons offered */
  addOns: AddOn[];
}

export const experiences: Experience[] = [
  {
    slug: "evening-dinner",
    name: "Evening Dinner",
    category: "supper",
    tagline: "Three hours. Six courses. The sun does the rest.",
    paragraph:
      "You arrive at five-thirty. We hand you a cocktail. The lines come off the dock at six, and by the time the first course is on the table we're already past the breakwater. Six courses, your choice of Mediterranean or Japanese, paired with wine if you like. We turn for home as the lights of the marina come on. You're back on the dock by nine.",
    fullDescription:
      "A three-hour dinner cruise from Marina Del Rey. Boarding 5:30 PM with a welcome cocktail or mocktail. Lines off at 6:00. Six-course pre-fixe dinner from Josh's galley — Mediterranean or Japanese tasting menu, decided when you book. Wine pairings on request. Sunset sail along the Santa Monica Bay coast. Return to MDR by 9:00 PM. Captain and deckhand included.",
    priceFrom: "From $245/pp",
    buyoutPrice: "$1,400 buyout",
    basePrice: 245,
    duration: "3 Hours",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "feature",
    // TODO: Replace with real photography from pre-launch shoot
    heroImage: "/images/voyages/couples-staycation.jpg",
    cardImage: "/images/voyages/couples-staycation.jpg",
    itinerary: [
      { time: "5:30 PM", title: "Boarding", description: "Welcome cocktail or mocktail. Brief intro from the captain." },
      { time: "6:00 PM", title: "Lines Off", description: "Out of the marina under power, sails up past the breakwater." },
      { time: "6:30 PM", title: "First Courses", description: "Six-course tasting menu begins. Wine pairings on request." },
      { time: "7:30 PM", title: "Sunset", description: "We slow the boat to a drift. Courses three and four arrive on schedule." },
      { time: "8:30 PM", title: "Return Sail", description: "Dessert and tea as the marina lights come on." },
      { time: "9:00 PM", title: "Disembark", description: "Back on the dock." },
    ],
    included: [
      "Six-course Mediterranean or Japanese dinner",
      "Welcome cocktail or mocktail",
      "Non-alcoholic beverages",
      "Sunset sail · two hours under canvas",
      "Captain and deckhand",
      "All fuel and slip",
    ],
    addOns: [
      { name: "Wine Pairings", price: "+$95/pp", description: "Three pairings from Josh's Westside merchant relationships." },
      { name: "Sommelier", price: "+$650", description: "Visiting sommelier curates a five-pairing menu." },
      { name: "Photography", price: "+$600", description: "Lifestyle photographer aboard for the duration." },
      { name: "Private Buyout", price: "$1,400", description: "Reserve the entire boat for your group of up to 6." },
    ],
  },

  {
    slug: "local-sail",
    name: "Local Sail",
    category: "sail",
    tagline: "Eight hours along the Malibu coast. Lunch and water toys included.",
    paragraph:
      "Boarding at nine. Breakfast as we clear the marina. By eleven we're anchored in a quiet cove off Malibu — paddleboards in the water, snorkel gear out, the tender ready if anyone wants to go ashore. Lunch on the foredeck. An afternoon sail home with the wind on your back. The kind of day you remember a decade later.",
    fullDescription:
      "Eight-hour day sail for up to six guests. Boarding 9:00 AM. Light breakfast underway. Sail along the Malibu coast to a sheltered anchorage. Tender, two paddleboards, snorkel gear, kneeboard, and wakeboard available. Multi-course lunch on the foredeck. Afternoon sail back to MDR. Disembark 5:00 PM. Captain and crew included.",
    priceFrom: "From $295/pp",
    buyoutPrice: "$3,200 buyout",
    basePrice: 295,
    duration: "8 Hours · Day Sail",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "standard",
    heroImage: "/images/voyages/mini-digital-detox.jpg",
    cardImage: "/images/voyages/mini-digital-detox.jpg",
    itinerary: [
      { time: "9:00 AM", title: "Boarding", description: "Light breakfast underway. Out of the marina by 9:30." },
      { time: "10:30 AM", title: "Anchor at Malibu", description: "Quiet cove. Water toys deploy. Coffee on deck." },
      { time: "1:00 PM", title: "Lunch on Foredeck", description: "Multi-course meal at anchor." },
      { time: "3:00 PM", title: "Afternoon Sail Home", description: "Wind on our back. Cocktails optional." },
      { time: "5:00 PM", title: "Disembark", description: "Return to Marina Del Rey." },
    ],
    included: [
      "Captain and deckhand",
      "Breakfast and a three-course lunch",
      "Non-alcoholic beverages",
      "Tender, two paddleboards, snorkel, kneeboard, wakeboard",
      "All fuel and slip",
    ],
    addOns: [
      { name: "Premium Bar Service", price: "+$350", description: "Spirits, cocktails, and wine for the day." },
      { name: "Sunset Extension to 7 PM", price: "+$600", description: "Stay out for the sunset and a drink at anchor." },
      { name: "Onboard Photographer", price: "+$800", description: "Four hours of lifestyle photography." },
      { name: "Full Buyout", price: "$3,200", description: "Reserve the entire boat for your group of up to 6." },
    ],
  },

  {
    slug: "breathwork-at-sea",
    name: "Breathwork at Sea",
    category: "wellness",
    tagline: "Four hours. Two sessions. Your nervous system, recalibrated.",
    paragraph:
      "Phones surrendered at boarding. Donna leads two breathwork sessions — one on the foredeck after we leave the marina, one at anchor as the sun begins to drop. Between, a plant-forward lunch from Josh's galley, time to swim or read or simply not be available. The return sail is the practice itself. You disembark recalibrated.",
    fullDescription:
      "Four-hour breathwork retreat for up to six guests. Boarding 1:00 PM. Phones into Faraday pouches. Departure breathwork session led by Donna Otten, certified breathwork instructor. Sail to a quiet anchorage off Malibu. Plant-forward lunch from Josh's galley. Ninety minutes of unstructured time — swim, read, rest. Second breathwork and meditation session as the sun lowers. Return sail. Phones back at disembarkation. Off the dock by 5:00 PM.",
    priceFrom: "From $295/pp",
    buyoutPrice: "$1,600 buyout",
    basePrice: 295,
    duration: "4 Hours",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "standard",
    heroImage: "/images/vessel/vessel-helm.jpg",
    cardImage: "/images/vessel/vessel-helm.jpg",
    itinerary: [
      { time: "1:00 PM", title: "Boarding & Phone Surrender", description: "Phones into Faraday pouches. Brief introduction from Donna." },
      { time: "1:30 PM", title: "Departure Breathwork", description: "First session on the foredeck as we leave the marina." },
      { time: "2:30 PM", title: "Anchor at Malibu", description: "Plant-forward lunch on the foredeck." },
      { time: "3:30 PM", title: "Unstructured Time", description: "Ninety minutes. Swim, read, rest. Not available." },
      { time: "4:30 PM", title: "Sunset Practice", description: "Second breathwork plus closing meditation." },
      { time: "5:00 PM", title: "Disembark", description: "Phones returned. Back on the dock." },
    ],
    included: [
      "Two breathwork sessions with Donna",
      "Plant-forward lunch from the galley",
      "Faraday pouches for digital quarantine",
      "Non-alcoholic beverages",
      "Swim gear and towels",
      "All fuel and slip",
    ],
    addOns: [
      { name: "Sound Bath Extension", price: "+$400", description: "A 45-minute crystal-bowl sound bath added to the afternoon." },
      { name: "Sunset Dinner Extension", price: "+$650", description: "Extends to 8:00 PM with chef-prepared dinner aboard." },
      { name: "Full Buyout", price: "$1,600", description: "Reserve the entire experience for your group of up to 6." },
    ],
  },

  {
    slug: "yoga-at-sea",
    name: "Yoga at Sea",
    category: "wellness",
    tagline: "Four hours. A foredeck. Donna at the front of the mat.",
    paragraph:
      "Boarding at eight. Coffee while we leave the marina. By nine we're at anchor in a cove off Malibu, mats laid across the foredeck, the only sound the rigging and water against the hull. Donna leads ninety minutes of mat work — vinyasa, mobility, and a closing meditation. Breakfast served at the aft table. We sail home for noon.",
    fullDescription:
      "Four-hour foredeck yoga experience for up to six guests. Boarding 8:00 AM. Coffee and pastries underway. Anchor in a Malibu cove by 9:00. Ninety-minute vinyasa and mobility session led by Donna Otten on the 27-foot beam — the foredeck is the studio. Breakfast served at anchor. Return sail to MDR by noon. Mats, blocks, and towels provided.",
    priceFrom: "From $295/pp",
    buyoutPrice: "$1,600 buyout",
    basePrice: 295,
    duration: "4 Hours",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "tertiary",
    heroImage: "/images/vessel/vessel-helm.jpg",
    cardImage: "/images/vessel/vessel-helm.jpg",
    itinerary: [
      { time: "8:00 AM", title: "Boarding", description: "Coffee and pastries underway. Out of the marina by 8:15." },
      { time: "9:00 AM", title: "Anchor & Set Up", description: "Mats roll out on the foredeck." },
      { time: "9:15 AM", title: "Practice", description: "Ninety minutes — vinyasa, mobility, breath, closing meditation." },
      { time: "10:45 AM", title: "Breakfast", description: "At the aft table. Eggs, grains, fruit, espresso." },
      { time: "11:30 AM", title: "Return Sail", description: "Slow sail home." },
      { time: "12:00 PM", title: "Disembark", description: "Back on the dock by noon." },
    ],
    included: [
      "Ninety-minute foredeck yoga led by Donna",
      "Mats, blocks, and towels",
      "Breakfast at anchor",
      "Coffee, tea, espresso",
      "All fuel and slip",
    ],
    addOns: [
      { name: "Sound Bath Closer", price: "+$400", description: "A 45-minute crystal-bowl sound bath after the practice." },
      { name: "Private Instruction", price: "+$500", description: "One-on-one session with Donna in lieu of group practice." },
      { name: "Full Buyout", price: "$1,600", description: "Reserve for your group of up to 6." },
    ],
  },

  {
    slug: "business-meetings",
    name: "Business Meetings",
    category: "business",
    tagline: "Half-day or full-day offsite. Six people, one table, no distractions.",
    paragraph:
      "A working day that doesn't feel like one. The saloon converts to a conference table; the aft deck becomes the long-lunch room. Starlink keeps you online when you need to be — and the boat is at anchor when you'd rather not be. Multi-course lunch from Josh's galley. Six people, six chairs, one decision made by the time you're back on the dock.",
    fullDescription:
      "Half-day (4 hours) or full-day (8 hours) private charter configured for working sessions. Up to 6 guests. Saloon table converts to a six-person conference setup; A/V available via airplay to the saloon screen. Starlink for high-speed connectivity at anchor or underway. Multi-course working lunch from Josh's galley. Either dockside, underway, or at anchor — your call.",
    priceFrom: "From $2,800",
    buyoutPrice: "$2,800 half-day · $4,400 full-day",
    basePrice: 2800,
    duration: "4 or 8 Hours",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "tertiary",
    heroImage: "/images/vessel/galley.jpg",
    cardImage: "/images/vessel/galley.jpg",
    itinerary: [
      { time: "Hour 0", title: "Boarding & Set Up", description: "Saloon configured for your session. Coffee, espresso, water." },
      { time: "Hour 1", title: "Lines Off (Optional)", description: "Underway if you'd prefer — or stay dockside." },
      { time: "Mid-Day", title: "Working Lunch", description: "Multi-course lunch from Josh's galley. The conversation doesn't stop." },
      { time: "Afternoon", title: "Anchor & Continue", description: "Drop anchor in a quiet cove. The deck becomes a break room." },
      { time: "Return", title: "Disembark", description: "Off the dock by your agreed time." },
    ],
    included: [
      "Captain and crew for the full day",
      "Working breakfast and lunch",
      "Espresso, tea, sparkling water all day",
      "Starlink connectivity",
      "Saloon A/V setup with AirPlay",
      "Slip, fuel, and tax",
    ],
    addOns: [
      { name: "Premium Bar Service (After Hours)", price: "+$350", description: "If the day extends into cocktails and dinner." },
      { name: "Group Dinner Extension", price: "+$1,200", description: "Stay aboard for a six-course dinner after the working day." },
      { name: "Whiteboard & Print Setup", price: "+$200", description: "Physical whiteboard, supplies, on-board printer." },
      { name: "Photographer", price: "+$600", description: "On-brand team and product photography during the day." },
    ],
  },

  {
    slug: "small-events",
    name: "Small Events",
    category: "events",
    tagline: "Anniversary, milestone, engagement, proposal. Six guests, one occasion.",
    paragraph:
      "Some occasions deserve more than a restaurant reservation. We've hosted thirtieth-birthday lunches, anniversary dinners, two proposals, and one engagement party — all built around the same constraint: six people, a multi-course meal from Josh, and a coastline as the room. Tell us the occasion. We build the day.",
    fullDescription:
      "Four-to-six hour private event charter for up to six guests. Built around a specific occasion: milestone birthday, anniversary, proposal, engagement, retirement, celebration of life. Menu, route, and on-board program built in a 20-minute call. Florals and signage available. Photography included on most packages.",
    priceFrom: "From $3,600",
    buyoutPrice: "$3,600 base",
    basePrice: 3600,
    duration: "4–6 Hours",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "tertiary",
    heroImage: "/images/voyages/couples-staycation.jpg",
    cardImage: "/images/voyages/couples-staycation.jpg",
    itinerary: [
      { time: "Step 1", title: "Tell Us the Occasion", description: "20-minute call. The date, the people, what the moment is for." },
      { time: "Step 2", title: "Proposal Within 24 Hours", description: "Tailored menu, route, florals, program." },
      { time: "Step 3", title: "Refine Together", description: "We adjust until it's right." },
      { time: "Step 4", title: "Confirm", description: "50% deposit holds the date." },
      { time: "Day Of", title: "Show Up", description: "Everything else is handled." },
    ],
    included: [
      "Captain and full crew",
      "Multi-course chef-built menu",
      "Custom florals on the table",
      "Welcome cocktails or mocktails",
      "Two hours of onboard photography",
      "All fuel and slip",
    ],
    addOns: [
      { name: "Live Musician", price: "+$700", description: "Acoustic guitar, harpist, or string duo aboard for two hours." },
      { name: "Sommelier", price: "+$650", description: "Wine pairings curated to the menu." },
      { name: "Custom Signage / Printables", price: "+$250", description: "Menu cards, place cards, signage in the brand voice." },
      { name: "Full-Day Extension", price: "+$1,800", description: "Extend to a full eight-hour day with breakfast and afternoon sail." },
    ],
  },

  {
    slug: "private-charter",
    name: "Private Charter",
    category: "charter",
    tagline: "Tell us what your day looks like. We build it.",
    paragraph:
      "The catch-all. A friend group that wants a long lunch and a swim. A film crew that needs the boat for a day shoot. A grandfather taking his grandchildren out for the first time. We build the day around what you're trying to do — within the limits of a 51-foot catamaran, six guests, and the Pacific.",
    fullDescription:
      "A custom 1- or 2-day private charter for up to 6 guests. Available year-round, Friday through Monday. Menu, route, on-board program, and add-ons designed together in a 30-minute call. Photography, wellness instructors, and sommelier available on request.",
    priceFrom: "From $2,950",
    buyoutPrice: "$2,950 day · $4,400 overnight",
    basePrice: 2950,
    duration: "1 or 2 Days",
    maxGuests: 6,
    season: "Year-round",
    departurePort: "Marina Del Rey",
    homepageLayout: "tertiary",
    heroImage: "/images/vessel/vessel-aft.jpg",
    cardImage: "/images/vessel/vessel-aft.jpg",
    itinerary: [
      { time: "Step 1", title: "Begin Conversation", description: "Tell us about the day, the group, what you'd like to feel." },
      { time: "Step 2", title: "Proposal Within 1 Day", description: "Tailored itinerary, menu, add-ons." },
      { time: "Step 3", title: "Refine Together", description: "We adjust until it's right." },
      { time: "Step 4", title: "Confirm & Reserve", description: "50% deposit holds the date." },
      { time: "Day Of", title: "Show Up", description: "Everything else is handled." },
    ],
    included: [
      "Captain and crew",
      "Customized meals from Josh's galley",
      "All non-alcoholic beverages",
      "Water toys per occasion",
      "Photography and program add-ons available",
    ],
    addOns: [
      { name: "Wellness Instructor", price: "+$400", description: "Donna or visiting practitioner for the day." },
      { name: "Wine Pairings", price: "+$95/pp", description: "Three pairings curated to the menu." },
      { name: "Photographer", price: "+$800", description: "Lifestyle photography aboard for four hours." },
      { name: "Overnight Extension", price: "+$1,450", description: "Stay aboard a second night with breakfast and lunch." },
    ],
  },
];

/**
 * Helper: fetch a single experience by slug.
 */
export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

/**
 * Helper: filter experiences by category.
 */
export function getExperiencesByCategory(category: ExperienceCategory) {
  return experiences.filter((e) => e.category === category);
}
