// One source for the six areas, because four layouts now read them and the
// second copy is where they start to drift. The active counts sum to 258, which
// is the figure the section's lede quotes against the hero's 1,284 — change one
// here and that sentence has to change with it. The six `days` figures have a
// median of 11, which is what the numbers strip on the home page claims and
// what the FAQ repeats.
//
// `price` is the number and `median` is the string made from it at the foot of
// this file, rather than both being typed out. Two spellings of one figure is
// how the tile ends up saying $2.15M while the bar beside it is drawn at 2.1.
//
// `office` is the branch that staffs the area, added when /about wanted the six
// addresses. It sits here rather than in a file of its own for the reason every
// other field does: the roster already answers who works an area, and a second
// list keyed by city is a second place for Brookline's phone number to live.
//
// `plot` is where the area stands on the drawn plan in /neighborhoods, in that
// SVG's own units. It is a fact about the six and their arrangement rather than
// about the section, so it lives here with them — the same call `photo()` makes
// at the foot of the file.
//
// All six photographs are the user's picks, chosen bright and modern over the
// period streets that were here before. Two rules survived the swap and are the
// ones to hold if any of the six is changed again.
//
// No two may read as the same picture. These run from a 96px thumbnail on an
// area's own map up to the full-bleed band at the head of /neighborhoods/[slug]
// and the 540px frame the home page's rows open on, and at the top of that
// range a page arguing these are six different places cannot show one street
// twice.
//
// The copy moved with the photographs. `line` and `stock` had six areas built
// of brownstone, Federal row houses, triple-deckers and Victorian two-families,
// and a reader who can see a new build in the frame above the sentence stops
// believing the sentence. What each area is actually for stayed: Beacon Hill
// still sells before the sign goes in, Cambridge still moves on the student
// calendar, Somerville is still what the Red Line did to a decade of prices.
// Somerville is untouched: two- and three-families with decks on a slope is
// what its frame shows, so the sentence under it was already true. Brookline
// kept its line and gave up "pre-war" alone.
//
// And none may be a frame the book already uses. Three of the six were sharing
// a photograph with a listing before this swap, which the home page prints in
// the hero and again in the rail — so the same house was both a home for sale
// in Brookline and the face of another area, twice over on one screen.
const raw = [
  {
    src: "https://images.unsplash.com/photo-1663659512973-8df941db5e1a",
    alt: "A grey modern apartment block beside a white heritage house, cars along the kerb",
    name: "Back Bay",
    price: 2_150_000,
    active: 38,
    line: "One side of the street went up last year, the other in 1890, and Newbury runs three minutes behind both.",
    stock:
      "New two-beds in the infill blocks, and floor-throughs in the older houses behind them.",
    perSqft: 1395,
    days: 14,
    change: 2.1,
    commute: 9,
    office: {
      street: "275 Newbury Street",
      city: "Boston, MA 02116",
      phone: "(617) 555-0132",
    },
    plot: { x: 286, y: 364, w: 176, h: 94 },
    spots: [
      { kind: "transit", name: "Copley", note: "Green Line · 5 min walk" },
      {
        kind: "school",
        name: "Boston Latin School",
        note: "Grades 7–12 · 15 min",
      },
      {
        kind: "park",
        name: "Commonwealth Avenue Mall",
        note: "At the door · 2 min walk",
      },
      {
        kind: "shops",
        name: "Newbury Street",
        note: "Eight blocks · 3 min walk",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1706931175437-540947415dc2",
    alt: "A white house with a wood-panelled bay, its ochre neighbour attached alongside",
    name: "Beacon Hill",
    price: 2_900_000,
    active: 21,
    line: "Short blocks, no through traffic, and almost nothing on the market. Most of what comes up sells before the sign goes in.",
    stock:
      "Attached houses of three floors, and a handful of pairs finished since 2015.",
    perSqft: 1510,
    days: 19,
    change: -0.4,
    commute: 6,
    office: {
      street: "84 Charles Street",
      city: "Boston, MA 02114",
      phone: "(617) 555-0119",
    },
    plot: { x: 506, y: 356, w: 152, h: 96 },
    spots: [
      { kind: "transit", name: "Charles/MGH", note: "Red Line · 6 min walk" },
      {
        kind: "school",
        name: "Boston Latin Academy",
        note: "Grades 7–12 · 20 min",
      },
      {
        kind: "park",
        name: "Boston Common",
        note: "At the foot of the hill · 4 min",
      },
      {
        kind: "shops",
        name: "Charles Street",
        note: "Groceries and dinner · 2 min walk",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1723757334879-b85bdf1a33a2",
    alt: "A timber-clad building of stacked balconies above a stone retaining wall",
    name: "Cambridge",
    price: 1_190_000,
    active: 64,
    line: "Two universities, leases that end on the first of September, and the one market here that moves on a calendar.",
    stock:
      "Balconied new builds by the river, co-ops from the sixties, and the occasional converted mill.",
    perSqft: 915,
    days: 8,
    change: 4.8,
    commute: 14,
    office: {
      street: "1200 Massachusetts Avenue",
      city: "Cambridge, MA 02138",
      phone: "(617) 555-0157",
    },
    plot: { x: 176, y: 166, w: 268, h: 98 },
    spots: [
      {
        kind: "transit",
        name: "Central Square",
        note: "Red Line · 7 min walk",
      },
      {
        kind: "school",
        name: "Cambridge Rindge and Latin",
        note: "Grades 9–12 · 10 min",
      },
      {
        kind: "park",
        name: "Cambridge Common",
        note: "Nine acres · 8 min walk",
      },
      {
        kind: "shops",
        name: "Massachusetts Avenue",
        note: "Open late · 3 min walk",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1760129745103-91c4022ed5fb",
    alt: "Houses stepping up a wooded hillside under a clear sky",
    name: "Brookline",
    price: 1_420_000,
    active: 47,
    line: "The Green Line at one end and Larz Anderson park at the other, with the quietest streets of the six in between.",
    stock:
      "Flats at the foot of the hill, and single-family houses the whole way up it.",
    perSqft: 845,
    days: 12,
    change: 3.2,
    commute: 21,
    office: {
      street: "1400 Beacon Street",
      city: "Brookline, MA 02446",
      phone: "(617) 555-0148",
    },
    plot: { x: 104, y: 470, w: 194, h: 118 },
    spots: [
      {
        kind: "transit",
        name: "Coolidge Corner",
        note: "Green Line C · 5 min walk",
      },
      {
        kind: "school",
        name: "Brookline High School",
        note: "Grades 9–12 · 12 min",
      },
      { kind: "park", name: "Larz Anderson Park", note: "64 acres · 15 min" },
      {
        kind: "shops",
        name: "Harvard Street",
        note: "Groceries and the cinema · 4 min",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1729653935670-469ad8d72bd2",
    alt: "White houses with stacked decks on a slope among autumn trees",
    name: "Somerville",
    price: 985_000,
    active: 55,
    line: "Davis Square, and the Red Line five minutes from most front doors, which is what the last decade of prices was about.",
    stock:
      "Two- and three-families, half of them turned into condos since 2015.",
    perSqft: 735,
    days: 7,
    change: 6.1,
    commute: 24,
    office: {
      street: "240 Elm Street",
      city: "Somerville, MA 02144",
      phone: "(617) 555-0163",
    },
    plot: { x: 120, y: 34, w: 230, h: 118 },
    spots: [
      { kind: "transit", name: "Davis Square", note: "Red Line · 9 min walk" },
      {
        kind: "school",
        name: "Somerville High School",
        note: "Grades 9–12 · 12 min",
      },
      {
        kind: "park",
        name: "Powder House Park",
        note: "Off the rotary · 6 min walk",
      },
      {
        kind: "shops",
        name: "Elm Street",
        note: "Bakeries and the market · 5 min",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1627317973631-39e09a7f5456",
    alt: "Pale render houses along a wide street after rain, palms between the drives",
    name: "Jamaica Plain",
    price: 1_060_000,
    active: 33,
    line: "The Pond, the Arboretum, and streets wide enough that the houses on them come with a drive.",
    stock:
      "Detached singles on the newer streets, and the older Pondside houses behind the Arboretum.",
    perSqft: 690,
    days: 10,
    change: 5.4,
    commute: 18,
    office: {
      street: "703 Centre Street",
      city: "Boston, MA 02130",
      phone: "(617) 555-0175",
    },
    plot: { x: 330, y: 478, w: 180, h: 124 },
    spots: [
      {
        kind: "transit",
        name: "Green Street",
        note: "Orange Line · 6 min walk",
      },
      {
        kind: "school",
        name: "English High School",
        note: "Grades 9–12 · 14 min",
      },
      {
        kind: "park",
        name: "Jamaica Pond",
        note: "A mile and a half round · 8 min",
      },
      {
        kind: "shops",
        name: "Centre Street",
        note: "The whole strip · 4 min walk",
      },
    ],
  },
] as const;

// Two decimal places above a million and whole thousands below it, which is how
// this market writes an asking price. Not `money()` from listings.ts: that one
// prints every digit, and a median quoted to the dollar claims a precision a
// median does not have.
const asking = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${Math.round(n / 1000)}K`;

export const areas = raw.map((area) => ({
  ...area,
  /** The asking median as the page prints it, derived so it cannot disagree
      with the bar the chart draws from `price`. */
  median: asking(area.price),
}));

export type Area = (typeof areas)[number];

/** What the listing page's map panel lists beside the plan. Four per area and
    always the same four categories, so the tiles line up across six routes. */
export type SpotKind = Area["spots"][number]["kind"];

// The width each layout renders a photo at, doubled for 2x screens. Pinned on
// the source URL rather than left to the optimizer, which otherwise fetches the
// full original to make a thumbnail and times out — that is a 500, not a slow
// image.
export const photo = (src: string, w: number) => `${src}?w=${w}&q=75`;

/** The six names as a union rather than as `string`, so a plan, a route or a
    selector cannot be handed one that is not on the book. */
export type AreaName = Area["name"];

// This file imports nothing, and that is load-bearing rather than incidental:
// `area-spots.check.ts` runs it under bare node, which resolves node_modules
// but not the `@/` alias every component here is written with. A helper that
// wants `slugify` therefore lives with the route that wants it — which is why
// `areaBySlug` is in the page and `homeBySlug` is in listings.ts.
//
// What the four tiles on an area's page print. Every note in this file is a
// qualifier and a walking time either side of one `·`, which is a shape reading
// cannot confirm across twenty-four strings — `area-spots.check.ts` does.
export const spotParts = (note: string) => {
  const [detail, walk] = note.split(" · ");
  return { detail, walk: walk ?? "" };
};

/** The head office. Brookline is where the firm opened in 1998, so it is the
    address on the license and the one the footer and the fair housing notice
    print. Read off the array rather than typed a second time: a phone number
    that lives in two files is where the wrong one lives. */
export const head = (
  areas.find((area) => area.name === "Brookline") ?? areas[0]
).office;
