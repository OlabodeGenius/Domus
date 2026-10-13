// The roster. Four of these nine are the ones the home page draws; all nine are
// what /agents lists, and the split is deliberate rather than incidental — the
// firm fields forty agents across fourteen areas, and the nine here are the
// ones who take listings in the six areas this site actually has pages for.
//
// Their closings sum to 205, which is what /agents quotes against the 1,140 the
// firm closed last year; the first four sum to 112, which is what the home
// page's roster quotes. Both are countable off this array — a figure on this
// site is either countable or it is not on the site.
//
// Order is seniority, not closings, and it is load-bearing at the top: the
// first four are the four the home page slices, and `agentFor` reads this order
// to answer who covers an area, so moving one of them repoints every listing
// page and every neighborhood page at a different person.
//
// The nine portraits are one shoot rather than nine, and that is the whole
// point of them: same grey seamless, same light, same waist-up crop, so a row
// of these reads as a firm that booked a photographer instead of a page that
// borrowed nine strangers. They come from one Lummi collection ("Business
// Portraits", benginurhajjaj), whose license covers use inside a template that
// is sold; a buyer swapping in their own roster only has to keep the framing.
export const agents = [
  {
    src: "https://assets.lummi.ai/assets/QmTtM7g8k5mMmEyTx4SN7Y78VE1mbEMYpiQAo5H2DAZRU4",
    alt: "A silver-haired man in a navy jacket over an open white shirt, photographed against a grey studio wall",
    name: "Tom Brennan",
    title: "Founding partner",
    license: "MA #04410077",
    since: 1998,
    closed: 38,
    areas: "Beacon Hill · Back Bay",
    languages: "English",
    email: "tom@domusrealty.com",
    line: "I opened the Brookline office in 1998 and I still take listings myself.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmfRhVskKf1xJUrJzDE9AcXxrQ9KwXFJ4JBiwrUGdrh798",
    alt: "A woman with long dark hair in a navy blazer over a blush blouse, photographed against a grey studio wall",
    name: "Marisol Vega",
    title: "Senior agent",
    license: "MA #04471192",
    since: 2007,
    closed: 31,
    areas: "Back Bay · Jamaica Plain",
    languages: "English · Spanish",
    email: "marisol@domusrealty.com",
    line: "Most of my sellers are second-time movers who already know the street.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmVe2N4Eu823xVBim6sKtvHsaGujfxBzF6G2GHSVoxKFxn",
    alt: "A man with a short beard in a grey blazer over a white t-shirt, photographed against a grey studio wall",
    name: "Daniel Okafor",
    title: "Agent",
    license: "MA #04512038",
    since: 2014,
    closed: 24,
    areas: "Cambridge · Somerville",
    languages: "English · Igbo",
    email: "daniel@domusrealty.com",
    line: "Cambridge turns over every spring, so I work to the academic calendar.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmYoHhaRotyAEFKsZKrn2s7D1gdEga5heizHeK2Lxcr9fo",
    alt: "A woman with her hair tied back, in a maroon blazer over a cream blouse, photographed against a grey studio wall",
    name: "Priya Raman",
    title: "Agent, new developments",
    license: "MA #04498305",
    since: 2017,
    closed: 19,
    areas: "Brookline · Somerville",
    languages: "English · Tamil · Hindi",
    email: "priya@domusrealty.com",
    line: "I sell buildings that are not finished yet, which is a different job from selling a house.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmecLHhzenmnL3J6JtWU69mqfPDBC2sWrB61VctfKw4Fvc",
    alt: "A woman in a charcoal blazer over an ivory blouse, photographed against a grey studio wall",
    name: "Ruth Delaney",
    title: "Senior agent",
    license: "MA #04483641",
    since: 2009,
    closed: 27,
    areas: "Beacon Hill · Brookline",
    languages: "English · Portuguese",
    email: "ruth@domusrealty.com",
    line: "I have worked the same three streets on Beacon Hill since 2009, and I know which houses have the parking.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmWaedJW4eZzGnND2J7FpUjjeMrbdrPxTdXnwKYdKgwanN",
    alt: "A man with short curls in a light blue shirt and no jacket, photographed against a grey studio wall",
    name: "Sean Halloran",
    title: "Agent, lettings",
    license: "MA #04520774",
    since: 2016,
    closed: 22,
    areas: "Cambridge · Somerville",
    languages: "English",
    email: "sean@domusrealty.com",
    line: "Lettings runs on a different clock. A landlord who is empty on the first is losing money by Tuesday.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmVm6krrs4y29igWXcvrkm6KhSWMCV3hpmrL14ncg7QHoP",
    alt: "A woman with a shoulder-length bob in a cream blazer over a white roll neck, photographed against a grey studio wall",
    name: "Elena Sarkis",
    title: "Agent",
    license: "MA #04527310",
    since: 2018,
    closed: 17,
    areas: "Brookline · Jamaica Plain",
    languages: "English · Armenian",
    email: "elena@domusrealty.com",
    line: "Half my buyers are leaving a two-bed and will not move outside their school district to get a third.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmaRG9f7iTt3uTnk7jYEv7JKSKY2RFNLuytqSGT21tbKse",
    alt: "A man in glasses, in a navy jacket over a white shirt, photographed against a grey studio wall",
    name: "Frank Lowell",
    title: "Agent, multi-family",
    license: "MA #04533028",
    since: 2019,
    closed: 15,
    areas: "Somerville · Jamaica Plain",
    languages: "English",
    email: "frank@domusrealty.com",
    line: "A triple-decker is arithmetic before it is taste, so I bring the rent roll to the first viewing.",
  },
  {
    src: "https://assets.lummi.ai/assets/QmT2gWWAUCT8aZ3ED6ryRutywhNvNavCHsQc2JajAdJDYe",
    alt: "A younger man in glasses and a grey roll neck, photographed against a grey studio wall",
    name: "Jonah Reiss",
    title: "Agent, first-time buyers",
    license: "MA #04549265",
    since: 2021,
    closed: 12,
    areas: "Back Bay · Cambridge",
    languages: "English · French",
    email: "jonah@domusrealty.com",
    line: "First-time buyers get outbid twice before they win one, and I say so on the first call.",
  },
] as const;

