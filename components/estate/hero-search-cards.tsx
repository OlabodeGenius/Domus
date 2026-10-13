"use client";

import { useState } from "react";
import Form from "next/form";
import Link from "next/link";
import {
  Cancel01Icon,
  Location01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { FieldSelect } from "@/components/estate/field-select";
import { beds, price } from "@/components/estate/search-options";
import { cn } from "@/lib/utils";

// Candidate C for the hero's search, from the panel-below reference.
//
// Two ideas carry it. The fields are *cards* rather than segments of a bar, so
// each one gets a footnote line the shipped treatment has nowhere to put — and
// a footnote is where a brokerage says the thing a portal cannot. And the panel
// keeps a row of saved searches above the fields, which is the reference's chip
// row doing the job it does there: the search you already ran, one tap away.
const saved = [
  "Back Bay · 3+ beds",
  "Cambridge · under $1.2M",
  "Open house this weekend",
];

// The footnote is the card's, not the field's: the panel that opens out of a
// card has room for a sentence and the card has room for three words, and they
// are not the same three words.
const dropdowns = [
  { field: price, note: "Median $1.42M" },
  { field: beds, note: "2+ baths" },
];

// relative, because the dropdown's trigger stretches a hit area over the whole
// card rather than living on its value line — see the after: pair below. The
// hover and the open fill are the card's own, not the trigger's, so the surface
// a thumb is actually aiming at is the surface that lights up. bg-muted for
// both: an open card already has a panel hanging off it, and a second cue for
// the same state is one the eye has to resolve.
const card =
  "relative flex flex-col rounded-lg bg-accent p-4 transition sm:p-5 hover:bg-muted has-[[data-popup-open]]:bg-muted has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50";
const footnote = "mt-4 text-sm text-muted-foreground tabular-nums";
const heading = "flex items-center gap-2 text-sm text-muted-foreground";

export function HeroSearchCards() {
  // The reference's chip carries an × badge overhanging its corner, and a badge
  // that removes nothing is decoration. This is the state that pays for the
  // client component.
  const [chips, setChips] = useState(saved);

  return (
    // The reference sets its form on a band lighter than the card above it and
    // darker than the page. Read up the ladder rather than down: the panel is
    // the one rung above the page and takes the cast that goes with being
    // raised, and every fill inside it sinks to the band's own tint instead —
    // fields, chips and all. One surface rises, the rest of the panel is wells.
    <div className="relative mt-12 rounded-lg bg-card p-4 pb-14 shadow-soft sm:p-6 md:p-8 md:pb-8">
      {/* GET to the browse route, which is where the submit has always said
          it goes. No action meant the form reloaded the home page with its own
          answers in the query string, which is a button that looks like it
          works. The three field names are the three /listings reads.

          next/form and not <form>, because a native GET submit is a document
          navigation: the button that says it searches was reloading the whole
          app to reach a route the router already had. Same action, same query
          string, same no-JS fallback — pushed rather than loaded, and
          /listings prefetched while the panel is on screen. */}
      <Form action="/listings">
        {/* The chip row. A saved search is a link to a filtered results page,
            not a control — so <a> for the chip, <button> for the × inside it,
            which is why the two are siblings rather than nested. */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={16}
              strokeWidth={2}
              className="rounded-full border p-px text-muted-foreground"
              aria-hidden
            />
            Saved searches
          </span>

          {chips.map((chip) => (
            <span key={chip} className="relative">
              <Link
                href="/listings"
                className="block rounded-full border bg-accent py-2 pr-6 pl-4 text-sm transition-colors hover:bg-muted"
              >
                {chip}
              </Link>
              {/* Overhanging the chip's own corner, as the reference draws it.
                  Drawn at 20px with the hit area pushed back out to 40. */}
              <button
                type="button"
                onClick={() =>
                  setChips((rest) => rest.filter((c) => c !== chip))
                }
                aria-label={`Remove saved search ${chip}`}
                className={cn(
                  "absolute -top-1.5 right-1 grid size-4 place-items-center rounded-full bg-foreground text-background transition-colors",
                  "after:absolute after:-inset-2.5 after:content-['']",
                  "hover:bg-foreground/80",
                )}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={12}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </span>
          ))}

          {chips.length > 0 ? (
            <button
              type="button"
              onClick={() => setChips([])}
              className="ml-auto text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Clear all
            </button>
          ) : (
            // Every list ships its empty state. This one is a sentence, because
            // an empty row of chips is a row that looks broken.
            <span className="text-sm text-muted-foreground">
              None saved yet — run a search and we will keep it here.
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {/* A label wraps the one card that holds a text input. The two that
              open a panel are divs: a <label> around a button does not forward
              its click, and the trigger carries the field's name itself. */}
          <label className={card}>
            <span className={heading}>
              <HugeiconsIcon
                icon={Location01Icon}
                size={16}
                strokeWidth={1.5}
                aria-hidden
              />
              Where
            </span>
            <input
              type="search"
              name="area"
              autoComplete="address-level2"
              spellCheck={false}
              defaultValue="Boston, MA"
              placeholder="City or neighborhood…"
              className="mt-2 w-full bg-transparent text-xl tracking-tight outline-none placeholder:text-muted-foreground"
            />
            {/* The footnote row the reference puts at the foot of every card.
                It is the slot that makes these cards rather than segments. */}
            <span className={footnote}>14 areas covered</span>
          </label>

          {dropdowns.map(({ field, note }) => (
            <div key={field.name} className={card}>
              <span className={heading}>
                <HugeiconsIcon
                  icon={field.icon}
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden
                />
                {field.label}
              </span>
              {/* The value line is 28px tall and the card is 140. Rather than
                  pad the trigger up to meet the card, the trigger casts an
                  ::after over the card's whole box — the same trick the
                  two-row's switch uses at 40px, at the scale a card asks for.
                  Nothing under it is interactive, so nothing is buried. */}
              <FieldSelect
                field={field}
                className="mt-2 text-xl tracking-tight after:absolute after:inset-0 after:content-['']"
              />
              <span className={footnote}>{note}</span>
            </div>
          ))}
        </div>

        {/* Breaking the panel's bottom-right corner, which is the one thing
            this reference does that none of the other candidates do. Overlap is
            the cheapest depth cue there is, and the panel has no
            overflow-hidden precisely so this can leave it. */}
        <button
          type="submit"
          className={cn(
            "group absolute right-6 -bottom-5 flex h-11 items-center gap-1 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-soft transition-colors",
            "hover:bg-primary/80 md:right-8 md:-bottom-6",
          )}
        >
          Search <span className="tabular-nums">1,284</span> homes
          <ChevronRightIcon
            className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden
          />
        </button>
      </Form>
    </div>
  );
}
