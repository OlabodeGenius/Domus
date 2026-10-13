import { areas } from "@/components/estate/areas";
import { shows } from "@/components/estate/grid-listings";
import { homes, money, plural, slugOf, type Home } from "@/components/estate/listings";
import { shortMoney } from "@/lib/utils";

// What the portal home's sections agree on, in a plain module for the reason
// `grid-listings.ts` is one: three of them read the same book and two of them
// are client components, so the shapes have to be derivable on the server and
// serialisable across the boundary.
//
// It also keeps `listings.ts` out of the client bundle. The map, the compare
// tray and the affordability panel all hold state, and a `"use client"` file
// importing the book would ship 21 records with their blurbs and four
// photographs apiece to the browser. The page is a server component: it calls
// these, and hands the results down as props.

/** The drawn plan's own coordinate space — `area-plan.tsx` sets this viewBox,
    and a pin placed in it has to be converted to a percentage of the box. */
const PLAN = { w: 800, h: 620 };

/** One home as the map draws it: the fields a pin and a result row need, and
    nothing else. The blurb, the gallery and the four table facts stay on the
    server where the detail page reads them. */
export type Pin = {
  slug: string;
  href: string;
  /** The pill's own label — a price short enough to sit on a plan. */
  short: string;
  price: string;
  terms: string;
  address: string;
  area: string;
  specs: string;
  status: string;
  dot: string;
  days: number;
  for: Home["for"];
  src: string;
  alt: string;
  /** Percentages of the plan box, so the marker positions with the same maths
      the area chips already use. */
  left: number;
  top: number;
};

/** A price at pin size. A let is quoted in full — four digits fit on a marker
    and `$4K` is not what anybody calls it — and a sale goes through
    `shortMoney`, which the affordability panel formats its ceiling with too. */
export const short = (home: Home) =>
  home.for === "rent" ? money(home.price) : shortMoney(home.price);

/** Every home on the book, placed inside its own area's block on the plan.
 *
 *  The positions are derived rather than typed: 21 hand-picked coordinates
 *  would be 21 numbers to move the day a listing changes area, and a block is
 *  already the only thing the drawing claims to know. Inside its block a
 *  home takes a cell of the smallest grid that fits its neighbours, which is
 *  what keeps two pins in Cambridge from landing on top of each other — the
 *  drawing is not to scale and does not pretend to be, so a cluster reading as
 *  a cluster is the whole of what it owes.
 */
export function pins(): Pin[] {
  return areas.flatMap((area) => {
    const here = homes.filter((home) => home.area === area.name);
    const cols = Math.ceil(Math.sqrt(here.length));
    const rows = Math.ceil(here.length / cols);

    return here.map((home, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cw = area.plot.w / cols;
      const ch = area.plot.h / rows;
      // Cell centres, with every other row shifted a quarter cell sideways.
      // Two price pills are about 50px wide and a block is 180, so on a plain
      // grid the pair in one row very nearly touch; the brick offset buys the
      // width back without moving anything outside its own block.
      const x =
        area.plot.x + cw * (col + 0.5) + (row % 2 === 0 ? -cw / 4 : cw / 4);
      const y = area.plot.y + ch * (row + 0.5);

      return {
        slug: slugOf(home),
        href: `/listings/${slugOf(home)}`,
        short: short(home),
        price: money(home.price),
        terms: home.for === "rent" ? "per month" : "asking",
        address: home.address,
        area: home.area,
        specs: `${plural(home.beds, "bed")} · ${plural(home.baths, "bath")} · ${home.sqft.toLocaleString("en-US")} sqft`,
        status: home.status,
        dot: home.dot,
        days: home.days,
        for: home.for,
        // The book pins its files at 800 for a card; a result row draws an
        // 80px thumbnail, so it asks for double that. Pinned here rather than
        // in the layout, the way `bigPhotos()` does it — the width a source is
        // asked for is a fact about the book.
        src: home.src.replace("w=800", "w=200"),
        alt: home.alt,
        left: (x / PLAN.w) * 100,
        top: (y / PLAN.h) * 100,
      };
    });
  });
}

/** The four slices the map's cards offer, and the line under each one.
 *
 *  The same `shows` predicates `/listings` filters on, so a card that says 15
 *  hands over 15 — the pills, the map and the browse page cannot disagree
 *  about what "for rent" means because there is one definition of it. The
 *  lines are derived from the book they describe rather than typed, which is
 *  what keeps a range honest the day a listing is added.
 */
export function slices() {
  return shows.map((one) => {
    const here = homes.filter(one.holds);
    const prices = here.map((home) => home.price);
    const low = Math.min(...prices);
    const high = Math.max(...prices);

    const line =
      one.key === "sale"
        ? `Asking ${short(here.find((h) => h.price === low)!)} to ${short(here.find((h) => h.price === high)!)}`
        : one.key === "rent"
          ? `${money(low)} to ${money(high)} a month`
          : one.key === "new"
            ? "Listed in the last seven days"
            : "Sale and let together, every one photographed";

    // The slugs travel with the count so the map can filter its pins without
    // a second copy of the predicates: `shows` is defined once, on the server,
    // and the client does a lookup rather than a rule.
    return {
      key: one.key,
      label: one.label,
      count: here.length,
      line,
      slugs: here.map(slugOf),
    };
  });
}

export type Slice = ReturnType<typeof slices>[number];

/** One home as the compare frame reads it: the nine facts a buyer puts side by
    side, each carried as a number *and* as the string that is printed, because
    the frame marks the best cell in three of its rows and a marker cannot be
    derived from "$1,275,000".

    Sale only. A monthly rent and an asking price in the same column is a
    comparison a reader has to undo before they can use it, and the section's
    footnote says which fifteen it is offering. */
export type Compared = {
  slug: string;
  href: string;
  address: string;
  area: string;
  type: string;
  src: string;
  alt: string;
  short: string;
  price: number;
  sqft: number;
  perSqft: number;
  facts: { label: string; value: string }[];
};

export function compared(): Compared[] {
  return homes
    .filter((home) => home.for === "sale")
    .map((home) => ({
      slug: slugOf(home),
      href: `/listings/${slugOf(home)}`,
      address: home.address,
      area: home.area,
      type: home.type,
      src: home.src.replace("w=800", "w=200"),
      alt: home.alt,
      short: short(home),
      price: home.price,
      sqft: home.sqft,
      // Rounded to the dollar, which is how this figure is quoted in every US
      // listing feed — the cents on a price per square foot are noise standing
      // where a decision goes.
      perSqft: Math.round(home.price / home.sqft),
      facts: [
        { label: "Asking", value: money(home.price) },
        { label: "Monthly, est.", value: `${money(home.monthly ?? 0)}/mo` },
        { label: "Beds", value: String(home.beds) },
        { label: "Baths", value: String(home.baths) },
        { label: "Floor area", value: `${home.sqft.toLocaleString("en-US")} sqft` },
        { label: "Price per sqft", value: money(Math.round(home.price / home.sqft)) },
        { label: "Built", value: String(home.built) },
        { label: "Days on market", value: plural(home.days, "day") },
        { label: "Parking", value: home.parking },
      ],
    }));
}

/** The asking price of every home on the book that is for sale, and nothing
    else. What the affordability panel counts against its ceiling — numbers
    only, so a client component can hold them without the book coming with. */
export const salePrices = () =>
  homes.filter((home) => home.for === "sale").map((home) => home.price);
