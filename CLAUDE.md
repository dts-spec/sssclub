# CLAUDE.md

> This file is loaded automatically by Claude Code when you open a session in this project.
> It defines the conventions, brand, and tech that should guide everything you build.

## What This Project Is

**Sail, Supper & Soul Club** is a premium six-guest catamaran experience business operating from Marina Del Rey, California. The website is the brand's primary acquisition channel.

This is **not** a yacht charter listing site. The voice and visual design must constantly distinguish SSSC from charter, dinner-cruise, and party-boat operators. The brand sells _restoration, ritual, and a table at the water's edge_ — never "boat time."

The founders are Joshua and Donna Otten:
- **Donna** — Certified breathwork, Pilates, and meditation instructor (15+ years in LA). The wellness pillar.
- **Josh** — 25+ years sailing, experienced cook, USCG Master 100T in progress. The supper pillar.

The hard constraint that shapes everything: **never more than six guests**. This is a federal limit (PVSA / OUPV) on a foreign-built catamaran, and we've turned it into the brand's defining feature.

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, RSC by default) | File-based routing, image optimization, SEO-friendly |
| Language | **TypeScript** (strict) | Catch errors before they ship |
| Styling | **Tailwind v4** (CSS-first config in `globals.css`) | Speed, consistency with design tokens |
| Animation | **motion** (formerly Framer Motion) | Premium-feel reveals; lightweight |
| Components | **Radix UI primitives** + custom components in `/components/ui` | Accessible, headless |
| Icons | **lucide-react** | Clean, consistent line icons |
| Content | TypeScript modules in `/content` (eventually MDX for journal) | Type-safe content, no CMS needed for Year 1 |
| Deploy | **Vercel** | Free tier covers Year 1; instant deploys from GitHub |

## File Structure

```
sssc-web/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout (fonts + nav + footer)
│   ├── page.tsx               # Homepage (composes sections)
│   ├── globals.css            # Tailwind v4 @theme tokens + base styles
│   ├── voyages/               # Voyages index + [slug] detail pages
│   ├── vessel/                # Vessel detail page
│   ├── destinations/          # Destinations page
│   ├── our-story/             # Founders page
│   └── journal/               # Journal (placeholder — MDX coming)
├── components/
│   ├── nav/                   # Nav, Footer (cross-page chrome)
│   ├── sections/              # Homepage sections (Hero, Manifesto, Pillars, etc)
│   ├── shared/                # Reusable across pages (VoyageCard, VideoEmbed, RevealOnScroll)
│   └── ui/                    # Atomic UI primitives (Button)
├── content/
│   ├── voyages.ts             # All 5 voyages as structured data ★ EDIT HERE for voyage changes
│   ├── destinations.ts        # All destinations
│   ├── practitioners.ts       # Donna + Josh content
│   ├── testimonials.ts        # Guest quotes
│   └── journal/               # MDX blog posts (eventually)
├── lib/
│   ├── tokens.ts              # Design tokens as TS constants ★ SOURCE OF TRUTH for JS
│   └── utils.ts               # cn() class merger
├── public/
│   ├── images/                # Real photos go here (currently using Unsplash placeholders)
│   └── videos/                # Local video assets if/when we move off YouTube
├── docs/                      # Reference documents (brand system, architecture notes)
└── CLAUDE.md                  # This file
```

## Brand System (Critical — Read Before Designing Anything)

### Colors

All defined as Tailwind utilities in `app/globals.css` under `@theme`. **Never hardcode hex values** — always use the named token.

```
--color-ocean         #0A2540   Primary brand. Headers, footers, primary CTAs background.
--color-ocean-deep    #061829   Darker variant for hero gradient overlays.
--color-ocean-rich    #0D2E4A   Mid variant for testimonials section.
--color-teal          #2C5F70   Secondary. Eyebrow labels, link hover.
--color-gold          #C9A96E   Accent. Use SPARINGLY (<10% of any view).
                                Reserved for: italic emphasis, the Reserve CTA, decorative dividers.
--color-gold-deep     #A08454   Darker gold for on-light backgrounds.
--color-gold-soft     #D9BE89   Lighter gold for italic display headlines on dark.
--color-sand          #F5EFE6   Warm cream background, alternative to plain bone.
--color-bone          #FBF8F3   Default page background. NOT pure white.
--color-mist          #A8B5BF   Captions, decorative elements.
--color-ink           #1F2428   Body text — slightly warmer than pure black.
--color-ink-soft      #2A2D31   Softer body text variant.
```

