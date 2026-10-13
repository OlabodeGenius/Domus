"use client";

import { useState } from "react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { areas, photo } from "@/components/estate/areas";
import { FieldSelect } from "@/components/estate/field-select";
import type { Pin } from "@/components/estate/portal";
import {
  beds,
  matching,
  price,
  rentPrice,
  where,
} from "@/components/estate/search-options";
import { reach } from "@/components/reach";
import { scrollRow } from "@/components/scroll-row";
import { cn } from "@/lib/utils";

// The reference is a booking site's opening frame, and its order is the whole
// reason it was picked: the picture runs across the top, the headline sits
// *under* it, and the search panel closes the frame in two rows — a thin row of
// small filters over a tall row of fields divided by short vertical rules, with
// a round submit at the end.
//
// That order is the argument this page makes. `/` opens with a claim and puts
// its search beside it; this one opens with a control and never makes a claim
// at all. Same shell, same book, opposite first move.
//
// The band's photograph is Back Bay's, off `areas.ts` rather than a fresh
// source — it is the one picture on this page that has to read as a street
// rather than as a house, and the six area photographs were cast for exactly
// that. The three overlays are the section's own: the reference leaves its
// illustration bare, and a hero that will hand the reader a map two sections
// later can say so here in two price pins.
const band = areas[0];

const copy = {
  heading: "Start by ruling most of them out",
  lede: "1,284 homes for sale and 62 to rent. Set the street, the ceiling and the bedrooms, and the count moves while you change your mind.",
  fresh: "11 minutes",
} as const;

// Worked searches rather than invented ones: every href is a query /listings
// already reads, and each one resolves to homes that are actually on the book.
// A rent chip carries no ceiling because a monthly figure is not a filter this
// site's lettings answer to — `holds()` in grid-listings.ts says so, and a chip
// promising a filter that does not fire is the dead button rule wearing a pill.
const worked = [
  { label: "Cambridge, 3+ beds", href: "/listings?area=cambridge&beds=3%2B" },
  { label: "Under $1M", href: "/listings?price=%241M" },
  { label: "New this week", href: "/listings?show=new" },
  { label: "Everything to rent", href: "/listings?show=rent" },
];

// One glass recipe for the three, the same one the other home's hero uses on
// its four. A pill floating on a photograph needs its own opaque surface, and
// a shared cast is what makes three of them read as one family.
const glass = "absolute bg-background/85 shadow-soft backdrop-blur-md";

// The field wells: a segment of the panel rather than a control of its own, so
// the hairline between them is the whole edge and the fill only arrives on
// hover. `first:rounded-l` is left off on purpose — the panel clips them.
const cell =
  "relative flex flex-col justify-center gap-1 px-5 py-4 transition-colors hover:bg-accent has-[[data-popup-open]]:bg-accent has-[:focus-visible]:bg-accent";

