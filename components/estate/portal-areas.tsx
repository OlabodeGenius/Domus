"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { RankingIcon } from "@hugeicons/core-free-icons";
import { areas, type Area } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { scrollRow } from "@/components/scroll-row";
import { cn, signed, slugify } from "@/lib/utils";

// The reference is a numbered row list: a label at the left of each row, a
// title beside it, a circled arrow at the far right, hairlines between. Its
// third row opens into a dark slab, and that is the part this does not take —
// `/` already draws these six areas as rows that expand, and a second
// expanding list of the same six places is one section built twice.
//
// What replaces it is the thing a portal does that a brochure does not: the
// rows re-order. The reference's `STEP — 01` label becomes the rank in the
// current sort, so pressing a column visibly renumbers the list rather than
// only shuffling it — which is the difference between a control a reader
// believes and one they press twice to check.
//
// Every figure is off `areas.ts`, the file /neighborhoods and six area pages
// read. Nothing here is a second copy of a number.
const columns = [
  {
    key: "price",
    label: "Median",
    read: (area: Area) => area.median,
    /** Which way round is interesting first. Dear-to-cheap for money, quick
        first for time on the market. */
    down: true,
  },
  {
    key: "perSqft",
    label: "Per sqft",
    read: (area: Area) => `$${area.perSqft.toLocaleString("en-US")}`,
    down: true,
  },
  {
    key: "active",
    label: "On the book",
    read: (area: Area) => String(area.active),
    down: true,
  },
  {
    key: "days",
    label: "Days to offer",
    read: (area: Area) => String(area.days),
    down: false,
  },
] as const;

type Key = (typeof columns)[number]["key"];

const copy = {
  eyebrow: "Six areas, ranked",
  heading: "Put them in order before you pick one",
  lede: "Median asking, what a square foot costs, how many we are holding this morning and how long a listing waits for its first offer. Press a column and the list renumbers.",
} as const;

// The share bar's scale: the busiest area is the full width and the rest are
// read against it. A bar is a data fill rather than a surface, so it is exempt
// from the whisper band the page's tints obey — a bar held to 1.19 against its
// track is a bar nobody can read.
const busiest = Math.max(...areas.map((area) => area.active));

export function PortalAreas() {
  const [sort, setSort] = useState<Key>("price");
  const [down, setDown] = useState(true);

  const ranked = [...areas].sort((a, b) =>
    down ? b[sort] - a[sort] : a[sort] - b[sort],
  );

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference's two-part header, with the control where its paragraph
          sits — the rows renumber when it is pressed, so it belongs beside the
          numbers rather than under them. */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow icon={RankingIcon}>{copy.eyebrow}</Eyebrow>
          <SectionHeading className="mt-6 max-w-[18ch]">
            {copy.heading}
          </SectionHeading>
          <p className="mt-6 max-w-[54ch] text-base text-muted-foreground">
            {copy.lede}
          </p>
        </div>

        <div
          role="group"
          aria-label="Sort the areas"
          className={cn(scrollRow, "shrink-0 gap-2")}
        >
          {columns.map((column) => {
            const on = column.key === sort;
            return (
              <button
                key={column.key}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  if (on) setDown((was) => !was);
                  else {
                    setSort(column.key);
                    setDown(column.down);
                  }
                }}
                className={cn(
                  reach,
                  "flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm whitespace-nowrap transition-colors",
                  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  on
                    ? "bg-foreground text-background"
                    : "border hover:bg-accent",
                )}
              >
                {column.label}
                {on ? (
                  <ChevronRightIcon
                    className={cn(
                      "size-4 transition-transform",
                      down ? "rotate-90" : "-rotate-90",
                    )}
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-14 border-t">
        {ranked.map((area, i) => (
          <li key={area.name} className="border-b">
            <Link
              href={`/neighborhoods/${slugify(area.name)}`}
              className={cn(
                "group flex flex-wrap items-center gap-x-8 gap-y-5 px-2 py-6 transition-colors",
                "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
            >
              {/* The reference's step label, doing a job it was not doing
                  there: this one changes when the sort does. */}
              <span className="w-8 shrink-0 text-sm text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-[9rem] flex-1 text-xl tracking-tight md:flex-none md:basis-48">
                {area.name}
              </span>

              {columns.map((column) => (
                <span
                  key={column.key}
                  className={cn(
                    "flex flex-col gap-1",
                    column.key === "active" ? "basis-40" : "basis-24",
                  )}
                >
                  <span className="text-xs text-muted-foreground">
                    {column.label}
                  </span>
                  <span className="flex items-center gap-2 text-base font-medium tabular-nums">
                    {column.read(area)}
                    {/* The delta rides the median, which is the only column it
                        is a change *in*, and it takes the same green and amber
                        the sold cards below use — one reading of a direction
                        per page, not two. */}
                    {column.key === "price" ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-normal tabular-nums",
                          area.change > 0
                            ? "bg-emerald-100 text-emerald-800"
                            : area.change < 0
                              ? "bg-amber-100 text-amber-800"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {signed(area.change)}
                      </span>
                    ) : null}
                  </span>

                  {column.key === "active" ? (
                    <span
                      aria-hidden
                      className="mt-1 block h-1 w-full overflow-hidden rounded-full bg-muted"
                    >
                      <span
                        className="block h-full rounded-full bg-primary"
                        style={{ width: `${(area.active / busiest) * 100}%` }}
                      />
                    </span>
                  ) : null}
                </span>
              ))}

              {/* The reference's circled arrow at the far right of every
                  row. */}
              <span
                aria-hidden
                className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border transition-colors group-hover:bg-card"
              >
                <ChevronRightIcon className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted-foreground">
        Six of the fourteen areas our agents cover, and the six holding homes
        this morning. Change is against the same month last year.
      </p>
    </section>
  );
}
