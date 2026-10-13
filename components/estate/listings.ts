import type { AreaName } from "@/components/estate/areas";
import type { Listing } from "@/components/estate/listing-card";
import { INSURANCE_RATE, money, TAX_RATE } from "@/components/estate/costs";
import { slugify } from "@/lib/utils";

// The inventory. One array, because every card on this site links to
// /listings/[slug] and a detail route can only resolve what it can see — two
// data files would have meant two halves of a book, one of which 404s.
//
// Field order taken off a live Compass results grid: price, then the status
// badge, then the address, then beds · baths · sqft. Days on market is the
// footnote, which is where the reference puts its own grey row.
//
// The status dot is the only colour on a card. A pastel chip is a translucent
// tint, and over a photograph it composites against whatever happens to be
// behind it — so the chip is an opaque pill and the hue rides the glyph, which
// is the style's own move.
//
// The numbers are the source and the strings are derived. The browse page
// sorts on price and on floor area, so those have to be numbers somewhere;
// deriving the money and the specs line at the foot of this file means there
// is no second copy of 2,680 to drift from the first.
export type Home = {
  src: string;
  alt: string;
  address: string;
  /** One of the six, and typed as such rather than as a string. The house rule
      is one geography — a listing outside Greater Boston reads as stock content
      — and the drawn plan can only place a home whose area has a block on it,
      so a typo here would silently drop a pin off the portal home's map. The
      type is the check that never has to be run. */
  area: AreaName;
  /** The asking price for a sale, the monthly rent for a let. */
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  dot: string;
  days: number;
  for: "sale" | "rent";
  /** The four facts the card never asked for and the detail page's table does. */
  type: string;
  built: number;
  parking: string;
  outdoor: string;
  /** The body. Two sentences, written where the photographs stop explaining. */
  blurb: string;
  /** Sale only: the estimated monthly payment the card quotes under the price. */
  monthly?: number;
  /** Rent only: what the lease says, printed where a sale prints its mortgage. */
  lease?: string;
  /** The gallery's remaining slides — an interior behind an exterior lid, and
      the other way round, which is the order a listing's photographs run in. */
  more: { src: string; alt: string }[];
};

