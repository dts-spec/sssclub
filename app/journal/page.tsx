import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata = {
  title: "Journal — Sail, Supper, & Soul Club",
  description: "Notes from the water. Recipes, breathwork, voyages.",
};

/**
 * Journal index.
 *
 * TODO (Claude Code task): Add MDX-based blog posts.
 * - Set up content collection in /content/journal/*.mdx
 * - List posts here with front-matter (title, date, excerpt, hero image)
 * - Create [slug] dynamic route to render MDX with custom components
 *
 * See https://nextjs.org/docs/app/building-your-application/configuring/mdx
 * for the full MDX integration guide.
 */
export default function JournalIndexPage() {
  return (
    <section className="pt-40 pb-32 bg-bone min-h-screen">
      <div className="container-app max-w-[900px]">
        <RevealOnScroll>
          <div className="eyebrow mb-8">Journal</div>
          <h1 className="font-display font-light text-[clamp(3rem,9vw,8rem)] leading-[0.98] tracking-[-0.025em] text-ocean mb-12 text-balance">
            Notes from
            <br />
            <em className="italic">the water.</em>
          </h1>
          <p className="font-display italic font-light text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.45] text-ocean mb-16">
            Recipes from Josh&apos;s galley, breathwork prompts from Donna,
            destination guides, and the occasional photograph from the most
            recent weekend on the water.
          </p>
          <p className="text-[1.0625rem] leading-[1.8] text-ink-soft font-light">
            The journal launches with our first paid voyage. Subscribe to the
            newsletter below to be notified.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
