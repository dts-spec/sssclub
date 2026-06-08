"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { vesselGallery } from "@/content/vessel-gallery";
import { cn } from "@/lib/utils";

/**
 * Vessel image carousel.
 *
 * Horizontal scroll-snap track of curated vessel photography, paired with
 * arrow controls and a dot indicator. Slides are read from
 * `content/vessel-gallery.ts` — reorder the array there to change the
 * sequence; this component doesn't care about content.
 *
 * Designed to sit on the dark Vessel section, after the YouTube video embed,
 * so visitors can scrub through the boat's spaces at their own pace.
 */
export function VesselCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Track which slide is centered using IntersectionObserver
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        let bestRatio = 0;
        let bestIndex = active;
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            const i = slideRefs.current.findIndex((el) => el === entry.target);
            if (i !== -1) {
              bestRatio = entry.intersectionRatio;
              bestIndex = i;
            }
          }
        }
        if (bestRatio > 0.55) setActive(bestIndex);
      },
      { root, threshold: [0.55, 0.75, 0.95] }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSlide = (i: number) => {
    slideRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const prev = () => scrollToSlide(Math.max(0, active - 1));
  const next = () => scrollToSlide(Math.min(vesselGallery.length - 1, active + 1));

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-[clamp(1.5rem,4vw,4rem)] px-[clamp(1.5rem,4vw,4rem)]"
      >
        {vesselGallery.map((slide, i) => (
          <article
            key={slide.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="snap-center flex-none w-[88vw] md:w-[68vw] max-w-[1100px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ocean-deep">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 88vw, 68vw"
                priority={i === 0}
              />
            </div>
            <div className="mt-5 flex items-baseline gap-5 flex-wrap">
              <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-gold-soft whitespace-nowrap">
                — {String(i + 1).padStart(2, "0")} / {String(vesselGallery.length).padStart(2, "0")}
              </span>
              <h3 className="font-display italic text-[1.25rem] text-white leading-tight">
                {slide.title}
              </h3>
            </div>
            <p className="mt-3 text-[0.95rem] leading-[1.65] font-light text-white/70 max-w-[560px]">
              {slide.caption}
            </p>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-10 flex-wrap">
        <button
          onClick={prev}
          aria-label="Previous slide"
          disabled={active === 0}
          className="w-12 h-12 border border-white/30 transition-colors duration-300 flex items-center justify-center text-white/80 hover:border-gold hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-white/30 disabled:hover:text-white/80"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          disabled={active === vesselGallery.length - 1}
          className="w-12 h-12 border border-white/30 transition-colors duration-300 flex items-center justify-center text-white/80 hover:border-gold hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-white/30 disabled:hover:text-white/80"
        >
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>

        {/* Position indicator */}
        <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-white/55 ml-4">
          {String(active + 1).padStart(2, "0")} of {String(vesselGallery.length).padStart(2, "0")} · {vesselGallery[active]?.title.replace(/\.$/, "")}
        </span>

        {/* Dots */}
        <div className="flex items-center gap-2 ml-auto">
          {vesselGallery.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-[2px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                active === i ? "w-10 bg-gold" : "w-4 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