// The three slices are how the site avoids showing one photograph twice on one
// screen: the home rail draws the first six, the home browse grid the next
// nine, and neither shares a frame with the other. The browse page draws the
// whole book, which is the one place they are meant to meet.
export const railHomes: Home[] = [
  {
    src: "https://images.unsplash.com/photo-1627141234469-24711efb373c?w=800&q=75",
    alt: "A dark-clad house with wood panels and tall windows on a suburban street",
    price: 1275000,
    address: "14 Chestnut St",
    area: "Brookline",
    beds: 4,
    baths: 3,
    sqft: 2410,
    status: "Open Sat 2–4",
    dot: "bg-violet-500",
    days: 6,
    for: "sale",
    monthly: 6450,
    type: "Single-family",
    built: 1926,
    parking: "Detached two-car garage",
    outdoor: "Fenced garden, 0.19 acres",
    blurb:
      "Taken back to the studs in 2019 and re-clad in cedar, so what is old here is the frame, the beams and the fireplace and nothing else. The ground floor now runs uninterrupted from the front door to the garden.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=75",
        alt: "A white sofa beside a fireplace under exposed beams",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75",
        alt: "A white kitchen with a dark backsplash and a stool at the counter",
      },
      {
        src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=75",
        alt: "A grey sofa and two round wooden tables on a pale rug",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=75",
    alt: "A rendered villa with wide glazing above a swimming pool",
    price: 2150000,
    address: "88 Marlborough St",
    area: "Back Bay",
    beds: 3,
    baths: 2,
    sqft: 1890,
    status: "New",
    dot: "bg-emerald-500",
    days: 2,
    for: "sale",
    monthly: 10870,
    type: "Condominium",
    built: 1889,
    parking: "One deeded space",
    outdoor: "Shared roof deck",
    blurb:
      "A full floor with the coffered ceiling and the built-in cabinets left where they were, and a rear wall rebuilt in glass during the 2016 conversion. Three bedrooms on one level, which on this street is rarer than the floor area.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=75",
        alt: "Pale sofas facing built-in cabinets under a coffered ceiling",
      },
      {
        src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=75",
        alt: "An open staircase and landing in a bright house",
      },
      {
        src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=75",
        alt: "A grey sitting room with two sofas facing a black media wall",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=75",
    alt: "A white rendered house with cut-out windows behind a tree",
    price: 985000,
    address: "26 Linden St",
    area: "Cambridge",
    beds: 3,
    baths: 2,
    sqft: 1540,
    status: "Under contract",
    dot: "bg-amber-500",
    days: 9,
    for: "sale",
    monthly: 4980,
    type: "Townhouse",
    built: 1904,
    parking: "Off-street, one space",
    outdoor: "Brick courtyard",
    blurb:
      "Two floors of a townhouse ten minutes from Central Square, and the slatted wall in the living room is the one thing the last owners added. Under contract this week, and we are still taking backup offers.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=75",
        alt: "A tan leather sectional under an arched mirror",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=75",
        alt: "A living room with a slatted wood wall",
      },
      {
        src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=75",
        alt: "A white kitchen island with four stools under black pendants",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=75",
    alt: "A single-storey house with full-height glass onto a pool terrace",
    price: 3400000,
    address: "5 Beacon Hill Pl",
    area: "Beacon Hill",
    beds: 5,
    baths: 4,
    sqft: 3120,
    status: "New",
    dot: "bg-emerald-500",
    days: 1,
    for: "sale",
    monthly: 17190,
    type: "Single-family",
    built: 2019,
    parking: "Two-car garage",
    outdoor: "Walled terrace and pool",
    blurb:
      "Five bedrooms and four baths across a single wide floor, which is a plan Beacon Hill almost never offers. Garaged parking for two comes with the deed, and on this side of the Hill that is worth naming twice.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=75",
        alt: "A living room with a tan sofa and patterned cushions",
      },
      {
        src: "https://images.unsplash.com/photo-1491249149628-28cb9a16356a?w=800&q=75",
        alt: "A narrow lane of brick row houses with black shutters",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=75",
        alt: "A pale sitting room with an open timber staircase behind it",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=75",
    alt: "A two-storey glass-fronted house lit from within at dusk",
    price: 845000,
    address: "210 Highland Ave",
    area: "Somerville",
    beds: 2,
    baths: 2,
    sqft: 1180,
    status: "Open Sun 1–3",
    dot: "bg-violet-500",
    days: 4,
    for: "sale",
    monthly: 4270,
    type: "Condominium",
    built: 2021,
    parking: "One space, off-street",
    outdoor: "Roof deck",
    blurb:
      "Two bedrooms and two baths in a building finished in 2021, glass across the front and quiet behind it. Davis and the Red Line are a nine-minute walk, which is what sets the price here rather than the floor area.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1760387113548-47ef9c5bf57d?w=800&q=75",
        alt: "A tree-lined residential street with parked cars",
      },
      {
        src: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=75",
        alt: "A sunlit one-bedroom with a desk under a tall window onto the street",
      },
      {
        src: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=800&q=75",
        alt: "A corner living room with afternoon sun across a low sofa",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=75",
    alt: "A white flat-roofed house above a curved swimming pool",
    price: 1120000,
    address: "71 Perkins St",
    area: "Jamaica Plain",
    beds: 4,
    baths: 2,
    sqft: 2050,
    status: "New",
    dot: "bg-emerald-500",
    days: 3,
    for: "sale",
    monthly: 5660,
    type: "Single-family",
    built: 2018,
    parking: "Driveway, two cars",
    outdoor: "Pool and lawn",
    blurb:
      "Four bedrooms on a lot backing onto the Arboretum side of Perkins, with the pool already in and the terrace already built. New in 2018 and lived in since, so nothing in it is a show flat.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=75",
        alt: "A low concrete house alongside a long swimming pool",
      },
      {
        src: "https://images.unsplash.com/photo-1608845920884-3c88800feebc?w=800&q=75",
        alt: "A row of brick townhouses on a cobbled street of fallen leaves",
      },
      {
        src: "https://images.unsplash.com/photo-1630699294897-723e02620662?w=800&q=75",
        alt: "A white-walled living room hung with framed prints beside a dining table",
      },
    ],
  },
];

