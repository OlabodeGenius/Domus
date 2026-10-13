import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Slugs are derived, never stored. A `slug` field beside a `name` is a second
// place for the same string to live and the place where the two drift apart —
// and the route reads it back through the same function, so a rename moves the
// URL with it.
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Small counts as words, because "Only 2 of the six cost more" and "the 9 of
// us" both read as data where the sentence around them is prose. Past twelve a
// numeral is what a reader wants anyway, so that is where it stops.
//
// Here rather than in either component: two of them want the same map, and the
// second copy is where one of them gains a thirteenth word the other has not.
const numbers = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

export function spell(n: number) {
  return numbers[n] ?? `${n}`;
}

// A price short enough to sit on a map pin or in a query string: two decimals
// of a million reads as a price and three does not, and a trailing zero on
// `1.20` is a digit nobody says out loud.
//
// Here rather than beside the book, because the two callers cannot both reach
// that file. `portal.ts` runs on the server and holds the 21 records; the
// affordability panel is a client component and must not, or the whole book
// ships to the browser to format one figure. It is also the shape
// `capFrom()` parses back, which is what lets a computed ceiling become a link
// to /listings.
export function shortMoney(n: number) {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M`
    : `$${Math.round(n / 1000)}K`;
}

// A change figure with its sign on it, and a real minus rather than a hyphen —
// U+2212 is the character that lines up with a digit in a tabular-nums column,
// where a hyphen sits high and short.
//
// Shared the moment a second section printed one: the area chart on
// /neighborhoods and the sortable table on /home-2 both quote the same six
// year-on-year figures.
export function signed(n: number) {
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n)}%`;
}
