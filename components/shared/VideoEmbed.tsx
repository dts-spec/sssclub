"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  /** YouTube video ID (the part after v=) */
  videoId: string;
  /** Poster image shown before playback */
  posterSrc: string;
  /** Alt text for the poster */
  posterAlt: string;
  /** Optional label shown in the bottom-left, e.g. "Aboard · 3:42" */
  label?: string;
  /** Aspect ratio class. Defaults to video (16:9). */
  aspectClass?: string;
  /** Outer className */
  className?: string;
}

/**
 * Click-to-play YouTube embed.
 * Prevents the page from loading multiple autoplay iframes at once,
 * and lets the poster image be sharper than YouTube's thumbnail.
 */
export function VideoEmbed({
  videoId,
  posterSrc,
  posterAlt,
  label,
  aspectClass = "aspect-video",
  className,
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-ocean-deep cursor-pointer group",
        aspectClass,
        className
      )}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={posterAlt}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={false}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/55 to-ocean-deep/20 pointer-events-none" />

          {/* Play button */}
          <button
            type="button"
            aria-label="Play video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(70px,9vw,110px)] h-[clamp(70px,9vw,110px)] rounded-full bg-white/12 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:border-gold group-hover:scale-105"
          >
            <Play
              className="w-7 h-7 ml-1 fill-white text-white transition-colors group-hover:fill-ocean group-hover:text-ocean"
              strokeWidth={0}
            />
          </button>

          {label && (
            <span className="absolute bottom-6 left-6 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-white/80">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