export const gridHomes: Home[] = [
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75",
    alt: "A grey-shingled house with a white wraparound porch on a mown lawn",
    address: "62 Waverley Ave",
    area: "Brookline",
    price: 1495000,
    monthly: 7560,
    beds: 4,
    baths: 3,
    sqft: 2680,
    status: "New",
    dot: "bg-emerald-500",
    days: 2,
    for: "sale",
    type: "Single-family",
    built: 1912,
    parking: "Two-car garage",
    outdoor: "Wraparound porch, 0.24 acres",
    blurb:
      "A shingled house with the porch that goes with it, and a timber ceiling inside that the 2020 work opened up rather than covered over. Four bedrooms, three baths, and a quarter of an acre around them.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=75",
        alt: "A grey sofa and leather stools under a timber ceiling",
      },
      {
        src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=75",
        alt: "A white sofa beside a fireplace under exposed beams",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75",
        alt: "A white kitchen with a dark backsplash and a stool at the counter",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=75",
    alt: "A glazed wall onto a pool terrace with an open stair beyond it",
    address: "300 Pier Four Blvd",
    area: "Back Bay",
    price: 2380000,
    monthly: 12040,
    beds: 2,
    baths: 2,
    sqft: 1620,
    status: "New",
    dot: "bg-emerald-500",
    days: 1,
    for: "sale",
    type: "Condominium",
    built: 2017,
    parking: "Valet garage, one space",
    outdoor: "Shared terrace",
    blurb:
      "Two bedrooms behind a glazed wall, with a concierge downstairs and the garage under the building. The bath set along the dark tile is the developer's own fit-out rather than a later job.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=75",
        alt: "A freestanding bath along a dark tiled bathroom wall",
      },
      {
        src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=75",
        alt: "Pale sofas facing built-in cabinets under a coffered ceiling",
      },
      {
        src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=75",
        alt: "An open staircase and landing in a bright house",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=75",
    alt: "A white villa with timber soffits above a long swimming pool",
    address: "9 Fresh Pond Ln",
    area: "Cambridge",
    price: 3125000,
    monthly: 15800,
    beds: 5,
    baths: 4,
    sqft: 3340,
    status: "New",
    dot: "bg-emerald-500",
    days: 4,
    for: "sale",
    type: "Single-family",
    built: 2015,
    parking: "Two-car garage",
    outdoor: "Pool, 0.31 acres",
    blurb:
      "Five bedrooms and four baths on a third of an acre off Fresh Pond Parkway, pool included. Built in 2015, which in this part of Cambridge makes it the newest house on its street by fifty years.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=75",
        alt: "A white two-storey house behind a pool under a broken sky",
      },
      {
        src: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=75",
        alt: "A tan leather sectional under an arched mirror",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=75",
        alt: "A living room with a slatted wood wall",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=75",
    alt: "A grey sitting room with two sofas facing a black media wall",
    address: "118 Myrtle St",
    area: "Beacon Hill",
    price: 1875000,
    monthly: 9480,
    beds: 3,
    baths: 2,
    sqft: 1740,
    status: "Open house",
    dot: "bg-violet-500",
    days: 7,
    for: "sale",
    type: "Townhouse",
    built: 1873,
    parking: "Resident permit",
    outdoor: "Roof deck",
    blurb:
      "A three-bedroom house on the flat of Myrtle, with a roof deck that clears the ridge line and a media wall the last owners built in. The open house runs Sunday and the sign goes up Saturday morning.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=75",
        alt: "A white house with a glazed veranda at the end of a flower garden",
      },
      {
        src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=75",
        alt: "A living room with a tan sofa and patterned cushions",
      },
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=75",
        alt: "A grey sofa and leather stools under a timber ceiling",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75",
    alt: "A shingled house with a steep roof, lit from within at dusk",
    address: "41 Willow Pond Rd",
    area: "Jamaica Plain",
    price: 925000,
    monthly: 4680,
    beds: 3,
    baths: 1,
    sqft: 1380,
    status: "Open house",
    dot: "bg-violet-500",
    days: 5,
    for: "sale",
    type: "Single-family",
    built: 1938,
    parking: "Driveway, two cars",
    outdoor: "Garden, 0.17 acres",
    blurb:
      "Three bedrooms and one bath, which is the arithmetic keeping this the least expensive house on Willow Pond. Everything mechanical went in during 2022; a second bath is a drawing and a permit away.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=75",
        alt: "A grey clapboard house with dormer windows behind a lawn",
      },
      {
        src: "https://images.unsplash.com/photo-1600493505873-cddd69453072?w=800&q=75",
        alt: "A sage two-seat sofa and a round wooden table on a cream rug",
      },
      {
        src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=75",
        alt: "A freestanding bath along a dark tiled bathroom wall",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=75",
    alt: "A timber-clad house standing behind a dark boundary fence",
    address: "77 Elm St",
    area: "Somerville",
    price: 1140000,
    monthly: 5770,
    beds: 4,
    baths: 2,
    sqft: 2010,
    status: "Open house",
    dot: "bg-violet-500",
    days: 9,
    for: "sale",
    type: "Single-family",
    built: 2020,
    parking: "Two off-street spaces",
    outdoor: "Deck and yard",
    blurb:
      "Four bedrooms in a house finished in 2020, timber-clad and set behind its own fence. Union Square is ten minutes on foot, and the yard is the flattest on the block.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=75",
        alt: "A black and timber house wrapped around a gum tree on a lawn",
      },
      {
        src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=75",
        alt: "A grey sitting room with two sofas facing a black media wall",
      },
      {
        src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=75",
        alt: "A white kitchen island with four stools under black pendants",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=75",
    alt: "A white kitchen island with four stools under black pendants",
    address: "254 Harvard St",
    area: "Brookline",
    price: 1060000,
    monthly: 5360,
    beds: 3,
    baths: 2,
    sqft: 1590,
    status: "Under contract",
    dot: "bg-amber-500",
    days: 14,
    for: "sale",
    type: "Condominium",
    built: 1931,
    parking: "One space, off-street",
    outdoor: "Shared garden",
    blurb:
      "Three bedrooms in a small 1931 building on Harvard Street, with a kitchen put in two years ago and the island it needed. Under contract, and the buyers are financed.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=75",
        alt: "A brick house with a double garage at the end of a driveway",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=75",
        alt: "A pale sitting room with an open timber staircase behind it",
      },
      {
        src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=75",
        alt: "A grey sofa and two round wooden tables on a pale rug",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=75",
    alt: "A two-storey house in white render and timber cladding",
    address: "16 Garden Ct",
    area: "Beacon Hill",
    price: 2640000,
    monthly: 13350,
    beds: 4,
    baths: 3,
    sqft: 2470,
    status: "Under contract",
    dot: "bg-amber-500",
    days: 11,
    for: "sale",
    type: "Single-family",
    built: 1856,
    parking: "Garage, one car",
    outdoor: "Walled garden",
    blurb:
      "Four bedrooms on a court off Charles Street, with a walled garden that takes the afternoon and a garage that goes with the deed. Under contract, and we hold a short backup list.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=75",
        alt: "A white house with a balcony above a swimming pool",
      },
      {
        src: "https://images.unsplash.com/photo-1610527003928-47afd5f470c6?w=800&q=75",
        alt: "A white shaker kitchen with a stainless range on dark boards",
      },
      {
        src: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=75",
        alt: "A sunlit one-bedroom with a desk under a tall window onto the street",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=75",
    alt: "A pale sitting room with an open timber staircase behind it",
    address: "503 Cambridge St",
    area: "Cambridge",
    price: 845000,
    monthly: 4270,
    beds: 2,
    baths: 1,
    sqft: 1120,
    status: "Under contract",
    dot: "bg-amber-500",
    days: 18,
    for: "sale",
    type: "Condominium",
    built: 1898,
    parking: "Resident permit",
    outdoor: "Private street door",
    blurb:
      "Two bedrooms and a bath on one floor with its own door onto the street, which is the part of this people come back for. Under contract at asking, eighteen days after it went up.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=75",
        alt: "A row of gabled townhouses stepping down a hill",
      },
      {
        src: "https://images.unsplash.com/photo-1630699376167-3870469e7598?w=800&q=75",
        alt: "A grey kitchen with a run of new cabinets and pale boards",
      },
      {
        src: "https://images.unsplash.com/photo-1600493505873-cddd69453072?w=800&q=75",
        alt: "A sage two-seat sofa and a round wooden table on a cream rug",
      },
    ],
  },
];

