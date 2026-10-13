import { agents } from "@/components/estate/agents";
import { slugify } from "@/lib/utils";

// Six guides, and two per subject. The count came from a tabbed layout that is
// no longer here, and it is kept because it is the right shape anyway: three
// subjects with one guide in one of them reads as a category invented to fill a
// row. The excerpt is what the shipped layout hangs under each title.
//
// The author is an agent record rather than a name, because the section's own
// lede promises "written by the people doing the work, not by a content team"
// — and a byline invented here would be a content team. One agent per subject,
// so a reader who reads both Costs guides reads the same person twice. Holding
// the object rather than a name means a byline cannot drift from the card in
// section 7 that shows the same person's license.
//
// The lead guide's photograph changed when this page enlarged it. A card 356px
// wide showed a house and a key; the article hero draws the same file at 1136
// and it is a plastic model on a desk, which is the one stock cliche a template
// selling on its photography cannot open its newest guide with. It is now a
// frame off the lettings book, which no page carrying this guide also draws.
//
// `read`, `figures` and `body` arrived with /guides/[slug]. They go on this
// record rather than into a second file keyed by slug, for the reason the brief
// gives: a card and the page it opens must not be able to disagree about a
// title, a date or a photograph. The index reads the first four fields and the
// article reads all of them.
type Block =
  /** A subheading. Its id is derived through `slugify`, which is what the
      article's contents rail links to — a stored anchor would be the second
      place one string lives. */
  | { h: string }
  | { p: string }
  | { list: readonly string[] }
  /** Two columns, because every table in these guides is a line and what it
      costs. A third column would be a table the reading measure cannot hold at
      390px. */
  | {
      table: {
        head: readonly [string, string];
        rows: readonly (readonly [string, string])[];
        total?: readonly [string, string];
      };
    }
  /** The one artefact the style would put on a page of prose: a tinted block
      with the practical instruction in it, and at most one link out. */
  | { note: string; link?: { href: string; label: string } };

type Post = {
  src: string;
  alt: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  /** Minutes, and the figure a reader decides on. Written per guide rather than
      counted off the body: a word count divided by 200 is a number that changes
      every time somebody fixes a sentence. */
  read: number;
  author: (typeof agents)[number];
  /** The three the article opens on. Every one of them is a number the body
      goes on to show its working for. */
  figures: readonly [
    { value: string; caption: string },
    { value: string; caption: string },
    { value: string; caption: string },
  ];
  body: readonly Block[];
};

