/**
 * Excursions — multi-day destination voyages.
 *
 * Excursions are the long-form offerings: multi-day passages between
 * named ports, often requiring a flight. Catalina launches with the
 * brand in 2026; Mexico and the Pacific Northwest open in 2028; the
 * Mediterranean and Caribbean follow in 2029.
 *
 * For shorter local experiences out of Marina Del Rey, see /content/experiences.ts.
 *
 * EDITING NOTES:
 *   - Change a price → edit `priceFrom` here.
 *   - Adjust the expansion timeline → edit `launchYear`.
 *   - Pricing on the 2028/2029 routes is provisional and flagged with
 *     `// TODO: confirm pricing once route is operationally scoped`.
 */

export type ExcursionRegion =
  | "california"
  | "mexico"
  | "pacific-northwest"
  | "mediterranean"
  | "caribbean";

export type ExcursionStatus = "now-booking" | "coming-soon" | "future";

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

export interface Waypoint {
  /** Display name */
  name: string;
  /** Short region label */
  region: string;
  /** Mini description — one sentence */
  description: string;
}

export interface Excursion {
  /** URL slug: /excursions/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** Region grouping */
  region: ExcursionRegion;
  /** One-line teaser for cards */
  tagline: string;
  /** Lede paragraph for detail page */
  paragraph: string;
  /** Long-form description */
  fullDescription: string;
  /** Display price */
  priceFrom: string;
  /** Per-couple option if buyout is sold in halves/thirds */
  perCouplePrice?: string;
  /** Internal numeric */
  basePrice: number;
  /** Duration string */
  duration: string;
  /** Max guests */
  maxGuests: number;
  /** Cruising season window */
  season: string;
  /** Port of departure */
  portOfDeparture: string;
  /** Port of return (may differ from departure for one-way passages) */
  portOfReturn: string;
  /** Nearest airport for guests flying in */
  airport: string;
  /** Year this excursion opens to bookings */
  launchYear: 2026 | 2027 | 2028 | 2029;
  /** Booking status */
  status: ExcursionStatus;
  /** Hero image */
  heroImage: string;
  /** Card image */
  cardImage: string;
  /** Stops along the route */
  waypoints: Waypoint[];
  /** Day-by-day itinerary */
  itinerary: ItineraryStep[];
  /** What's included */
  included: string[];
  /** Add-ons offered */
  addOns: AddOn[];
}