// The lettings book. A brokerage this size lists a handful at a time, and the
// figures are set where Greater Boston actually sits in 2026 rather than at
// the round numbers a placeholder reaches for.
export const rentals: Home[] = [
  {
    src: "https://images.unsplash.com/photo-1582080811572-83424d756bef?w=800&q=75",
    alt: "A bow-fronted brownstone terrace under street trees",
    address: "112 Beacon St, Apt 3",
    area: "Back Bay",
    price: 4200,
    beds: 2,
    baths: 1,
    sqft: 980,
    status: "Available now",
    dot: "bg-emerald-500",
    days: 5,
    for: "rent",
    lease: "12-month lease · heat and hot water included",
    type: "Apartment",
    built: 1890,
    parking: "Resident permit",
    outdoor: "Bay windows onto Beacon",
    blurb:
      "Two bedrooms on the third floor of a bow-fronted house, with the bay windows onto Beacon doing most of the work. Heat and hot water are in the rent and the laundry is one floor down.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=75",
        alt: "A grey sofa and two round wooden tables on a pale rug",
      },
      {
        src: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=800&q=75",
        alt: "A corner living room with afternoon sun across a low sofa",
      },
      {
        src: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800&q=75",
        alt: "A galley kitchen opening onto a small dining table",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1622397333309-3056849bc70b?w=800&q=75",
    alt: "A red brick hall with gabled dormers across a lawn",
    address: "9 Ellery St, Unit 2",
    area: "Cambridge",
    price: 3600,
    beds: 2,
    baths: 1,
    sqft: 890,
    status: "Available Oct 1",
    dot: "bg-violet-500",
    days: 11,
    for: "rent",
    lease: "12-month lease · one off-street space",
    type: "Apartment",
    built: 1908,
    parking: "One off-street space",
    outdoor: "Shared lawn",
    blurb:
      "Two bedrooms in a brick hall building between Harvard and Central, free from the first of October. The off-street space is deeded to the unit, which in this square mile is most of the reason to take it.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1610527003928-47afd5f470c6?w=800&q=75",
        alt: "A white shaker kitchen with a stainless range on dark boards",
      },
      {
        src: "https://images.unsplash.com/photo-1630699294897-723e02620662?w=800&q=75",
        alt: "A white-walled living room hung with framed prints beside a dining table",
      },
      {
        src: "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?w=800&q=75",
        alt: "A pale sectional and a glass table in front of a balcony door",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1613575831056-0acd5da8f085?w=800&q=75",
    alt: "A sunlit one-bedroom with a desk under a tall window onto the street",
    address: "88 Elm St, Unit 4",
    area: "Somerville",
    price: 2850,
    beds: 1,
    baths: 1,
    sqft: 640,
    status: "Available now",
    dot: "bg-emerald-500",
    days: 2,
    for: "rent",
    lease: "12-month lease · laundry in building",
    type: "Apartment",
    built: 1974,
    parking: "Resident permit",
    outdoor: "Common yard",
    blurb:
      "A top-floor one-bedroom with the desk already under the window, and a kitchen replaced last spring. Laundry is in the building and Davis is a seven-minute walk.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1630699376167-3870469e7598?w=800&q=75",
        alt: "A grey kitchen with a run of new cabinets and pale boards",
      },
      {
        src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=75",
        alt: "A white sofa beside a fireplace under exposed beams",
      },
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=75",
        alt: "A white kitchen with a dark backsplash and a stool at the counter",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1663430218958-4b85113290a9?w=800&q=75",
    alt: "A stone apartment house with a columned porch behind summer trees",
    address: "340 Harvard St, Apt 5B",
    area: "Brookline",
    price: 3150,
    beds: 1,
    baths: 1,
    sqft: 720,
    status: "Application pending",
    dot: "bg-amber-500",
    days: 16,
    for: "rent",
    lease: "12-month lease · cats considered",
    type: "Apartment",
    built: 1926,
    parking: "Resident permit",
    outdoor: "Columned front porch",
    blurb:
      "A fifth-floor one-bedroom in a stone building set back behind its trees, quiet for a street this busy. An application is in; we will hold a viewing slot in case it does not close.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1600493505873-cddd69453072?w=800&q=75",
        alt: "A sage two-seat sofa and a round wooden table on a cream rug",
      },
      {
        src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=75",
        alt: "Pale sofas facing built-in cabinets under a coffered ceiling",
      },
      {
        src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=75",
        alt: "An open staircase and landing in a bright house",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1665249934445-1de680641f50?w=800&q=75",
    alt: "A corner living room with afternoon sun across a low sofa",
    address: "22 Sedgwick St, Unit 1",
    area: "Jamaica Plain",
    price: 2600,
    beds: 1,
    baths: 1,
    sqft: 610,
    status: "Available now",
    dot: "bg-emerald-500",
    days: 4,
    for: "rent",
    lease: "12-month lease · porch and shared yard",
    type: "Apartment",
    built: 1921,
    parking: "Resident permit",
    outdoor: "Porch and shared yard",
    blurb:
      "The ground floor of a three-decker off Centre Street, with the porch and the yard that go with that floor. Available now, and the sun is on the corner of the living room from two o'clock.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800&q=75",
        alt: "A galley kitchen opening onto a small dining table",
      },
      {
        src: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=75",
        alt: "A tan leather sectional under an arched mirror",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=75",
        alt: "A living room with a slatted wood wall",
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1630699294897-723e02620662?w=800&q=75",
    alt: "A white-walled living room hung with framed prints beside a dining table",
    address: "14 Revere St, Garden",
    area: "Beacon Hill",
    price: 4900,
    beds: 3,
    baths: 2,
    sqft: 1240,
    status: "Available Oct 1",
    dot: "bg-violet-500",
    days: 9,
    for: "rent",
    lease: "18-month lease · private entrance",
    type: "Garden flat",
    built: 1866,
    parking: "Resident permit",
    outdoor: "Private entrance and patio",
    blurb:
      "Three bedrooms and two baths on the garden level of a Revere Street house, with its own door and its own patio. Eighteen months rather than twelve, which is the landlord's condition and not ours.",
    more: [
      {
        src: "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?w=800&q=75",
        alt: "A pale sectional and a glass table in front of a balcony door",
      },
      {
        src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=75",
        alt: "A living room with a tan sofa and patterned cushions",
      },
      {
        src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=75",
        alt: "A grey sofa and leather stools under a timber ceiling",
      },
    ],
  },
];

