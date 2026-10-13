"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Notification03Icon,
  NotificationOff01Icon,
  Cancel01Icon,
  SearchAreaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eyebrow } from "@/components/estate/eyebrow";
import { FieldSelect } from "@/components/estate/field-select";
import type { Pin } from "@/components/estate/portal";
import { beds, matching, where } from "@/components/estate/search-options";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The reference is one panel with a selector down its left third and a single
// large object in the right two thirds, two lines of copy under it and a pill
// at the foot. The selector is doing exactly what a saved-search list does —
// several rows, one of them live — so the structure carries and the object
// changes: where the reference puts a render, this puts the alert the selected
// row would send.
//
// That swap is the section's whole argument. A row that says "alerts on" is a
// promise about an email nobody has seen, and a toggle over an invisible
// outcome is the dead-button rule wearing a switch. Showing the message makes
// the control mean something, and it costs one card.
//
// The counts come from `matching()`, the same arithmetic the hero's search bar
// prints, so a search saved from one and read in the other agrees with itself.
// The two homes in the preview are real records off the book, filtered by area
// and tenure only — which is what the caption under them says, rather than
// implying the alert has run every part of the search.

type Search = {
  id: string;
  tenure: "Buy" | "Rent";
  area: string;
  price: string;
  beds: string;
  alerts: boolean;
};

// Three worked examples, and each one is a search somebody would actually
// keep: a family holding out for a third bedroom on one street, a buyer with a
// ceiling, and a renter with a budget and no geography.
const seeded: Search[] = [
  { id: "s1", tenure: "Buy", area: "Back Bay", price: "$3M", beds: "3+", alerts: true },
  { id: "s2", tenure: "Buy", area: "Cambridge", price: "$1.5M", beds: "2+", alerts: false },
  { id: "s3", tenure: "Rent", area: "All areas", price: "$4,000", beds: "Any", alerts: true },
];

const copy = {
  eyebrow: "Saved searches",
  heading: "Keep the search, not the tab",
  lede: "Three are already kept. Build a fourth and it takes its count straight off the book, then switch its alerts on and read the email it would send.",
  empty:
    "Nothing kept. Build one below and it will sit here with its own count.",
} as const;

/** What a row calls itself, and the line under it. Derived rather than typed,
    so a search built by the composer reads exactly like the three seeded ones
    instead of being a second naming convention. */
const nameOf = (one: Search) =>
  one.area === "All areas"
    ? `Anywhere, ${one.beds === "Any" ? "any size" : `${one.beds} beds`}`
    : `${one.area}, ${one.beds === "Any" ? "any size" : `${one.beds} beds`}`;

const termsOf = (one: Search) =>
  one.tenure === "Rent"
    ? `To rent · ${one.price === "No max" ? "any rent" : `up to ${one.price} a month`}`
    : `For sale · ${one.price === "No max" ? "any price" : `up to ${one.price}`}`;

