import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { medianDays, over, overAsking, sold } from "@/components/estate/sold";
import { cn } from "@/lib/utils";

// The reference is a copy block over three cards of different heights, each
// stepped down from the last and each holding a figure at the top with its
// label and description pinned to the foot — a variable void between the two
// is the whole device, and it is what stops a set of figures reading as a
// table.
//
// Six rather than three, which the row calls extensible, and the two summary
// figures ride the lede rather than taking cards of their own: an average over
// asking standing in the same grid as the six sales it is an average *of* is a
// row a reader has to work out is not a seventh house.
//
// The reference's light, dark and colour cards become two rungs of the ladder
// cycled by position. Three grounds inside one grid would be inventing a
// hierarchy — the middle card is not more important than the others here, it
// is just lower.
//
// No state, so no "use client": every figure is derived at build time from
// `sold.ts`, and the section renders on the server like the four it sits
// between.
const percent = (n: number) =>
  `${n > 0 ? "+" : n < 0 ? "−" : ""}${(Math.abs(n) * 100).toFixed(1)}%`;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function PortalSold() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference's copy block, ranged left and taking the top of the
          frame on its own. */}
      <div>
        <Eyebrow icon={CheckmarkBadge01Icon}>Sold last month</Eyebrow>
        <SectionHeading className="mt-6 max-w-[18ch]">
          What they went for
        </SectionHeading>
        <p className="mt-6 max-w-[58ch] text-base text-muted-foreground">
          Six of the homes we closed last month, with what each was listed at
          beside what it took. Across the six the sale price came in{" "}
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-medium tabular-nums",
              overAsking > 0
                ? "bg-emerald-100 text-emerald-800"
                : overAsking < 0
                  ? "bg-amber-100 text-amber-800"
                  : "bg-muted text-muted-foreground",
            )}
          >
            {percent(overAsking)}
          </span>{" "}
          over asking, and the middle one waited{" "}
          <span className="font-medium text-foreground tabular-nums">
            {medianDays}
          </span>{" "}
          days for its first offer.
        </p>
      </div>

      <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        {sold.map((one, i) => {
          const delta = over(one);
          return (
            <li
              key={one.address}
              className={cn(
                "flex min-h-[15rem] flex-col justify-between rounded-lg p-7",
                // Two rungs cycled by position, and the offsets that make the
                // row a staircase rather than a shelf. Both are per column, so
                // below lg — where the grid is one or two wide — they come off
                // and the cards sit square, which is what the reference's own
                // layout does at that width.
                i % 2 === 0 ? "bg-accent" : "border bg-card",
                i % 3 === 1 && "lg:mt-14",
                i % 3 === 2 && "lg:mt-7",
                i % 3 === 1 && "lg:min-h-[18rem]",
              )}
            >
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                <span className="text-3xl tracking-tight tabular-nums">
                  {money(one.sold)}
                </span>
                {/* The one figure the card exists to print. It rides the sold
                    price rather than sitting in the footnote, because over or
                    under asking is the sentence and the rest is the receipt. */}
                {/* Green for a sale that beat its asking price, amber for one
                    that did not, and the pair is `area-numbers.tsx`'s — the
                    site already spends its pastel status hues on exactly this
                    figure, and a second green would be a second system. A sale
                    that landed on the number gets neither, because there is no
                    direction to point in. */}
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium tabular-nums",
                    delta === 0
                      ? "bg-muted text-muted-foreground"
                      : delta > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800",
                  )}
                >
                  {delta === 0 ? "at asking" : `${percent(delta)} on asking`}
                </span>
              </p>

              {/* Pinned to the foot with the void above it, which is the
                  reference's whole rhythm. */}
              <div className="mt-10">
                <p className="text-base font-medium">{one.address}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {one.area}
                </p>
                <p className="mt-3 text-sm text-muted-foreground tabular-nums">
                  Asked {money(one.asking)} · {one.days} days to first offer
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
