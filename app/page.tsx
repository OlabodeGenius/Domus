import type { Metadata } from "next";
import { Agents } from "@/components/estate/agents-section";
import { Book } from "@/components/estate/book";
import { BookB } from "@/components/estate/book-b";
import { Divider } from "@/components/estate/divider";
import { Exclusives } from "@/components/estate/exclusives";
import { Fees } from "@/components/estate/fees";
import { GridListings } from "@/components/estate/grid-listings-section";
import { Guides } from "@/components/estate/guides";
import { Hero } from "@/components/estate/hero";
import { HeroSearchCards } from "@/components/estate/hero-search-cards";
import { HowItWorks } from "@/components/estate/how-it-works";
import { MarketCards } from "@/components/estate/market-cards";
import { Neighborhoods } from "@/components/estate/neighborhoods";
import { Numbers } from "@/components/estate/numbers";
import { PressWall } from "@/components/estate/press-wall";
import { Questions } from "@/components/estate/questions";
import { Testimonials } from "@/components/estate/testimonials";

export const metadata: Metadata = {
  title: "Domus — homes across Greater Boston",
  description:
    "A Greater Boston brokerage. Every listing here is ours, updated through the day, and handled by a licensed agent you can name.",
};

// The hue lives in :root, not on this route — this template is the product and
// globals.css is the one knob its buyer turns. The demo switcher that used to
// wrap this page is gone.
//
// The picks are in. Seven sections carried three or four layouts each behind
// <Variants> while they were being chosen, and the files that lost came out
// with each decision — the agents section was the last of them, and its grid
// won over the bento, the row list and the staircase. One layout each, one file
// apiece — the header was the last of the seven, and its tinted wedge won over
// three flat bars. The harness went with it: variants.tsx is gone, and this
// file mounts one component per slot again.
export default function Home() {
  return (
    // Sections only. The bar, the footer, main and its gap are the layout's —
    // eleven routes share them. Reordering this list is free: nothing here
    // encodes what sits next to what.
    <>
      <Hero search={<HeroSearchCards />} />
      {/* The one band that runs edge to edge, because the rail inside it does
          — cards cut by the viewport are the layout, and a band stopping at
          the container would draw a line across the middle of that cut.

          The section's two candidates are down to one. Candidate A came off
          with the decision, and its card is listing-card.tsx now — the browse
          grid further down draws the same one. */}
      <MarketCards />
      {/* The logo strip lost its black field, so the two rules are what
          fence it — see the note in press-wall.tsx. They are the section's,
          not the page's, which is why they come in a pair. */}
      <Exclusives />
      {/* The mid-page ask, in the slot the off-market register used to hold.
          It is a jump to the form at the foot rather than a second form, so
          the page asks once and offers the ask twice — and the dark band
          lands between two sections that carry no ground of their own, which
          is the only place on this page a band can go. */}
      <BookB />
      <Neighborhoods />
      {/* The browse grid, three sections clear of the rail rather than
          directly under it. Both draw the same listing card now, and two
          sections of one card back to back read as the same section built
          twice however differently they are laid out — a rail and a grid stop
          being different the moment the thing inside them is identical. Here
          the areas have just been named, so a filterable book of nine homes is
          the next question a reader actually has. It carries no ground of its
          own, which is what lets it stand directly above the figures band. */}
      <GridListings />
      <Numbers />
      {/* A grid, deliberately: Numbers directly above is an inverted band
          and HowItWorks below is a header-row, so this slot had to be
          neither — which is also why the reference's tinted panel came off
          the section rather than shipping against a black one. */}
      <Agents />
      <Divider />
      <HowItWorks />
      <Fees />
      <Testimonials />
      {/* The pick out of four candidates: filtered rows, which is the one
          shape in the draw that neither repeats Testimonials' grid directly
          above nor asks the reader to take six guides at once. */}
      <Guides />
      <Questions />
      <PressWall />
      <Book />
      {/* The footer always takes a rule off the section above it, unless
          that section ends in a ground of its own. This one does not. The
          last child, because a gap only exists between children. */}
      <Divider />
    </>
  );
}
