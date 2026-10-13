import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { PhotoMosaic } from "@/components/estate/photo-mosaic";
import {
  bigPhotos,
  mlsOf,
  plural,
  slugOf,
  toListing,
  type Home,
} from "@/components/estate/listings";
import { SavePill, ShareButton } from "@/components/estate/saved";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// The reference is a product card: a large photo panel, a strip of thumbnails
// directly under it, then the name with an outlined price pill opposite and a
// grey qualifier line beneath. Blown up to the width of the page it is a
// listing detail almost exactly — so the card's parts keep their order, which
// means the address arrives *after* the photographs rather than above them.
// That is the whole idea worth taking: a listing is a set of photographs, and
// the address is its caption. Every portal on this market does the reverse.
export function ListingHero({ home }: { home: Home }) {
  // The same converter the cards use, so the price and the terms on this page
  // are the strings the card that opened it printed — not a second formatting
  // of the same two numbers.
  const listing = toListing(home);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8 pt-12 sm:pt-16">
      {/* Not an Eyebrow: every other section opens with that badge, and this
          one opens with the way back. A breadcrumb is a link, and a badge that
          became a link would be the badge everywhere else meaning two things.
          The two controls opposite are the pair every listing page carries and
          neither of them needs a server — one writes to this browser, the other
          to its clipboard. */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <Link
          href="/listings"
          className={cn(
            "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            reach,
          )}
        >
          <ChevronLeftIcon className="size-4" aria-hidden />
          All homes
        </Link>

        <div className="flex items-center gap-2">
          <SavePill id={slugOf(home)} />
          <ShareButton />
        </div>
      </div>

      {/* Four tiles rather than one frame: a listing is a set of photographs
          and a set reads as a set. Pressing any of them opens the same gallery
          the cards use, so the carousel is not lost, it is one click in. */}
      <PhotoMosaic photos={bigPhotos(home)} className="mt-8" />

      {/* The reference's name row: the title left, the outlined price pill hard
          opposite it, both landing on one baseline. */}
      <div className="mt-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <div>
          <SectionHeading as="h1">{home.address}</SectionHeading>

          {/* The reference's grey qualifier line, split by hairline rules the
              way it splits its own. The status keeps the card's chip so a
              reader arriving from the grid meets the same object. */}
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {home.area}
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-medium text-foreground">
              <span
                aria-hidden
                className={cn("size-1.5 rounded-full", home.dot)}
              />
              {home.status}
            </span>
            <Rule />
            <span className="tabular-nums">
              {plural(home.days, "day")} on market
            </span>
            <Rule />
            <span className="tabular-nums">MLS #{mlsOf(home)}</span>
          </p>
        </div>

        {/* The reference's outlined price pill, at the size the figure deserves
            once it is the only one on the page. A border and no shadow: it is
            resting on the page like everything else in this section. */}
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="rounded-full border bg-card px-6 py-3 text-2xl tracking-tight tabular-nums">
            {listing.price}
          </p>
          <p className="max-w-[36ch] text-sm text-muted-foreground sm:text-right">
            {listing.terms}
          </p>
        </div>
      </div>
    </section>
  );
}

// The reference divides its qualifier line with a thin vertical rule rather
// than with a bullet, which is what keeps the line reading as a row of fields
// instead of as a sentence.
//
// Gone below sm, where the line wraps: a separator is only a separator between
// two things on one line, and a wrap strands it at the end of the first line
// pointing at nothing. The gap does the same job there for nothing.
function Rule() {
  return (
    <span aria-hidden className="hidden h-3 w-px shrink-0 bg-border sm:block" />
  );
}
