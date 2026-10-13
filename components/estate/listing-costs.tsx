"use client";

import { useState } from "react";
import { Calculator01Icon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
// Values from `costs.ts`, type from the book. This file is `"use client"`, and
// a *value* taken from `listings.ts` drags all twenty-one records into the
// browser — `import type` is erased, so the shape costs nothing.
import { INSURANCE_RATE, money, TAX_RATE } from "@/components/estate/costs";
import type { Home } from "@/components/estate/listings";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import { SliderField } from "@/components/estate/slider-field";
import { cn } from "@/lib/utils";

// The reference is a tool panel: a row of labelled controls across the top, one
// oversized live value under a rule, then rows of a label pair against a live
// sample, and an action row at the foot. Every part of it is doing the job a
// payment calculator does, so the structure carries over whole and only the
// control type changes.
//
// Both tenures get one, because both have a figure the card cannot print. A
// buyer's is the monthly payment at *their* deposit, not at the 20% the card
// assumes. A renter's is what has to be in the account on the day of signing,
// which in this market is four times the rent and is the number that decides it.
//
// Nothing here reaches a server. The estimates are the arithmetic every US
// listing site runs client-side, and the two rates it turns on live in
// `listings.ts` beside the book — /home-2's affordability panel runs the same
// sum backwards and has to agree with this one about both of them.

export function ListingCosts({ home }: { home: Home }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <Eyebrow icon={Calculator01Icon}>
        {home.for === "sale"
          ? "What it costs to own"
          : "What it costs to move in"}
      </Eyebrow>

      {/* The reference's panel, held inside the container rather than run to
          the viewport: a tint at the page's edges is a stripe across the page,
          and the same tint inside the column is a surface the section sits on. */}
      <div className="mt-8 -mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12">
        {home.for === "sale" ? (
          <Mortgage home={home} />
        ) : (
          <MoveIn home={home} />
        )}
      </div>
    </section>
  );
}

function Mortgage({ home }: { home: Home }) {
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const deposit = (home.price * down) / 100;
  const loan = home.price - deposit;
  const monthly = rate / 1200;
  const payments = years * 12;
  // The standard amortising payment. The zero-rate branch is not a real case at
  // these rates, but a division by zero on a slider a reader can drag is a
  // NaN on the page, and one line is cheaper than that.
  const principal =
    monthly === 0
      ? loan / payments
      : (loan * monthly) / (1 - (1 + monthly) ** -payments);
  const tax = (home.price * TAX_RATE) / 12;
  const insurance = (home.price * INSURANCE_RATE) / 12;

  return (
    <Panel
      controls={
        <>
          <Segments
            label="Term"
            options={[15, 30]}
            now={years}
            onChange={setYears}
            render={(one) => `${one} years`}
          />
          {/* 96px between them, double what the panel uses anywhere else. Each
              slider sets its label hard left and its value hard right, so at a
              normal gap the first one's figure and the second one's label end
              up closer to each other than either is to its own track — the two
              controls read as one four-part row. The gap has to beat that
              pairing, not just separate two boxes. */}
          <div className="flex flex-wrap gap-x-24 gap-y-12">
            <SliderField
              label="Down payment"
              value={`${down}% · ${money(deposit)}`}
              min={5}
              max={50}
              step={5}
              now={down}
              onChange={setDown}
            />
            <SliderField
              label="Interest rate"
              value={`${rate.toFixed(2)}%`}
              min={3}
              max={9}
              step={0.25}
              now={rate}
              onChange={setRate}
            />
          </div>
        </>
      }
      caption={`Estimated monthly payment on ${money(loan)} borrowed`}
      figure={money(principal + tax + insurance)}
      rows={[
        {
          label: "Principal and interest",
          note: `${years}-year fixed at ${rate.toFixed(2)}%`,
          value: money(principal),
          lead: true,
        },
        {
          label: "Property tax",
          note: `Estimated at ${(TAX_RATE * 100).toFixed(2)}% a year`,
          value: money(tax),
        },
        {
          label: "Home insurance",
          note: "Estimated, and your broker will quote it",
          value: money(insurance),
        },
        {
          label: "Due at closing",
          note: "The deposit alone, before fees and prepaids",
          value: money(deposit),
        },
      ]}
      note="An estimate, not an offer of credit. Domus is not a lender."
    />
  );
}

