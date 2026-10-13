"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { MapsLocation01Icon } from "@hugeicons/core-free-icons";
import { AreaPlan } from "@/components/estate/area-plan";
import { Eyebrow } from "@/components/estate/eyebrow";
import type { Pin, Slice } from "@/components/estate/portal";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The reference is a selector: a centred heading, a row of cards with the
// chosen one tinted, and under them a pair — a photograph on the left and the
// chosen card's own detail on the right. Every part of that is doing the job a
// map section does, so the structure carries and only what sits in the two
// halves changes.
//
// The plan is `area-plan.tsx`, the same drawing /neighborhoods and every area
// page use, with its six name chips switched off and a price pin per home laid
// over them instead. Two sets of chips on one plan is a legend arguing with a
// map, and the pins are the thing this section is about.
//
// A tile server is an account, a key and a bill the buyer inherits before the
// site has a visitor. The drawing is the answer to that, and the caption under
// it says so rather than letting a reader assume otherwise.
//
// The pins arrive as props. The map holds state, and a `"use client"` file
// importing the book would ship 21 records with their blurbs and four
// photographs apiece into the browser — `portal.ts` shapes them on the server
// and the page hands them down.
const copy = {
  eyebrow: "The whole book, placed",
  heading: "Every home we have photographed, on one plan",
  lede: "Press a pin and its row opens beside it; press a row and the plan says where it stands. The rest of the 1,284 are on the browse page, where the same four filters run over all of them.",
  caption:
    "Drawn rather than mapped, and not to scale. Every listing page opens its own address in Maps.",
} as const;