/** Everything on the books, in the order the browse page reads it. */
export const homes: Home[] = [...railHomes, ...gridHomes, ...rentals];

// The URL of a home, derived from the two fields that name it. Every card on
// the site links through this and the detail route resolves through it, so a
// street getting a new spelling moves its page with it and nothing 404s in
// between. It takes the pair rather than a Home because the card holds a
// Listing by then, and the two shapes agree on exactly these two fields.
export const slugOf = ({ address, area }: { address: string; area: string }) =>
  slugify(`${address} ${area}`);

export const homeBySlug = (slug: string) =>
  homes.find((home) => slugOf(home) === slug);

// MLS PIN numbers are eight digits opening 73, and this derives one per record
// from its position on the book rather than storing twenty-one of them. They
// are invented, like every other number here — what matters is that the detail
// page and any future print sheet quote the same one for the same home.
export const mlsOf = (home: Home) => `73${241000 + homes.indexOf(home) * 137}`;

// The photo set at the width a page wants it. The book stores its files at 800
// because that is what a card needs; a frame the width of the container is
// 1136, so the same files are asked for at double it and the thumbnails take
// their own crop off the result. Beside the records rather than inside the
// layout that reads it, the same way areas.ts keeps `photo()`: the width a
// source is pinned at is a fact about the book, not about a section.
export const bigPhotos = (home: Home) =>
  [{ src: home.src, alt: home.alt }, ...home.more].map((photo) => ({
    ...photo,
    src: photo.src.replace("w=800", "w=1600"),
  }));

