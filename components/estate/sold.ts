import type { AreaName } from "@/components/estate/areas";

// What closed, which is the one number a portal visitor scrolls for and almost
// no brokerage site prints. Its own file rather than a slice of `listings.ts`:
// these are not on the book and cannot be — a sold home has no gallery, no
// agent to call and no page to open, and putting it in the array every card on
// the site maps over would be twenty-one listings and six ghosts.
//
// Six of the homes we closed last month, which against the 1,140 in
// `figures.ts` is six of roughly ninety-five. Every figure is invented and
// internally consistent: the median of the six `days` is 11, which is the
// median time to first offer that same file claims, and the addresses are all
// inside the one geography the house rule sets and none of them collides with
// a listing that is still standing.
//
// `area` is `AreaName` for the same reason `Home["area"]` is: one geography,
// checked by the compiler rather than by reading.
export type Sold = {
  address: string;
  area: AreaName;
  /** What it was listed at. */
  asking: number;
  /** What it closed at. */
  sold: number;
  /** Listing to first offer, the same measure `figures.ts` takes a median of. */
  days: number;
};

export const sold: Sold[] = [
  {
    address: "41 Marlborough St",
    area: "Back Bay",
    asking: 2_395_000,
    sold: 2_450_000,
    days: 9,
  },
  {
    address: "9 Louisburg Sq",
    area: "Beacon Hill",
    asking: 3_100_000,
    sold: 3_025_000,
    days: 24,
  },
  {
    address: "87 Willow Ave",
    area: "Somerville",
    asking: 985_000,
    sold: 1_041_000,
    days: 5,
  },
  {
    address: "18 Cypress St",
    area: "Brookline",
    asking: 1_450_000,
    sold: 1_450_000,
    days: 13,
  },
  {
    address: "33 Green St",
    area: "Jamaica Plain",
    asking: 1_075_000,
    sold: 1_120_000,
    days: 7,
  },
  {
    address: "190 Prospect St",
    area: "Cambridge",
    asking: 1_225_000,
    sold: 1_205_000,
    days: 18,
  },
];

/** How far over asking the set closed, weighted by price rather than averaged
    across the six — a $3.1M sale two per cent under moves this market's number
    further than a $985K sale six per cent over, and an unweighted mean would
    say the opposite. */
export const overAsking =
  sold.reduce((sum, one) => sum + one.sold, 0) /
    sold.reduce((sum, one) => sum + one.asking, 0) -
  1;

/** The middle of the six, which is the figure `figures.ts` quotes for the
    whole year. Derived, so the two cannot drift apart. */
export const medianDays = (() => {
  const days = sold.map((one) => one.days).sort((a, b) => a - b);
  const mid = days.length / 2;
  return days.length % 2 === 0 ? (days[mid - 1] + days[mid]) / 2 : days[mid];
})();

/** The difference on one sale, as a share of what it was asking. */
export const over = (one: Sold) => one.sold / one.asking - 1;