export function PortalSearches({ pins }: { pins: Pin[] }) {
  const [rows, setRows] = useState(seeded);
  const [chosen, setChosen] = useState<string | null>(seeded[0].id);
  const [area, setArea] = useState(where.initial);
  const [bed, setBed] = useState(beds.initial);

  const one = rows.find((row) => row.id === chosen) ?? null;

  // Area and tenure only, which is what the caption says. The two newest are
  // the two a weekly email would open with.
  const latest = one
    ? pins
        .filter(
          (pin) =>
            (one.area === "All areas" || pin.area === one.area) &&
            pin.for === (one.tenure === "Rent" ? "rent" : "sale"),
        )
        .sort((a, b) => a.days - b.days)
        .slice(0, 2)
    : [];

  const add = () => {
    const id = `s${rows.length + 1}-${area}-${bed}`;
    if (rows.some((row) => row.id === id)) return;
    const next: Search = {
      id,
      tenure: "Buy",
      area,
      price: "No max",
      beds: bed,
      alerts: true,
    };
    setRows((all) => [...all, next]);
    setChosen(id);
  };

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="flex flex-col items-start">
        <Eyebrow icon={SearchAreaIcon}>{copy.eyebrow}</Eyebrow>
        <SectionHeading className="mt-6 max-w-[16ch]">
          {copy.heading}
        </SectionHeading>
        <p className="mt-6 max-w-[58ch] text-base text-muted-foreground">
          {copy.lede}
        </p>
      </div>

      {/* The reference's one panel. A tint rather than a white card: the hero
          already spends the page's raised-panel move forty pixels up, and a
          second white slab under it would read as the same section twice. The
          rows and the preview rise off this one instead. */}
      <div className="mt-12 grid grid-cols-1 gap-10 rounded-lg bg-accent p-6 sm:p-10 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] lg:gap-14 lg:p-12">
        <div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground tabular-nums">
              {rows.length}
            </span>{" "}
            kept on this device
          </p>

          {rows.length === 0 ? (
            <p className="mt-6 rounded-sm border border-dashed p-5 text-sm text-muted-foreground">
              {copy.empty}
            </p>
          ) : (
            <ul className="mt-5 flex flex-col gap-2">
              {rows.map((row) => {
                const on = row.id === chosen;
                return (
                  <li key={row.id} className="relative">
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setChosen(row.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-sm py-3 pr-11 pl-3 text-left transition-colors",
                        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        // The row rises to the card rung on hover, which is
                        // one step off the tint it sits on. An alpha of the
                        // same fill would land inside the band's floor and
                        // read as nothing happening.
                        on ? "bg-card shadow-soft" : "hover:bg-card",
                      )}
                    >
                      {/* The reference gives every row a filled tile in its own
                          hue. This palette ships one, so the tile carries the
                          state instead of a colour: the live row's is the brand
                          fill and the rest sit a rung down. */}
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
                          on
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground",
                        )}
                      >
                        <HugeiconsIcon
                          icon={
                            row.alerts ? Notification03Icon : NotificationOff01Icon
                          }
                          size={16}
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-base font-medium">
                          {nameOf(row)}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                          {termsOf(row)}
                        </span>
                      </span>

                      <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                        {matching({
                          tenure: row.tenure,
                          area: row.area,
                          price: row.price,
                          beds: row.beds,
                        }).toLocaleString("en-US")}
                      </span>
                    </button>

                    {/* Outside the row button rather than inside it: one control
                        cannot sit in another, and a saved search a reader
                        cannot drop is a list that only grows. */}
                    <button
                      type="button"
                      onClick={() => {
                        setRows((all) => all.filter((r) => r.id !== row.id));
                        if (chosen === row.id) setChosen(null);
                      }}
                      aria-label={`Forget ${nameOf(row)}`}
                      className={cn(
                        // 28px drawn, 40 reachable, and short on both axes —
                        // so its own inset rather than `reach`, which only
                        // stretches the vertical.
                        "after:absolute after:-inset-1.5 after:content-['']",
                        "absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors",
                        "hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      )}
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={14}
                        strokeWidth={2}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* The composer. Two fields and a button, which is the shortest a
              search can be and still be one — the hero's bar is where the
              other two live, and a reader who wants a ceiling saves from
              there. */}
          <div className="mt-6 rounded-sm border border-dashed p-4">
            <p className="text-sm font-medium">Keep another</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[where, beds].map((field) => (
                <label
                  key={field.label}
                  className="relative flex flex-col gap-0.5 rounded-sm bg-card px-3.5 py-2.5 transition-colors hover:bg-muted has-[[data-popup-open]]:bg-muted"
                >
                  <span className="text-xs text-muted-foreground">
                    {field.label}
                  </span>
                  <FieldSelect
                    field={field}
                    value={field === where ? area : bed}
                    onValueChange={field === where ? setArea : setBed}
                    className="text-sm after:absolute after:inset-0 after:content-['']"
                  />
                </label>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={add}
              className="mt-3 w-full rounded-full bg-card"
            >
              Keep this search
            </Button>
          </div>
        </div>

        {/* The reference's right two thirds: one object centred, two lines
            under it, a pill at the foot. */}
        <div className="flex flex-col items-center justify-center text-center">
          {one ? (
            <>
              <div className="w-full max-w-[420px] rounded-lg bg-card p-6 text-left shadow-soft">
                <div className="flex items-center gap-2 border-b pb-4 text-sm text-muted-foreground">
                  <HugeiconsIcon
                    icon={Notification03Icon}
                    size={16}
                    strokeWidth={1.5}
                    className="text-primary"
                    aria-hidden
                  />
                  Domus alerts
                  <span className="ml-auto tabular-nums">Friday, 8am</span>
                </div>

                {/* The subject line, written the way one is: where, and
                    nothing else. Anything more specific would be a claim about
                    two records this card has not actually filtered on. */}
                <p className="mt-5 text-base font-medium text-balance">
                  New in{" "}
                  {one.area === "All areas" ? "Greater Boston" : one.area}
                </p>

                {latest.length > 0 ? (
                  <ul className="mt-4 flex flex-col divide-y">
                    {latest.map((pin) => (
                      <li
                        key={pin.slug}
                        className="flex items-baseline gap-3 py-3 text-sm"
                      >
                        <Link
                          href={pin.href}
                          // 20px of type is the only tap target in the row, so
                          // it takes the site's reach rather than leaving a
                          // thumb to find a line of text.
                          className={cn(
                            reach,
                            "truncate font-medium underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                          )}
                        >
                          {pin.address}
                        </Link>
                        <span className="ml-auto shrink-0 tabular-nums">
                          {pin.short}
                        </span>
                        <span className="shrink-0 text-muted-foreground tabular-nums">
                          {pin.days}d
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
                    Nothing photographed there yet. The first one we shoot goes
                    out in this email.
                  </p>
                )}

                <p className="mt-2 text-xs text-muted-foreground">
                  {latest.length > 0
                    ? "The last two we listed there. A real alert reads the whole search."
                    : "A real alert reads the whole search."}
                </p>
              </div>

              <p className="mt-8 max-w-[42ch] text-sm text-muted-foreground">
                {one.alerts
                  ? `One email a week while ${nameOf(one)} keeps matching. Nothing on the weeks it does not.`
                  : `Alerts are off. This one sits here until you open it.`}
              </p>

              <Button
                variant={one.alerts ? "outline" : "default"}
                onClick={() =>
                  setRows((all) =>
                    all.map((row) =>
                      row.id === one.id ? { ...row, alerts: !row.alerts } : row,
                    ),
                  )
                }
                className={cn(
                  "mt-5 rounded-full",
                  one.alerts && "bg-card",
                )}
              >
                {one.alerts ? "Turn alerts off" : "Turn alerts on"}
              </Button>
            </>
          ) : (
            <p className="max-w-[34ch] text-sm text-balance text-muted-foreground">
              Press a saved search to read the alert it would send.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
