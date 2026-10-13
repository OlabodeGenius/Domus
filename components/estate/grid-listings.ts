import { homes, type Home } from "@/components/estate/listings";
import {
  beds as bedLadder,
  price as priceLadder,
} from "@/components/estate/search-options";
import { slugify } from "@/lib/utils";

// What both browse sections agree on: the tabs and the sort in the control row,
// and underneath them what a filter *means* over the book — one predicate, one
// query builder, one set of counts.
//
// It lives here rather than in either section because there are two of them and
// they now offer the same dialog: /listings reads the query on the server and
// renders the answer, the home page's section stages the same choices in the
// client and hands the reader to /listings with them applied. Two copies of
// "a ceiling is a ceiling for the sale book" is where the two would start
// disagreeing about the same twenty-one homes.
//
// Nothing in here draws anything, so both a server component and a client one
// can import it.
type Status = Home["status"];

// "All homes" carries no status, which is what makes it the one tab that shows
// the whole book. The rest read straight off Home["status"].
export const tabs = [
  { label: "All homes", status: null as Status | null },
  { label: "New this week", status: "New" },
  { label: "Open house", status: "Open house" },
  { label: "Under contract", status: "Under contract" },
] as const;

// The sort's value *is* its label, so the trigger renders the chosen row with
// no lookup table between the two.
export const sorts = [
  "Newest first",
  "Price: high to low",
  "Price: low to high",
  "Largest first",
] as const;

export type Sort = (typeof sorts)[number];

// Keyed by the label the select shows, which is also the value it stores — one
// string does both jobs and there is no table sitting between the control and
// the sort it names. Here rather than in either section, because the home page
// and the browse page sort the same book and a second copy of "largest first"
// is where the two would start disagreeing.
export const by: Record<Sort, (a: Home, b: Home) => number> = {
  "Newest first": (a, b) => a.days - b.days,
  "Price: high to low": (a, b) => b.price - a.price,
  "Price: low to high": (a, b) => a.price - b.price,
  "Largest first": (a, b) => b.sqft - a.sqft,
};

export const copy = {
  eyebrow: "Every home we hold",
  heading: "Browse the book, then tell us which one to open",
  lede: "Nine of the 1,284 homes on our books this morning. Filter by where a listing stands, sort them the way you shop, and press any card to reach the agent whose name is on it rather than a switchboard.",
  cta: "View all 1,284 homes",
};

/** The four slices the pills offer, in the order the reference sets them. */
export const shows = [
  { key: "all", label: "All homes", holds: () => true },
  {
    key: "sale",
    label: "For sale",
    holds: (home: Home) => home.for === "sale",
  },
  {
    key: "rent",
    label: "For rent",
    holds: (home: Home) => home.for === "rent",
  },
  // Days on market rather than the status string: "New" is a sale's word and a
  // let says "Available now", and a week is the same week for both.
  { key: "new", label: "New this week", holds: (home: Home) => home.days <= 7 },
] as const;

export type Show = (typeof shows)[number]["key"];

export const isShow = (value: string | undefined): value is Show =>
  shows.some((one) => one.key === value);

export const sortFrom = (value: string | undefined): Sort =>
  sorts.find((one) => slugify(one) === value) ?? sorts[0];

// The hero search sends its two dropdowns as the strings a reader chose —
// "$1.5M", "3+" — because those are what the panel prints and what a shared URL
// should read as. The book stores numbers, so the pair is parsed back here
// rather than duplicated as numbers in `search-options.ts`, which would be the
// second place the price ladder lives.
export const capFrom = (value: string | undefined) => {
  const match = value?.match(/^\$([\d.]+)([KM])$/);
  return match
    ? Number(match[1]) * (match[2] === "M" ? 1_000_000 : 1_000)
    : undefined;
};

export const bedsFrom = (value: string | undefined) => {
  const match = value?.match(/^(\d)\+$/);
  return match ? Number(match[1]) : undefined;
};

/** The query, parsed and resolved against the book: an area and a type are the
    spellings `homes` uses, a ceiling and a bed floor are numbers. */
export type Filters = {
  show: Show;
  area?: string;
  /** The floor, which only the range control sets. */
  from?: number;
  cap?: number;
  floor?: number;
  type?: string;
};

// One predicate rather than a chain of `.filter()`s, because the filter panel
// asks the same question a second way: how many homes would be left if this one
// field were that value instead. A count that comes from a different set of
// rules than the grid is a count that will one day promise four and show three.
export const holds = (home: Home, f: Filters) =>
  shows.find((one) => one.key === f.show)!.holds(home) &&
  (!f.area || home.area === f.area) &&
  // A ceiling set in six figures is a ceiling for the sale book. A let priced
  // per month clears it on arithmetic rather than on meaning, so lettings are
  // left where the tenure pills put them.
  (!f.cap || home.for === "rent" || home.price <= f.cap) &&
  (!f.from || home.for === "rent" || home.price >= f.from) &&
  (!f.floor || home.beds >= f.floor) &&
  (!f.type || home.type === f.type);

