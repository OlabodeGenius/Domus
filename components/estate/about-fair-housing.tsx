import Link from "next/link";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agents } from "@/components/estate/agents";
import { Eyebrow } from "@/components/estate/eyebrow";
import { license } from "@/components/estate/site-footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The slot the footer has been pointing at since the nav stopped being anchors.
// A US brokerage has to carry this, and a template that ships the mark in the
// baseline row without a page behind it ships the buyer a link to nowhere.
//
// The layout is the pick of three. The other two set the notice as one block
// and put the credentials under it; this pulls the four things a reader might
// actually need out to the corners and leaves the statement alone in the
// middle, which is the reference's whole composition — an object dead centre
// with the useful parts orbiting it.
//
// What ends up in the corners is not decoration. Two of them are what the state
// makes us print, and two of them are the only two ways a complaint travels.
// The reference's own four are a photo, a chart and a slider, which is what a
// weight-loss product has to show and a brokerage does not. No photograph of
// anybody at all: a face under a discrimination notice is the one illustration
// this section must not carry, whichever layout it is in.
//
// The broker of record is the first name on the roster, which is the same
// record /agents prints his number from, and the license is the footer's. A
// figure on this page is either derived or it is not on the page.
const broker = agents[0];

const corners = [
  {
    key: "mark",
    title: "Equal Housing Opportunity",
    body: "The mark is on every listing sheet we print and every window card we hang.",
  },
  {
    key: "license",
    title: license,
    body: "Domus Realty LLC, licensed in Massachusetts",
  },
  {
    key: "broker",
    title: "Tell the broker first",
    body: "If you think one of our agents has done otherwise, tell the broker of record before you tell anyone else.",
    line: `${broker.name}, ${broker.license}`,
  },
  {
    key: "file",
    title: "Or file it yourself",
    body: "You can also file with HUD or with the Massachusetts Commission Against Discrimination, and filing costs you nothing.",
  },
];

// Five overlapping ellipses on one centre line, the middle one filled. Drawn
// once at 1000×560 and scaled by the container, so the copy on top of it keeps
// its own size. `bg-accent` is the fill because this is a whisper behind type
// and the ladder's first rung down is the only step that stays one.
function Ellipses() {
  return (
    <svg
      viewBox="0 0 1000 560"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      aria-hidden
    >
      {[220, 360, 500, 640, 780].map((cx) => (
        <ellipse
          key={cx}
          cx={cx}
          cy={280}
          rx={185}
          ry={262}
          fill={cx === 500 ? "var(--accent)" : "none"}
          className="stroke-border"
        />
      ))}
    </svg>
  );
}

export function AboutFairHousing() {
  return (
    <section
      id="fair-housing"
      // The one section on this page with no heading, because the reference's
      // statement is the heading. The label is what the footer's link lands on
      // and what a screen reader reads when it gets here.
      aria-label="Fair housing"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="relative">
        <Ellipses />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
          {/* Centre first in the DOM, because on a phone the four cards are a
              column under the statement and the statement is the part that has
              to be read. The corners only become corners at lg. */}
          <div className="flex flex-col items-center px-2 py-10 text-center sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:py-16">
            <Eyebrow>Fair housing</Eyebrow>
            {/* No weight at this size — the type scale takes it off from
                text-3xl up, and the enumeration under it drops an ink level
                instead, which is the split a notice wants anyway: the
                commitment is what a visitor reads and the list is what a lawyer
                wrote. */}
            <p className="mt-8 max-w-[24ch] text-3xl tracking-tighter text-balance md:text-4xl">
              Domus Realty follows the Fair Housing Act, and so does every agent
              who signs a listing here.
            </p>
            <p className="mt-8 max-w-[52ch] text-base text-muted-foreground">
              We do not select, steer or advise buyers and renters on the basis
              of race, color, religion, sex, familial status, national origin,
              disability, sexual orientation, gender identity, age, marital
              status, veteran status or source of income.
            </p>
            <Button
              size="lg"
              className="mt-10"
              render={<Link href="/contact" />}
            >
              Talk to {broker.name}
            </Button>
          </div>

          {corners.map((corner, index) => (
            <div
              key={corner.key}
              className={cn(
                "rounded-lg border bg-card p-6",
                index === 0 && "lg:col-start-1 lg:row-start-1",
                index === 1 && "lg:col-start-3 lg:row-start-1",
                index === 2 && "lg:col-start-1 lg:row-start-2",
                index === 3 && "lg:col-start-3 lg:row-start-2",
              )}
            >
              {corner.key === "mark" ? (
                <div className="mb-5 flex size-12 items-center justify-center rounded-sm bg-accent">
                  <HugeiconsIcon
                    icon={Home01Icon}
                    size={24}
                    strokeWidth={1.25}
                    className="text-primary"
                    aria-hidden
                  />
                </div>
              ) : null}
              <p
                className={cn(
                  "font-medium",
                  corner.key === "license" &&
                    "text-2xl tracking-tight tabular-nums",
                )}
              >
                {corner.title}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {corner.body}
              </p>
              {corner.line ? (
                <p className="mt-3 text-sm tabular-nums text-muted-foreground">
                  {corner.line}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