Usage as Tailwind: `bg-ocean`, `text-gold`, `border-mist`.

Usage in TS/JS: `import { colors } from "@/lib/tokens"` → `colors.ocean`.

### Typography

Three fonts, loaded once in `app/layout.tsx`:

- **`font-display`** (Cormorant Garamond) — All headlines. Always pair with `italic` for emphasis (`text-gold` italic em tags).
- **`font-body`** (Inter) — All body copy. Default for everything not headline or mono.
- **`font-mono`** (JetBrains Mono) — Eyebrows, labels, captions, button text. The "small editorial signature" font.

Scale guidelines (use Tailwind's `clamp()` arbitrary values):

| Use | Class |
|---|---|
| Hero headline | `text-[clamp(3rem,10.5vw,10rem)] font-display font-light` |
| Section heading | `text-[clamp(2.75rem,7vw,6.5rem)] font-display` |
| Sub-heading | `text-[clamp(2rem,4vw,3.5rem)] font-display` |
| Lede (italic intro) | `text-[clamp(1.5rem,2.6vw,2.25rem)] font-display italic` |
| Body large | `text-[1.125rem] leading-[1.75] font-light` |
| Body | `text-[1.0625rem] leading-[1.65]` |
| Eyebrow | Use the `.eyebrow` utility class |

### Voice Principles

**Read every piece of copy aloud before committing.** It should sound like Josh or Donna at a dinner party — not a marketing brochure.

DO:
- "You arrive at three. We hand you a cocktail."
- "Six guests. Two days. One night."
- "Donna leads breathwork on the foredeck while we anchor."

DON'T:
- "Experience the unparalleled luxury of a curated maritime journey."
- "Indulge in a culinary journey curated by our master chef."
- "Our exclusive vessel offers an intimate experience for discerning guests."

Rules:
1. **Sensory specifics, not adjectives.** "Golden-hour" not "beautiful."
2. **Numbers over claims.** "Six courses" not "multi-course."
3. **Verbs over adjectives.** "You arrive. We hand. The boat sails."
4. **Generosity over scarcity.** Never write "limited spots" or "exclusive." The 6-guest cap is implicit.
5. **Acknowledge the practical.** Logistics, weather, parking, what to wear — real customers care about real things.
6. **Quiet confidence.** No exclamation points. The photography does the convincing.

### Visual Pacing

These rules separate this site from generic templates:

- **Generous whitespace.** Sections use `py-[clamp(5rem,11vw,10rem)]`. Don't shrink it.
- **Animations are slow.** Default ease is `cubic-bezier(0.16, 1, 0.3, 1)` (premium ease-out) over 1.2 seconds. Anything faster feels cheap.
- **Reveals are subtle.** Use `<RevealOnScroll>` with default y:40 → y:0. No bouncy springs.
- **One CTA per section.** Multiple buttons fight each other.
- **Real photography always.** Stock photo aesthetic = death. We use Unsplash as placeholders only.

## Architectural Patterns

### Content is data, not markup

The five voyages live in `content/voyages.ts` as a typed array of `Voyage` objects. To change a price, itinerary, or add-on, edit that file — never edit the JSX of the card or detail page.

```ts
// content/voyages.ts is the source of truth
export const voyages: Voyage[] = [
  { slug: "couples-staycation", priceFrom: "From $3,950", ... },
  ...
];
```

Same pattern for `destinations.ts`, `practitioners.ts`, `testimonials.ts`.

### Section components compose the homepage

`app/page.tsx` is a thin shell that imports and arranges 11 section components. Each section is self-contained and can be reused on other pages (e.g. `Vessel` appears on both `/` and `/vessel`).

### One template, two instances

The `PractitionerFeature` component is rendered twice on the homepage — once for Donna (dark variant) and once for Josh (light variant). The variant comes from the practitioner data, not props. This is the model for all "two-of-the-same-thing" UI.

### TODO comments mark image swaps

Anywhere we use Unsplash placeholder imagery, the line is prefixed with a `// TODO: Replace with real photography...` comment. Search the codebase for `// TODO:` to find all of them.

## Common Tasks

### Add a new voyage
1. Open `content/voyages.ts`
2. Add a new object to the `voyages` array (TypeScript will tell you what fields are required)
3. Add a card image to `/public/images/` and reference it in `cardImage`
4. The new voyage will appear on the homepage grid AND get its own `/voyages/[slug]` page automatically

### Change a price
1. Open `content/voyages.ts`
2. Edit the `priceFrom` string on the relevant voyage
3. Save. The change appears everywhere — homepage card, voyages index, detail page.

### Add a new destination
1. Open `content/destinations.ts`
2. Add a new destination object
3. It appears on the destinations section automatically (alternates left/right by index)

### Swap a placeholder image
1. Drop the new image into `/public/images/voyages/couples-staycation-hero.jpg`
2. In `content/voyages.ts`, change `heroImage` from the Unsplash URL to `/images/voyages/couples-staycation-hero.jpg`
3. Next.js `<Image>` will automatically optimize it

### Add a journal post (when MDX is set up)
1. Create `/content/journal/post-slug.mdx` with front-matter
2. Write the post in MDX (Markdown + React components)
3. It appears on `/journal` and is accessible at `/journal/post-slug`

## Things to Never Do

- **Never inline hex codes.** Always use Tailwind tokens (`bg-ocean`) or import from `lib/tokens.ts`.
- **Never use stock photo language in copy.** "Curated," "exclusive," "indulge," "unparalleled" — all banned.
- **Never use emojis in production copy.** Especially not 🌊⛵🥂.
- **Never use exclamation points** in headlines or marketing copy.
- **Never animate faster than 600ms** for premium-feel sections. The whole point is slow.
- **Never use pure black (#000) or pure white (#FFF).** Always `text-ink` and `bg-bone`.
- **Never hard-code voyage data** in component JSX. Always import from `content/voyages.ts`.
- **Never use Tailwind v3 syntax** — this project is v4 (CSS-first config in globals.css, not tailwind.config.ts).

## When in Doubt

Reference these three sites for visual and editorial standard:
- **patinahotels.com** — pacing, editorial typography, practitioner features
- **patinahotels.com/osaka/wellbeing** — wellness practitioner section template
- **celestiayacht.com** — yacht/vessel section structure

Our site should feel closer to those than to any charter listing or booking platform.

## Open Tasks for Claude Code

When the human asks you to work on this project, here are common things they'll likely want:

1. **Wire up real booking integration.** Currently the "Reserve" buttons link to `#book`. Integrate FareHarbor's embed widget (their docs: https://fareharbor.com/help/embeds/). The booking modal should match the brand — overlay with a slight backdrop blur, Cormorant heading, etc.
2. **Set up MDX journal.** Use `@next/mdx` to enable `.mdx` files in `/content/journal/`. Create `app/journal/[slug]/page.tsx` to render them. Add front-matter parsing with `gray-matter`.
3. **Add per-voyage gallery section** to `/voyages/[slug]/page.tsx`. Use Next.js `Image` with a masonry or grid layout. Lightbox on click.
4. **Build the Membership page** at `/membership` based on Document 4 of the brand bible. Founders / Mariner / Crew tiers.
5. **Replace Unsplash placeholders with real photography** once the launch photo shoot happens. Search `// TODO: Replace` in the codebase.
6. **Add structured data (JSON-LD)** for SEO — `LocalBusiness`, `Product` per voyage, `Person` for founders.
7. **Build the Contact page** with a form that posts to Resend / SendGrid.
8. **Set up analytics** — Plausible (privacy-friendly) and Meta Pixel.

## Project Documents (Reference Material)

The complete brand bible exists outside this repo as five Word documents:

- **Doc 1** — Yacht acquisition, corporate structure, tax strategy
- **Doc 2** — Operations & compliance (captain, slip, insurance)
- **Doc 3** — Pricing & financial model (not yet built)
- **Doc 4** — Membership program (not yet built)
- **Doc 5** — Brand & marketing (the source for everything in this codebase)

When a question comes up about voice, pricing, or brand strategy that this CLAUDE.md doesn't answer, the human likely has the answer in Doc 5.
