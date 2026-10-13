import {
  Leaf01Icon,
  MetroIcon,
  RoadLocation01Icon,
  School01Icon,
  ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { spotParts, type Area, type SpotKind } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { cn } from "@/lib/utils";

// Four tiles in two rows of unequal widths, the wide one changing sides between
// them, which is what makes the block read on a diagonal rather than as a 2×2.
// The reference fills each tile with its own app mockup; the mockup here is the
// walk, set at display size in the tile's foot.
//
// The four categories are the same four on every area, which is the point: a
// reader comparing Somerville against Brookline is comparing the same four
// rows, not whatever each page happened to have to say.
const glyph: Record<SpotKind, typeof MetroIcon> = {
  transit: MetroIcon,
  school: School01Icon,
  park: Leaf01Icon,
  shops: ShoppingBasket01Icon,
};

const kind: Record<SpotKind, string> = {
  transit: "Nearest station",
  school: "Assigned high school",
  park: "Green space",
  shops: "Where the shops are",
};

// Written out rather than computed: Tailwind only generates classes it can read
// as literal strings, and the whole composition is these four spans.
const spans = [
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
] as const;

export function AreaSpots({ area }: { area: Area }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <Eyebrow icon={RoadLocation01Icon}>At the end of the street</Eyebrow>
          <SectionHeading className="mt-6 max-w-[18ch]">
            What is within a walk of most front doors
          </SectionHeading>
        </div>
        {/* Not `area.stock` any more — the header band carries that, and a
            sentence about brownstones was answering a question this section had
            not asked. What it says instead is the thing the four tiles are for:
            they are the same four everywhere, so two of these pages read side
            by side compare the same rows. */}
        <p className="max-w-[38ch] text-base text-muted-foreground">
          The same four on every neighborhood page. Open two of them side by
          side and you are reading the same rows, not whatever each place had to
          say for itself.
        </p>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
        {area.spots.map((spot, i) => {
          const { detail, walk } = spotParts(spot.note);
          return (
            <article
              key={spot.name}
              className={cn(
                "flex flex-col rounded-lg border bg-card p-7 sm:p-8",
                spans[i],
              )}
            >
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-accent"
              >
                <HugeiconsIcon
                  icon={glyph[spot.kind]}
                  size={18}
                  strokeWidth={1.5}
                  className="text-primary"
                />
              </span>

              <p className="mt-8 text-sm text-muted-foreground">
                {kind[spot.kind]}
              </p>
              <h3 className="mt-2 text-2xl tracking-tight text-pretty">
                {spot.name}
              </h3>

              {/* The reference lands its mockup at the tile's foot with a long
                  gap above it, which is what stops four tiles of copy reading
                  as four paragraphs. The gap is mt-auto rather than a fixed
                  height, so a one-line name and a three-line one still land
                  their last row together. */}
              <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-12">
                <p className="max-w-[26ch] text-sm text-muted-foreground">
                  {detail}
                </p>
                <p className="text-3xl tracking-tight whitespace-nowrap tabular-nums">
                  {walk}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