export function PortalMap({ pins, slices }: { pins: Pin[]; slices: Slice[] }) {
  const [slice, setSlice] = useState(slices[0]);
  const [active, setActive] = useState<string | null>(null);
  const list = useRef<HTMLUListElement>(null);

  const here = pins.filter((pin) => slice.slugs.includes(pin.slug));
  const shown = here.some((pin) => pin.slug === active) ? active : null;

  // Pressing a pin is a jump to a row that may be forty rows down a scroll
  // box, so the press does the scrolling rather than leaving the reader to
  // find what they just selected. Called from the handler rather than an
  // effect: the row highlights on hover too, and hover must not scroll.
  const reveal = (slug: string) => {
    setActive(slug);
    list.current
      ?.querySelector(`[data-slug="${slug}"]`)
      ?.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference centres its heading block over the cards. */}
      <div className="flex flex-col items-center text-center">
        <Eyebrow icon={MapsLocation01Icon}>{copy.eyebrow}</Eyebrow>
        <SectionHeading className="mt-6 max-w-[18ch]">
          {copy.heading}
        </SectionHeading>
        <p className="mt-6 max-w-[62ch] text-base text-muted-foreground">
          {copy.lede}
        </p>
      </div>

      {/* The selector. The chosen card takes the tint and its title takes the
          hue, exactly as the reference marks its active one; the rest are
          bordered and flat. */}
      <div
        role="group"
        aria-label="What the plan shows"
        className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {slices.map((one) => {
          const on = one.key === slice.key;
          return (
            <button
              key={one.key}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setSlice(one);
                setActive(null);
              }}
              className={cn(
                "rounded-lg px-5 py-4 text-left transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                // Two rungs rather than one and its alpha: `bg-accent/60`
                // on the page lands at 1.015, under the whisper band's own
                // floor, which is a hover a reader cannot see happen.
                on ? "bg-muted" : "border hover:bg-accent",
              )}
            >
              <span className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-base font-medium",
                    on && "text-primary",
                  )}
                >
                  {one.label}
                </span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {one.count}
                </span>
              </span>
              <span className="mt-1.5 block text-sm text-pretty text-muted-foreground">
                {one.line}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:gap-10">
        <div>
          <AreaPlan chips={false}>
            {here.map((pin) => {
              const on = pin.slug === shown;
              return (
                <button
                  key={pin.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => reveal(pin.slug)}
                  onMouseEnter={() => setActive(pin.slug)}
                  onFocus={() => setActive(pin.slug)}
                  style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
                  className={cn(
                    reach,
                    // text-xs is the bottom of the scale and the pins hold it at
                    // both widths — an arbitrary 10px would read better on a
                    // 342px plan, and it stays out anyway: a size nothing else
                    // on the site uses is a size nobody maintains. The padding
                    // takes the difference
                    // instead: tighter on a phone, where two pills in one
                    // block are closest to touching.
                    "absolute flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full px-1.5 py-0.5 text-xs font-medium whitespace-nowrap tabular-nums transition-colors sm:px-2 sm:py-1",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    // The selected pin comes forward as well as darkening:
                    // twenty-one markers on a plan this size do touch, and the
                    // one being read has to be the one on top.
                    on
                      ? "z-10 bg-foreground text-background shadow-soft"
                      : "bg-card shadow-soft hover:bg-accent",
                  )}
                >
                  <span className="sr-only">
                    {pin.address}, {pin.area},{" "}
                  </span>
                  {pin.short}
                </button>
              );
            })}
          </AreaPlan>

          <p className="mt-4 max-w-[52ch] text-sm text-muted-foreground">
            {copy.caption}
          </p>
        </div>

        {/* The reference's copy column. Its repeated heading and paragraph come
            off — the section said both once already, centred, forty pixels up
            — and so does the count, which now closes the section under both
            halves rather than heading one of them: it is a fact about the plan
            and the list together, and reading it over the list alone made the
            two columns start at different heights.

            A scroll box rather than a column that grows: the plan beside it is
            a fixed shape, and a list running past its foot would leave the map
            stranded at the top of a section the reader has scrolled out of.
            `overscroll-contain` so reaching the end does not carry the page
            with it, and the scrollbar is hidden because the divided rows
            already say the list runs on. */}
        <ul
          ref={list}
          // gap-5 on the list and a hairline under each row but the last: the
          // rule then sits 20px clear of the row above it and 20px clear of
          // the one below, which is the only way to centre a divider in a gap
          // without putting the padding back on the rows themselves.
          //
          // The two heights are counted, not picked. A row is its 80px
          // thumbnail plus 20 of padding and a hairline, and the gap adds 20
          // more, so row n opens at 121n and its picture ends 80px later: four
          // rows close at 443 and five at 564. The caps sit just past each,
          // because a box that ends mid-photograph reads as a rendering fault
          // rather than as a list that runs on.
          className="flex max-h-[453px] flex-col gap-5 overflow-y-auto overscroll-contain lg:max-h-[574px] [scrollbar-width:none] [&>li:not(:last-child)]:border-b [&::-webkit-scrollbar]:hidden"
        >
          {here.map((pin) => {
            const on = pin.slug === shown;
            return (
              <li
                key={pin.slug}
                data-slug={pin.slug}
                onMouseEnter={() => setActive(pin.slug)}
                onMouseLeave={() => setActive(null)}
                // No padding and no fill. The rows sit flush to the column's
                // own edges, the gap and the hairline between them carry the
                // separation, and the state a hover used to paint moves to the
                // arrow instead — a whole row lighting up next to a plan that
                // is also lighting up was two things answering one pointer.
                className="group/row relative flex gap-4 pb-5"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={pin.src}
                    alt={pin.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="text-base font-medium tabular-nums">
                      {pin.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {pin.terms}
                    </span>
                  </p>
                  {/* The whole row is the link's hit area, cast from the
                      address rather than wrapped around it — the arrow at the
                      end is the same link's mark, not a second control, so it
                      stays aria-hidden and the row keeps one accessible name. */}
                  <p className="mt-1 truncate text-sm">
                    <Link
                      href={pin.href}
                      onFocus={() => setActive(pin.slug)}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {pin.address}
                    </Link>
                    <span className="text-muted-foreground">
                      {" "}
                      · {pin.area}
                    </span>
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground tabular-nums">
                    {pin.specs}
                  </p>
                </div>

                <span
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center self-center rounded-full border transition-colors",
                    on
                      ? "border-transparent bg-foreground text-background"
                      : "group-hover/row:bg-accent",
                  )}
                >
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The way out, under both halves and on the centre line — the reference
          closes its own frame the same way, with the one item that belongs to
          the whole section rather than to either column. */}
      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          render={<Link href="/listings" />}
          className="rounded-full"
        >
          Run this over all 1,284
          <ArrowUpRightIcon data-icon="inline-end" aria-hidden />
        </Button>
      </div>
    </section>
  );
}