/** Agent photographs are only ever shown cut to a circle or a pill, and the
    source frames are 3:4 with the head high in them — a plain resize would hand
    `object-cover` a chest to centre on. This asks the CDN for the square cut
    around the face instead, which is the one crop every call site wants.
    `photo()` stays what areas and listings use: those are landscapes, and there
    is no face in them to find. */
export const portrait = (src: string, size: number) =>
  `${src}?w=${size}&h=${size}&fit=crop&crop=faces&q=75`;

export type Agent = (typeof agents)[number];

/** What the four on the home page closed, and what all nine did. Derived rather
    than typed into the copy: the two sentences that quote them sit in different
    files, and a hand-written 112 beside a hand-edited array is the pair that
    drifts. */
export const closedBy = (list: readonly Agent[]) =>
  list.reduce((sum, agent) => sum + agent.closed, 0);

export const copy = {
  eyebrow: "Our agents",
  heading: "The people who answer the phone",
  lede: `Four of the forty agents across our six offices. Between them they closed ${closedBy(agents.slice(0, 4))} of last year's 1,140, and every license number below is one you can look up.`,
} as const;

// Who answers for a home, derived from the area rather than stored on the
// listing. The roster already says who covers where, and a second copy of that
// on twenty-one records is twenty-one chances for the two to disagree. It sits
// here rather than in the section that first wanted it, because the second
// section that wants it should not be importing from the first.
//
// It answers with the *first* agent covering an area, which is why the order of
// this array is a decision: the four senior names are the four that listings and
// neighborhoods point at, and the five below them widen the roster page without
// repointing anything.
export const agentFor = (home: { area: string }) =>
  agents.find((agent) => agent.areas.split(" · ").includes(home.area)) ??
  agents[0];

/** Everyone covering one area, for the roster page's filter. Same split as
    `agentFor` reads, so a filter cannot show a person the listing pages would
    not name. */
export const agentsIn = (area: string) =>
  agents.filter((agent) => agent.areas.split(" · ").includes(area));
