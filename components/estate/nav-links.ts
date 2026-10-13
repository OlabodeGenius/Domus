import { areas } from "@/components/estate/areas";
import { slugify } from "@/lib/utils";

// What the bar holds, in a plain module rather than inside either component
// that draws it: `site-nav.tsx` opens it as panels above 1024 and
// `site-menu.tsx` opens it as trays in a sheet below. One list, because a site
// whose wide navigation and narrow navigation disagree about its own pages has
// two navigations. The same split `search-options.ts` makes beside
// `field-select.tsx`.
//
// Keep it a plain module even if only one component is left reading it. A
// `"use client"` file exports client *references*, so a server component
// importing an array from one receives a module proxy and not an array — a
// 500, not a warning, and this file exists because that already happened once.
//
type Row = {
  label: string;
  href: string;
  /** The trailing slot on a row. Only the areas carry one, and it is what they
      actually hold this morning — a figure the /neighborhoods page prints too.
      Every column wearing a badge would be a table, not a menu. */
  trail?: string;
};

type Item =
  | { label: string; href: string }
  | { label: string; columns: { head: string; rows: Row[] }[] };

export const nav: Item[] = [
  // The multi-demo row every marketplace template ships, and the only change
  // this site's shell takes for the second home page. It sits first because
  // that is where a buyer clicking through demos looks for it, and the two
  // rows say what each page *is* rather than numbering them — "Home 2" tells a
  // reader nothing about which one they want.
  {
    label: "Home",
    columns: [
      {
        head: "Two ways in",
        rows: [
          { label: "The brokerage", href: "/" },
          { label: "Search first", href: "/home-2" },
        ],
      },
    ],
  },
  // Buy, rent and sell were three triggers of their own, and the bar was six
  // labels wide before the mark and the actions were counted. They are one
  // panel now at the user's ask, and the merge is not only a tidy: the three
  // menus overlapped anyway — "How it works", "Meet the agents" and the guides
  // were written into two of them each, so a reader pressing Buy and a reader
  // pressing Sell were being shown the same rows under different heads.
  //
  // One trigger, four columns, one intent per column. "Properties" rather than
  // "Homes" because "Home" is already the row above it, and two triggers
  // reading Home and Homes is a bar nobody can scan.
  {
    label: "Properties",
    columns: [
      {
        // Buy and rent are one column rather than two: renting is a filter on
        // the same book here, not a second book, and the first four rows are
        // the four pills /listings itself opens with.
        head: "On the book",
        rows: [
          { label: "All homes", href: "/listings" },
          { label: "For sale", href: "/listings?show=sale" },
          { label: "For rent", href: "/listings?show=rent" },
          { label: "New this week", href: "/listings?show=new" },
          { label: "Off-market exclusives", href: "/#exclusives" },
        ],
      },
      {
        // Derived, not typed. Six names and six counts already live in
        // areas.ts, and a menu that spells them again is a menu that goes stale
        // the first time an area is renamed or a count moves.
        head: "By neighborhood",
        rows: areas.map((area) => ({
          label: area.name,
          href: `/neighborhoods/${slugify(area.name)}`,
          trail: `${area.active}`,
        })),
      },
      {
        head: "Selling with us",
        rows: [
          { label: "What we charge", href: "/#fees" },
          { label: "Our track record", href: "/#numbers" },
          { label: "Guides on selling", href: "/guides?subject=selling" },
          { label: "Book a valuation", href: "/contact" },
        ],
      },
      {
        // Where the two flattened menus land. The agents page had its only way
        // in from the About panel, and About is a plain link now — a page a
        // template ships and its own bar cannot reach is worse than a page it
        // never built.
        head: "Where to start",
        rows: [
          { label: "Meet the agents", href: "/agents" },
          { label: "How it works", href: "/#how-it-works" },
          { label: "What it all costs", href: "/guides?subject=costs" },
          { label: "Every guide", href: "/guides" },
        ],
      },
    ],
  },
  { label: "Neighborhoods", href: "/neighborhoods" },
  // A panel of five rows, four of which were anchors on two pages. Home is the
  // dropdown this bar needs to prove it can draw, and a second one holding
  // /about, /about#fair-housing and /#press was a menu standing in for a scroll.
  { label: "About", href: "/about" },
];
