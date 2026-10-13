"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LeftToRightListBulletIcon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
import type { Compared } from "@/components/estate/portal";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The reference is a two-part header over one bordered frame holding three
// columns, each a name, a line, a hairline, four label rows and a button. A
// compare table is that frame with the columns chosen instead of published,
// which is the whole of what changes: the strip above picks them, and the
// frame prints the same nine facts down each one so the eye can run across a
// row rather than reading three cards.
//
// Marking is the one thing a printed tier list does not have to do. Three of
// the nine rows have an unambiguous better — the lowest asking, the largest
// floor, the lowest price per square foot — and those cells take a chip. The
// other six are facts a reader weighs themselves, and a chip on "Built 1889"
// would be the section inventing a preference.
const CAP = 3;

const copy = {
  eyebrow: "Side by side",
  heading: "Two homes, one column each",
  lede: "Cards answer which one you like the look of. Price per square foot, age and how long a listing has been standing need the same nine facts printed down both columns.",
  aside:
    "Pick two and the frame fills in. Three is the most a row of facts stays readable at.",
  footnote: "Any three of the fifteen we have for sale.",
} as const;

/** The three rows worth marking, and which way is better. */
const best = {
  Asking: "low",
  "Floor area": "high",
  "Price per sqft": "low",
} as const;

export function PortalCompare({ homes }: { homes: Compared[] }) {
  const [picked, setPicked] = useState<string[]>([
    homes[0].slug,
    homes[1].slug,
  ]);

  const chosen = picked
    .map((slug) => homes.find((home) => home.slug === slug))
    .filter((home): home is Compared => Boolean(home));

  const toggle = (slug: string) =>
    setPicked((all) =>
      all.includes(slug)
        ? all.filter((one) => one !== slug)
        : all.length >= CAP
          ? all
          : [...all, slug],
    );

  // Which cell wins each markable row, computed over the chosen columns only —
  // "lowest" means lowest of what is on screen, which is the only claim a
  // comparison of two homes can make.
  const winner = (label: string) => {
    if (chosen.length < 2) return null;
    const key =
      label === "Asking" ? "price" : label === "Floor area" ? "sqft" : "perSqft";
    const values = chosen.map((home) => home[key as "price" | "sqft" | "perSqft"]);
    const target =
      best[label as keyof typeof best] === "high"
        ? Math.max(...values)
        : Math.min(...values);
    // A tie marks nothing: two identical cells with one chip on them reads as
    // a mistake, and with two reads as no answer.
    return values.filter((value) => value === target).length === 1
      ? target
      : null;
  };

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference's two-part header: the headline left at display size,
          a smaller block ranged right holding a title, a paragraph and a
          link. */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <Eyebrow icon={LeftToRightListBulletIcon}>{copy.eyebrow}</Eyebrow>
          <SectionHeading className="mt-6 max-w-[14ch]">
            {copy.heading}
          </SectionHeading>
        </div>
        <div className="md:pt-14">
          <p className="max-w-[52ch] text-base text-muted-foreground">
            {copy.lede}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">{copy.aside}</p>
        </div>
      </div>

      {/* The picker. A strip rather than a grid: fifteen chips in rows would
          be a second results section above a section that is not about
          results, and a strip says "scroll me" in the width it is given. */}
      <div
        role="group"
        aria-label="Pick up to three homes to compare"
        // Scrolling at every width rather than only below sm, which is what
        // `scrollRow` does: fifteen chips wrap into five stacked lines on a
        // desktop and the frame they fill goes off the screen. `py-1 -my-1`
        // is room for a focus ring, which a scroll container clips on both
        // axes.
        className="mt-14 -mx-6 flex gap-2 overflow-x-auto px-6 py-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {homes.map((home) => {
          const on = picked.includes(home.slug);
          const full = !on && picked.length >= CAP;
          return (
            <button
              key={home.slug}
              type="button"
              aria-pressed={on}
              disabled={full}
              onClick={() => toggle(home.slug)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-full py-1.5 pr-5 pl-1.5 text-left transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                on
                  ? "bg-foreground text-background"
                  // Disabled is lower ink, never a lower opacity on the whole
                  // control: fading the chip takes the photograph down with
                  // the label and reads as a rendering fault.
                  : "border hover:bg-accent disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent",
              )}
            >
              <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={home.src}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="text-sm whitespace-nowrap">
                {home.address}
                <span
                  className={cn(
                    "ml-2 tabular-nums",
                    on ? "text-background/70" : "text-muted-foreground",
                  )}
                >
                  {home.short}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* One frame, columns divided by its own hairlines — the reference draws
          no card per tier and neither does this. */}
      <div className="mt-8 overflow-hidden rounded-lg border">
        <div
          className={cn(
            "grid grid-cols-1 divide-y sm:divide-x sm:divide-y-0",
            chosen.length === 0
              ? "sm:grid-cols-1"
              : chosen.length >= 3
                ? "sm:grid-cols-3"
                : "sm:grid-cols-2",
          )}
        >
          {chosen.map((home) => (
            <div key={home.slug} className="p-6 sm:p-8">
              <p className="text-2xl tracking-tight">{home.address}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {home.type} · {home.area}
              </p>

              <ul className="mt-6 flex flex-col divide-y border-t">
                {home.facts.map((fact) => {
                  const mark =
                    fact.label in best &&
                    winner(fact.label) ===
                      home[
                        (fact.label === "Asking"
                          ? "price"
                          : fact.label === "Floor area"
                            ? "sqft"
                            : "perSqft") as "price" | "sqft" | "perSqft"
                      ];
                  return (
                    <li
                      key={fact.label}
                      // Wrapping, with the gaps split: at 390 a column is
                      // 278px and "Parking / Detached two-car garage" is the
                      // one pair that will not sit on a line together.
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3"
                    >
                      <span className="text-sm text-muted-foreground">
                        {fact.label}
                      </span>
                      <span className="ml-auto flex items-center gap-2 text-right text-sm font-medium tabular-nums">
                        {mark ? (
                          <span className="rounded-full bg-chip px-2 py-0.5 text-xs font-normal text-primary">
                            {best[fact.label as keyof typeof best] === "high"
                              ? "largest"
                              : "lowest"}
                          </span>
                        ) : null}
                        {fact.value}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Button
                variant="outline"
                render={<Link href={home.href} />}
                className="mt-7 w-full rounded-full"
              >
                See this listing
                <ArrowUpRightIcon data-icon="inline-end" aria-hidden />
              </Button>
            </div>
          ))}

          {/* The empty column, drawn rather than left as a gap: a frame with a
              hole in it reads as a layout that broke, and a dashed slot reads
              as one waiting. */}
          {chosen.length < 2 ? (
            <div className="grid place-items-center p-10 sm:p-8">
              <p className="max-w-[28ch] text-center text-sm text-balance text-muted-foreground">
                {chosen.length === 0
                  ? "Nothing picked. Two from the strip above is enough to start."
                  : "Pick one more from the strip and this column fills in."}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* The reference closes on a bold line beside an outlined pill. */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center">
        <p className="text-base font-medium">{copy.footnote}</p>
        <Link
          href="/listings"
          className={cn(
            reach,
            "flex h-9 items-center rounded-full border px-5 text-sm transition-colors",
            "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          )}
        >
          Browse the whole book
        </Link>
      </div>
    </section>
  );
}
