"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Calculator01Icon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { SliderField } from "@/components/estate/slider-field";
import { Button } from "@/components/ui/button";
import { cn, shortMoney, spell } from "@/lib/utils";

// The listing page's calculator answers *what does this home cost a month*.
// This one runs the same arithmetic the other way — a monthly figure in, the
// price it buys out — which is the question a portal visitor actually arrives
// with and the one a grid of asking prices cannot answer.
//
// The reference is a tick ring holding a label, a value pill, a slider and an
// oversized result, with a heading, a second oversized figure, a caption and a
// button opposite. Every slot maps: the ring takes the budget and the ceiling
// it buys, and the column beside it takes how many homes on the book are under
// that ceiling.
//
// The arithmetic is stated under the ring rather than hidden, because a figure
// a reader cannot check is a figure they will not act on. Rates come from
// `listings.ts` — the same two the listing page's panel uses, so the two
// calculators cannot disagree about tax and insurance.
const TERM = 30;

const copy = {
  eyebrow: "What a monthly number buys",
  heading: "Work back from what you can pay each month",
  lede: "Every other search on this site starts with a price ceiling you have to guess at. This one starts with the figure you already know, what you can pay in a month, and works the ceiling out from there.",
} as const;

export function PortalAfford({
  prices,
  tax,
  insurance,
}: {
  /** The asking price of every home on the book that is for sale. Numbers
      only: the panel counts what falls under the ceiling, and the book itself
      belongs on the server. */
  prices: number[];
  tax: number;
  insurance: number;
}) {
  const [budget, setBudget] = useState(8000);
  const [deposit, setDeposit] = useState(250_000);
  const [rate, setRate] = useState(6.5);

  // The mortgage formula solved for the price rather than for the payment.
  //
  //   monthly = (price − deposit) × k + price × t
  //   price   = (monthly + deposit × k) ÷ (k + t)
  //
  // where k is the standard amortisation factor over the term and t is the
  // monthly share of tax and insurance, both of which scale with the price and
  // are therefore on the left of the division rather than subtracted from the
  // budget first — that shortcut is what makes most affordability calculators
  // quote a ceiling a few per cent too high.
  const i = rate / 1200;
  const k = i / (1 - (1 + i) ** -(TERM * 12));
  const t = (tax + insurance) / 12;
  const ceiling = Math.max(deposit, (budget + deposit * k) / (k + t));

  const under = prices.filter((price) => price <= ceiling).length;

  // The ring's fill, as a share of the range the slider offers.
  const share = (budget - 2000) / (15000 - 2000);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* Not `items-center`, at the user's ask and for a reason worth writing
          down: the count opposite runs to two lines at one budget and three at
          the next, and a centred row re-centres *both* columns when it does —
          so dragging the budget slider moved the ring under the thumb holding
          it. Both columns start at the top now and only the sentence that
          changed moves. The ring takes 2rem of its own to sit against the
          eyebrow rather than above it. */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* The reference's ring, and the whole left half of the frame. */}
        <div className="lg:pt-8">
          <div className="relative mx-auto grid aspect-square w-full max-w-[440px] place-items-center">
            <Ring share={share} />

            <div className="absolute inset-0 grid place-items-center px-14 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Every month</p>
                {/* The reference's dark value pill, which is the one place a
                    live figure and its control sit together. */}
                <p className="mt-2 inline-flex rounded-full bg-foreground px-4 py-1.5 text-base font-medium text-background tabular-nums">
                  ${budget.toLocaleString("en-US")}
                </p>

                <SliderField
                  label="Monthly budget"
                  value=""
                  min={2000}
                  max={15000}
                  step={100}
                  now={budget}
                  onChange={setBudget}
                  hideLabel
                  className="mt-6"
                />

                <p className="mt-8 text-sm text-muted-foreground">
                  Buys you up to
                </p>
                <p className="mt-1 text-5xl tracking-tighter tabular-nums">
                  {shortMoney(ceiling)}
                </p>
              </div>
            </div>
          </div>

          {/* The two numbers the ring does not hold. They sit under it rather
              than inside it: three sliders in a circle is a dial, and a dial is
              a control a reader has to learn. */}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-8">
            <SliderField
              label="Deposit"
              value={`$${deposit.toLocaleString("en-US")}`}
              min={25_000}
              max={900_000}
              step={5_000}
              now={deposit}
              onChange={setDeposit}
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
        </div>

        {/* The reference's right half: a heading, one oversized figure with a
            caption, a small paragraph and a pill. */}
        <div>
          <Eyebrow icon={Calculator01Icon}>{copy.eyebrow}</Eyebrow>
          <SectionHeading className="mt-6 max-w-[16ch]">
            {copy.heading}
          </SectionHeading>

          <p className="mt-8 max-w-[52ch] text-base text-muted-foreground">
            {copy.lede}
          </p>

          <p className="mt-12 text-7xl tracking-tighter tabular-nums">
            {under}
          </p>
          <p className="mt-3 max-w-[34ch] text-base text-muted-foreground">
            {under === 1 ? "home" : "homes"} of the{" "}
            <span className="tabular-nums">{prices.length}</span> we have
            photographed{" "}
            {under === 0
              ? "sit under that ceiling. It falls below every asking price on the book this morning"
              : `${under === 1 ? "is" : "are"} at or under ${shortMoney(ceiling)}`}
            .
          </p>

          <p className="mt-8 max-w-[52ch] text-sm text-muted-foreground">
            Over {spell(TERM)} years at {rate.toFixed(2)}%, with{" "}
            {(tax * 100).toFixed(2)}% property tax and{" "}
            {(insurance * 100).toFixed(1)}% insurance carried inside the monthly
            figure rather than added after it. No HOA dues, because those belong
            to a building and not to a budget.
          </p>

          <Button
            render={
              <Link
                href={`/listings?show=sale&price=${encodeURIComponent(shortMoney(ceiling))}`}
              />
            }
            className={cn("mt-9 rounded-full")}
          >
            Show me what that buys
            <ArrowUpRightIcon data-icon="inline-end" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Sixty ticks around a circle, the ones under the current value in the brand
// hue and the rest a rung down. A data fill rather than a surface — it encodes
// the budget — so the whisper band that governs the page's fills does not
// apply to it, the same call the listing page's gauge makes.
//
// Drawn rather than a conic gradient: at this radius a gradient's edge has to
// be masked to a ring and the mask is what breaks in Safari, and the ticks are
// the reference's own device anyway.
function Ring({ share }: { share: number }) {
  const ticks = 60;
  const lit = Math.round(share * ticks);

  return (
    <svg viewBox="0 0 200 200" aria-hidden className="size-full">
      {Array.from({ length: ticks }, (_, i) => {
        // Twelve o'clock, clockwise — a gauge that starts anywhere else needs
        // a legend to say where its zero is.
        const angle = ((i / ticks) * 360 - 90) * (Math.PI / 180);
        const inner = 84;
        const outer = i % 5 === 0 ? 96 : 93;
        // Rounded, and not for tidiness. React compares the server's string
        // against the client's number and `Math.cos` lands on a different last
        // digit in Node than it does in the browser — 156.20697093414412
        // against 156.2069709341441 — which is a hydration mismatch on a
        // drawing nobody has touched. Two decimals is finer than a 200-unit
        // viewBox can draw anyway.
        const at = (n: number) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={at(100 + Math.cos(angle) * inner)}
            y1={at(100 + Math.sin(angle) * inner)}
            x2={at(100 + Math.cos(angle) * outer)}
            y2={at(100 + Math.sin(angle) * outer)}
            strokeWidth={2}
            strokeLinecap="round"
            className={cn(
              "transition-colors",
              i < lit ? "stroke-primary" : "stroke-border",
            )}
          />
        );
      })}
    </svg>
  );
}
