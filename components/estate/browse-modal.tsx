"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ApartmentIcon,
  Building02Icon,
  Cancel01Icon,
  City02Icon,
  FilterIcon,
  FlowerIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  facets,
  holds,
  query,
  type Field,
} from "@/components/estate/grid-listings";
import { homes } from "@/components/estate/listings";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// The browse panel's control bar: the tenure pills and the sort across the top,
// and everything else behind one button.
//
// Three were built and judged in place — the pills alone, a panel that opened
// under the bar, and this. The dialog won on the argument every booking site
// eventually makes: a row of controls has to fit beside the sort, so it holds
// four fields and no more, while a dialog holds as many as the book has axes
// and gives each one the room to be read — a type as five tiles rather than
// five lines of a dropdown, a price as the shape of the market rather than a
// number.
//
// What it costs is that the answer is behind a door. The count on the button
// and the count on the dialog's own action are what pay that back: a reader
// narrowing four things never has to close it to find out what is left.
//
// The dialog is the platform's. `showModal()` puts it in the top layer and
// brings the focus trap, Escape, the backdrop and the inert page with it, and
// every one of those is a thing a hand-written overlay gets wrong. What is
// written here is the click-outside — native `<dialog>` deliberately leaves
// that to the page — and one line of scroll lock.
//
// Every control inside is still a link, and none of them is followed. The
// dialog reads the href back as the next staged query and answers itself: the
// counts, the chips and the number on its own action all come off the staged
// set, so a reader sees what a pick would leave them before they buy it.
//
// Only the action leaves, and the URL it goes to is the one the other two bars
// produce. Nothing behind the dialog moves before that — a grid that reshuffles
// under a reader who is still deciding is answering a question nobody has asked
// yet — and a dialog dismissed rather than acted on drops what it staged.

/** One bar of a price chart: what it covers, how much sits there, and which
    slider stop it falls under — which is how it knows to go quiet past the
    ceiling without re-reading the ladder. */
type Band = { label: string; count: number; stop: number };

/** The tiles' glyphs, keyed by what the book calls each type. */
const glyphs: Record<string, typeof Home01Icon> = {
  "Single-family": Home01Icon,
  Condominium: Building02Icon,
  Apartment: ApartmentIcon,
  Townhouse: City02Icon,
  "Garden flat": FlowerIcon,
};

