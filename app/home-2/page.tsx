import type { Metadata } from "next";
import { PortalHero } from "@/components/estate/portal-hero";
import { PortalMap } from "@/components/estate/portal-map";
import { PortalSearches } from "@/components/estate/portal-searches";
import { PortalCompare } from "@/components/estate/portal-compare";
import { PortalAfford } from "@/components/estate/portal-afford";
import { PortalAreas } from "@/components/estate/portal-areas";
import { PortalSold } from "@/components/estate/portal-sold";
import { Book } from "@/components/estate/book";
import { Divider } from "@/components/estate/divider";
import { Numbers } from "@/components/estate/numbers";
import { PressWall } from "@/components/estate/press-wall";
import { Questions } from "@/components/estate/questions";
import { compared, pins, salePrices, slices } from "@/components/estate/portal";
import { INSURANCE_RATE, TAX_RATE } from "@/components/estate/listings";

export const metadata: Metadata = {
  title: "Domus — search every home in Greater Boston",
  description:
    "The same book opened search-first: a map with every listing on it, saved searches with alerts, a compare frame, and the price band a monthly budget buys.",
};

// The second home page, and the reason it is not the first one re-skinned.
//
// A marketplace buyer picks between templates by clicking through demos, so a
// template with one home page answers the only question they are asking exactly
// once. The cheap second home is the same fifteen sections drawn from different
// references — and a buyer who scrolls both sees a page repainted rather than a
// second product.
//
// So this one changes the argument. `/` opens with the inventory claim and
// spends fifteen sections earning it, the way a brokerage introduces itself.
// This opens with the search box and never makes a claim at all: the portal
// shape, where the first frame is a control, the second is a map, and
// everything after them is a tool for narrowing what the map showed.
//
// The two pages share the shell, the listing card and one book of 21 homes, and
// they disagree about what a visitor came here to do.
export default function PortalHome() {
  return (
    // Sections only. The bar, the footer, main and its gap belong to the
    // layout, which twelve routes now share.
    //
    // The book is read here and handed down. Three of the sections below hold
    // state, and a client component importing `listings.ts` would put 21
    // records with their blurbs and four photographs apiece into the browser's
    // bundle — `portal.ts` shapes what each one needs on the server instead.
    <>
      <PortalHero pins={pins()} />
      <PortalMap pins={pins()} slices={slices()} />
      <PortalSearches pins={pins()} />
      <PortalCompare homes={compared()} />
      <PortalAfford
        prices={salePrices()}
        tax={TAX_RATE}
        insurance={INSURANCE_RATE}
      />
      <PortalAreas />
      <PortalSold />
      {/* Four sections from `/`, mounted unchanged, and that is the reuse rule
          doing its job rather than a shortcut. A second home page that shares
          no vocabulary with the first reads as a different site — and these
          four are the ones whose job does not change when the argument does.
          The figures, the six objections, the marks and the form are the same
          brokerage's whichever way a visitor came in.

          They also settle the page's rhythm. The band at 8 is the one
          inverted ground on this page and it lands between two sections that
          carry no ground of their own, which is the only place a band can go. */}
      <Numbers />
      <Questions />
      <PressWall />
      <Book />
      {/* The footer takes a rule off the section above it. The last child,
          because a gap only exists between children. */}
      <Divider />
    </>
  );
}