function MoveIn({ home }: { home: Home }) {
  const [fee, setFee] = useState<"tenant" | "owner">("tenant");
  const [last, setLast] = useState<"yes" | "no">("yes");

  const rows = [
    {
      label: "First month's rent",
      note: "Due at signing",
      value: home.price,
      lead: true,
    },
    ...(last === "yes"
      ? [
          {
            label: "Last month's rent",
            note: "Held to the end of the lease",
            value: home.price,
          },
        ]
      : []),
    {
      label: "Security deposit",
      note: "Returned, less any damage",
      value: home.price,
    },
    ...(fee === "tenant"
      ? [
          {
            label: "Broker fee",
            note: "One month, the Boston norm",
            value: home.price,
          },
        ]
      : []),
  ];

  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <Panel
      controls={
        <div className="flex flex-wrap gap-x-12 gap-y-8">
          <Segments
            label="Broker fee"
            options={["tenant", "owner"] as const}
            now={fee}
            onChange={setFee}
            render={(one) => (one === "tenant" ? "Tenant pays" : "Owner pays")}
          />
          <Segments
            label="Last month up front"
            options={["yes", "no"] as const}
            now={last}
            onChange={setLast}
            render={(one) => (one === "yes" ? "Required" : "Waived")}
          />
        </div>
      }
      caption="Cash needed on the day you sign"
      figure={money(total)}
      rows={rows.map((row) => ({ ...row, value: money(row.value) }))}
      note={`Landlords on this street look for a household income around ${money(home.price * 40)} a year.`}
    />
  );
}

// The reference's own anatomy, and the one place it lives: a control row, an
// oversized live value under a rule, the rows, then the action row.
function Panel({
  controls,
  caption,
  figure,
  rows,
  note,
}: {
  controls: React.ReactNode;
  caption: string;
  figure: string;
  rows: { label: string; note: string; value: string; lead?: boolean }[];
  note: string;
}) {
  return (
    <>
      {/* A stack, not a row: the caller groups its own controls, because the
          two panels do not want the same shape. A mortgage leads with the term
          — one choice, two options, and the two sliders under it read against
          it — where a move-in has nothing but a pair of either/ors. */}
      <div className="flex flex-col gap-8">{controls}</div>

      {/* The reference sets its title oversized directly under the controls
          with a rule beneath it. Here that slot is the answer, so it moves when
          a slider moves — which is the whole reason the panel is worth its
          JavaScript. */}
      <div className="mt-12 border-b pb-8">
        <p className="text-sm text-muted-foreground">{caption}</p>
        <p className="mt-3 text-5xl tracking-tighter tabular-nums">{figure}</p>
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className={cn(
              "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 rounded-sm px-4 py-3",
              // The reference lifts one row out of the list into a card of its
              // own. On a tinted panel the ground is the whole treatment — it
              // is the one rung there is room for, and it draws the row's edge
              // by itself. No shadow and no border beside it: a raised look is
              // for something that has left the surface, and this has not.
              row.lead && "bg-card",
            )}
          >
            <div>
              <p className="text-sm font-medium">{row.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{row.note}</p>
            </div>
            <p className="text-base tabular-nums">{row.value}</p>
          </li>
        ))}
      </ul>

      {/* The reference's action row: one filled pill, then quieter text beside
          it. The pill is the site's one action rather than a second one. */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button
          render={<a href="#book" />}
          className={cn(reach, "rounded-full")}
        >
          Book a viewing
        </Button>
        <p className="max-w-[52ch] text-sm text-muted-foreground">{note}</p>
      </div>
    </>
  );
}

// A label row over the shadcn slider. The control itself is the registry's,
// untouched — a range that has been restyled by hand is the one control on the
// page a buyer cannot re-skin from their own theme.
//
// The reference's select pill, kept as a segmented pair: two options is a
// choice a reader can see, and a dropdown holding two rows is a dropdown that
// hides one of them.
function Segments<T extends string | number>({
  label,
  options,
  now,
  onChange,
  render,
}: {
  label: string;
  options: readonly T[];
  now: T;
  onChange: (next: T) => void;
  render: (one: T) => string;
}) {
  return (
    <div className="min-w-[14rem]">
      <span className="text-sm font-medium">{label}</span>
      <div role="group" aria-label={label} className="mt-3 flex gap-2">
        {options.map((one) => (
          <button
            key={one}
            type="button"
            onClick={() => onChange(one)}
            aria-pressed={one === now}
            className={cn(
              "rounded-full px-5 py-2 text-sm whitespace-nowrap transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              one === now
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-card hover:bg-muted",
            )}
          >
            {render(one)}
          </button>
        ))}
      </div>
    </div>
  );
}
