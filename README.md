# Sail, Supper & Soul Club — Website

A premium six-guest catamaran experience business in Marina Del Rey, California.

Built with Next.js 15 (App Router), TypeScript, Tailwind v4, and motion.

---

## Prerequisites

- **Node.js 20 LTS or newer** ([nodejs.org](https://nodejs.org))
- **npm 10+** (comes with Node)
- A code editor — VS Code or Cursor recommended

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the site
# Visit http://localhost:3000
```

The dev server auto-reloads on every file save. Edit a file in `content/`, `components/`, or `app/` and watch the browser update instantly.

---

## Available Commands

```bash
npm run dev         # Start the development server
npm run build       # Build for production
npm run start       # Run the production build locally
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript type-checking without emitting files
```

---

## Working with Claude Code

This project is designed to be edited primarily through Claude Code. The `CLAUDE.md` file at the project root is automatically loaded by Claude Code at startup and provides full context on the brand, tech stack, and conventions.

**To start a Claude Code session in this project:**

```bash
cd sssc-web
claude
```

Claude Code now has the full project context. Try these example prompts:

- _"Build a `/membership` page based on the Founders / Mariner / Crew tiers in Doc 4. Use the same editorial layout as the destinations page."_
- _"Wire up FareHarbor for the Reserve buttons. Use their embed widget. Make the modal feel premium."_
- _"Add a gallery section to each voyage detail page. 8 photos in a masonry grid with lightbox on click."_
- _"Replace the Unsplash placeholder for the Couples Staycation hero with `/images/voyages/couples-hero.jpg` (I just uploaded it)."_
- _"Set up MDX-based journal posts. I want to write `.mdx` files in `content/journal/` and have them auto-render at `/journal/[slug]`."_

---

## Project Structure (Quick Reference)

```
sssc-web/
├── app/                  # Next.js routes
├── components/
│   ├── sections/         # Homepage sections (Hero, Vessel, Voyages, etc.)
│   ├── shared/           # Reusable (VoyageCard, VideoEmbed, RevealOnScroll)
│   ├── nav/              # Top nav, footer
│   └── ui/               # Atomic primitives (Button)
├── content/              # ★ EDIT HERE to change voyages, destinations, etc
├── lib/                  # Design tokens, utilities
├── public/               # Static assets (images, videos, fonts)
└── CLAUDE.md             # Project context for Claude Code
```

See `CLAUDE.md` for the full architecture explainer.

---

## Editing Common Things

### Change a voyage price or description
Edit `content/voyages.ts`. Changes propagate everywhere automatically.

### Add a new destination
Add an entry to `content/destinations.ts`. It will appear on the homepage and destinations page.

### Swap a placeholder image with real photography
1. Drop the image into `public/images/...`
2. In the relevant content file, replace the Unsplash URL with `/images/your-image.jpg`
3. Next.js Image component handles the optimization automatically

### Add a new page
Create `app/your-page/page.tsx`. It's automatically routed at `/your-page`.

---

## Deploying

### Vercel (recommended)

1. Push the repo to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import the repo — Vercel detects Next.js automatically
4. Click Deploy
5. Add your custom domain in the Vercel dashboard

Vercel's Hobby tier is free and covers this project's expected traffic for at least Year 1.

### Other platforms

- **Cloudflare Pages** — works with `npx @cloudflare/next-on-pages`
- **AWS Amplify** — supports Next.js App Router natively
- **Netlify** — `npm i -D @netlify/plugin-nextjs`, deploy normally

---

## Tech Choices Explained

| Choice | Why |
|---|---|
| **Next.js 15** | File-based routing, React Server Components by default (smaller JS bundles), built-in image optimization, fast deploys on Vercel. The standard for premium content sites in 2026. |
| **Tailwind v4** | CSS-first config (tokens live in `globals.css`, not a JS file). Faster than v3, less config noise. |
| **motion** (formerly Framer Motion) | Premium-feel animations with simple JSX-based API. Renamed in 2024 but the library is the same. |
| **TypeScript strict** | Voyages, destinations, and content are typed. Refactors are safe. |
| **No CMS** | For Year 1, content is small enough to live in TypeScript. Migrate to Sanity / Contentful only when journal volume justifies it. |

---

## Adding Real Photography

The site currently uses Unsplash placeholders marked with `// TODO: Replace...` comments throughout. Once the pre-launch photography shoot is complete:

1. Place final images in `public/images/` organized by section:
 ```
 public/images/
 ├── hero/
 ├── voyages/
 ├── destinations/
 ├── vessel/
 ├── practitioners/
 └── testimonials/
 ```
2. Search the codebase for `// TODO: Replace` and swap each Unsplash URL for a local path
3. Use Next.js `<Image>` always — it handles AVIF/WebP conversion, responsive sizing, and lazy loading automatically

Recommended max image size: 2400px wide, ~85% JPEG quality. Run through TinyPNG or Squoosh before uploading.

---

## License

© 2026 Sail Supper Soul Club, LLC. All rights reserved.
