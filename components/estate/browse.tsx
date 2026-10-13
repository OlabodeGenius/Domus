import Link from "next/link";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BrowseModal } from "@/components/estate/browse-modal";
import {
  by,
  facets,
  holds,
  query,
  shows,
  sorts,
  type Show,
  type Sort,
} from "@/components/estate/grid-listings";
import { ListingCard } from "@/components/estate/listing-card";
import { homes, toListing } from "@/components/estate/listings";
import { SortSelect } from "@/components/estate/sort-select";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { scrollRow } from "@/components/scroll-row";
import { cn, slugify } from "@/lib/utils";

// The reference is one tinted slab holding the whole browse: a heading, a row
// of filter pills with a sort opposite, a grid of cards, and a single pill at
// the foot. The home page's browse section came off this same image and took
// the slab *off*, because its cards rest on the page and carry a hairline. Here
// the slab stays and the cards give the hairline up instead — a white card on a
// tint is already a rung clear of its ground, and an edge drawn between two
// surfaces that far apart is the second cue this style does not spend.
//
// Its heading is not repeated: the page's own title block is directly above,
// and a second headline inside the panel would be the same words twice.

export function Browse({
  show,
  area,
  from,
  price,
  beds,
  type,
  sort,
}: {
  show: Show;
  /** A neighborhood, as a slug from /neighborhoods or as typed into the hero search. */
  area?: string;
  /** The floor, as the range control prints it. */
  from?: string;
  /** The hero search's price ceiling, as its dropdown prints it. */
  price?: string;
  /** The hero search's bed floor, as its dropdown prints it. */
  beds?: string;
  /** A property type, as a slug. Set by the filter dialog, on either page. */
  type?: string;
  sort: Sort;
}) {
  const current = {
    show: show === "all" ? undefined : show,
    area,
    from,
    price,
    beds,
    type,
    sort: slugify(sort),
  };
  // The dialog's data, the chips under the control row and the filter set the
  // grid runs on all come out of one call. A filter a page cannot see itself
  // switch off is a filter a visitor is stuck inside, and the chip, the dialog
  // and the grid have to agree about which four are on.
  const bar = facets(current);
  const shown = homes.filter((home) => holds(home, bar.filters)).sort(by[sort]);

  // Built here rather than inside the bar: the pills and the sort apply on the
  // press — they are the two controls that are *not* staged — so their hrefs
  // are the server's, and handing the bar two rendered nodes keeps the cards
  // themselves out of the client bundle.
  const pills = (
    <div className={cn(scrollRow, "gap-2")}>
      {shows.map((one) => (
        <Link
          key={one.key}
          href={query(current, {
            show: one.key === "all" ? null : one.key,
          })}
          // The reader is looking at this pill when they press it, and the
          // query changes what is under it rather than where they are. Link
          // scrolls to the top by default, which throws them back to the
          // masthead every time they narrow the book.
          scroll={false}
          aria-current={one.key === show ? "page" : undefined}
          className={cn(
            // Transparent at rest: a resting pill one rung off its ground
            // reads as a stain rather than as a control, and this ground is
            // already a tint.
            "inline-flex h-10 shrink-0 items-center rounded-full px-5 text-sm whitespace-nowrap transition-colors",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            reach,
            // The chosen slice is the page's neutral dark action, and it
            // carries its own hover — one rule written for the resting pill
            // would repaint the filled one pale under the cursor.
            one.key === show &&
              "bg-foreground text-background hover:bg-foreground/90 hover:text-background",
          )}
        >
          {one.label}
        </Link>
      ))}
    </div>
  );

  const sorting = (
    <SortSelect
      value={sort}
      hrefs={sorts.map((one) => query(current, { sort: slugify(one) }))}
    />
  );

  return (
    <section
      id="browse"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="-mx-6 rounded-lg bg-accent p-4 sm:-mx-8 sm:p-12">
        {/* Keyed on the query so a filter cleared from the chips below — or a
            tenure pill pressed above — resets what the dialog has staged. The
            two disagreeing is a reader opening it to find a filter set that the
            grid behind them does not have. */}
        <BrowseModal
          key={bar.now}
          tabs={pills}
          sort={sorting}
          current={current}
        />

        {/* The count is the one line that answers what the pills just did, and
            the neighborhood arrives as a chip because nothing on this page set
            it — /neighborhoods did, and a filter a page cannot see itself
            switch off is a filter a visitor is stuck inside. */}
        <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <span className="font-medium text-foreground tabular-nums">
              {shown.length}
            </span>{" "}
            with photographs up this morning. The book runs to{" "}
            <span className="tabular-nums">1,284</span> for sale and{" "}
            <span className="tabular-nums">62</span> to rent
          </span>
          {bar.chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.clear}
              scroll={false}
              className={cn(
                reach,
                "inline-flex h-8 items-center gap-1.5 rounded-full bg-card px-3 text-foreground transition-colors hover:bg-muted",
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
              <span className="sr-only">, clear this filter</span>
            </Link>
          ))}
        </p>

        {shown.length > 0 ? (
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((home) => (
              <ListingCard
                key={home.address}
                listing={toListing(home)}
                // The slab is the separation, so the card's hairline comes off
                // rather than drawing a line across a step it already cleared.
                className="border-transparent"
              />
            ))}
          </div>
        ) : (
          // Every list ships its empty state, and this one is reachable: a
          // neighborhood with no lettings in it is two clicks away.
          <div className="mt-10 rounded-lg bg-card px-6 py-16 text-center">
            <p className="text-base font-medium">
              Nothing on the book matches that this morning.
            </p>
            <p className="mx-auto mt-3 max-w-[46ch] text-base text-muted-foreground">
              The book turns over daily, and a good deal of it is spoken for
              before it is listed. Tell us what you are after and we will call
              when it comes up.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                render={<Link href="/listings" />}
                className="rounded-full"
              >
                Show every home
              </Button>
              <Button
                variant="outline"
                render={<Link href="/contact" />}
                className="rounded-full"
              >
                Tell us what you are after
              </Button>
            </div>
          </div>
        )}

        {/* The reference closes on one centred pill. Outline rather than the
            solid: the page's call to action is the dark button in the bar, and
            a second solid pill at the foot of a grid spends that emphasis on a
            link out of it. */}
        {shown.length > 0 ? (
          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              render={<Link href="/contact" />}
              className="rounded-full"
            >
              Not here? Tell us what you are after
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