export const posts: readonly Post[] = [
  {
    src: "https://images.unsplash.com/photo-1695222322544-8d389d2dc43d",
    alt: "Two red front doors, numbered 12 and 10, on a blue clapboard two-family",
    category: "Costs",
    date: "12 August 2026",
    title: "What closing actually costs in Massachusetts, line by line",
    excerpt:
      "Every line on a Boston closing statement at $985,000: stamp tax, title insurance, the attorney, the recording fees.",
    read: 7,
    author: agents[0],
    figures: [
      {
        value: "$8,139",
        caption: "Beyond the deposit\nWhat the buyer wrote checks for",
      },
      {
        value: "$4,492",
        caption: "Deed excise stamps\nThe seller pays this one",
      },
      { value: "23", caption: "Days to the keys\nFrom the accepted offer" },
    ],
    body: [
      {
        p: "Buyers ask us the same thing in their second week: how much do I need on the day, on top of the deposit. The honest answer runs to about ten lines, and half of them are fixed no matter who lends you the money.",
      },
      {
        p: "One real statement then, with the numbers left in: a two-bedroom condo in Somerville at $985,000, twenty percent down, a conventional thirty-year loan at 6.4%, closing on a Thursday in April.",
      },
      { h: "What the buyer brings" },
      {
        p: "The deposit is $197,000 and it is already spoken for. Everything below sits on top of it, and your lender owes you a written estimate of the lot within three days of your application.",
      },
      {
        table: {
          head: ["Line", "On this sale"],
          rows: [
            ["Origination and underwriting", "$1,395"],
            ["Appraisal", "$675"],
            ["Your attorney", "$1,250"],
            ["Lender's title insurance", "$1,180"],
            ["Recording the deed and the mortgage", "$360"],
            ["Prepaid interest, 11 days", "$684"],
            ["First year of homeowner's insurance", "$1,140"],
            ["Property tax escrow, 4 months", "$1,455"],
          ],
          total: ["Beyond the deposit", "$8,139"],
        },
      },
      {
        p: "Owner's title insurance is the line that is missing, at $2,315 on this sale. It is optional in Massachusetts, it pays out to you rather than to the bank, and about two thirds of our buyers take it. On a house with three owners in the past decade we tell people to take it.",
      },
      { h: "What the seller pays" },
      {
        p: "One of the seller's lines is unique to this state and it surprises people who have sold elsewhere. Massachusetts charges deed excise stamps at $4.56 per $1,000 of the price, which on $985,000 is $4,492, due at the registry before the deed can be recorded.",
      },
      {
        list: [
          "Deed excise stamps, $4.56 per $1,000: $4,492",
          "Seller's attorney: $1,150",
          "Municipal lien certificate and the discharge recording: $180",
          "The broker fee agreed in the listing agreement, which for us is one of three rates and printed on the site",
        ],
      },
      { h: "The two lines people miss" },
      {
        p: "The tax escrow is the first. Your lender collects several months of property tax up front so the account is never short, and in a town that bills quarterly the number depends on which month you close in. Closing in the week before a bill lands can cost you an extra quarter.",
      },
      {
        p: "The second is the municipal lien certificate, which the buyer's attorney orders from the city to prove nothing is owed on the property. It takes ten working days in Boston and Cambridge. Order it late and it moves your closing, which is the one delay on this list that nobody can shorten with money.",
      },
      {
        note: "Ask any lender for the written loan estimate before you fall in love with a house. It is three pages, it is free, and it is the only document that makes two lenders comparable.",
        link: { href: "/#fees", label: "What we charge to sell a home" },
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    alt: "A white kitchen with a dark backsplash and a stool at the counter",
    category: "Selling",
    date: "4 August 2026",
    title: "Five upgrades that pay back at sale, and four that never do",
    excerpt:
      "Our agents priced the same nine improvements across forty listings last year, and two of them returned more than they cost.",
    read: 6,
    author: agents[1],
    figures: [
      { value: "40", caption: "Listings priced\nSix areas, houses and condos" },
      {
        value: "2",
        caption: "Jobs that paid back\nOut of the nine we tracked",
      },
      {
        value: "$1.15",
        caption: "Back per dollar on paint\nThe best of the nine",
      },
    ],
    body: [
      {
        p: "Every seller wants to know what to fix. Last year we took nine common jobs and tracked what each one did to the asking price and to the days on market across forty of our own listings, six areas, condos and houses together.",
      },
      {
        p: "Two of the nine came back with more than they cost. The rest range from a fair trade down to money you will never see again, and the bottom of the list is where people spend the most.",
      },
      { h: "What came back" },
      {
        table: {
          head: ["The job", "Back per dollar"],
          rows: [
            ["Paint, whole apartment, one warm neutral", "$1.15"],
            ["Refinishing the floors you already have", "$1.04"],
            ["New kitchen counters, keeping the cabinets", "$0.92"],
            ["Regrouting and reglazing the main bath", "$0.88"],
            ["Landscaping the front and the path", "$0.81"],
          ],
        },
      },
      {
        p: "Paint wins for the same reason every year. It costs $3,400 in a three-bedroom, it takes four days, and it removes the one thing a buyer can price instantly and hold against you. Floors come second and only if the boards under the carpet are sound, which your agent can tell in about a minute with a corner lifted.",
      },
      { h: "What did not" },
      {
        table: {
          head: ["The job", "Back per dollar"],
          rows: [
            ["A full kitchen, cabinets and all", "$0.64"],
            ["An added bathroom in an existing footprint", "$0.58"],
            ["Central air in a house without ducts", "$0.51"],
            ["A finished basement", "$0.44"],
          ],
        },
      },
      {
        p: "None of these are bad work, and the trouble is when you do them. A $60,000 kitchen buys you about $38,000 at sale, and the buyer who wanted a new kitchen would have chosen their own handles anyway. Do it in the year you move in, live in it for a decade, and the arithmetic comes out the other way.",
      },
      { h: "The one that pays and is not on the list" },
      {
        p: "Cleaning. A deep clean plus the windows runs about $700 on a three-bedroom and it is the only spend where we have never seen a seller lose money. It does not show up as a line in the analysis because we cannot price it against a version of the same house that was left dirty.",
      },
      {
        note: "Before you spend anything, ask your agent to walk the place with a notebook and rank the jobs by what a buyer will notice in the first ninety seconds. On most of our listings that list is shorter than the seller expects.",
        link: { href: "/agents", label: "The agents who take our listings" },
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    alt: "An open staircase and landing in a bright house",
    category: "Buying",
    date: "28 July 2026",
    title: "Reading a listing photo: what a wide lens is hiding",
    excerpt:
      "A 16mm lens adds about a third to a room. Here is how to spot one, and the four other things a set of photographs quietly leaves out.",
    read: 5,
    author: agents[2],
    figures: [
      { value: "16mm", caption: "The listing lens\nOurs included" },
      { value: "31%", caption: "Wider than the room is\nAt that focal length" },
      { value: "5", caption: "Things left out\nOf a full photo set" },
    ],
    body: [
      {
        p: "We shoot our own listings and we use a wide lens, because at 35mm you cannot photograph a Boston bedroom from inside it. Every brokerage in this market does the same. The lens is not the problem. Not knowing you are looking through one is.",
      },
      { h: "How to spot the stretch" },
      {
        p: "Look at the vertical lines nearest the edge of the frame. A door frame that leans away from the center, a radiator that reads two feet long, a sofa whose far arm looks smaller than the near one: that is 16mm doing its work. The middle of the picture stays honest, and the edges are where the room grows.",
      },
      {
        p: "Then find the ceiling. If it appears in every shot of a room, the photographer was standing in a doorway shooting across, which is how a nine-foot square bedroom photographs like a study.",
      },
      { h: "What the set leaves out" },
      {
        list: [
          "The street. If there is no photo looking out of the front windows, look up the address on a map before you drive over.",
          "The back of the building, where the fire escape, the bins and the parking actually are.",
          "Any room the floor plan lists and the photographs skip. A three-bed with seven photos is a three-bed with a room somebody chose not to show.",
          "The ceiling height in the basement, which is the difference between storage and a room.",
          "Where the sun is. A listing photographed at noon in July tells you nothing about February at four o'clock.",
        ],
      },
      { h: "The measurement that settles it" },
      {
        p: "Every listing on this site prints square footage, and the floor plan prints room dimensions. Take the number, not the picture. A bedroom under 100 square feet holds a double bed and one small chest, whatever the photograph is doing at the edges of the frame.",
      },
      {
        p: "At the viewing, carry a tape measure and the dimensions of the two pieces of furniture you refuse to part with. Half our buyers do this on the second visit. The ones who do it on the first visit see more houses.",
      },
      {
        note: "Ask for the photographer's date, not the listing date. A set shot in a different season than the one you are standing in has been sitting somewhere, and that is worth asking about.",
        link: { href: "/listings", label: "Every home we are holding now" },
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    alt: "A cabin with a blue roof beside a pine-lined road",
    category: "Buying",
    date: "19 July 2026",
    title: "Buying outside 128: what the commute really costs you",
    excerpt:
      "Forty minutes each way is two hundred hours a year. We put that against what the same house costs one town closer in.",
    read: 6,
    author: agents[2],
    figures: [
      {
        value: "203 hrs",
        caption: "A year in the car\nForty minutes each way",
      },
      { value: "$205K", caption: "The price gap\nSame house, one town in" },
      {
        value: "$1,010",
        caption: "Per hour saved\nSpread over six years of it",
      },
    ],
    body: [
      {
        p: "The trade looks obvious on a Saturday. Drive twenty minutes further out and the same house is two hundred thousand cheaper, with a garage thrown in. Then you do it every weekday for six years.",
      },
      { h: "The arithmetic nobody runs" },
      {
        p: "Forty minutes each way, five days a week, forty-six working weeks: 203 hours a year. That is five working weeks in the car, and it does not count the days the Pike is shut at Allston.",
      },
      {
        p: "Against that, price. A four-bedroom colonial in a town outside 128 sits about $205,000 under the same house in Brookline or Jamaica Plain. Spread across six years of ownership, that gap buys the extra hour a day at roughly $1,010 per hour saved if you moved in instead.",
      },
      { h: "The costs that come with the miles" },
      {
        table: {
          head: ["What it adds", "A year"],
          rows: [
            ["Fuel, 9,200 miles at 26 mpg", "$1,240"],
            ["The second car most households need", "$4,600"],
            ["Maintenance and tires on those miles", "$820"],
            ["Parking, if it is not included at work", "$3,300"],
          ],
          total: ["Before the hours", "$9,960"],
        },
      },
      {
        p: "Ten thousand a year against a $205,000 saving is twenty years to break even, and most of our buyers move again within nine. That is the case for staying in. It is not the whole case.",
      },
      { h: "When the drive wins" },
      {
        p: "Two days a week in the office changes every number above, and so does a job that is not downtown. Land does too. If what you want is a workshop, an acre and a garage that fits two cars and a boat, no amount of arithmetic inside Route 128 produces one.",
      },
      {
        p: "What we tell people to do is drive it. Pick a Tuesday, leave the house you are considering at the hour you would actually leave, and park where you would actually park. Then decide.",
      },
      {
        note: "Our six areas are all inside 128, so this piece argues against half our own book. Look at the commute figure on each neighborhood page before you look at the medians.",
        link: {
          href: "/neighborhoods",
          label: "The six areas and what they cost",
        },
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    alt: "A living room with a tan sofa and patterned cushions",
    category: "Selling",
    date: "9 July 2026",
    title: "Staging a three-bed on a $2,000 budget",
    excerpt:
      "What we rent, what we buy and what we leave alone, with the invoice from a Somerville listing that sold in nine days.",
    read: 5,
    author: agents[1],
    figures: [
      {
        value: "$1,960",
        caption: "The whole invoice\nA three-bed in Somerville",
      },
      { value: "3", caption: "Rooms we staged\nOf the seven in the house" },
      { value: "9", caption: "Days to an offer\nFrom the first viewing" },
    ],
    body: [
      {
        p: "A staging company quoted our seller $6,400 to dress the whole house for two months. We did three rooms for $1,960 and the place went under agreement in nine days. Here is the invoice.",
      },
      { h: "What we rented" },
      {
        table: {
          head: ["Item", "Two months"],
          rows: [
            ["Sofa, two armchairs, coffee table", "$690"],
            ["Dining table and four chairs", "$310"],
            ["Bed frame, mattress and linen, main bedroom", "$285"],
            ["Two rugs and three lamps", "$240"],
          ],
          total: ["Rental, delivered and collected", "$1,525"],
        },
      },
      {
        p: "Rental is the right call on anything large. You are dressing the house for eight weeks, the pieces go back, and nobody has to move a sofa into a condo they have not bought yet.",
      },
      { h: "What we bought" },
      {
        list: [
          "White cotton bedding and towels, $180, because rented linen photographs tired",
          "Two large plants, $95, both still alive at the seller's new place",
          "Bulbs for every fitting in the house at one color temperature, $70",
          "Door mat, hooks and one mirror for the hall, $90",
        ],
      },
      {
        p: "That is $435, and the seller kept all of it. We buy anything a photograph gets close to and rent everything a photograph sees across a room.",
      },
      { h: "The four rooms we left alone" },
      {
        p: "The two children's bedrooms, the basement and the third bedroom that had become an office stayed as they were, tidied and nothing more. Buyers do not need a staged office to understand a room with a window and a radiator in it.",
      },
      {
        p: "What we did spend time on was the front. The path got swept, the storm door got fixed, and the bins moved to the side of the house. Everybody walking up that path decides something before they reach the door.",
      },
      {
        note: "Book the photographer for the morning after the furniture lands, not the same afternoon. Every staged room needs one evening of somebody living around it before it stops looking like a showroom.",
        link: { href: "/#fees", label: "What our listing service includes" },
      },
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    alt: "A modern living room with a slatted wood wall",
    category: "Costs",
    date: "1 July 2026",
    title: "Condo, co-op or triple-decker: how the monthly fees compare",
    excerpt:
      "Three buildings on the same Cambridge block, three completely different monthly numbers, and what the fees never cover.",
    read: 7,
    author: agents[0],
    figures: [
      {
        value: "$180",
        caption: "The triple-decker\nA month. Three units, no manager",
      },
      {
        value: "$412",
        caption: "The condo\nA month. Eight units, an elevator",
      },
      { value: "$685", caption: "The co-op\nA month. Heat and hot water in" },
    ],
    body: [
      {
        p: "Three buildings stand within two hundred yards of each other off Massachusetts Avenue in Cambridge. Two-bedroom units in all three sold last year within $60,000 of one another. Their monthly fees are not within $500 of one another.",
      },
      { h: "The three buildings" },
      {
        table: {
          head: ["The building", "Monthly"],
          rows: [
            ["Triple-decker, 3 units, self-managed", "$180"],
            ["Condo, 8 units, managed, elevator", "$412"],
            ["Co-op, 24 units, staffed lobby, heat included", "$685"],
          ],
        },
      },
      {
        p: "The co-op looks like the expensive one and it is not, quite. Its fee carries the heat and the hot water for the whole building, which in a Cambridge winter is $150 a month the other two owners pay separately, and it carries the underlying mortgage on the building, which the other two do not have.",
      },
      { h: "What a low fee is telling you" },
      {
        p: "The triple-decker at $180 is three neighbors with a shared bank account and no manager. It works until the roof goes. When it does, three owners split a $34,000 bill in the same month, and if one of them cannot pay, the other two find out what their reserve fund is really worth.",
      },
      {
        p: "Ask for the reserve balance and the last two years of minutes in any building with fewer than ten units. A healthy reserve in this market runs to about ten percent of a year's operating budget per unit. Below that, the low fee is a loan you are taking from your own roof.",
      },
      { h: "What no fee covers" },
      {
        list: [
          "Anything inside your own door, from the boiler to the windows in most condo documents",
          "The deductible on the master insurance policy, which is often $10,000 and is charged to whoever's unit the water came from",
          "Special assessments, voted by the trustees and payable whether or not you agreed",
          "Your own property tax, which the city bills you directly and quarterly",
        ],
      },
      { h: "The question to ask first" },
      {
        p: "Ask what the fee was three years ago, rather than what it is today. A fee that has moved with inflation is a building somebody is running. A fee that has not changed since 2019 is a building where the owners are about to get a letter.",
      },
      {
        note: "Co-ops are rare here and they come with a board interview and a financial review before you can buy. Budget an extra six weeks and ask your agent to get the board package before you make an offer.",
        link: { href: "/listings", label: "What we are holding in Cambridge" },
      },
    ],
  },
];

export const copy = {
  eyebrow: "Guides",
  heading: "What our agents get asked, written down",
  lede: "Written by the people doing the work, not by a content team. No sign-up, no email gate and nothing kept behind a form.",
} as const;

export type Guide = (typeof posts)[number];

/** The URL of a guide, derived from its title the way every other slug on this
    site is derived. The home page's rows, the index and the related row all
    link through this, and the route reads it back through the same function. */
export const slugOf = (post: Guide) => slugify(post.title);

export const postBySlug = (slug: string) =>
  posts.find((post) => slugOf(post) === slug);

/** The three subjects, in the order they first appear on the book. Derived
    rather than typed, so a seventh guide in a fourth subject shows up in the
    filter without anybody editing a second list. */
export const subjects = [...new Set(posts.map((post) => post.category))];

export const postsIn = (subject: string) =>
  posts.filter((post) => post.category === subject);

/** The whole shelf, end to end, which is the figure the title block quotes. */
export const totalRead = posts.reduce((sum, post) => sum + post.read, 0);

/** The agents who write, in roster order and without repeats. Three of the
    nine, and the section that prints them counts each one's guides off the
    array rather than storing a count beside the name. */
export const writers = agents.filter((agent) =>
  posts.some((post) => post.author.name === agent.name),
);
