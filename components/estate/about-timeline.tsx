import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The quietest of the three layouts this section was built at, and the pick.
// The argument it wins on is that a company history does not need a drawing:
// six ruled cells, every date readable at once, nothing to click before the
// copy appears. The arc showed one date at a time, which meant a reader who
// wanted the history in one glance never found out what was behind the five
// years they did not click.
//
// The reference numbers its cells `(001)` to `(004)` in the right corner of
// each. Here the year takes that slot, which costs nothing and means the grid
// is already in date order without a second numbering to keep in step with it.
//
// One shared ruled frame rather than six bordered cards: `border-t border-l` on
// the list and `border-r border-b` on each cell draws every line exactly once,
// and no cell carries a fill it has not earned.
//
// Six dates, and every one of them answers to a figure the rest of the site
// already prints: 1998 is what twenty-eight years counts from and what Tom
// Brennan's own record says he started, 2026 closes on six offices and forty
// agents. Nothing here claims a number a reader cannot find twice.
const milestones = [
  {
    year: "1998",
    title: "The first office",
    note: "Tom Brennan leaves a franchise and rents two rooms over a bank on Beacon Street. Four listings that year, all of them in Brookline.",
  },
  {
    year: "2004",
    title: "Back Bay",
    note: "A second office, on Newbury Street. The brownstone book starts there and has not moved since.",
  },
  {
    year: "2011",
    title: "Lettings",
    note: "We start renting the flats we had only been selling. A fifth of the book is leases now.",
  },
  {
    year: "2016",
    title: "Our own photography",
    note: "The firm puts two photographers on the payroll rather than booking them. Every listing since has been shot the week it came on.",
  },
  {
    year: "2021",
    title: "The broker reads first",
    note: "Offers start going past a broker before they leave the office. It costs a day and it has saved a dozen closings.",
  },
  {
    year: "2026",
    title: "Six offices, forty agents",
    note: "Jamaica Plain was the last of the six, over a bakery on Centre Street. Nine of the forty take listings in the areas this site covers.",
  },
];

const last = milestones[milestones.length - 1];

export function AboutTimeline() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <Eyebrow>Since 1998</Eyebrow>
      {/* The reference sets its headline in two colours. Two ink levels are
          what this palette has instead, and the emphasis lands on the count
          rather than on the span, because six dates is the promise the grid
          under it has to keep. */}
      <SectionHeading className="mt-6 max-w-[24ch]">
        <span className="text-muted-foreground">Twenty-eight years,</span> in
        six dates
      </SectionHeading>

      <ul className="mt-12 grid overflow-hidden rounded-lg border-t border-l md:mt-16 md:grid-cols-2">
        {milestones.map((milestone) => {
          const now = milestone === last;
          return (
            <li
              key={milestone.year}
              // The reference fills one of its four cells and drops an arrow in
              // its corner. That cell is 2026 here: the only date on the list a
              // visitor can still walk into.
              className={cn(
                "flex flex-col border-r border-b p-8 md:p-10",
                now && "bg-accent",
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-2xl tracking-tight">{milestone.title}</h3>
                <p className="shrink-0 pt-1.5 text-sm tabular-nums text-muted-foreground">
                  ({milestone.year})
                </p>
              </div>
              <p className="mt-4 max-w-[46ch] text-sm text-muted-foreground">
                {milestone.note}
              </p>

              {now ? (
                // `mt-auto` on the wrapper rather than on the button, so the
                // corner keeps its gap in a short cell and still lands on the
                // baseline of a tall one.
                <div className="mt-auto flex justify-end pt-8">
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label="See the agents who list here"
                    render={<Link href="/agents" />}
                  >
                    <ArrowUpRightIcon className="size-4" />
                  </Button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
