"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// The only interaction in section 2, isolated so the six cards it scrolls stay
// server components — they arrive as children and never cross the boundary.
// The scrolling itself is CSS scroll-snap, which already works by touch,
// trackpad and keyboard; the two buttons exist because the reference puts them
// in the header row, and they are the only reason this file ships JavaScript.
export function Rail({
  heading,
  of,
  children,
}: {
  heading: ReactNode;
  /** What the rail holds, for the two buttons' accessible names — this file
      outlived a second caller and may well get another one. */
  of: string;
  children: ReactNode;
}) {
  const rail = useRef<HTMLDivElement>(null);

  const nudge = (direction: 1 | -1) =>
    rail.current?.scrollBy({
      left: direction * rail.current.clientWidth * 0.75,
      behavior: "smooth",
    });

  /* Icon-only, so the hit area is short on both axes and takes
     after:-inset-0.5 rather than the pill's after:h-10. Hidden below md: a
     touch screen scrolls the rail directly and the buttons would only take the
     room the cards need. */
  const pager = (
    <div className="hidden shrink-0 items-center gap-2 md:flex">
      <RailButton
        label={`Previous ${of}`}
        onClick={() => nudge(-1)}
        icon={ChevronLeftIcon}
      />
      <RailButton
        label={`Next ${of}`}
        onClick={() => nudge(1)}
        icon={ChevronRightIcon}
      />
    </div>
  );

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1200px] items-end justify-between gap-8 px-6 sm:px-8">
        {heading}
        {pager}
      </div>

      {/* The rail runs past the container to the viewport edge, so the fourth
          card is cut by the frame exactly as the reference has it. The padding
          puts the first card back on the container's left edge.

          scroll-pl has to match that padding, and this is not cosmetic: a
          mandatory snap container measures its snap points from the scrollport,
          which the padding has already shifted, so every point resolves to the
          same place — the rail rests mid-list and refuses every programmatic
          scroll, including a plain scrollLeft assignment. Matching the two
          makes the first card's snap point 0 again. */}
      <div
        ref={rail}
        className={cn(
          "mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth",
          "px-6 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "scroll-pl-6 sm:scroll-pl-8 lg:scroll-pl-[max(2rem,calc((100vw-1200px)/2+2rem))]",
          "lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]",
        )}
      >
        {children}
      </div>
    </>
  );
}

function RailButton({
  label,
  onClick,
  icon: Icon,
}: {
  label: string;
  onClick: () => void;
  icon: typeof ChevronLeftIcon;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        // Bordered, not bare: these sit on the page ground, and bg-card
        // separates from it by 1.02 — nothing. The hairline draws the control;
        // the tint on hover is what moves.
        "relative grid size-9 place-items-center rounded-full border bg-card transition-colors",
        "after:absolute after:-inset-0.5 after:content-['']",
        "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
      )}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
