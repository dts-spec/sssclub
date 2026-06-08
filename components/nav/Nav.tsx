"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky top navigation.
 * Transparent over hero; gains a frosted-glass background on scroll.
 *
 * Three-column grid layout:
 *   [status dot]   [brand mark]   [links + reserve CTA]
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] grid items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] px-[clamp(1.5rem,4vw,4rem)]",
        "grid-cols-[1fr_auto_1fr]",
        scrolled
          ? "bg-bone/94 backdrop-blur-xl backdrop-saturate-[1.4] py-4 border-b border-black/[0.08]"
          : "bg-transparent py-6"
      )}
    >
      <div
        className={cn(
          "items-center gap-10 font-mono text-[0.7rem] tracking-[0.18em] uppercase hidden md:flex",
          scrolled ? "text-ink-soft" : "text-white/85"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Now Booking · Spring 2026</span>
        </div>
      </div>

      <Link
        href="/"
        className={cn(
          "font-display italic font-medium text-[1.375rem] tracking-[0.02em] text-center transition-colors duration-500",
          scrolled ? "text-ocean" : "text-white"
        )}
      >
        Sail, Supper &amp; Soul
      </Link>

      <nav className="flex justify-end items-center gap-7">
        {[
          { href: "/experiences", label: "Experiences" },
          { href: "/excursions", label: "Excursions" },
          { href: "/vessel", label: "The Vessel" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "hidden md:inline-block font-mono text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-300",
              scrolled
                ? "text-ink-soft hover:text-ocean"
                : "text-white/85 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#book"
          className="font-mono text-[0.7rem] font-medium tracking-[0.22em] uppercase text-ocean bg-gold px-6 py-3.5 transition-all duration-300 hover:bg-gold-soft hover:tracking-[0.28em]"
        >
          Reserve
        </Link>
      </nav>
    </header>
  );
}
