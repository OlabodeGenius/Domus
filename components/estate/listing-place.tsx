import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  Leaf01Icon,
  Location01Icon,
  MetroIcon,
  School01Icon,
  ShoppingBasket01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { areas, type SpotKind } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { type Home } from "@/components/estate/listings";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// The reference is five tiles: a wide focal one at the top left, one beside it,
// three under. Which is exactly what this section holds — the plan, and the
// four things every listing in this market is measured against. The tile
// anatomy is the reference's own: its own drawing at the top, then a title and
// a line.
const glyph: Record<SpotKind, typeof MetroIcon> = {
  transit: MetroIcon,
  school: School01Icon,
  park: Leaf01Icon,
  shops: ShoppingBasket01Icon,
};

export function ListingPlace({ home }: { home: Home }) {
  const area = areas.find((one) => one.name === home.area);
  if (!area) return null;

  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${home.address}, ${home.area}, MA`,
  )}`;

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <Eyebrow icon={Location01Icon}>Where it stands</Eyebrow>
      <SectionHeading className="mt-6 max-w-[20ch]">
        {home.area}, and what is at the end of the street
      </SectionHeading>
      <p className="mt-6 max-w-[62ch] text-base text-muted-foreground">
        {area.line} The median here is{" "}
        <span className="font-medium text-foreground tabular-nums">
          {area.median}
        </span>{" "}
        across{" "}
        <span className="font-medium text-foreground tabular-nums">
          {area.active}
        </span>{" "}
        homes we are holding this morning.
      </p>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* The reference's focal tile: two columns wide, its drawing filling
            the top, its title and line at the foot. */}
        <article className="flex flex-col rounded-lg border bg-card p-5 sm:col-span-2 lg:row-span-2">
          <Plan
            label={home.address}
            className="min-h-[240px] flex-1 sm:min-h-[300px]"
          />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-2 pb-1">
            <div>
              <h3 className="text-base font-medium">
                {home.address}, {home.area}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {/* Said plainly rather than dressed up as a map: a drawn plan
                    that claims to be the street would be a claim, and the link
                    beside it is where the real one lives. Swap this panel for
                    your own provider's embed — it is one component. */}
                An illustrative plan of the block, not a survey.
              </p>
            </div>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                reach,
              )}
            >
              Open in Maps
              <ArrowUpRightIcon className="size-4" aria-hidden />
            </a>
          </div>
        </article>

        {area.spots.map((spot) => (
          <article
            key={spot.name}
            className="flex flex-col justify-between gap-6 rounded-lg border bg-card p-7"
          >
            {/* The reference gives every tile its own drawing above the title.
                At this size that is one glyph in a tinted square — a 16px icon
                scaled up would be a crude version of the same idea. */}
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-sm bg-accent"
            >
              <HugeiconsIcon
                icon={glyph[spot.kind]}
                size={18}
                strokeWidth={1.5}
                className="text-primary"
              />
            </span>
            {/* One block, so `justify-between` has two things to push apart
                rather than three to spread. The four tiles are as tall as the
                plan beside them and their notes are one line or two, so the
                slack has to land in the middle — left at the foot it reads as
                four tiles that forgot to finish. */}
            <div>
              <h3 className="text-base font-medium text-pretty">{spot.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{spot.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// The block, drawn rather than fetched. A tile server is an account, a key and
// a bill the buyer of this template inherits before the site has a visitor —
// and a grey rectangle where the map should be is worse than either. So the
// panel is a plan: white streets over a tinted ground, blocks a rung under it,
// a green a fraction of the brand hue, and the pin where the listing stands.
//
// The geometry is a constant. It is the same block on every route, which is the
// one thing a drawn map cannot get right and the reason the caption under it
// says so out loud.
const xs = [-30, 96, 232, 386, 512, 670];
const ys = [-30, 74, 176, 286, 390];

export function Plan({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-sm bg-accent", className)}
    >
      {/* slice rather than the default fit: the tile's height is set by the two
          rows of spots beside it, so the plan has to crop to whatever shape
          that leaves rather than letterbox itself inside it. */}
      <svg
        viewBox="0 0 640 360"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        className="block size-full text-card"
      >
        {/* Blocks first, streets over them: a white road painted on top is
            what cuts the blocks apart, so no block has to know where a road
            runs. */}
        {ys
          .slice(0, -1)
          .map((y, row) =>
            xs
              .slice(0, -1)
              .map((x, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={x + 7}
                  y={y + 7}
                  width={xs[col + 1] - x - 14}
                  height={ys[row + 1] - y - 14}
                  rx={6}
                  className="fill-muted"
                />
              )),
          )}

        {/* The park, and the one place on this panel with a hue in it. The hue
            this template ships on is a warm near-black, so /10 of it lands as a
            grey and the block alone would not say park — the canopy does, and
            it is shape rather than a second colour. */}
        <rect
          x={393}
          y={81}
          width={112}
          height={88}
          rx={8}
          className="fill-primary/10"
        />
        {[
          [421, 108],
          [455, 96],
          [487, 116],
          [437, 141],
          [477, 148],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={11}
            className="fill-primary/12"
          />
        ))}

        {/* The through road, laid before the grid so the grid crosses it. */}
        <line
          x1={-30}
          y1={332}
          x2={670}
          y2={132}
          stroke="currentColor"
          strokeWidth={20}
        />
        {xs.slice(1, -1).map((x) => (
          <line
            key={`v${x}`}
            x1={x}
            y1={-30}
            x2={x}
            y2={390}
            stroke="currentColor"
            strokeWidth={12}
          />
        ))}
        {ys.slice(1, -1).map((y) => (
          <line
            key={`h${y}`}
            x1={-30}
            y1={y}
            x2={670}
            y2={y}
            stroke="currentColor"
            strokeWidth={12}
          />
        ))}

        {/* The pin: a soft halo, the head, and a white centre so the head
            reads as a marker rather than as a dot of ink. */}
        <circle cx={309} cy={231} r={30} className="fill-primary/12" />
        <circle cx={309} cy={231} r={11} className="fill-primary" />
        <circle cx={309} cy={231} r={4} className="fill-card" />
      </svg>

      {/* The marker's label, anchored to the pin by the same fractions the pin
          sits at — 309/640 across and 231/360 down — and lifted clear of its
          head. HTML rather than <text>, because text inside a viewBox scales
          with the drawing and would be 9px on a phone and 20px on a desktop. */}
      <p
        className="absolute -translate-x-1/2 -translate-y-full rounded-full bg-card px-3 py-1 text-xs font-medium whitespace-nowrap shadow-soft"
        style={{ left: "48.3%", top: "calc(64.2% - 22px)" }}
      >
        {label}
      </p>
    </div>
  );
}
