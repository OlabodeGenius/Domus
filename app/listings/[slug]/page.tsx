import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Book } from "@/components/estate/book";
import { ListingCosts } from "@/components/estate/listing-costs";
import { ListingFacts } from "@/components/estate/listing-facts";
import { ListingHero } from "@/components/estate/listing-hero";
import { ListingNearby } from "@/components/estate/listing-nearby";
import { ListingNotes } from "@/components/estate/listing-notes";
import { ListingPlace } from "@/components/estate/listing-place";
import { homeBySlug, homes, slugOf } from "@/components/estate/listings";

// Twenty-one records in, twenty-one pages out, all of them built at build time
// — the browse page is the one route on this site that reads a query string,
// and this is the one that reads a segment. Both answer out of the same typed
// array, so a home that is on the grid has a page and a home that has a page
// is on the grid.
export function generateStaticParams() {
  return homes.map((home) => ({ slug: slugOf(home) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const home = homeBySlug(slug);
  if (!home) return {};

  return {
    title: `${home.address}, ${home.area} — Domus`,
    description: home.blurb,
  };
}

export default async function ListingPage({
  params,
}: PageProps<"/listings/[slug]">) {
  const { slug } = await params;
  const home = homeBySlug(slug);
  if (!home) notFound();

  // The layout is decided: the mosaic and the address up top, then the whole
  // record in one reading column with the agent card on the rail beside it,
  // then the block, the six questions, the calculator and the way to reach
  // somebody. The column-and-rail alternative and the chooser that compared
  // them came off with that decision, and so did the chooser that compared two
  // day pickers inside the agent card — the month grid won.
  return (
    <>
      {/* One child of main, not two. The mosaic, the address and the whole
          record are one continuous read about one home, where every other
          boundary on this page is a change of subject — so the pair wants less
          air between its halves than the page's rhythm gives.

          main's gap only falls between its own children, so a pair that is one
          child states its own and nothing has to undo anything. A negative
          margin on the section would land at the same 6rem and cost the layout
          its one rule — no vertical spacing on any section — which is what
          keeps eleven routes on the same rhythm without anyone restating it. */}
      <div className="flex flex-col gap-24">
        <ListingHero home={home} />
        <ListingFacts home={home} />
      </div>
      <ListingPlace home={home} />
      <ListingNotes home={home} />
      <ListingCosts home={home} />
      <ListingNearby home={home} />
      <Book />
    </>
  );
}
