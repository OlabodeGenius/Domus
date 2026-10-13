import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { ChartLineData01Icon } from "@hugeicons/core-free-icons";
import { areas, type Area } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { cn, spell } from "@/lib/utils";

// The reference is four columns of figures stepped down the page, each one a
// small label, an oversized value with its unit set smaller beside it, and a
// paragraph landing near the foot. Under them, a line of context on the left
// against a row of marks.
//
// The stagger is the whole composition, and it is what a plain four-column
// strip of stats does not have: the eye takes the four in order because they
// are not on one line. The site already ships a four-column strip on the home
// page, so this section had to be something other than that one with different
// numbers in it.
//
// Every figure below is on the record. The three ranks are worked out against
// the other five rather than stored, so adding a seventh area re-ranks all of
// them and nothing has to be re-typed.
// A rank read out as a sentence rather than as an ordinal. "First-highest of
// the six" and "Sixth-fastest of the six" both parse, and neither is a thing a
// person says — so the top and the bottom get their own wording and everything
// between counts what is above it. Counting from the far end is also what keeps
// the verb from having to agree with the count.
const standing = (
  area: Area,
  by: (one: Area) => number,
  { top, rest, bottom }: { top: string; rest: string; bottom: string },
) => {
  const order = [...areas].sort((a, b) => by(a) - by(b));
  const place = order.indexOf(area);

  if (place === 0) return top;
  if (place === order.length - 1) return bottom;
  return `${rest} all but ${spell(place)} of the six.`;
};

// The reference steps each column down by roughly a third of its own height.
// Written out because Tailwind only generates classes it can read as literal
// strings, so an offset computed inside a map() is a class nobody compiles.
const steps = ["lg:mt-0", "lg:mt-12", "lg:mt-24", "lg:mt-36"] as const;

export function AreaNumbers({ area }: { area: Area }) {
  const up = area.change >= 0;

  const blocks = [
    {
      label: "Median asking",
      value: area.median,
      unit: "",
      note: `Across the ${area.active} homes we are holding in ${area.name} this morning, and it moves when the book does.`,
    },
    {
      label: "Per square foot",
      value: `$${area.perSqft.toLocaleString()}`,
      unit: "/sqft",
      note: `${standing(area, (one) => -one.perSqft, {
        top: "Nothing else on our book costs more by the foot.",
        rest: "Dearer than",
        bottom: "The cheapest of the six by the foot.",
      })} Counted on finished floor area, so a basement adds nothing.`,
    },
    {
      label: "To a first offer",
      value: `${area.days}`,
      unit: "days",
      note: `${standing(area, (one) => one.days, {
        top: "Nothing else on our book moves faster.",
        rest: "Faster than",
        bottom: "The slowest of the six to a first offer.",
      })} Half of what we list here is under agreement by then, against a median of eleven days across all six.`,
    },
    {
      label: "Asking, year on year",
      value: `${up ? "+" : "−"}${Math.abs(area.change).toFixed(1)}%`,
      unit: "",
      note: `Where asking prices sit against this time last year, read off the same book rather than off an index.`,
    },
  ];

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <Eyebrow icon={ChartLineData01Icon}>The market here</Eyebrow>
          <SectionHeading className="mt-6 max-w-[20ch]">
            What {area.name} costs, in four figures
          </SectionHeading>
        </div>
        <p className="max-w-[38ch] text-base text-muted-foreground">
          All four come off our own listings rather than a market index, so they
          answer for the homes on this page and nothing wider.
        </p>
      </div>

      <div className="mt-16 grid items-start gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {blocks.map((block, i) => (
          <article
            key={block.label}
            // One rung for all four, at the user's ask. The first build put
            // `bg-chip` on the median block to carry the reference's
            // one-saturated-tile idea; on the near-black hue this template
            // ships that chip is a whisper against `bg-accent`, so it read as
            // one box slightly off rather than as one box marked. The stagger
            // is what ranks them, and it does not need a second cue.
            className={cn(
              "flex min-h-[280px] flex-col rounded-lg bg-accent p-7",
              steps[i],
            )}
          >
            <p className="text-sm text-muted-foreground">{block.label}</p>

            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="text-5xl tracking-tighter tabular-nums">
                {block.value}
              </span>
              {block.unit ? (
                <span className="text-base text-muted-foreground">
                  {block.unit}
                </span>
              ) : null}
              {/* The one figure with a direction, so it gets the one glyph.
                  Colour rides the icon and the label stays ink, which is how
                  this style spends status without a second vivid hue. */}
              {block.label === "Asking, year on year" ? (
                <span
                  aria-hidden
                  className={cn(
                    "grid size-7 shrink-0 place-items-center self-center rounded-full",
                    up
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800",
                  )}
                >
                  {up ? (
                    <ArrowUpRightIcon className="size-4" />
                  ) : (
                    <ArrowDownRightIcon className="size-4" />
                  )}
                </span>
              ) : null}
            </p>

            <p className="mt-auto pt-10 text-sm text-muted-foreground">
              {block.note}
            </p>
          </article>
        ))}
      </div>

      {/* The reference's foot row: a line of context on the left, a run of
          marks on the right. What fills that slot here is where this area
          stands among the six — a figure on its own says nothing about whether
          it is dear, and nothing else on the page answers that.

          Two other fillings were built and read in place: the six as pills in
          price order, and the six on one number line drawn to scale. Both
          answered by *listing* the six, which the section two below this one
          already does with the same medians. Four axes answers by measuring,
          and it answers all four questions this section just asked rather than
          the first one twice. All three were one slot in one reference, so the
          `// ref:` line above never moved. */}
      <div className="mt-16">
        <Standing area={area} />
      </div>
    </section>
  );
}

