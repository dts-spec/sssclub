/**
 * Vessel gallery — ordered carousel of vessel photography.
 *
 * Slides are presented in a deliberate sequence: exterior at sea → boarding
 * deck → helm → social spaces (saloon, dining) → galley → master suite →
 * guest accommodations. The carousel on the Vessel section reads from here.
 *
 * EDITING NOTES:
 *   - Reorder the array to change the carousel sequence.
 *   - Replace `image` with a path under /public/images/vessel/ to swap a shot.
 *   - Captions follow brand voice — sensory specifics, verbs over adjectives.
 *   - Most current images are Lagoon 47 product renders standing in for our
 *     Lagoon 51 until the pre-launch shoot. Replace marked entries with real
 *     photography when available.
 */

export interface VesselSlide {
  id: string;
  /** Path under /public/images/vessel/ */
  image: string;
  /** Alt text — describe the scene, not the boat model */
  alt: string;
  /** Short slide title shown below the image */
  title: string;
  /** One-to-two sentence caption */
  caption: string;
}

export const vesselGallery: VesselSlide[] = [
  {
    id: "exterior",
    image: "/images/vessel/exterior-anchored.jpg",
    alt: "Catamaran anchored at the tip of a sandbar in turquoise water",
    title: "At anchor.",
    caption:
      "Twenty-seven feet of beam, anchored over thirty feet of glass. The boat is the room the rest of the day is staged from.",
  },
  {
    id: "aft-deck",
    image: "/images/vessel/vessel-aft.jpg",
    alt: "Aft deck with swim platforms deployed and cockpit lounging",
    title: "The boarding deck.",
    caption:
      "Swim platforms drop down for the water. The aft cushions become the lounge between sail and supper.",
  },
  {
    id: "helm",
    image: "/images/vessel/vessel-helm.jpg",
    alt: "Flybridge with helm station and sun pads above the cockpit",
    title: "Flybridge & helm.",
    caption:
      "The captain's office. Sun pads above the cockpit double as the yoga studio at sunrise — and the stargazing platform at midnight.",
  },
  {
    id: "aft-dining",
    image: "/images/vessel/aft-dining.jpg",
    alt: "Aft deck dining table set for six with sea view",
    title: "Six at the table.",
    caption:
      "The aft table seats six. Multi-course meals from Josh's galley arrive here, served at the slow pace of a boat at three knots.",
  },
  {
    id: "saloon-view",
    image: "/images/vessel/saloon-aft-view.jpg",
    alt: "Saloon and galley with view through to aft deck dining",
    title: "Inside out.",
    caption:
      "The saloon opens fully onto the aft deck. Twenty-eight feet of continuous living space when the doors slide back — kitchen, lounge, dinner table, sea.",
  },
  {
    id: "saloon-lounge",
    image: "/images/vessel/saloon-lounge.jpg",
    alt: "Saloon lounge area with U-shaped seating and panoramic windows",
    title: "The lounge.",
    caption:
      "U-shaped seating, three-sixty windows. The morning coffee spot, the late-night drink spot, the afternoon reading spot — depending on which way the boat is pointed.",
  },
  {
    id: "galley",
    image: "/images/vessel/galley.jpg",
    alt: "Galley kitchen with countertop and saloon view",
    title: "Josh's galley.",
    caption:
      "A working kitchen, not a yacht kitchen. Three burners, oven, the kind of counter space that makes a six-course dinner actually possible.",
  },
  {
    id: "master",
    image: "/images/vessel/master-suite.jpg",
    alt: "Master cabin with king bed and panoramic windows",
    title: "Master suite.",
    caption:
      "An owner-version cabin spanning the full beam of the starboard hull. Private head, hatch overhead, sea-level hull windows.",
  },
  {
    id: "guest-cabin",
    image: "/images/vessel/guest-cabin.jpg",
    alt: "Guest cabin with double berth and bookshelves",
    title: "Guest cabin.",
    caption:
      "One of two guest cabins, each with a double berth. Bookshelves built in. Hatches overhead for the cross-breeze at anchor.",
  },
  {
    id: "guest-ensuite",
    image: "/images/vessel/guest-cabin-ensuite.jpg",
    alt: "Guest cabin with ensuite bathroom visible",
    title: "Ensuite.",
    caption:
      "Each guest cabin has its own head. Six guests, three heads — nobody waits for a shower.",
  },
];