/** Every property type the book actually holds, in the order it holds them —
    derived, so a type nobody has listed never becomes an empty row. */
export const kinds = [...new Set(homes.map((home) => home.type))];

/** And every neighborhood it holds, alphabetical because six pills in a row are
    read across rather than down. Off the book rather than off `areas`, which is
    the fourteen we cover: a pill that will read (0) whatever else you press is
    not a filter, and the section's own note says six of the fourteen have homes
    up this morning. It also keeps that file out of the home page's bundle. */
const places = [...new Set(homes.map((home) => home.area))].sort();

// Every control on this page is a link, so each one needs the whole query with
// one key changed. Empty values are dropped rather than written out, which is
// what keeps the default view at a bare /listings.
export const query = (
  current: Record<string, string | undefined>,
  next: Record<string, string | null>,
) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...current, ...next })) {
    if (value) params.set(key, value);
  }
  const search = params.toString();
  return search ? `/listings?${search}` : "/listings";
};

/** One option on a control: what it reads, where it goes, and how many homes it
    leaves you with once every *other* filter still holds. */
export type Choice = { label: string; count: number; href: string };

export type Field = {
  /** Which filter this is — the dialog places the three by hand. */
  key: "area" | "beds" | "type";
  label: string;
  /** Which option is on, by its label. */
  value: string;
  options: Choice[];
};

