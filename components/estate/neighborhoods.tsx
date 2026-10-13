import Image from "next/image";
import Link from "next/link";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { HugeiconsIcon } from "@hugeicons/react";
import { areas, photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Button } from "@/components/ui/button";
import { cn, slugify } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Section 4. The six areas stack as one list, and the whole width of the
// section goes to whichever one is open — which is what this layout has that
// the staircase of equal photo tiles it replaced did not.
//
// This was <details name> — the platform's exclusive accordion — until the row
// picked up two behaviours that element cannot have. A <details> always closes
// on a second press, and this list must keep exactly one row open; and the open
// row's marker is a link now, which inside a <summary> is interactive content
// nested in interactive content, so the press both follows the link and toggles
// the row.
//
// Nor is it a tab set. A tablist is a strip of controls beside one panel
// region, and ARIA allows nothing but tabs inside it — this panel opens between
// two rows, and the rows above and below it are not tabs.
//
// What it actually is, once both behaviours are written down, is a single
// select: six options, exactly one chosen, choosing another releases the last.
// That is a radio group, and every part of the brief falls out of the native
// element for free — a checked radio does not uncheck on a second press, the
// name attribute does the releasing, arrow keys move between options, and the
// link sits beside the label as a sibling rather than inside it. Still no
// JavaScript, and the section stays a server component.
//
// The first row ships checked because an all-closed list at first paint reads
// as a bare column of names, which is the one thing this layout is not.

// The clock every part of a row opens on. A row here travels 760px, where the
// FAQ panel travels 216, and the section's own ease-out spent that whole
// distance on screen — correct for a paragraph, a sweep for a slab. The curve
// front-loads it instead: 95% of the move lands in the first 100ms and the
// last 5% eases over the remaining 200, so the row reads as already open and
// settling rather than as unfolding. Same duration as before; what changed is
// where inside it the distance goes.
//
// One constant because the slab's padding and the panels' height are two
// transitions drawing one movement, and a curve that lives in two class
// strings is a curve that gets tuned in one of them.
const pace = "duration-300 ease-[cubic-bezier(0.02,0.96,0.06,1)]";

// How both halves of a row open, on the curve above. A grid track rather than
// the FAQ's animated `block-size`: that one needs `interpolate-size` to make
// `auto` a height CSS can tween to, and the 0fr/1fr pair has needed nothing
// since 2023. Both leave the open size as content, so a row that reflows on a
// resize keeps its own height rather than one measured on the way in. The
// child clips itself.
//
// visibility rather than `hidden`, because the panel has a link in it and a
// row folded to zero must not still be a tab stop. It is also the one property
// in the pair that CSS holds for the whole close and then flips at the end,
// which is what lets the panel be seen on its way out.
//
// Applied by both panels: the photograph and the copy column collapse at the
// same rate or the slab tears.
const collapse = cn(
  "invisible grid grid-rows-[0fr]",
  "transition-[grid-template-rows,visibility]",
  pace,
  "group-has-[:checked]/row:visible group-has-[:checked]/row:grid-rows-[1fr]",
);

