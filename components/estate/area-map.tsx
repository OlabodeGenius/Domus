"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Leaf01Icon,
  MapPinHouseIcon,
  MetroIcon,
  School01Icon,
  ShoppingBasket01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { agentFor, agents, portrait } from "@/components/estate/agents";
import { areas, photo, type SpotKind } from "@/components/estate/areas";
import { AreaPlan } from "@/components/estate/area-plan";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Button } from "@/components/ui/button";
import { cn, slugify } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// The reference is a plan selector: a capsule of selectable rows on the left, a
// lifted detail panel on the right, and one thing chosen at a time. Six areas
// against three plans is the same control with two more rows in it.
//
// It holds state, so it is the one client component on this page apart from the
// chart. The alternative was six radios and `has-[:checked]`, which is what the
// home page's accordion runs on — it does not work here, because the map has to
// repaint a *specific* zone per area and Tailwind only generates classes it can
// read as literal strings in the source. `group-has-[#area-${slug}:checked]`
// inside a map() is a class nobody compiles.
const glyph: Record<SpotKind, typeof MetroIcon> = {
  transit: MetroIcon,
  school: School01Icon,
  park: Leaf01Icon,
  shops: ShoppingBasket01Icon,
};

// The one row the reference marks. Cambridge holds 64 of the 258, which is a
// quarter of everything we have across the six, so it is a fact about the book
// rather than a badge somebody chose to award.
const busiest = areas.reduce((most, area) =>
  area.active > most.active ? area : most,
);

export function AreaMap() {
  const [chosen, setChosen] = useState(areas[0].name);
  const area = areas.find((one) => one.name === chosen) ?? areas[0];
  const agent = agentFor({ area: area.name });

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference sets a headline top-left and a small proof item far
          right on the same line, low against the headline's foot. */}
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <Eyebrow icon={MapPinHouseIcon}>On the plan</Eyebrow>
          <SectionHeading className="mt-6 max-w-[20ch]">
            Six areas, and how far apart they actually are
          </SectionHeading>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {agents.map((one) => (
              <Image
                key={one.name}
                src={photo(one.src, 96)}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <p className="max-w-[16ch] text-sm text-muted-foreground">
            Four agents cover all six
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-14">
        <div>
          {/* The reference's capsule: one tinted slab with the rows sitting
              inside it, rather than six rows loose on the page. */}
          <div
            role="group"
            aria-label="Choose an area"
            className="flex flex-col gap-1 rounded-lg bg-accent p-2"
          >
            {areas.map((one) => {
              const on = one.name === chosen;
              return (
                <button
                  key={one.name}
                  type="button"
                  onClick={() => setChosen(one.name)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center gap-4 rounded-sm px-4 py-3.5 text-left transition-colors",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    // Unselected rests on the capsule's own tint and rises one
                    // rung on hover, which is the only direction above accent
                    // there is. Chosen takes the page's neutral dark action,
                    // the same treatment the browse pills use, and carries its
                    // own hover — one rule written for the resting row would
                    // repaint the dark one pale under the cursor.
                    on
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "hover:bg-card",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-base font-medium">{one.name}</span>
                      {one.name === busiest.name ? (
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs",
                            on ? "bg-background/15" : "bg-muted",
                          )}
                        >
                          Most on the book
                        </span>
                      ) : null}
                    </span>
                    {/* One ink level on an inverted ground, so the chosen row's
                        second line sits back by size alone. */}
                    <span
                      className={cn(
                        "mt-1 block text-sm tabular-nums",
                        on ? "" : "text-muted-foreground",
                      )}
                    >
                      {one.median} median
                      <span aria-hidden className="px-1.5">
                        ·
                      </span>
                      {one.active} homes
                    </span>
                  </span>

                  {/* The reference's radio, filled with a tick once its row is
                      taken. Decorative: aria-pressed on the button is what a
                      screen reader is told, and a second announcement here
                      would say the same thing twice. */}
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full",
                      on ? "bg-background text-foreground" : "border",
                    )}
                  >
                    {on ? (
                      <HugeiconsIcon
                        icon={Tick02Icon}
                        size={14}
                        strokeWidth={2.5}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          {/* The reference closes its left column on a footnote and a person
              credit. Ours names the agent who lists in whichever area is
              chosen, which is the one fact on this page that changes with the
              selection and is not a number. */}
          <p className="mt-8 max-w-[42ch] text-sm text-muted-foreground">
            Whichever you press, the name under it is the agent who lists there
            and the one who picks up.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <Image
              src={portrait(agent.src, 112)}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="text-base font-medium">{agent.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {agent.title}
                <span aria-hidden className="px-1.5">
                  ·
                </span>
                <span className="tabular-nums">{agent.license}</span>
              </p>
            </div>
          </div>

          {/* Two rows the reference does not have, and they are here because
              the panel opposite is a third taller than this column: six rows,
              a footnote and a credit leave a quarter of the section empty on a
              wide screen. What fills it is the pair of facts the panel has no
              slot for — what the streets are actually built of, and how long
              the ride in takes. */}
          {/* One column, label over value. A term set left against a value set
              right needs the two to be close in length to read as a pair, and
              these are a four-word label against a sentence — the row came out
              ragged, with a paragraph on one side and two words on the other.
              Stacked, the label is a heading for what is under it and both
              edges line up with the credit above and the capsule above that. */}
          <dl className="mt-10 border-t pt-8">
            {[
              { term: "What is built here", detail: area.stock },
              {
                term: "To Downtown Crossing",
                detail: `${area.commute} min on the T`,
              },
            ].map((row) => (
              <div key={row.term} className="not-first:mt-6">
                <dt className="text-sm text-muted-foreground">{row.term}</dt>
                <dd className="mt-1.5 max-w-[46ch] text-sm tabular-nums">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The reference's lifted panel. shadow-soft and no border: the token
            opens with its own hairline ring, and declaring both would draw the
            edge twice. */}
        <div className="rounded-lg bg-card p-5 shadow-soft sm:p-7">
          <AreaPlan chosen={chosen} onChoose={setChosen} />

          <p className="mt-4 text-sm text-muted-foreground">
            Drawn rather than mapped, and not to scale. Every listing page opens
            its own address in Maps.
          </p>

          {/* The reference puts a value and a wide pill button on one line. */}
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t pt-8">
            <div>
              <p className="text-sm text-muted-foreground">
                Median asking in{" "}
                <span className="text-foreground">{area.name}</span>
              </p>
              <p className="mt-2 text-3xl tracking-tight tabular-nums">
                {area.median}
              </p>
            </div>
            <Button
              render={<Link href={`/listings?area=${slugify(area.name)}`} />}
              className="rounded-full"
            >
              See {area.active} homes
            </Button>
          </div>

          <p className="mt-6 text-base text-muted-foreground">{area.line}</p>

          {/* The reference's tick list, in its two columns. The geometry is the
              one thing a drawn plan cannot get right, so the four things every
              home here is measured against are written out instead. */}
          {/* The row gap matches the column gap rather than sitting under it.
              Each tile is two lines tall, so a tighter gap down puts the second
              line of one row nearer the tile below it than the label it belongs
              to — and the grid stops reading as four items and starts reading
              as eight lines. Where two elements sit close, the space goes up. */}
          <ul className="mt-8 grid gap-8 border-t pt-8 sm:grid-cols-2">
            {area.spots.map((spot) => (
              <li key={spot.name} className="flex gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent">
                  <HugeiconsIcon
                    icon={glyph[spot.kind]}
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{spot.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {spot.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
