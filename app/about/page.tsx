import type { Metadata } from "next";
import { Building03Icon } from "@hugeicons/core-free-icons";
import { AboutFairHousing } from "@/components/estate/about-fair-housing";
import { AboutOffices } from "@/components/estate/about-offices";
import { AboutStory } from "@/components/estate/about-story";
import { AboutTimeline } from "@/components/estate/about-timeline";
import { Book } from "@/components/estate/book";
import { Numbers } from "@/components/estate/numbers";
import { PageHeader } from "@/components/estate/page-header";

export const metadata: Metadata = {
  title: "About Domus — independent since 1998",
  description:
    "One office in Brookline in 1998, six across Greater Boston now. The story, the numbers, where to find us, and the fair housing notice.",
};

// The page flow 3 runs through: a visitor who has met the roster and now wants
// to know whether the firm behind it is worth the fee. So it argues in that
// order — how the work is done, how long it has been done for, what it adds up
// to, where it happens, and what the firm is accountable to.
//
// The figures band is the home page's, unchanged. A second cut of the same four
// numbers would be four more places for 1,140 to drift, and this is the page
// that quotes them as proof rather than as an opening claim.
//
// Two of the six sections carry a ground and neither touches the other: the
// story is the tinted slab, the figures band is the inverted one, and the
// timeline between them sits on the page. The closing band is Book's, which is
// why nothing under the notice draws a rule.
//
// The timeline and the notice were each built at three layouts behind
// `variant-switch.tsx` and read in place; the user picked the ruled grid and the
// corner cards, and the four losers, the two choosers and the two files of
// shared copy came out with the decision. `variant-switch.tsx` itself is gone
// now too, deleted at the user's ask once the ship check found no route left
// mounting it — it has been rebuilt from scratch three times before, and that
// is cheaper than shipping a buyer scaffolding they have to work out. The four
// references that lost go back unspent, since none of them shipped.
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Domus"
        icon={Building03Icon}
        heading="Independent since 1998, six offices later"
        figures={[
          {
            value: "$1.9B",
            caption: "Closed last year, all of it\non our own listings",
          },
          {
            value: "0",
            caption: "Franchise fees. The name\non the door is ours.",
          },
        ]}
        lede="Tom Brennan opened one office on Beacon Street in 1998 with two agents and a rented fax machine. Six offices and forty agents later, we still take our own listings and answer for every one of them."
      />
      <AboutStory />
      <AboutTimeline />
      <Numbers />
      <AboutOffices />
      <AboutFairHousing />
      <Book />
    </>
  );
}