// Where a marker sits on its own axis, 0 at the cheapest and 1 at the dearest.
// Division by a zero range would only happen on a book where all six agree,
// which is a book with nothing to compare — it returns the middle rather than
// NaN, because a chart drawing nothing is harder to diagnose than one drawing a
// flat line.
const place = (value: number, values: number[]) => {
  const low = Math.min(...values);
  const high = Math.max(...values);
  return high === low ? 0.5 : (value - low) / (high - low);
};

// Each row is one axis at a quarter of a chart's height: six markers, the one
// being read filled, and the range written at both ends so a marker two thirds
// along means something.
//
// `low` is which end of the axis is the good one, and it is a fact about the
// figure rather than about the drawing: cheap and fast are the left end, and a
// rising market is the right one.
const axes = [
  {
    label: "Median asking",
    of: (one: Area) => one.price,
    print: (one: Area) => one.median,
  },
  {
    label: "Per square foot",
    of: (one: Area) => one.perSqft,
    print: (one: Area) => `$${one.perSqft.toLocaleString()}`,
  },
  {
    label: "Days to a first offer",
    of: (one: Area) => one.days,
    print: (one: Area) => `${one.days} days`,
  },
  {
    label: "Asking, year on year",
    of: (one: Area) => one.change,
    print: (one: Area) =>
      `${one.change >= 0 ? "+" : "−"}${Math.abs(one.change).toFixed(1)}%`,
  },
] as const;

function Standing({ area }: { area: Area }) {
  return (
    <>
      {/* A heading rather than a note, at the user's ask: it sits under an h2
          and above four rows of its own, which is what an h3 is. Weight, ink and
          one step of size carry it — a fifth type size in this section would
          buy the same prominence and cost the size census. */}
      <h3 className="text-base">
        Where {area.name} sits on each of the four, against the other five
      </h3>

      <dl className="mt-10">
        {axes.map((axis) => {
          const values = areas.map(axis.of);
          const sorted = [...areas].sort((a, b) => axis.of(a) - axis.of(b));

          return (
            <div
              key={axis.label}
              className="grid items-center gap-x-8 gap-y-3 border-t border-dashed py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,18ch)_minmax(0,1fr)_minmax(0,10ch)]"
            >
              <dt className="text-sm text-muted-foreground">{axis.label}</dt>

              <dd aria-hidden className="relative h-px bg-border">
                {areas.map((one) => {
                  const on = one.name === area.name;
                  return (
                    <span
                      key={one.name}
                      style={{ left: `${place(axis.of(one), values) * 100}%` }}
                      className={cn(
                        "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                        on ? "size-3.5 bg-foreground" : "size-2 bg-border",
                      )}
                    />
                  );
                })}

                {/* The ends, so a marker two thirds along means something. They
                    sit under the axis rather than at it — ink on the line is a
                    seventh marker as far as the eye is concerned. */}
                <span className="absolute top-3 left-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums">
                  {axis.print(sorted[0])}
                </span>
                <span className="absolute top-3 right-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums">
                  {axis.print(sorted[sorted.length - 1])}
                </span>
              </dd>

              <dd className="text-base tabular-nums md:pt-0 md:text-right">
                {axis.print(area)}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}
