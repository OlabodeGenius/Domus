# Domus

A residential real-estate brokerage template. Greater Boston, US English, USD.
Twelve routes and two home pages, no backend: every list is a typed array in a
`.ts` file beside the component that reads it, and a filter that looks live is
a link to a page that already exists.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Base UI · TypeScript.

```bash
npm install
npm run dev
```

`npm run check` is the machine half of done: the production build and two data
self-checks over the arrays. Run it after you edit them.

## The twelve routes

| Route | What it is |
|---|---|
| `/` | Fifteen sections, from the inventory claim to the booking form |
| `/home-2` | The same book opened search-first: a live search bar, a map with a pin per home, saved searches with alerts, a compare frame and an affordability calculator |
| `/listings` | The whole book, with tenure pills, a sort and shareable filters in the URL |
| `/listings/[slug]` | One home: gallery, facts, rooms, an agent, a viewing scheduler, a payment calculator |
| `/neighborhoods` | Six areas, each with its median, its count and its character |
| `/neighborhoods/[slug]` | One area: prices, what stands there now, the agent who covers it |
| `/agents` | Nine agents with license numbers, filterable by area |
| `/about` | The story, the figures, six offices, the fair housing notice |
| `/guides` | Six guides, filterable by subject |
| `/guides/[slug]` | One guide, in prose, with a related row |
| `/contact` | Four desks, the full field set, six offices, the response-time promise |
| `not-found` | A 404 with three homes still on the market under it |

## The four things a buyer changes

**1. The brand hue, in `app/globals.css`.** One value on `--primary`, `--ring`
and `--chart-1..3` in `:root`. Every hue that shipped was measured rather than
picked, and the numbers a replacement has to clear are white on it at 4.5:1, it
on the page at 4.5:1, and its chip on a card between 1.02 and 1.19:

| | white on it | it on the page | its chip on a card |
|---|---|---|---|
| **Ink** `30 6% 13%` (shipped, chip at `/6`) | 16.02 | 15.68 | 1.119 |
| Forest `158 45% 30%` | 6.00 | 5.87 | 1.156 |
| Harbor `214 48% 34%` | 8.06 | 7.89 | 1.174 |
| Clay `16 55% 42%` | 5.53 | 5.41 | 1.153 |
| Slate `194 42% 32%` | 6.58 | 6.44 | 1.159 |

The chip alpha is a token, not a number in a component. `--chip-alpha` is `6%`
because the shipped hue is a near-black; a mid-lightness hue wants `10%`, and
components write `bg-chip` either way.

**2. The typeface, in `app/layout.tsx`.** Geist, bound to `--font-sans`. The
weight pair lives in `globals.css` as `--font-weight-medium: 450` and
`--font-weight-semibold: 550`; components write `font-medium` and never a
number, so a new face is its import and those two values.

**3. The content, in `components/estate/*.ts`.** `listings.ts` holds all 21
homes and derives the money, the specs line, the slug and the MLS number from
them. `areas.ts` holds the six neighborhoods and the six office addresses that
the footer and `/about` both read. `agents.ts`, `posts.ts`, `faq.ts`,
`figures.ts` and `search-options.ts` hold the rest. Nothing is stored twice: a
rename in one of these files moves every page that prints it, including the
URL.

`sold.ts` holds the six closed sales `/home-2` prints, kept out of
`listings.ts` on purpose — a sold home has no gallery, no agent and no page,
and it must not end up in the array every card on the site maps over.
`portal.ts` derives what that page's four stateful sections need — the map
pins, the slice counts, the compare rows — on the server, so the book itself
never reaches the browser.

`search-options.ts` also carries two spare search fields, `intent` and
`status`, written out and mounted nowhere. The comment above them says what it
takes to switch one on, and why `/listings` may already be answering the same
question with its pills.

**4. The photography.** Every remote image is pinned with the width it renders
at, doubled, plus `&q=75`. Without that the optimizer fetches the full original
to make a thumbnail and times out. `photo()` in `areas.ts` crops landscapes,
`portrait()` in `agents.ts` crops faces; both are called at the point of use, so
a replacement source only has to be a URL.

The portraits are real people under their license, and the names, credentials
and license numbers beside them are invented. Replace the two together.

## Layout of the repo

```
app/                     the twelve routes, one file each
components/estate/       every section and every data file
components/ui/           button, select, slider, calendar
lib/utils.ts             cn(), slugify(), and the two formatters two files share
```

The shell lives in `app/layout.tsx`: header, footer, and `main` as one flex
column at `gap-40`. No section sets its own vertical padding, so every boundary
on every page is the same rhythm and a `<Divider>` doubles it by being a child.

## Conventions worth knowing before editing

- **A filter is a link, not a state.** Browse controls rewrite the query and let
  the server render the answer. That is why a filtered view is a URL you can
  send to somebody, and why 21 cards are not in a bundle.
- **A slug is derived, never stored.** `slugify()` over the name a record
  already carries, read back through the same function by the route.
- **One control per page is drawn at 44px**, its call to action. Everything else
  is drawn at 36 and reaches 40 through `components/reach.ts`.
- **Fills whisper, ink clears the floor.** Surfaces sit 1.02 to 1.19 apart;
  text holds 4.5:1. Re-measure both if you change the hue.

## Checks

```bash
npm run check
```

The production build, then two data self-checks: the spot-note split in
`area-spots.check.ts`, and in `portal.check.ts` the one thing neither a type nor
a screenshot catches — that the six blocks on the drawn plan do not overlap,
since two that do put two pins from two neighborhoods on the same pixel. Edit
`areas.ts` and run this before you trust the map.

## Before you launch

Five things this template ships on purpose and nobody should ship in production.

- **Replace the people.** The portraits are licensed stock of real people; the
  names, credentials and license numbers beside them are invented. Replace the
  two together — a real face over an invented license number is the one pairing
  that can actually cause somebody trouble.
- **Replace the brokerage.** Domus, its offices, its figures and all 21 listings
  are invented. Check the name against live US brokerages before you keep it.
- **Point the photography at your own host.** Nothing is shipped; every image is
  a URL in the data file beside its section. See Licensing below.
- **Set `NEXT_PUBLIC_SITE_URL`**, unless you deploy to Vercel, where the
  production domain is read for you.
- **Decide about the two spare search fields** in `search-options.ts`. `intent`
  and `status` are written out and mounted nowhere; the comment above them says
  what it takes to switch one on.

## Licensing

Geist and Geist Mono are OFL. No photograph ships with the template: every
image is fetched from Unsplash or Lummi at render size, under those services'
own licences, and the URLs sit in the data file beside each section. Point
them at your own host before launch — a demo that depends on somebody else's
CDN is a demo, not a deployment. Client marks are logoipsum placeholders in
`public/logos/` and carry no trademark. The brokerage, its people, its figures
and its listings are invented; check the name "Domus" against live US
brokerages before the template goes on sale.