// The two rates and the formatter live in `costs.ts` now, and this line is why
// the move is invisible to every caller: a server component may keep reading
// them from the book. A client one may not — importing a value from this file
// pulls all twenty-one records across the boundary with it — so it takes them
// from `costs.ts` direct, which imports nothing.
export { INSURANCE_RATE, money, TAX_RATE };

// Exported for the card, which draws the same three figures as chips and has
// to agree with this line on "1 bath" against "2 baths".
export const plural = (n: number, word: string) =>
  `${n} ${word}${n === 1 ? "" : "s"}`;

// Numbers stay numbers all the way to the comparator, and the strings are made
// at the last moment. The browse page sorts on `price` and `sqft`; the card
// wants "$1,495,000" and a specs line. Formatting in place would have forced a
// second numeric copy of every figure to sort against, so the two shapes are
// kept one function apart instead.
//
// `terms` is the half of the price line that differs between a sale and a let,
// and it is the reason the card takes a string rather than a second number: a
// mortgage estimate under a rent is a sentence about a loan nobody is taking.
export const toListing = (home: Home): Listing => ({
  ...home,
  price: money(home.price),
  specs: `${plural(home.beds, "bed")} · ${plural(home.baths, "bath")} · ${home.sqft.toLocaleString()} sqft`,
  terms:
    home.for === "rent"
      ? `per month · ${home.lease}`
      : `or ${money(home.monthly ?? 0)}/mo est. with 20% down over 30 years`,
});

export const eyebrow = "On the market now";

// Written for a card that leads with the address and closes on a grey footnote,
// which is the card that won section 2 and the one listing-card.tsx now draws
// for the browse grid as well. The heading the losing layout carried went with
// it.
export const cardsHeading = "Six homes, inside and out";
