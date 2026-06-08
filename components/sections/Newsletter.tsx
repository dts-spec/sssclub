"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  // TODO: Wire this to ConvertKit / Klaviyo / Mailchimp endpoint
  // when subscriber list is ready.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("success");
  };

  return (
    <section
      id="newsletter"
      className="py-[clamp(5rem,11vw,10rem)] bg-bone text-center relative"
    >
      <div className="container-app max-w-[760px]">
        <RevealOnScroll>
          <div className="eyebrow center">Stay in the Wind</div>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="font-display font-light text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-ocean mt-10 mb-6 tracking-[-0.015em]">
            For the people who would have{" "}
            <em className="italic text-gold-deep">wanted to know.</em>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-[1.0625rem] leading-[1.7] text-ink-soft font-light mb-12 max-w-[540px] mx-auto">
            A short letter once a month. New voyages, occasional recipes from
            Josh, a breathwork prompt from Donna, a photograph or two from the
            most recent weekend on the water.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <form
            className="flex gap-3 max-w-[560px] mx-auto sm:flex-row flex-col"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-[1.15rem] border border-mist bg-white text-[0.95rem] text-ink outline-none transition-colors duration-300 focus:border-ocean"
            />
            <button
              type="submit"
              className="px-8 py-[1.15rem] bg-ocean text-white font-mono text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:bg-gold hover:text-ocean whitespace-nowrap"
            >
              {status === "success" ? "Welcome Aboard" : "Subscribe"}
            </button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
