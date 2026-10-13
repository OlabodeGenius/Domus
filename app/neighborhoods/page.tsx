import type { Metadata } from "next";
import { CompassIcon } from "@hugeicons/core-free-icons";
import { AreaMap } from "@/components/estate/area-map";
import { AreaPrices } from "@/components/estate/area-prices";
import { AreaTiles } from "@/components/estate/area-tiles";
import { Book } from "@/components/estate/book";
import { PageHeader } from "@/components/estate/page-header";

export const metadata: Metadata = {
  title: "Neighborhoods across Greater Boston — Domus",
  description:
    "Back Bay, Beacon Hill, Cambridge, Brookline, Somerville and Jamaica Plain: what each one costs, how fast it moves, and what Domus is holding there this morning.",
};

// Geography is this industry's category system, so this route is the browse
// axis a visitor uses before tenure or property type. Everything on it reads
// one array — areas.ts — which is also what the home page's fourth section and
// every listing's map panel read, so a median cannot be one figure here and
// another there.
//
// Static. The six links out of it carry a slug derived from the name, and the
// filtered book they open is /listings?area=, which is a page that already
// exists rather than a state this one holds.
export default function NeighborhoodsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Neighborhoods"
        icon={CompassIcon}
        heading="Where we work, and what it costs there"
        figures={[
          { value: "258", caption: "Homes on the book\nacross the six" },
          { value: "14", caption: "Areas our agents cover,\nsix of them here" },
        ]}
        lede="Six of the fourteen areas our agents cover, and the six we keep an office in. Every median below comes off our own book rather than a market index, so it moves when the book does."
      />
      <AreaTiles />
      <AreaMap />
      <AreaPrices />
      <Book />
    </>
  );
}