// What the filter dialog offers. Every option carries the number of homes it
// would leave you with once the *other* filters still hold, which is what turns
// a control from a guess into a decision, and every href is the whole query with
// one key changed — so the same call answers both pages: on /listings the links
// are followed, on the home page they are staged and followed once at the end.
export function facets(current: Record<string, string | undefined>) {
  // The query resolved against the book, in the one place that knows how: an
  // area matched through `slugify` on both sides so "Back Bay" typed into the
  // hero search and "back-bay" from a neighborhood page find the same homes,
  // and a place we do not cover matching nothing rather than emptying the grid
  // over a word that names the whole market.
  const filters: Filters = {
    show: isShow(current.show) ? current.show : "all",
    area: current.area
      ? homes.find((home) => slugify(home.area) === slugify(current.area!))
          ?.area
      : undefined,
    from: capFrom(current.from),
    cap: capFrom(current.price),
    floor: bedsFrom(current.beds),
    type: kinds.find((one) => slugify(one) === current.type),
  };

  const count = (over: Partial<Filters>) =>
    homes.filter((home) => holds(home, { ...filters, ...over })).length;

  const anywhere = "Anywhere we cover";
  const anything = "Every type";

  const fields: Field[] = [
    {
      key: "area",
      label: "Neighborhood",
      value: filters.area ?? anywhere,
      options: [
        {
          label: anywhere,
          count: count({ area: undefined }),
          href: query(current, { area: null }),
        },
        ...places.map((one) => ({
          label: one,
          count: count({ area: one }),
          href: query(current, { area: slugify(one) }),
        })),
      ],
    },
    {
      key: "beds",
      label: "Bedrooms",
      // Off the parsed floor rather than off the raw query, so a bed count
      // nobody offers cannot leave the trigger showing nothing.
      value: filters.floor ? `${filters.floor}+` : "Any",
      options: bedLadder.options.map((one) => ({
        label: one.value,
        count: count({ floor: bedsFrom(one.value) }),
        href: query(current, {
          beds: one.value === "Any" ? null : one.value,
        }),
      })),
    },
    {
      key: "type",
      label: "Property type",
      value: filters.type ?? anything,
      options: [
        {
          label: anything,
          count: count({ type: undefined }),
          href: query(current, { type: null }),
        },
        ...kinds.map((one) => ({
          label: one,
          count: count({ type: one }),
          href: query(current, { type: slugify(one) }),
        })),
      ],
    },
  ];

  // The sale book's asking prices, with every other filter still holding.
  // Lettings are left out rather than bucketed — they are priced by the month,
  // and four figures against seven would be one spike at the left of a chart
  // about asking prices.
  const asking = homes.filter(
    (home) =>
      home.for === "sale" &&
      holds(home, { ...filters, show: "all", from: undefined, cap: undefined }),
  );

  // The shape of the book, drawn under the price control.
  //
  // Laid on the ladder's axis rather than on the price line. The slider steps
  // through six stops at even intervals, so $1M sits two fifths along the track
  // however far it is from $750K in money; a chart drawn on the price line
  // under it puts the dark bars short of the thumb, and a reader would be right
  // to call that a bug. Four slots to each of the five segments, so a slot's
  // place in the row is the place the thumb takes for the same money.
  //
  // Heights are per-dollar, because those slots are not the same width in money
  // — four over $750K–$1M are $62.5K each and four over $2M–$3M are $250K — and
  // a raw count would draw the thin top of the book as tall as its middle.
  //
  // And each one counts what sits *near* it rather than only inside it: fifteen
  // asking prices dropped into twenty slots is a comb of ones and zeroes, which
  // draws as noise. A buyer whose book runs to four figures can drop the window
  // and count each slot on its own.
  const sorted = asking.map((home) => home.price).sort((a, b) => a - b);
  const top = sorted[sorted.length - 1] ?? 1;
  const caps = priceLadder.options.map((one) => capFrom(one.value) ?? Infinity);
  /** The money a fraction of the track stands for, along the ladder's own axis. */
  const marks = [...caps.slice(0, -1), Math.max(top, caps[caps.length - 2])];
  const axis = (fraction: number) => {
    const k = Math.min(
      Math.floor(fraction * (marks.length - 1)),
      marks.length - 2,
    );
    const inner = fraction * (marks.length - 1) - k;
    return marks[k] + (marks[k + 1] - marks[k]) * inner;
  };
  const short = (value: number) => `$${Math.round(value / 1000)}K`;
  /** The reading at a given resolution. The smoothing window is a fifth of the
      axis whatever the slot count, so the curve is the same claim about the book
      however finely it is drawn. */
  const spread = (slots: number) =>
    Array.from({ length: slots }, (_, i) => {
      const from = axis(i / slots);
      const to = axis((i + 1) / slots);
      const centre = (i + 0.5) / slots;
      const near = {
        from: axis(Math.max(0, centre - 0.1)),
        to: axis(Math.min(1, centre + 0.1)),
      };
      const inside = sorted.filter(
        (price) => price > near.from && price <= near.to,
      ).length;
      return {
        label: `${short(from)}–${short(to)}`,
        // Per $100K, so the number the tooltip carries is still a count of homes.
        count: (inside / Math.max(near.to - near.from, 1)) * 100_000,
        stop: Math.floor((i * (marks.length - 1)) / slots) + 1,
      };
    });
  const chart = spread(40);

  // Scaffolding: what the fifth chart's two-handled control needs. The ladder
  // read as positions rather than as ceilings — 0 is no floor and the last is no
  // ceiling — and every pair of them counted, which is thirty-six numbers and
  // cheaper than teaching the client to filter. The hrefs are built there from
  // the query it already has, because a table of thirty-six of those would be
  // the same URL written thirty-six times.
  const ladder = priceLadder.options.map((one) => one.value);
  const range = {
    ladder,
    counts: ladder.map((low, a) =>
      ladder.map((high, b) =>
        b <= a
          ? 0
          : homes.filter((home) =>
              holds(home, {
                ...filters,
                from: a === 0 ? undefined : capFrom(low),
                cap: capFrom(high),
              }),
            ).length,
      ),
    ),
    at: [
      Math.max(0, ladder.indexOf(current.from ?? "")),
      (() => {
        const found = ladder.indexOf(current.price ?? "");
        return found === -1 ? ladder.length - 1 : found;
      })(),
    ],
  };

  // Every filter set, each with the URL that takes it off. Here rather than in
  // either caller: the bar prints them under the control row and the dialog
  // opens on them, and two copies of "Up to $1.5M" is one of them going stale.
  const chips: { label: string; clear: string }[] = [];
  if (filters.area)
    chips.push({
      label: filters.area,
      clear: query(current, { area: null }),
    });
  if (filters.from)
    chips.push({
      label: `From ${current.from}`,
      clear: query(current, { from: null }),
    });
  if (filters.cap)
    chips.push({
      label: `Up to ${current.price}`,
      clear: query(current, { price: null }),
    });
  if (filters.floor)
    chips.push({
      label: `${filters.floor}+ beds`,
      clear: query(current, { beds: null }),
    });
  if (filters.type)
    chips.push({
      label: filters.type,
      clear: query(current, { type: null }),
    });

  return {
    filters,
    fields,
    chart,
    range,
    /** The query as it stands, for a control that has to change two keys at
        once and cannot be handed a table of every combination. */
    now: query(current, {}),
    chips,
    clear: chips.length
      ? query(current, {
          area: null,
          from: null,
          price: null,
          beds: null,
          type: null,
        })
      : undefined,
    active: chips.length,
  };
}
