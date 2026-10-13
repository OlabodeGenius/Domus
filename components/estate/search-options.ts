import {
  BedIcon,
  CircleDollarSignIcon,
  MapsLocation01Icon,
  SearchList01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons";
import { areas } from "@/components/estate/areas";

// The hero search's dropdown fields, in their own file because both search
// forms read them and the second copy is where they start to drift.
//
// Every option carries the number of homes it leaves you with, which is the
// trailing slot the dropdown reference puts a badge or a meter in. They are
// arithmetic rather than decoration: the price list is cumulative and ends at
// the 1,284 the hero claims, and the beds list descends from the same figure.
// A count that does not reconcile with the rest of the page is the one a reader
// notices.
//
// Buy/Rent and the listing status carry no count. Renting is a different set of
// inventory rather than a filter of this one, and a figure this page cannot
// derive is a figure it should not print.
export type SearchOption = { value: string; homes?: string };

export type SearchField = {
  icon: typeof CircleDollarSignIcon;
  label: string;
  name: string;
  note?: string;
  initial: string;
  options: readonly SearchOption[];
  /** Where the panel's second group starts, and what the reference's section label calls it. */
  group?: { from: number; label: string };
};

export const price: SearchField = {
  icon: CircleDollarSignIcon,
  label: "Price up to",
  name: "price",
  note: "Median $1.42M across the fourteen areas we cover",
  initial: "$1.5M",
  options: [
    { value: "$750K", homes: "312" },
    { value: "$1M", homes: "684" },
    { value: "$1.5M", homes: "1,022" },
    { value: "$2M", homes: "1,190" },
    { value: "$3M", homes: "1,268" },
    { value: "No max", homes: "1,284" },
  ],
};

export const beds: SearchField = {
  icon: BedIcon,
  label: "Beds",
  name: "beds",
  note: "Bedrooms, not rooms. Baths are on the listing itself.",
  initial: "3+",
  options: [
    { value: "Any", homes: "1,284" },
    { value: "1+", homes: "1,251" },
    { value: "2+", homes: "1,104" },
    { value: "3+", homes: "812" },
    { value: "4+", homes: "431" },
    { value: "5+", homes: "168" },
  ],
  group: { from: 1, label: "At least" },
};

// `intent` and `status` are spares, kept on purpose and not mounted anywhere.
// They were the two extra cards on the two-row search treatment, which went out
// with the preview routes when the repo was stripped to the page it sells, and
// they are left written out because the work in a field is the label, the note
// and the option list rather than the markup.
//
// To switch one on: add it to the `dropdowns` array at the top of
// `hero-search-cards.tsx` with a three-word footnote, and teach `Browse` in
// `browse.tsx` to read its `name` off the query the way it already reads
// `price` and `beds`. Until that second half is done the field would submit a
// key nothing filters on, which is a control that looks like it works.
//
// Worth knowing before switching one on: /listings already carries both of
// these as pills — All homes · For sale · For rent · New this week — so a
// buyer mounting them here is choosing to ask the same question twice, once
// before the results and once over them.
export const intent: SearchField = {
  icon: SearchList01Icon,
  label: "Buying or renting",
  name: "intent",
  note: "Two different books. Ask us and we will say which one you want.",
  initial: "Buy",
  options: [{ value: "Buy" }, { value: "Rent" }],
};

export const status: SearchField = {
  icon: Tag01Icon,
  label: "Listing status",
  name: "status",
  note: "Ours changes when our system does, not on an overnight feed.",
  initial: "Any status",
  options: [
    { value: "Any status" },
    { value: "New this week" },
    { value: "Open house" },
    { value: "Price reduced" },
  ],
  group: { from: 1, label: "Narrow it" },
};

// ── /home-2 ────────────────────────────────────────────────────────────────
// The portal home asks the same four questions in one bar, and two of them the
// two fields above cannot answer: a rent ceiling is a monthly figure and not a
// six-figure one, and a location the reader picks rather than types is a list.
// Both live here for the reason the file exists — a second copy of the price
// ladder is where the two forms start disagreeing about the same book.

/** The two books, as the rest of the site already prints them: 1,284 for sale
    and 62 to rent (`browse.tsx` says both in one sentence, the hero and the
    grid say the first). Written once here because the portal home derives a
    live count from them rather than quoting one. */
export const SALE_BOOK = 1284;
export const RENT_BOOK = 62;

/** The rent ladder. Cumulative to the 62, and the median is the middle of the
    six lettings in `listings.ts` — 3,150 and 3,600 — so a reader who checks it
    against the cards finds the same number. */
export const rentPrice: SearchField = {
  icon: CircleDollarSignIcon,
  label: "Rent up to",
  name: "price",
  note: "Median $3,375 a month, before utilities and parking",
  initial: "$4,000",
  options: [
    { value: "$3,000", homes: "18" },
    { value: "$4,000", homes: "39" },
    { value: "$5,000", homes: "55" },
    { value: "No max", homes: "62" },
  ],
};

/** Where, as a list rather than a text field. The six carry their own active
    counts off `areas.ts`, which is the same figure /neighborhoods prints, and
    the seventh option is the whole book. */
export const where: SearchField = {
  icon: MapsLocation01Icon,
  label: "Where",
  name: "area",
  note: "Six of the fourteen areas our agents cover hold homes this morning",
  initial: "All areas",
  options: [
    { value: "All areas", homes: SALE_BOOK.toLocaleString("en-US") },
    ...areas.map((area) => ({ value: area.name, homes: String(area.active) })),
  ],
  group: { from: 1, label: "By neighborhood" },
};

/** How many homes a set of choices leaves you with.
 *
 *  Every factor is a ratio the site already prints, so the answer reconciles
 *  with the dropdowns rather than contradicting them: the base is the area's
 *  own count or the whole book, and price and beds narrow it by the share
 *  their own ladders give. Pick "All areas", "No max" and "Any" and it returns
 *  the 1,284 the hero claims — which is the check that this is arithmetic and
 *  not a number somebody liked.
 *
 *  The rent book is the six areas' proportions applied to 62, because a let is
 *  a different set of inventory rather than a filter of the sale one, and the
 *  bed ladder's shares are the sale book's for want of a second census. Both
 *  are stated rather than hidden: this is a demo count over invented stock, and
 *  the thing that has to hold is that it never disagrees with itself.
 */
export function matching(choice: {
  tenure: "Buy" | "Rent";
  area: string;
  price: string;
  beds: string;
}) {
  const rent = choice.tenure === "Rent";
  const ladder = rent ? rentPrice : price;
  const book = rent ? RENT_BOOK : SALE_BOOK;

  const found = areas.find((one) => one.name === choice.area);
  // 258 is the sum of the six active counts, which is the figure the home
  // page's neighborhoods section quotes against the 1,284.
  const covered = areas.reduce((sum, one) => sum + one.active, 0);
  const base = !found
    ? book
    : rent
      ? (found.active / covered) * RENT_BOOK
      : found.active;

  // The denominator is the largest count in the ladder, not the last one: the
  // price list climbs to "No max" and the bed list descends from "Any", so a
  // position-based reading is right on one of them and inverted on the other.
  const number = (homes?: string) => Number(homes?.replace(/,/g, "") ?? "0");
  const share = (field: SearchField, value: string) => {
    const chosen = field.options.find((one) => one.value === value)?.homes;
    const top = Math.max(...field.options.map((one) => number(one.homes)));
    return chosen && top ? number(chosen) / top : 1;
  };

  return Math.max(
    0,
    Math.round(base * share(ladder, choice.price) * share(beds, choice.beds)),
  );
}
