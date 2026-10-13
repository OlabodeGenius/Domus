import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ThreeDRotateIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { railHomes, toListing } from "@/components/estate/listings";
import { cn } from "@/lib/utils";

// The reference's device is a search card cut into the foot of the image band
// rather than set below it, so the search arrives in the same slot it does
// everywhere else and this layout only moves it — up, over the band's own
// bottom edge.
//
// The band is bg-accent, the one tint a ground this size may take, and the
// stack above it inverts to suit: the search panel is bg-card and lifts off the
// band on its own cast, and the field wells inside it sink back to bg-accent.
// Panel-rises rather than fields-rise, which is the only arrangement that keeps
// three surfaces legible without putting a mid-rung grey under the whole hero.
//
// The words came back into this file when the other two heroes went. hero-copy.ts
// existed because three layouts read the same headline; a source with one reader
// is only a second place to edit a sentence. The figures still answer the rest
// of the page — 1,284 on the market against the 1,140 closed last year in
// section 6, and the freshness stamp against the days-on-market footnote every
// listing card carries.
const copy = {
  place: "Greater Boston · 14 areas",
  heading: "Every home here is one of ours",
  count: "1,284 homes",
  tail: "for sale across Greater Boston, every one listed by a Domus agent",
  fresh: "11 minutes",
} as const;

const banner = {
  src: "https://images.unsplash.com/photo-1548990044-11586bc151f2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "A curved white apartment building, its balconies stacked against a clear sky",
} as const;

// The first listing, read rather than retyped. Its price, address, area, spec
// line and status all used to sit here as string literals, and a hero quoting a
// home that section 5 prices differently is the one drift a reader catches.
const featured = toListing(railHomes[0]);

// The fourth overlay's figure. Seven months of the median, as a share of the
// tallest — the last bar is where $1.42M is, which is the number the search
// panel's own price footnote quotes twelve pixels further down.
const trend = [46, 54, 49, 61, 57, 73, 88];

// One glass recipe for all four, so the family reads as one. The cast is what
// puts them above the photograph rather than printed on it, and it carries the
// edge on its own — the ring that used to run with it drew a second line
// around four cards that already have one.
const glass = "absolute bg-background/85 shadow-soft backdrop-blur-md";

// The search stays a slot rather than a default. It began as the one piece of
// the harness that earned its keep — /preview/hero-search-two-row passed the
// other search treatment into this same hero, and a bar can only be judged
// under the real headline. That route and that alternate went out with the
// strip; the slot stays because it costs one prop and it is how a buyer swaps
// in a search of their own without touching this file.
export function Hero({ search }: { search: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 pt-10 pb-10">
      <div className="relative overflow-hidden rounded-lg bg-accent">
        <div className="grid lg:grid-cols-[minmax(0,44%)_1fr]">
          {/* The reference runs the copy to the band's own edges rather than
              to a container inside it, which is what lets the headline get as
              large as it does. */}
          <div className="order-2 px-6 py-12 sm:px-8 lg:order-1 lg:py-16 lg:pr-8 lg:pb-40 lg:pl-12">
            <p className="flex items-center gap-4 text-sm text-muted-foreground">
              <HugeiconsIcon
                icon={ThreeDRotateIcon}
                size={16}
                strokeWidth={1.5}
                aria-hidden
              />
              {copy.place}
            </p>

            <h1 className="mt-8 max-w-[12ch] text-5xl tracking-tighter text-balance md:text-6xl">
              {copy.heading}
            </h1>

            <p className="mt-8 max-w-[38ch] text-base text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">
                {copy.count}
              </span>{" "}
              {copy.tail} — updated{" "}
              <span className="tabular-nums">{copy.fresh}</span> ago.
            </p>
          </div>

          <div className="relative order-1 h-[280px] lg:order-2 lg:h-auto lg:min-h-[540px]">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />

            {/* Four families, as the hero rule asks, and one more than the
                photo carried before: a product, its state, the people, and the
                market all three sit in. The reference has none of them — its
                photo is bare and its meta line sits in the copy column. */}

            {/* 1 — the product. Four lines rather than two: a price with no
                address is a number, and an address with no spec line is a
                pin. */}
            <div
              className={cn(
                glass,
                "top-5 left-5 flex gap-4 rounded-lg p-2.5 pr-5  max-w-58 sm:max-w-none",
              )}
            >
              {/* Stretched rather than sized: three lines of text stand taller
                  than a 56px square, and a centred square leaves a different
                  gap above and below itself than the padding does. Width is
                  fixed, height is whatever the copy column comes to — which
                  also handles the spec line dropping out below sm. */}
              <div className="relative w-16 shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={featured.src}
                  alt={featured.alt}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base font-medium tabular-nums">
                  {featured.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  {featured.address} · {featured.area}
                </p>
                {/* Held back at 375px, where this card and the pill on the
                    opposite corner would otherwise meet in the middle. */}
                <p className="hidden text-sm text-muted-foreground tabular-nums sm:block">
                  {featured.specs}
                </p>
              </div>
            </div>

            {/* 2 — its state, in the listing's own status colour. The ping is
                the detail the flat pill was missing: an open house is a thing
                happening, not a label. */}
            <span
              className={cn(
                glass,
                "top-48 lg:right-12 right-5 flex items-center gap-2.5 rounded-full py-2 pr-4.5 pl-4 text-sm font-medium sm:top-40",
              )}
            >
              <span
                aria-hidden
                className="relative grid size-2 place-items-center"
              >
                <span
                  className={cn(
                    "absolute size-2 animate-ping rounded-full opacity-75 motion-reduce:hidden",
                    featured.dot,
                  )}
                />
                <span className={cn("size-2 rounded-full", featured.dot)} />
              </span>
              {featured.status}
            </span>

            {/* 4 — the market, and the only one of the four that is not a fact
                about a single home. The bars are a data fill rather than a
                surface, so they run on the brand ramp the way section 7's
                gauge does. Held back below sm: at 375px it would land on the
                agent stack, and two overlays touching read as one broken
                one. */}
            <div
              className={cn(
                glass,
                "left-5 bottom-5 hidden items-end gap-4 rounded-lg p-4 sm:flex lg:bottom-28",
              )}
            >
              <div>
                <p className="text-sm text-muted-foreground">Median asking</p>
                <p className="mt-1 text-base font-medium tabular-nums">
                  $1.42M
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground tabular-nums">
                  <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  4.2% since last spring
                </p>
              </div>
              <div aria-hidden className="flex h-14 items-end gap-1">
                {trend.map((month, i) => (
                  <span
                    key={month}
                    style={{ height: `${month}%` }}
                    className={cn(
                      "w-1.5 rounded-full",
                      i === trend.length - 1 ? "bg-chart-1" : "bg-chart-4",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The overlap itself. Inset from the band's edges as the reference has
          it, and z-10 so the panel's own overhanging button clears the band. */}
      <div className="relative z-10 px-2 sm:px-6 lg:-mt-32 lg:px-12">
        {search}
      </div>
    </section>
  );
}