export function PortalHero({ pins }: { pins: Pin[] }) {
  // The two overlays quote homes on the street in the photograph, which is
  // Back Bay's. Filtered here rather than in the page: the picture is this
  // component's choice, so the homes that answer to it are too.
  const [card, marker] = pins.filter(
    (pin) => pin.area === band.name && pin.for === "sale",
  );

  const [tenure, setTenure] = useState<"Buy" | "Rent">("Buy");
  const [area, setArea] = useState(where.initial);
  const [cap, setCap] = useState(price.initial);
  const [bed, setBed] = useState(beds.initial);

  // A rent ceiling is a monthly figure and a sale ceiling is a six-figure one,
  // so the field swaps rather than being reinterpreted — and the value swaps
  // with it, because "$1.5M" left standing in a rent search is a number that
  // would quietly match everything.
  const ladder = tenure === "Rent" ? rentPrice : price;
  const count = matching({ tenure, area, price: cap, beds: bed });

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 pt-10 sm:px-8">
      <div className="relative h-[220px] overflow-hidden rounded-lg bg-accent sm:h-[300px] lg:h-[380px]">
        <Image
          src={photo(band.src, 2200)}
          alt={band.alt}
          fill
          priority
          sizes="(min-width: 1264px) 1136px, 100vw"
          className="object-cover"
        />

        {/* 1 — a home on this street, not a price on a photograph. The pair
            that stood here were two bare figures, and a number floating over a
            picture with nothing to attach it to is decoration: the reader has
            to guess whether it is an average, an asking price or the street's
            median. A thumbnail, an address and a spec line answer that before
            anyone has to ask. */}
        {card ? (
          <div
            className={cn(
              glass,
              "top-5 left-5 flex max-w-58 gap-4 rounded-lg p-2.5 pr-5 sm:top-8 sm:left-8 sm:max-w-none",
            )}
          >
            {/* Stretched rather than sized, which is the call the other home's
                hero card made and the reason its photograph fills its own
                corner: three lines of type stand taller than a square
                thumbnail, so a fixed height leaves a band of glass under the
                picture that the padding above it does not match. Width is
                fixed and height is whatever the copy column comes to — which
                also handles the spec line dropping out below sm. */}
            <div className="relative w-16 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-base font-medium tabular-nums">
                {card.price}
              </p>
              <p className="text-sm text-muted-foreground">
                {card.address} · {card.area}
              </p>
              {/* Held back at 375, where this card and the place chip on the
                  opposite corner would otherwise meet in the middle. */}
              <p className="hidden text-sm text-muted-foreground tabular-nums sm:block">
                {card.specs}
              </p>
            </div>
          </div>
        ) : null}

        {/* 2 — the second home on the street, at pill scale.
            No glyph and no tail. The glyph was a 16px house that resolved into
            a rounded square with a mark in it; the tail was a 10px lozenge
            hanging off the foot, and at that size it read as a speck under the
            pill rather than as a point on a map. What is left is the family
            the other two overlays are already in: a glass surface, a figure
            and the thing the figure is about. */}
        {marker ? (
          <span
            className={cn(
              glass,
              "bottom-14 left-[38%] hidden items-center gap-2.5 rounded-full py-2 pr-4.5 pl-4.5 text-sm sm:flex",
            )}
          >
            <span className="font-medium tabular-nums">{marker.short}</span>
            <span aria-hidden className="h-3.5 w-px bg-border" />
            <span className="text-muted-foreground">{marker.address}</span>
          </span>
        ) : null}

        {/* 3 — what the photograph is of. The band is one of the six areas and
            says so, which is also the fact that keeps the picture from being
            decoration. */}
        <span
          className={cn(
            glass,
            "right-6 bottom-6 flex items-center gap-2 rounded-full py-2 pr-4 pl-3.5 text-sm font-medium sm:right-12",
          )}
        >
          {/* The classic teardrop rather than the map-and-pin: at 16px the
              latter is a square with a mark in it and reads as a glyph nobody
              can name. This one is legible at the size it is actually set. */}
          <HugeiconsIcon
            icon={Location01Icon}
            size={16}
            strokeWidth={1.5}
            className="text-primary"
            aria-hidden
          />
          {band.name}
          <span className="font-normal text-muted-foreground tabular-nums">
            {band.active} listed
          </span>
        </span>
      </div>

      {/* The reference centres the headline under the band and keeps it narrow
          against the picture's full width. The measure is written on the
          heading and not on a wrapper: `ch` resolves against the element's own
          font-size, so 16ch on a 16px div is 128px and on a 60px headline is
          the two lines it was meant to be. */}
      <h1 className="mx-auto mt-12 max-w-[16ch] text-center text-5xl tracking-tighter text-balance md:mt-16 md:text-6xl">
        {copy.heading}
      </h1>
      <p className="mx-auto mt-6 max-w-[56ch] text-center text-base text-muted-foreground">
        {copy.lede}
      </p>

      {/* One surface rises and everything inside it stays flat, which is the
          arrangement the other hero's panel settled on: bg-card on the page,
          its own cast, and the fields divided by hairlines rather than filled. */}
      {/* next/form and not <form>: a native GET submit is a document
          navigation, so the search button was reloading the whole app to reach
          a route the router already had. Same action, same query string, same
          no-JS fallback, pushed rather than loaded. */}
      <Form
        action="/listings"
        className="mt-10 overflow-hidden rounded-lg bg-card shadow-soft"
      >
        {/* The tenure is the one filter that changes what the other three
            mean, so it sits in the reference's thin top row on its own, with
            the freshness stamp opposite — the two things true before a reader
            has chosen anything. */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <div
            role="group"
            aria-label="Buying or renting"
            className="flex gap-1 rounded-full bg-accent p-1"
          >
            {(["Buy", "Rent"] as const).map((one) => (
              <button
                key={one}
                type="button"
                aria-pressed={tenure === one}
                onClick={() => {
                  setTenure(one);
                  setCap(one === "Rent" ? rentPrice.initial : price.initial);
                }}
                className={cn(
                  reach,
                  "h-9 rounded-full px-5 text-sm font-medium transition-colors",
                  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  tenure === one
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {one}
              </button>
            ))}
          </div>
          <input
            type="hidden"
            name="show"
            value={tenure === "Rent" ? "rent" : "sale"}
          />

          <p className="pr-1 text-sm text-muted-foreground">
            Book updated{" "}
            <span className="tabular-nums">{copy.fresh}</span> ago
          </p>
        </div>

        {/* The reference's tall row: field groups divided by short vertical
            rules, the last cell carrying a state and the submit. Below sm the
            rules turn horizontal — four cells side by side on a phone is four
            columns of nine characters. */}
        <div className="grid divide-y sm:grid-cols-2 sm:divide-x lg:grid-cols-[1fr_1fr_1fr_auto] lg:divide-y-0">
          {[
            // "All areas" is the absence of a filter, not a place, so the
            // field submits nothing when it is chosen: a control with an empty
            // name is left out of the form data, and /listings stays a bare
            // URL rather than one naming a neighborhood that does not exist.
            area === where.initial ? { ...where, name: "" } : where,
            ladder,
            beds,
          ].map((field) => (
            <label key={field.label} className={cell}>
              <span className="text-sm text-muted-foreground">
                {field.label}
              </span>
              <FieldSelect
                field={field}
                value={
                  field.label === where.label
                    ? area
                    : field.label === beds.label
                      ? bed
                      : cap
                }
                onValueChange={
                  field.label === where.label
                    ? setArea
                    : field.label === beds.label
                      ? setBed
                      : setCap
                }
                className="text-lg tracking-tight after:absolute after:inset-0 after:content-['']"
              />
            </label>
          ))}

          {/* The count is the cell, not a line under the panel: the reference
              closes its row with a two-line state beside the button, and what
              this form knows that the other one does not is how many homes are
              left. It is arithmetic over the same ladders the dropdowns print
              — see `matching()` — so it agrees with every trailing figure in
              the menus a reader just opened. */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:col-span-2 lg:col-span-1">
            <div>
              <span className="text-sm text-muted-foreground">
                Matching now
              </span>
              <p className="text-lg tracking-tight tabular-nums">
                {count.toLocaleString("en-US")}{" "}
                {count === 1 ? "home" : "homes"}
              </p>
            </div>
            {/* The page's one 44px control. */}
            <button
              type="submit"
              className={cn(
                "group grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors",
                "hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
            >
              <span className="sr-only">See the matching homes</span>
              <ChevronRightIcon
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </Form>

      {/* A row of chips scrolls sideways on a phone rather than wrapping —
          four of these stack into three lines at 390 and push the panel above
          them off the first screen. `scrollRow` is the site's one class for
          it, and it wraps again from sm. */}
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <span className="shrink-0 text-sm text-muted-foreground">
          Or start from
        </span>
        <div className={cn(scrollRow, "gap-2.5 sm:justify-center")}>
        {worked.map((one) => (
          <Link
            key={one.label}
            href={one.href}
            className={cn(
              reach,
              "flex h-9 shrink-0 items-center rounded-full border bg-card px-4 text-sm whitespace-nowrap transition-colors",
              "hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            {one.label}
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
}
