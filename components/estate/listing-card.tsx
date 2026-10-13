import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  Bathtub01Icon,
  BedDoubleIcon,
  FloorPlanIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ListingGallery } from "@/components/estate/listing-gallery";
import { plural, slugOf } from "@/components/estate/listings";
import { SaveToggle } from "@/components/estate/saved";
import { cn } from "@/lib/utils";

// The listing card, lifted out of market-cards.tsx the moment a second section
// wanted it. The second use is a component: two hand-written copies of this
// would be identical on the day they were written and different by the third
// edit, and the odd one out is invisible in review and obvious on the page.
//
// The card owns everything about itself. The caller passes only what genuinely
// varies, which is its width — a rail sets a fixed one and snaps, a grid lets
// the cell decide.
export type Listing = {
  src: string;
  alt: string;
  price: string;
  address: string;
  area: string;
  beds: number;
  baths: number;
  sqft: number;
  /** The same three figures run together in one line. The card draws the
      numbers as chips; the hero, which has one line to spend, prints this. */
  specs: string;
  status: string;
  /** The card's one spot of colour, and it rides the dot rather than the pill. */
  dot: string;
  /** The half of the price line after the figure: a mortgage estimate on a
      sale, the lease on a let. */
  terms: string;
  more: { src: string; alt: string }[];
};

export function ListingCard({
  listing,
  className,
}: {
  listing: Listing;
  /** Width and any positioning the parent layout needs — nothing else. */
  className?: string;
}) {
  // The card and its gallery slides go to the same place, and that place is the
  // home itself — this component is on the home rail, the browse grid and the
  // listings page, so an `#book` anchor was a link that worked on one of the
  // three. Derived from the record, never stored on it.
  const href = `/listings/${slugOf(listing)}`;

  // Three chips rather than "3 beds · 2 baths · 1,540 sqft": the middle dots
  // made one string a reader parsed, and these are the three figures a buyer
  // scans a grid for. Same pill as the status chip above them, because a card
  // with two kinds of chip on it has neither.
  const specs = [
    { icon: BedDoubleIcon, label: plural(listing.beds, "bed") },
    { icon: Bathtub01Icon, label: plural(listing.baths, "bath") },
    {
      icon: FloorPlanIcon,
      label: `${listing.sqft.toLocaleString("en-US")} sqft`,
    },
  ];

  return (
    // Resting on the page, so a hairline and no shadow at rest: bg-card is 100%
    // against a 99% page, and an unbordered white card here is loose text rather
    // than a card. The cast arrives on hover only, which is the whole card
    // answering the pointer now that the whole card is the link.
    //
    // relative is that link's containing block and group is what lets it paint:
    // the corner button is the card's one real <a> and it casts an ::after over
    // the article, so a press anywhere lands on it. Airbnb's listing card, which
    // is the pattern a visitor already has in hand.
    <article
      className={cn(
        "group relative rounded-lg border bg-card p-5",
        // Not shadow-soft: that token opens with a 1px ring so a raised surface
        // can draw its own edge, and this card already has a border — the two
        // stack and the hairline goes from one line to two. So the hover takes
        // the token's diffuse layers alone, lightened, and the border stays the
        // only edge in the card.
        "transition-shadow hover:shadow-[0_1px_2px_hsl(30_6%_10%/0.025),0_8px_20px_-8px_hsl(30_6%_10%/0.05)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium">{listing.address}</h3>
          {/* The reference's qualifier line, carrying the area and the status
              side by side. */}
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
            {listing.area}
            {/* bg-accent and not bg-card: on a white card a white pill is
                sitting on its own colour and is not a chip at all. The photo
                overlay in the other listings layout floats its chip over a
                photograph instead, so that one is opaque — two surfaces, two
                chips, not one component with a flag. */}
            <span className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium">
              <span
                aria-hidden
                className={cn("size-1.5 rounded-full", listing.dot)}
              />
              {listing.status}
            </span>
          </p>
        </div>
        {/* The reference's baseline pill, moved to the corner: the whole card is
            the offer, so the action belongs at the top of it rather than at the
            end of a price line. It is also the card's link — the ::after runs to
            the article's own edges instead of padding out a 36px button, which
            is what makes the address, the photo and the price line all press
            through to the same place. group-hover, because by then the pointer
            is anywhere on the card and hover: alone would only fire on the
            36px. */}
        <Link
          href={href}
          aria-label={`View ${listing.address}, ${listing.area}`}
          className={cn(
            // No relative of its own — that is the point. The ::after resolves
            // against the article instead, which is what turns a 36px button
            // into a 340px hit area.
            //
            // Rests a rung under the card and moves one further down on hover.
            // Below a white card that is the only direction with any room in
            // it, and it is the direction that reads as the control answering —
            // the reverse, resting deep and going pale, reads as the button
            // switching off under the cursor.
            "grid size-9 shrink-0 place-items-center rounded-full bg-accent transition-colors",
            "after:absolute after:inset-0 after:content-['']",
            "group-hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          )}
        >
          <ArrowUpRightIcon className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="relative mt-5">
        {/* z-10 so the strip stays above the card's stretched link: an overlay
            across a scroll container is an overlay that eats the swipe. The
            slides take the same href of their own instead. */}
        <ListingGallery
          href={href}
          className="relative z-10 aspect-[4/3] rounded-sm"
          photos={[{ src: listing.src, alt: listing.alt }, ...listing.more]}
        />
        {/* z-20, above both the gallery and the card's stretched link: a heart
            that opened the listing instead of saving it is the one bug this
            control can have. The reference cards this grid came off all carry
            one in the same corner. */}
        <SaveToggle
          id={slugOf(listing)}
          className="absolute top-3 right-3 z-20"
        />
      </div>

      {/* Muted glyph, muted label: the chips carry the facts and the price
          under them stays the only ink in the footer. */}
      <ul className="mt-6 flex flex-wrap gap-1.5 text-muted-foreground">
        {specs.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium tabular-nums"
          >
            <HugeiconsIcon
              icon={icon}
              size={14}
              strokeWidth={1.5}
              aria-hidden
            />
            {label}
          </li>
        ))}
      </ul>

      {/* The reference's grey footnote. Split weight inside one line: the price
          takes ink and the terms around it stay muted, which is how a price set
          at 14px still reads as the number in the card. */}
      <p className="mt-4 text-sm text-pretty text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">
          {listing.price}
        </span>{" "}
        <span className="tabular-nums">{listing.terms}</span>
      </p>
    </article>
  );
}
