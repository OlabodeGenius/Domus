import type { ReactNode } from "react";
import Link from "next/link";
import { areas, type AreaName } from "@/components/estate/areas";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// The plan, lifted out of area-map.tsx the moment an area's own page wanted the
// same drawing. The second use is a component: two copies of six district
// rectangles, four roads and a river would agree on the day they were written
// and disagree by the third edit, and the odd one out is a map of a different
// city.
//
// A tile server is an account, a key and a bill the buyer inherits before the
// site has a visitor, and a grey rectangle where a map should be is worse than
// either — so this is a drawing, and the caption its callers print says so.
//
// The six blocks stand where the six areas stand relative to each other: the
// river between Cambridge and Somerville on one side and Back Bay and Beacon
// Hill on the other, Brookline and Jamaica Plain south of both, the harbour off
// to the east. Nothing here is to scale and it does not pretend to be.
//
// No "use client" and no state of its own. /neighborhoods hands it an
// `onChoose` and gets six buttons; an area's own page hands it none and gets
// five links out and one plain chip for the area the reader is already on. The
// second case renders on the server and ships no JavaScript at all, which is
// the whole reason the markers are a branch rather than a prop.
export function AreaPlan({
  chosen,
  onChoose,
  chips = true,
  children,
}: {
  /** The block that takes the tint. Withheld, none of them does — which is
      what the portal home's map wants until a reader touches a pin. */
  chosen?: AreaName;
  /** Given, the markers select. Withheld, they navigate. */
  onChoose?: (name: AreaName) => void;
  /** The six name chips. Off when a caller lays its own markers over the
      drawing: two sets of chips on one plan is a legend arguing with a map. */
  chips?: boolean;
  /** Laid into the same overlay box the chips use, so a caller positions its
      own markers with the same percentages `plot` already gives. */
  children?: ReactNode;
}) {
  return (
    <div
      role={onChoose ? "group" : undefined}
      aria-label={onChoose ? "Choose an area on the plan" : undefined}
      className="relative overflow-hidden rounded-sm bg-accent"
    >
      <svg
        viewBox="0 0 800 620"
        aria-hidden
        className="block h-auto w-full text-card"
      >
        {/* Painting order is the whole legibility of this drawing, so it is
            written down rather than left to whoever edits next: districts,
            then the streets *over* them, then the greens, then the water last
            of all.

            Streets on top is what the listing page's plan already does, and it
            is the move that makes a shaded patch read as a district rather
            than as a card lying on a grid — a street that stops at a district's
            edge draws a box, and a street that runs through it draws a place.
            Water goes last so no street crosses it, which is how a reader tells
            the one dark band from the six dark patches without a legend. */}
        {areas.map((one) => (
          <rect
            key={one.name}
            x={one.plot.x}
            y={one.plot.y}
            width={one.plot.w}
            height={one.plot.h}
            rx={6}
            className={cn(
              "transition-colors",
              one.name === chosen ? "fill-primary/16" : "fill-muted",
            )}
          />
        ))}

        {[96, 268, 476, 672].map((x) => (
          <line
            key={`v${x}`}
            x1={x}
            y1={-20}
            x2={x}
            y2={640}
            stroke="currentColor"
            strokeWidth={9}
          />
        ))}
        {[158, 330, 466, 608].map((y) => (
          <line
            key={`h${y}`}
            x1={-20}
            y1={y}
            x2={820}
            y2={y}
            stroke="currentColor"
            strokeWidth={9}
          />
        ))}
        {/* The one road that does not obey the grid, which is what stops the
            plan reading as graph paper. */}
        <line
          x1={-20}
          y1={610}
          x2={820}
          y2={200}
          stroke="currentColor"
          strokeWidth={13}
        />

        {/* The green, and the one place on this drawing with a hue in it. At a
            near-black primary the fill alone reads grey, so the canopy of
            circles is what says park — shape rather than a second colour. */}
        {[
          { x: 470, y: 362, w: 28, h: 88 },
          { x: 530, y: 500, w: 110, h: 86 },
          { x: 30, y: 470, w: 62, h: 110 },
        ].map((green) => (
          <rect
            key={`${green.x}-${green.y}`}
            x={green.x}
            y={green.y}
            width={green.w}
            height={green.h}
            rx={8}
            className="fill-primary/10"
          />
        ))}
        {[
          [484, 384],
          [484, 424],
          [560, 526],
          [604, 518],
          [582, 558],
          [58, 500],
          [64, 546],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={11}
            className="fill-primary/12"
          />
        ))}

        {/* The Charles, the harbour it runs into, and the Pond. A rung under
            the districts rather than a second hue: this palette ships one, and
            a blue river would be the only saturated thing on the page. */}
        <path
          d="M -20 278 C 150 292 290 306 440 302 C 580 298 680 272 820 262 L 820 306 C 680 316 580 342 440 346 C 290 350 150 336 -20 322 Z"
          className="fill-secondary"
        />
        <path
          d="M 700 280 C 686 380 700 500 742 640 L 820 640 L 820 268 Z"
          className="fill-secondary"
        />
        <ellipse cx={314} cy={520} rx={14} ry={30} className="fill-secondary" />
      </svg>

      {/* The markers are HTML rather than SVG text, because they are controls:
          a label element cannot live inside an <svg>, and a name a reader is
          meant to press has to scale with the page's type rather than with the
          viewBox. Below sm only the chosen one is drawn — six chips on a 320px
          plan is a pile, and whatever list the caller puts beside the drawing
          is the way through at that width. */}
      {chips && areas.map((one) => {
        const on = one.name === chosen;
        const at = {
          left: `${((one.plot.x + one.plot.w / 2) / 800) * 100}%`,
          top: `${((one.plot.y + one.plot.h / 2) / 620) * 100}%`,
        };
        // Floating over the drawing, so a cast rather than either edge cue, and
        // its own opaque surface: ink laid straight on the plan would cross a
        // block, a road and the river inside one word.
        const chip = cn(
          "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
          on
            ? "bg-foreground text-background shadow-soft"
            : "bg-card shadow-soft hover:bg-accent",
          on ? "flex" : "hidden sm:flex",
        );
        const dot = (
          <span
            aria-hidden
            className={cn(
              "size-1.5 rounded-full",
              on ? "bg-background" : "bg-primary",
            )}
          />
        );

        if (onChoose) {
          return (
            <button
              key={one.name}
              type="button"
              onClick={() => onChoose(one.name)}
              aria-pressed={on}
              style={at}
              className={cn(
                reach,
                chip,
                on && "hover:bg-foreground/90",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
            >
              {dot}
              {one.name}
            </button>
          );
        }

        // The area the reader is standing on is a chip and not a link — a link
        // to the page you are already reading is a control that does nothing.
        return on ? (
          <span key={one.name} style={at} className={chip}>
            {dot}
            {one.name}
          </span>
        ) : (
          <Link
            key={one.name}
            href={`/neighborhoods/${slugify(one.name)}`}
            style={at}
            className={cn(
              reach,
              chip,
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            {dot}
            {one.name}
          </Link>
        );
      })}

      {children}

      {onChoose ? (
        <span className="sr-only" aria-live="polite">
          {chosen} shown on the plan
        </span>
      ) : null}
    </div>
  );
}
