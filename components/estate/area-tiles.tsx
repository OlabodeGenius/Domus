"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { areas, photo, type Area } from "@/components/estate/areas";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// The catalogue. Everything the section holds sits inside one tinted slab: the
// heading, a floating pill bar, six white cards in a 3×2 grid and the way out at
// the foot. It is the container that does the work — the six read as a set of
// entries in one catalogue rather than as six pictures that happen to be
// adjacent, which is what the two losing layouts were arguing against.
//
// The photograph pays for that in size: a circular crop at 64px is a colour and
// a texture rather than a street. That was the trade the chooser was up for, and
// it is the one the user took.

// The reference's tab bar is a filter over a catalogue. Six areas against six
// tabs would be a control with nothing to remove, so it re-ranks instead — three
// orders, each of them a question somebody actually arrives with.
const orders = [
  {
    key: "book",
    label: "Most on the book",
    by: (a: Area, b: Area) => b.active - a.active,
  },
  {
    key: "median",
    label: "Lowest median",
    by: (a: Area, b: Area) => a.price - b.price,
  },
  {
    key: "days",
    label: "Fastest to sell",
    by: (a: Area, b: Area) => a.days - b.days,
  },
] as const;

export function AreaTiles() {
  const [key, setKey] = useState<(typeof orders)[number]["key"]>("book");
  const order = orders.find((one) => one.key === key) ?? orders[0];
  // Sorted off a copy: `areas` is the module's array and every other section on
  // this page reads it in its own order.
  const shown = [...areas].sort(order.by);

  return (
    <section
      id="areas"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12">
        <div className="flex flex-col items-center text-center">
          <SectionHeading className="mt-6 max-w-[20ch]">
            The six, and what we hold in each
          </SectionHeading>
          <p className="mt-6 max-w-[54ch] text-base text-muted-foreground text-balance">
            Press one for its streets, its schools and everything on our book
            there this morning.
          </p>
        </div>

        {/* The reference floats a white pill bar under the heading with the
            active tab as a dark pill inside it. The bar is a rung above the
            slab it sits on, which is what makes it read as floating over the
            panel rather than as a strip cut out of it. */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Order the six"
            className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-card p-1.5 shadow-soft"
          >
            {orders.map((one) => (
              <button
                key={one.key}
                type="button"
                onClick={() => setKey(one.key)}
                aria-pressed={one.key === key}
                className={cn(
                  reach,
                  "shrink-0 rounded-full px-5 py-2 text-sm whitespace-nowrap transition-colors",
                  one.key === key
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {one.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((area) => (
            <article
              key={area.name}
              // White on the slab is a real rung, so no hairline and no cast at
              // rest. The cast arrives on hover, which is the whole card
              // answering now that the whole card is the link.
              className="group relative flex flex-col rounded-lg bg-card p-6 transition-shadow hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                {/* The reference's pale circle with a cut-out in it. Ours holds
                    the street itself, cropped round — at this size a photograph
                    is a colour and a texture rather than a place, which is the
                    trade this version is making. */}
                <Image
                  src={photo(area.src, 160)}
                  alt=""
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-full object-cover"
                />
                <span
                  aria-hidden
                  className="text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  <ArrowUpRightIcon className="size-5" />
                </span>
              </div>

              {/* The reference's eyebrow over an oversized name. Ours puts the
                  median in that slot: a name without a number is decoration,
                  which is the line this whole page is built on. */}
              <p className="mt-8 text-sm tabular-nums text-muted-foreground">
                {area.median} median
              </p>
              <h3 className="mt-1 text-2xl tracking-tight">
                <Link
                  href={`/neighborhoods/${slugify(area.name)}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline group-focus-within:underline-offset-4"
                >
                  {area.name}
                </Link>
              </h3>

              {/* Pinned to the card's foot, as the reference pins its count.
                  mt-auto rather than a fixed height, so a two-word name and a
                  two-line one still land their last row together. */}
              <p className="mt-auto pt-10 text-sm tabular-nums text-muted-foreground">
                {area.active} homes on the book
                <span aria-hidden className="px-1.5">
                  ·
                </span>
                {area.days} days to first offer
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            variant="outline"
            render={<Link href="/listings" />}
            className="rounded-full bg-card"
          >
            Browse every home we hold
          </Button>
        </div>
      </div>
    </section>
  );
}