export function Neighborhoods() {
  return (
    <section
      id="neighborhoods"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      {/* The reference sets its lede against the foot of the headline rather
          than under it, which is what keeps the header row from stacking into
          one tall centred column. */}
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <Eyebrow>Where we work</Eyebrow>
          <SectionHeading className="mt-6 max-w-[18ch]">
            Pick the street before you pick the house
          </SectionHeading>
        </div>
        {/* A name without a number is decoration, and these two answer to the
            hero: 258 is the sum of the six active counts in areas.ts, and 1,284
            is what the hero claims. Change one and this sentence changes. */}
        <p className="max-w-[46ch] text-base text-muted-foreground md:max-w-[32ch]">
          Six of the fourteen areas our agents cover, and{" "}
          <span className="font-medium text-foreground tabular-nums">258</span>{" "}
          of the <span className="tabular-nums">1,284</span> homes on our books
          are in one of them right now.
        </p>
      </div>

      <div className="mt-24">
        {areas.map((area, i) => (
          <div
            key={area.name}
            className={cn(
              "group/row",
              // Closed: a hairline under the row, nothing else — six rows on
              // the page separated by the one cue that divides without
              // darkening. Open: the row leaves the page for the rung above it
              // and takes a cast instead, so the hairline has to go with it or
              // the slab is carrying two cues at once. It also breaks 24px past
              // the hairlines on both sides, which is the reference's own move
              // for saying this one is no longer part of the list. The corner
              // radius travels with the slab for the same reason: a closed row
              // is a line under a name, and a line does not have corners.
              //
              // The row directly *above* the open one gives its hairline up as
              // well, for the same reason the open row does: the slab's own
              // ring already draws that edge, and the line would run out from
              // under it at both ends where the slab breaks past the list. Both
              // conditions sit in one selector rather than in a second rule
              // undoing the first — two arbitrary variants painting one
              // property have equal specificity, and which of them wins is
              // decided by the order Tailwind happens to write them out in.
              // The next row is tested for a checked input by descent rather
              // than by :has(), because CSS forbids one :has() inside another.
              "[&:not(:has(:checked)):not(:has(+_div_:checked))]:border-b",
              "has-[:checked]:-mx-6 has-[:checked]:rounded-lg has-[:checked]:bg-card has-[:checked]:px-6 has-[:checked]:py-7 has-[:checked]:shadow-soft",
              // The slab arrives on the same clock its contents open on.
              // Border radius and the hairline are left to snap: both are
              // covered by the shadow the moment it starts painting, and a
              // border-width tween is a row that reflows by a pixel.
              "transition-[margin,padding,background-color,box-shadow]",
              pace,
              // And the open slab is the grid, rather than the panel under the
              // name being one: the photograph has to run the full height of
              // the slab, which it can only do if the name row and the copy
              // under it are two rows of the same grid and the photo spans
              // both. Every child names its own cell rather than being placed
              // by the auto-flow, which puts the copy beside the name instead
              // of under it the moment one item spans two rows. The vertical
              // gap stays at zero — the copy sets its own distance from the
              // name — so only the column gap is given.
              "has-[:checked]:md:grid has-[:checked]:md:grid-cols-2 has-[:checked]:md:gap-x-14",
            )}
          >
            {/* The state, and the only thing on the row that holds it. Visually
                hidden rather than display:none, so it still takes focus and the
                arrow keys still walk the group. */}
            <input
              type="radio"
              name="area"
              id={`area-${i}`}
              defaultChecked={i === 0}
              className="peer sr-only"
            />

            {/* The ring lands on the row rather than on the input, because the
                input is the thing nobody can see. The row's own padding comes
                off once it is open, because the slab is carrying it there. */}
            <div className="relative flex items-center gap-5 py-7 peer-focus-visible:rounded-sm peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 group-has-[:checked]/row:py-0 md:col-start-1 md:row-start-1">
              <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="flex-1 text-2xl tracking-tight md:text-3xl">
                {area.name}
              </h3>

              {/* Closed: an outline circle holding a plus, and that is the
                  whole marker now — the open row's arrow has gone to the
                  photograph's own corner, where it sits over the image instead
                  of taking a slice of height off the top of it.

                  Decorative, because the press belongs to the sheet under it,
                  so the marker never becomes a second tab stop to the place the
                  row already goes. Its hover comes off the row for the same
                  reason — the pointer is over the sheet, never over this. */}
              <span
                aria-hidden
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border transition-colors",
                  "group-hover/row:border-foreground/20 group-hover/row:bg-accent",
                  "group-has-[:checked]/row:hidden",
                )}
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  size={18}
                  strokeWidth={1.5}
                />
              </span>

              {/* One sheet over the whole row while it is closed, so pressing
                  the number, the name or the marker selects the area. Absolute
                  rather than wrapping, because that is what makes the three one
                  target instead of three. Once the row is open the sheet goes:
                  the copy column ends on a named button now, and an unlabelled
                  link lying over the heading beside it would be a second,
                  quieter way to the same page. */}
              <label
                htmlFor={`area-${i}`}
                className="absolute inset-0 cursor-pointer group-has-[:checked]/row:hidden"
              >
                <span className="sr-only">Show {area.name}</span>
              </label>
            </div>

            {/* The photograph goes where the row goes, and it spans both rows of
                the slab's grid so it stands the full height of the open row
                rather than starting under the name. It folds to nothing with
                `collapse` above, which takes `visibility` with it — so while
                the row is closed the link is unreachable by pointer and by tab,
                exactly when it should be. The alt text names it, which is what
                keeps this from being a second unnamed link to the same place as
                the button's. */}
            <Link
              href={`/neighborhoods/${slugify(area.name)}`}
              className={cn(
                collapse,
                "rounded-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                "md:col-start-2 md:row-start-1 md:row-end-3",
              )}
            >
              <div className="overflow-hidden">
                <div className="group/photo relative mt-8 aspect-[16/10] overflow-hidden rounded-lg md:mt-0 md:h-full md:aspect-auto">
                  <Image
                    src={photo(area.src, 1100)}
                    alt={area.alt}
                    fill
                    sizes="(min-width: 768px) 540px, 90vw"
                    className="object-cover transition-transform duration-500 group-hover/photo:scale-[1.03]"
                  />
                  {/* Over the image now, in the corner the marker used to sit
                      in on the name row. It gives up the near-black fill it had
                      there: on the name row that circle sat on a white slab,
                      and over a photograph it lands on whatever the picture
                      happens to be — against dark brick it disappears. Anything
                      floating over an image needs its own opaque surface, and
                      here that is the card surface with ink on it, which reads
                      on every one of the six photographs rather than on the
                      light ones only.

                      Its cast is written out rather than taken from either
                      token: those are tuned to lift a surface off a near-white
                      page, and a circle sitting on a photograph needs something
                      wider and warmer to keep an edge. Hover moves one rung
                      down, because a control that pales on hover reads as
                      switching off. */}
                  <span
                    aria-hidden
                    className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-card text-foreground shadow-[0_2px_14px_oklch(0.2_0.01_60/0.35)] transition-colors group-hover/photo:bg-accent"
                  >
                    <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* The reference drops its paragraph to the foot of the open slab,
                well clear of the title. */}
            <div className={cn(collapse, "md:col-start-1 md:row-start-2")}>
              <div className="overflow-hidden">
                <div className="pt-8 md:pt-32">
                  <p className="max-w-[44ch] text-base text-muted-foreground">
                    {area.line}
                  </p>
                  <p className="mt-6 text-base text-muted-foreground">
                    <span className="font-medium text-foreground tabular-nums">
                      {area.median}
                    </span>{" "}
                    median
                    <span aria-hidden className="px-2">
                      ·
                    </span>
                    <span className="font-medium text-foreground tabular-nums">
                      {area.active}
                    </span>{" "}
                    homes on our books
                  </p>

                  {/* The one named way out of the open row. It says the area's
                      own name rather than "Learn more", because the six rows
                      all end on this button and six identical labels is a list
                      of buttons rather than six ways into six places. */}
                  <Button
                    size="lg"
                    className="mt-8 rounded-full"
                    render={<Link href={`/neighborhoods/${slugify(area.name)}`} />}
                  >
                    See homes in {area.name}
                    <ArrowUpRightIcon className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