export function BrowseModal({
  tabs,
  sort,
  current,
}: {
  tabs: ReactNode;
  sort: ReactNode;
  /** The query the page has applied: what the dialog opens on, and what a
      dismissed one goes back to. The home page's section applies nothing, so it
      hands over an empty query and every pick is new. */
  current: Record<string, string | undefined>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const title = useId();
  // What has been picked but not yet asked for, held as the query itself rather
  // than as four fields: every href `facets` builds is the whole query with one
  // key changed, so reading one back is the next staged set entire.
  const [picked, setPicked] = useState(current);
  const stage = (href: string) =>
    setPicked(
      Object.fromEntries(new URLSearchParams(href.split("?")[1] ?? "")),
    );
  // /listings is already the answer, so applying there must not throw the
  // reader back to the masthead. From anywhere else it is a page they have not
  // seen and the top of it is where they should land.
  const showsResults = usePathname() === "/listings";

  const { fields, chart, range, now, chips, clear, active, filters } =
    facets(picked);
  /** How many homes the staged set leaves — the number on the action. */
  const showing = homes.filter((home) => holds(home, filters)).length;

  // The top layer stops the page being *clicked*, not scrolled, so the lock is
  // written by hand — and it is written as an effect rather than at the two
  // call sites because of the one exit that has no close event: the home page's
  // action is a link, and following it unmounts this component with the dialog
  // still up. A lock set imperatively there would outlive the page that set it
  // and land the reader on an unscrollable /listings.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };

  const area = fields.find((one) => one.key === "area");
  const beds = fields.find((one) => one.key === "beds");
  const kinds = fields.find((one) => one.key === "type");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        {tabs}
        <div className="flex flex-wrap items-center gap-3">
          {sort}
          <FilterButton
            open={open}
            active={active}
            onClick={() => (open ? dialog.current?.close() : show())}
          />
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby={title}
        // Escape closes it without going through the button, so the state is
        // put back here rather than at each caller — and the lock follows the
        // state. The staging goes back with it: the count on the button behind
        // a dismissed dialog has to keep meaning the grid.
        onClose={() => {
          setOpen(false);
          setPicked(current);
        }}
        // The backdrop is the dialog's own box, so a press that lands on the
        // element itself rather than on anything inside it is a press outside.
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        // Staging catches the links here rather than turning each of the four
        // control shapes into a button: every option is a link the server could
        // have built, and one handler on the box holds all of them. The
        // dialog's own action opts out — it is the one link that really leaves.
        //
        // Capture rather than bubble, and it has to be: next/link routes inside
        // its own click handler, so a preventDefault arriving on the way back up
        // would be stopping a navigation that already happened. Taking the event
        // on the way down stops that handler from running at all.
        onClickCapture={(event) => {
          const link = (event.target as HTMLElement).closest("a");
          if (!link || link.dataset.go !== undefined) return;
          event.preventDefault();
          event.stopPropagation();
          stage(link.getAttribute("href") ?? "/listings");
        }}
        className={cn(
          "m-auto w-[min(46rem,calc(100vw-2rem))] max-h-[min(46rem,calc(100dvh-4rem))] flex-col",
          "rounded-lg bg-card p-0 text-foreground shadow-soft-lg open:flex",
          // Runs on open, because a closed dialog is display:none and an
          // animation on a hidden element has nothing to play against.
          "duration-200 animate-in fade-in-0 zoom-in-95",
          "backdrop:bg-foreground/40 backdrop:animate-in backdrop:fade-in-0 backdrop:duration-200",
        )}
      >
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b px-6">
          <p id={title} className="text-base font-medium">
            Filters
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className={cn(
              "absolute right-4 grid size-9 cursor-pointer place-items-center rounded-full transition-colors",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.5} />
            <span className="sr-only">Close the filters</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chips.length > 0 ? (
            <Section title="What you have set">
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.clear}
                    scroll={false}
                    className={cn(
                      reach,
                      "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors hover:bg-muted",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    )}
                  >
                    {chip.label}
                    <HugeiconsIcon
                      icon={Cancel01Icon}
                      size={12}
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="sr-only">, take this one off</span>
                  </Link>
                ))}
              </div>
            </Section>
          ) : null}

          {kinds ? (
            <Section
              title="Property type"
              note="What the building is, not what the listing is called."
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {/* The first option is "every type", which is what a chosen
                    tile goes back to — a tile row reads as a set of switches,
                    and a switch you cannot switch off is a trap. */}
                {kinds.options.slice(1).map((one) => {
                  const on = one.label === kinds.value;
                  return (
                    <Link
                      key={one.label}
                      href={on ? kinds.options[0].href : one.href}
                      scroll={false}
                      aria-pressed={on}
                      className={cn(
                        "flex flex-col gap-3 rounded-sm border p-4 transition-colors",
                        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        on
                          ? "border-foreground bg-accent"
                          : "hover:border-muted-foreground/40 hover:bg-accent",
                        // A choice that leaves nothing is still a link — the
                        // empty state is written and reachable — but it should
                        // not look like the others on the way in.
                        one.count === 0 && !on && "opacity-50",
                      )}
                    >
                      <HugeiconsIcon
                        icon={glyphs[one.label] ?? Home01Icon}
                        size={22}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="text-sm">{one.label}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {one.count === 1 ? "1 home" : `${one.count} homes`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </Section>
          ) : null}

          {area ? (
            <Section
              title="Neighborhood"
              note="The fourteen we cover; six have homes with photographs up this morning."
            >
              <Pills field={area} />
            </Section>
          ) : null}

          {beds ? (
            <Section
              title="Bedrooms"
              note="Bedrooms, not rooms. Baths are on the listing itself."
            >
              <Pills field={beds} />
            </Section>
          ) : null}

          <Section
            title="Price range"
            note="Asking prices, over the shape of the book. A let is priced by the month, so the range leaves lettings where the tenure pills put them."
          >
            <PriceRange
              key={`span-${range.at.join("-")}`}
              {...range}
              chart={chart}
              now={now}
              pick={stage}
            />
          </Section>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t px-6 py-4">
          {clear ? (
            <Link
              href={clear}
              scroll={false}
              className={cn(
                reach,
                "rounded-full text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
            >
              Clear all filters
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">
              Nothing set — this is the whole book
            </span>
          )}

          {/* The one place a 44px control is spent inside the dialog, and it
              carries the answer rather than a word: the grid it closes onto is
              already the grid behind it. */}
          <Button
            size="lg"
            data-go=""
            render={
              <Link
                href={query(picked, {})}
                scroll={!showsResults}
                onClick={() => dialog.current?.close()}
              />
            }
            className="rounded-full"
          >
            {showing === 0
              ? "Nothing matches that"
              : showing === 1
                ? "Show the one home"
                : `Show ${showing} homes`}
          </Button>
        </div>
      </dialog>
    </div>
  );
}

// No chevron after the label. It reads as a disclosure pointing at something
// directly below, and what this opens is a dialog over the middle of the page.
function FilterButton({
  open,
  active,
  onClick,
}: {
  open: boolean;
  /** How many filters are set, for the count on the button. */
  active: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      className={cn(
        reach,
        "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border text-sm whitespace-nowrap transition-colors",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        // 20/20 at rest, 20/16 once the count is on: a pill closing on a filled
        // circle needs less air after it than after a word, or the badge reads
        // as further from its own edge than the label is from the other one.
        // Same trim `button.tsx` makes for a trailing icon.
        active > 0 ? "pr-4 pl-5" : "px-5",
        // Resting a rung up from the slab and darkening while the dialog is up,
        // which is the ladder's own direction — and which is also the only cue
        // left that the button is the thing holding the dialog open.
        // The same hairline the sort wears, so the two read as one pair rather
        // than as a field beside a chip. It stays drawn while the dialog is up
        // — recoloured, not removed, or the button changes size as it opens.
        open
          ? "border-foreground bg-foreground text-background hover:bg-foreground/90"
          : "bg-card text-foreground hover:bg-muted",
      )}
    >
      <HugeiconsIcon
        icon={FilterIcon}
        size={16}
        strokeWidth={1.5}
        aria-hidden
      />
      Filter
      {active > 0 ? (
        <span
          className={cn(
            "grid size-5 place-items-center rounded-full text-xs tabular-nums",
            open
              ? "bg-background text-foreground"
              : "bg-foreground text-background",
          )}
        >
          {active}
        </span>
      ) : null}
    </button>
  );
}

// Two of the three fields are a row of the same pill, so they are one component
// and cannot drift apart by four pixels. The third is a row of tiles, because a
// property type is the one of the three a reader recognises by shape.
function Pills({ field }: { field: Field }) {
  return (
    <div className="flex flex-wrap gap-2">
      {field.options.map((one) => {
        const on = one.label === field.value;
        return (
          <Link
            key={one.label}
            href={one.href}
            scroll={false}
            aria-current={on ? "true" : undefined}
            className={cn(
              reach,
              "inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm whitespace-nowrap transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              on
                ? "bg-foreground text-background hover:bg-foreground/90"
                : // White with a hairline rather than transparent: this ground
                  // is the card itself, so a pill drawn on nothing reads as a
                  // line of words rather than as a row of controls. The edge is
                  // the whole cue — there is no rung above white to raise it
                  // onto.
                  "border bg-card text-foreground hover:bg-muted",
              // A choice that leaves nothing is still a link — the empty state
              // is written and reachable — but it should not look like the
              // others on the way in.
              one.count === 0 && !on && "opacity-50",
            )}
          >
            {one.label}
            {/* Inherits on the chosen pill. This palette has no second ink level
                on an inverted ground — every dark band on the site runs one —
                and muted grey on near-black is the one pairing that does not
                clear its contrast. */}
            <span
              className={cn("tabular-nums", !on && "text-muted-foreground")}
            >
              ({one.count})
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 border-t pt-10 first:mt-0 first:border-t-0 first:pt-0">
      <h3 className="text-base font-medium">{title}</h3>
      {note ? (
        <p className="mt-1 max-w-[64ch] text-sm text-muted-foreground">
          {note}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

// The price control: two handles on one ladder, with the shape of the book
// drawn behind them — lit between the handles and quiet either side, so moving
// a handle is visibly buying the bars it passes.
//
// It carries its own state and its own arithmetic, which is the one place this
// dialog departs from "every control is a link the server built". A control
// that changes two keys at once would need a table of every pair of URLs handed
// down to it; the counts already are that table, at thirty-six numbers, and the
// href is cheaper built here out of the query the dialog was given.
function PriceRange({
  ladder,
  counts,
  at,
  chart,
  now,
  pick,
}: {
  ladder: string[];
  counts: number[][];
  at: number[];
  chart: Band[];
  now: string;
  pick: (href: string) => void;
}) {
  const [span, setSpan] = useState(at);
  const [low, high] = span;
  const last = ladder.length - 1;
  const tallest = Math.max(...chart.map((one) => one.count), 1);

  const href = (next: number[]) => {
    const params = new URLSearchParams(now.split("?")[1] ?? "");
    if (next[0] > 0) params.set("from", ladder[next[0]]);
    else params.delete("from");
    if (next[1] < last) params.set("price", ladder[next[1]]);
    else params.delete("price");
    const search = params.toString();
    return search ? `/listings?${search}` : "/listings";
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="text-lg font-medium tabular-nums">
          {low === 0 ? "No min" : ladder[low]} — {ladder[high]}
        </span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {counts[low][high] === 1 ? "1 home" : `${counts[low][high]} homes`} in
          that range
        </span>
      </div>

      <div
        className="pointer-events-none mt-6 flex h-20 items-end justify-between"
        aria-hidden
      >
        {/* Keyed by position, which is the one place that is right rather than
            lazy: this is forty fixed slots along an axis, never reordered and
            never filtered, so slot 12 is slot 12 for the life of the chart.
            `band.label` looked like the better key and is not unique — narrow
            the book far enough (one area, one tenure) and the axis collapses
            until neighbouring slots round to the same `$3000K–$3000K`, which is
            two children under one key and a React error in the console. */}
        {chart.map((band, i) => (
          <div
            key={i}
            title={`${band.label} — ${band.count}`}
            style={{ height: `${Math.max(6, (band.count / tallest) * 100)}%` }}
            className={cn(
              "w-2.5 rounded-t-[8px] transition-colors",
              band.stop > low && band.stop <= high
                ? "bg-foreground"
                : "bg-muted",
            )}
          />
        ))}
      </div>

      <Slider
        aria-label="Price range"
        min={0}
        max={last}
        step={1}
        // One stop apart at the closest, or the two handles stack and the range
        // reads as a single dot nobody can pull back open.
        minStepsBetweenValues={1}
        value={span}
        onValueChange={(next) => setSpan(next as number[])}
        onValueCommitted={(next) => pick(href(next as number[]))}
        className="-mt-0.5"
        thumbClassName="size-5 border-2 border-foreground bg-card"
      />

      <div className="mt-3 flex justify-between text-xs text-muted-foreground tabular-nums">
        <span>No min</span>
        <span>{ladder[last]}</span>
      </div>
    </div>
  );
}