export const excursions: Excursion[] = [
  {
    slug: "catalina",
    name: "Catalina Excursion",
    region: "california",
    tagline: "Three days. Two nights. Six guests at the Mediterranean of California.",
    paragraph:
      "Friday afternoon we leave Marina Del Rey. By the time the sun drops you're anchored off Avalon, drink in hand, a different evening than the one you'd be having on land. Saturday: morning breathwork, ashore for the village, an afternoon at Two Harbors. Two dinners from Josh's galley. Sunday morning, slow coffee, one last swim, and home by six.",
    fullDescription:
      "Three days, two nights, six guests, full hospitality. Friday: depart MDR 1:00 PM, arrive Avalon by sunset, welcome cocktails and dinner aboard. Saturday: morning breathwork on deck, ashore for guided exploration of Avalon, afternoon sail to Twin Harbors, anchor for swim and water toys, dinner aboard. Sunday: slow morning, optional shore excursion or breathwork, depart Catalina by noon, arrive MDR by 6:00 PM. Captain, deckhand, all meals, beverages, and shore-tender service included.",
    priceFrom: "From $14,500 buyout",
    perCouplePrice: "$4,950/couple",
    basePrice: 14500,
    duration: "3 Days · 2 Nights",
    maxGuests: 6,
    season: "May–October",
    portOfDeparture: "Marina Del Rey",
    portOfReturn: "Marina Del Rey",
    airport: "LAX (drive 7 mi to MDR)",
    launchYear: 2026,
    status: "now-booking",
    heroImage: "/images/voyages/catalina-excursion.jpg",
    cardImage: "/images/voyages/catalina-excursion.jpg",
    waypoints: [
      { name: "Marina Del Rey", region: "California", description: "Our home port. Lines off Friday at 1 PM sharp." },
      { name: "Avalon", region: "Catalina Island", description: "The signature village. Friday night anchor under the Casino's lights." },
      { name: "Two Harbors", region: "Catalina Island", description: "Wilder, quieter. Saturday afternoon swim, snorkel, dinner at anchor." },
    ],
    itinerary: [
      { time: "Fri 1:00 PM", title: "Depart Marina Del Rey", description: "Boarding, safety brief, underway by 1:30 PM." },
      { time: "Fri 6:00 PM", title: "Anchor at Avalon", description: "Welcome cocktails as the village lights come on." },
      { time: "Fri 7:30 PM", title: "Dinner Aboard", description: "First six-course dinner from Josh's galley." },
      { time: "Sat 7:30 AM", title: "Breathwork on Deck", description: "Sunrise session with Donna on the foredeck." },
      { time: "Sat 10:00 AM", title: "Avalon Ashore", description: "Tender to the village; guided walk and free time." },
      { time: "Sat 2:00 PM", title: "Sail to Two Harbors", description: "Two-hour passage along the lee shore of Catalina." },
      { time: "Sat 5:00 PM", title: "Anchor & Swim", description: "SUP, snorkel, kneeboard; sunset cocktails." },
      { time: "Sat 7:00 PM", title: "Dinner at Anchor", description: "Second multi-course dinner. Candles. Stars." },
      { time: "Sun 8:00 AM", title: "Slow Morning", description: "Coffee, optional breathwork or swim." },
      { time: "Sun 12:00 PM", title: "Depart Catalina", description: "Underway for Marina Del Rey." },
      { time: "Sun 6:00 PM", title: "Disembark", description: "Return to home port." },
    ],
    included: [
      "Captain and deckhand for the full voyage",
      "Six on-board meals (two dinners, two breakfasts, two lunches)",
      "All beverages including wine and cocktails",
      "Tender service to and from shore at Catalina",
      "Two breathwork sessions with Donna",
      "Water toys: SUP, snorkel, kneeboard",
      "Bedding, towels, toiletries",
      "All fuel, slip, mooring fees",
    ],
    addOns: [
      { name: "Per-Couple Pricing", price: "$4,950/couple", description: "If filling three couples to one trip rather than buying out." },
      { name: "Sunset Sommelier", price: "+$800", description: "Visiting sommelier for the Saturday dinner." },
      { name: "Catalina Photographer", price: "+$1,200", description: "Two-day on-board photography." },
      { name: "Avalon Hotel Extension", price: "From $400", description: "Pre- or post-voyage night at Mt Ada or Pavilion Hotel." },
    ],
  },

  {
    slug: "puerto-vallarta",
    name: "Puerto Vallarta",
    region: "mexico",
    tagline: "Seven days through Banderas Bay. La Cruz to Yelapa, by way of Sayulita.",
    paragraph:
      "You fly into PVR on a Sunday morning. By Sunday night you're anchored off Sayulita, surf town lights flickering through the rigging, ceviche on the foredeck. The week unfolds at four knots: La Cruz markets, Yelapa with no road in, Las Caletas at the bottom of the bay. Seven days, six guests, two cuisines from Josh's galley, and a coastline that doesn't show up on Instagram.",
    fullDescription:
      "Seven-day, six-night charter through Banderas Bay and the Riviera Nayarit. Boarding Sunday afternoon at La Cruz Marina. Cruising loop: La Cruz → Sayulita → Nuevo Vallarta → Yelapa → Las Caletas → La Cruz. Two breathwork sessions with Donna. Daily fresh-caught lunch. All onshore tender service. Disembark following Sunday morning. Flight separate; we can recommend hotels in PV for pre-/post-trip stays.",
    priceFrom: "From $32,000 buyout",
    perCouplePrice: "$11,500/couple",
    basePrice: 32000,
    duration: "7 Days · 6 Nights",
    maxGuests: 6,
    season: "November–April",
    portOfDeparture: "La Cruz de Huanacaxtle",
    portOfReturn: "La Cruz de Huanacaxtle",
    airport: "PVR (drive 25 min to La Cruz)",
    launchYear: 2028,
    status: "coming-soon",
    heroImage: "/images/voyages/mini-digital-detox.jpg",
    cardImage: "/images/voyages/mini-digital-detox.jpg",
    waypoints: [
      { name: "La Cruz", region: "Riviera Nayarit", description: "Sunday boarding and Saturday return. The market on the malecón is the trip's spine." },
      { name: "Sayulita", region: "Riviera Nayarit", description: "Surf town. Sunday and Friday night anchor — the lights, the music, the ceviche." },
      { name: "Nuevo Vallarta", region: "Banderas Bay", description: "Mid-week anchor for marina services and a quiet swim morning." },
      { name: "Yelapa", region: "Southern Bay", description: "No road in. The kind of cove where dinner happens by candlelight on the foredeck." },
      { name: "Las Caletas", region: "Southern Bay", description: "The southern wall of Banderas Bay. Sea turtles, jungle, an empty beach at sunrise." },
    ],
    itinerary: [
      { time: "Sun PM", title: "Board La Cruz", description: "Arrive PVR, transfer 25 min to La Cruz. Boarding by 4 PM. Welcome dinner aboard." },
      { time: "Mon", title: "La Cruz → Sayulita", description: "Morning market run. Short sail north to Sayulita. Sunset surf-town anchor." },
      { time: "Tue", title: "Sayulita day", description: "Morning yoga with Donna. Ashore for the village. Sunset sail south." },
      { time: "Wed", title: "Sayulita → Nuevo Vallarta", description: "Beam reach south. Anchor at Nuevo for marina morning Thursday." },
      { time: "Thu", title: "Nuevo → Yelapa", description: "Across the bay. Two-hour crossing. Anchor under the cliffs of Yelapa by 5 PM." },
      { time: "Fri", title: "Yelapa → Las Caletas", description: "Sea turtles at dawn. A short hop east to Las Caletas. Beach barbecue ashore." },
      { time: "Sat", title: "Las Caletas → Sayulita", description: "Long sail back north. One last night under the Sayulita lights." },
      { time: "Sun AM", title: "Sayulita → La Cruz · Disembark", description: "Short sail home. Off the boat by 10 AM for afternoon flights." },
    ],
    included: [
      "Captain, deckhand, and host for the full voyage",
      "All 6 dinners, 7 lunches, 7 breakfasts",
      "Beer, wine, mezcal, agua frescas all day",
      "Two breathwork sessions with Donna",
      "Tender service ashore at every stop",
      "Marina fees, slip, fuel, port taxes",
      "Spanish-speaking onshore concierge",
    ],
    addOns: [
      { name: "Photographer (3 days)", price: "+$2,400", description: "Local lifestyle photographer aboard three days." },
      { name: "Surf Lessons (Sayulita)", price: "+$200/pp", description: "Two private lessons with a Sayulita pro." },
      { name: "Hotel Extension (La Cruz)", price: "From $350/night", description: "Pre- or post-voyage night at one of our partner hotels." },
      { name: "Whale Watching Day (Jan–Mar)", price: "+$1,200", description: "Add a humpback-tracking sail during whale season." },
    ],
  },

  {
    slug: "inside-passage",
    name: "Inside Passage",
    region: "pacific-northwest",
    tagline: "Ten days from Seattle to Campbell River. Through the San Juans, around Vancouver Island.",
    paragraph:
      "A summer passage up the inside of Vancouver Island. The first night we anchor in the San Juans, the trees closer to the boat than they should be. Day two through the Strait of Georgia. By day five we're in Desolation Sound, swimming in the warmest saltwater north of Mexico. Eagles at the masthead. Bears on the beach at low tide. We disembark in Campbell River having seen the Pacific without seeing the Pacific.",
    fullDescription:
      "Ten-day one-way passage from Seattle through the San Juan Islands, across the Strait of Georgia, up the inside of Vancouver Island, into Desolation Sound, and on to Campbell River. Boarding Monday afternoon at Shilshole Bay Marina, Seattle. Disembark Wednesday following week at Discovery Harbour Marina, Campbell River. Six guests, captain and deckhand. Cool-weather voyage; expect 55–75°F by day, 45–60°F by night. Down jackets and base layers recommended.",
    priceFrom: "From $45,000 buyout",
    basePrice: 45000,
    duration: "10 Days · 9 Nights",
    maxGuests: 6,
    season: "June–August",
    portOfDeparture: "Seattle (Shilshole)",
    portOfReturn: "Campbell River, BC",
    airport: "SEA in · YBL out",
    launchYear: 2028,
    status: "coming-soon",
    heroImage: "/images/vessel/vessel-helm.jpg",
    cardImage: "/images/vessel/vessel-helm.jpg",
    waypoints: [
      { name: "Shilshole Bay, Seattle", region: "Washington", description: "Monday boarding. The first night underway through Puget Sound." },
      { name: "San Juan Islands", region: "Washington", description: "Two nights in the islands. Friday Harbor for resupply, Roche Harbor for the quiet." },
      { name: "Strait of Georgia", region: "BC / Canada", description: "Day-long crossing into Canadian waters. CBSA check-in at Bedwell Harbour." },
      { name: "Princess Louisa Inlet", region: "Sunshine Coast", description: "Through the Malibu Rapids at slack water. Anchor under Chatterbox Falls." },
      { name: "Desolation Sound", region: "Northern Sunshine Coast", description: "Two nights. The warmest saltwater swimming north of Mexico." },
      { name: "Campbell River", region: "Vancouver Island", description: "Final disembarkation. The boat continues north for delivery." },
    ],
    itinerary: [
      { time: "Day 1 — Mon", title: "Board Seattle · Cross to Friday Harbor", description: "Boarding Shilshole 1 PM. Overnight sail through Puget Sound." },
      { time: "Day 2 — Tue", title: "San Juans Layover", description: "Friday Harbor day. Customs prep. Sunset at Roche Harbor." },
      { time: "Day 3 — Wed", title: "Cross to Canada", description: "Strait of Georgia crossing. CBSA at Bedwell Harbour. Anchor at Pender." },
      { time: "Day 4 — Thu", title: "Up the Sunshine Coast", description: "Long sail north. Anchor at Pender Harbour for the night." },
      { time: "Day 5 — Fri", title: "Into Princess Louisa", description: "Through Malibu Rapids at slack. Two nights at the head of the inlet." },
      { time: "Day 6 — Sat", title: "Chatterbox Falls Day", description: "Shore tender, hike, swim, breathwork at anchor." },
      { time: "Day 7 — Sun", title: "Princess Louisa → Desolation Sound", description: "Out through the rapids on the morning slack. Two-night anchor in the Sound." },
      { time: "Day 8 — Mon", title: "Desolation Sound Day", description: "Warmest saltwater on the BC coast. Swim morning. Group dinner ashore at Refuge Cove." },
      { time: "Day 9 — Tue", title: "Sound → Discovery Passage", description: "Through Discovery Passage at slack. Anchor in Quadra Island." },
      { time: "Day 10 — Wed", title: "Discovery → Campbell River · Disembark", description: "Short morning sail. Off the boat by 11 AM at Discovery Harbour. Float plane back to YVR or drive south to Nanaimo." },
    ],
    included: [
      "Captain and deckhand for the full ten days",
      "9 dinners, 10 lunches, 9 breakfasts",
      "All beverages: wine, beer, cocktails, espresso",
      "Two breathwork sessions with Donna",
      "Tender to all shore excursions",
      "Foul-weather gear and base layers if needed",
      "Customs (CBSA) prep and check-in support",
      "All fuel, moorage, lockage, and ports",
    ],
    addOns: [
      { name: "Float Plane Return (Campbell River → YVR)", price: "+$650/pp", description: "Forty-minute scenic flight back to Vancouver International." },
      { name: "Wildlife Naturalist Aboard", price: "+$3,200", description: "Local biologist joins for the Princess Louisa and Desolation segments." },
      { name: "Photographer (5 days)", price: "+$4,800", description: "Pacific Northwest landscape photographer for the wild stretch." },
      { name: "Hotel Pre-Stay (Seattle)", price: "From $380/night", description: "Pre-voyage night at the Ballard Inn near the marina." },
    ],
  },

  {
    slug: "greek-islands",
    name: "Greek Islands",
    region: "mediterranean",
    tagline: "Seven days through the Cyclades. Athens out, Milos back.",
    paragraph:
      "You fly into Athens on a Saturday. Sunday morning we leave Lavrion and by Sunday afternoon you're anchored off Kea, eating grilled octopus with your feet in the water. The week is a loop through the Cyclades — Kythnos, Serifos, Sifnos, Milos — anchored each night in a different cove, dining on different decks, watching different lights come up on different cliffs. Seven days. Six guests. The Aegean as it was meant to be sailed.",
    fullDescription:
      "Seven-day, six-night Cyclades loop sailing out of Lavrion, near Athens. Itinerary: Lavrion → Kea → Kythnos → Serifos → Sifnos → Milos → Kythnos → Lavrion. Six guests, captain and deckhand. Provisioning is local at every stop — Sifnos cheeses, Milos figs, fresh fish from whatever came in that morning. Boarding Sunday morning, disembark following Saturday at noon. Flights separate; Athens is a sensible pre- or post-trip stay.",
    priceFrom: "From $32,000 buyout",
    perCouplePrice: "$11,500/couple",
    basePrice: 32000,
    duration: "7 Days · 6 Nights",
    maxGuests: 6,
    season: "May–October",
    portOfDeparture: "Lavrion (Athens)",
    portOfReturn: "Lavrion (Athens)",
    airport: "ATH (drive 35 min to Lavrion)",
    launchYear: 2029,
    status: "future",
    heroImage: "/images/voyages/couples-staycation.jpg",
    cardImage: "/images/voyages/couples-staycation.jpg",
    waypoints: [
      { name: "Lavrion", region: "Attica", description: "Departure port, 35 minutes from Athens. The Cyclades open to the southeast." },
      { name: "Kea", region: "Western Cyclades", description: "The closest of the Cyclades. First-night anchor at Vourkari." },
      { name: "Kythnos", region: "Western Cyclades", description: "Kolona — the double-bay sand-bar anchorage. Sunset swim from the boat." },
      { name: "Serifos", region: "Western Cyclades", description: "Quiet island, hilltop chora. Dinner ashore at Livadi." },
      { name: "Sifnos", region: "Western Cyclades", description: "Pottery, cheese, slow lunch at Vathy bay. Two nights here." },
      { name: "Milos", region: "Cyclades Southwest", description: "The wild one. Kleftiko sea-caves by tender. Sarakiniko at sunrise." },
    ],
    itinerary: [
      { time: "Sun AM", title: "Board Lavrion", description: "Arrive ATH, transfer to Lavrion. Boarding by 10 AM. Underway to Kea by noon." },
      { time: "Sun PM", title: "Kea — Vourkari", description: "Anchor by 4 PM. Sunset swim. Dinner ashore at Aristos." },
      { time: "Mon", title: "Kea → Kythnos", description: "Morning passage. Anchor at Kolona by 2 PM. Swim through the sandbar." },
      { time: "Tue", title: "Kythnos → Serifos", description: "Half-day sail south. Anchor at Livadi. Hilltop dinner ashore at the chora." },
      { time: "Wed", title: "Serifos → Sifnos", description: "Short sail to Vathy bay, Sifnos. Slow afternoon. Two-night anchorage." },
      { time: "Thu", title: "Sifnos Day", description: "Yoga with Donna on the foredeck. Pottery and cheese run ashore. Anchor dinner." },
      { time: "Fri", title: "Sifnos → Milos", description: "Two-hour passage. Anchor at Kleftiko by 3 PM. Sea-cave tender excursion." },
      { time: "Sat AM", title: "Milos → Lavrion · Disembark", description: "Overnight passage Friday into Saturday morning. Off the boat by noon for afternoon flights." },
    ],
    included: [
      "Captain, deckhand, and Greek-speaking host",
      "All 6 dinners, 7 lunches, 7 breakfasts",
      "Local wine, ouzo, beer, sparkling water",
      "Two breathwork sessions with Donna",
      "Tender service ashore at every stop",
      "All harbor fees, slip, fuel, taxes",
      "Local provisioning at every port",
    ],
    addOns: [
      { name: "Athens Pre-Trip Day", price: "+$1,800", description: "Private guided day in Athens — Acropolis, Plaka dinner, transfer to Lavrion morning of." },
      { name: "Photographer (4 days)", price: "+$3,200", description: "Cycladic light is unreal. Worth capturing." },
      { name: "Cooking Class on Sifnos", price: "+$650", description: "Three-hour traditional class with a Sifniot family." },
      { name: "Mykonos Detour", price: "+$1,400", description: "Add a one-night Mykonos anchor between Sifnos and Milos." },
    ],
  },

  {
    slug: "bvi",
    name: "British Virgin Islands",
    region: "caribbean",
    tagline: "Seven days through Tortola, Virgin Gorda, Anegada. The Sir Francis Drake Channel and its coves.",
    paragraph:
      "You fly into Tortola on a Saturday. We board you at Road Town by mid-afternoon and by sunset you're at Norman Island, snorkeling the Indians, the boat anchored over thirty feet of glass. The week threads through the Sir Francis Drake Channel — the Baths at Virgin Gorda, lobster ashore at Anegada, the Soggy Dollar at Jost Van Dyke — and you anchor each night somewhere you'd want to wake up.",
    fullDescription:
      "Seven-day, six-night BVI charter out of Road Town, Tortola. Loop itinerary: Road Town → Norman Island → Virgin Gorda (the Baths) → Anegada → Jost Van Dyke → Cane Garden Bay → Road Town. Six guests, captain and deckhand. Snorkel gear, paddleboards, kneeboard, and wakeboard aboard for the full trip. Provisioning is heavy on local: West Indian conch, Anegada lobster, locally caught wahoo. Disembarkation Saturday morning by 10 AM.",
    priceFrom: "From $34,000 buyout",
    perCouplePrice: "$12,000/couple",
    basePrice: 34000,
    duration: "7 Days · 6 Nights",
    maxGuests: 6,
    season: "November–May",
    portOfDeparture: "Road Town, Tortola",
    portOfReturn: "Road Town, Tortola",
    airport: "EIS (Beef Island, 25 min to Road Town)",
    launchYear: 2029,
    status: "future",
    heroImage: "/images/voyages/catalina-excursion.jpg",
    cardImage: "/images/voyages/catalina-excursion.jpg",
    waypoints: [
      { name: "Road Town", region: "Tortola", description: "Departure port. Saturday boarding and Saturday return." },
      { name: "Norman Island", region: "Sir Francis Drake Channel", description: "The Indians, the Caves. First-night snorkel. The original Treasure Island." },
      { name: "Virgin Gorda", region: "BVI East", description: "The Baths at first light. Spanish Town for ice." },
      { name: "Anegada", region: "BVI North", description: "Flat coral island. Lobster ashore. The only island with a horizon you can see all of." },
      { name: "Jost Van Dyke", region: "BVI West", description: "Foxy's, the Soggy Dollar, White Bay. The Caribbean as it sells itself." },
      { name: "Cane Garden Bay", region: "Tortola North", description: "Quiet last anchorage before the return to Road Town." },
    ],
    itinerary: [
      { time: "Sat PM", title: "Board Road Town · Sail to Norman", description: "Arrive EIS, transfer to Road Town. Boarding by 2 PM. Sail to Norman Island. Sunset snorkel at the Indians." },
      { time: "Sun", title: "Norman → Virgin Gorda", description: "Morning sail east. Anchor at the Baths by 11 AM. Lunch ashore. Afternoon to Spanish Town." },
      { time: "Mon", title: "Virgin Gorda → Anegada", description: "Half-day sail north. Anchor by 3 PM. Lobster ashore at sunset." },
      { time: "Tue", title: "Anegada Day", description: "Morning yoga with Donna. Ashore for the salt ponds and flamingos." },
      { time: "Wed", title: "Anegada → Jost Van Dyke", description: "Long downwind sail. Anchor at Great Harbour. Foxy's evening." },
      { time: "Thu", title: "Jost → Cane Garden Bay", description: "Morning at White Bay. Short hop to Cane Garden Bay for the last night." },
      { time: "Fri", title: "Cane Garden Day", description: "Slow morning. Surf lesson if conditions cooperate. Final dinner aboard." },
      { time: "Sat AM", title: "Cane Garden → Road Town · Disembark", description: "Short sail back. Off the boat by 10 AM for afternoon flights." },
    ],
    included: [
      "Captain and deckhand for the full week",
      "All 6 dinners, 7 lunches, 7 breakfasts",
      "Beer, rum, wine, sparkling water all week",
      "Two breathwork sessions with Donna",
      "Snorkel gear, two paddleboards, kneeboard, wakeboard",
      "Mooring fees, slip, fuel, taxes",
      "BVI customs / immigration support",
    ],
    addOns: [
      { name: "Diving (2 days, PADI)", price: "+$650/pp", description: "Two days of guided diving with a Tortola operator." },
      { name: "Photographer (3 days)", price: "+$2,400", description: "Caribbean lifestyle and underwater photographer aboard." },
      { name: "Tortola Hotel Extension", price: "From $420/night", description: "Pre- or post-voyage night at the Sugar Mill or Long Bay." },
      { name: "Anegada Lobster Feast Upgrade", price: "+$45/pp", description: "Whole-lobster feast ashore for the Anegada night." },
    ],
  },
];

/**
 * Helper: fetch a single excursion by slug.
 */
export function getExcursionBySlug(slug: string): Excursion | undefined {
  return excursions.find((e) => e.slug === slug);
}

/**
 * Helper: filter by status.
 */
export function getExcursionsByStatus(status: ExcursionStatus) {
  return excursions.filter((e) => e.status === status);
}

/**
 * Helper: group by launch year for roadmap display.
 */
export function getExcursionsByYear() {
  const grouped: Record<number, Excursion[]> = {};
  for (const excursion of excursions) {
    if (!grouped[excursion.launchYear]) grouped[excursion.launchYear] = [];
    grouped[excursion.launchYear].push(excursion);
  }
  return grouped;
}
