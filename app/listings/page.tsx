import type { Metadata } from "next";
import { Building03Icon } from "@hugeicons/core-free-icons";
import { Book } from "@/components/estate/book";
import { Browse } from "@/components/estate/browse";
import { Divider } from "@/components/estate/divider";
import { isShow, sortFrom } from "@/components/estate/grid-listings";
import { PageHeader } from "@/components/estate/page-header";

export const metadata: Metadata = {
  title: "Homes for sale and to rent — Domus",
  description:
    "Every home Domus holds across Greater Boston, for sale and to let, with the agent who is handling it named on the card.",
};

// The filters live in the URL and nowhere else. There is no backend and no
// client state: the pills are links, the sort is a link the select follows, and
// this server component reads the query, slices a typed array and renders the
// answer. A sorted, filtered view is therefore a URL somebody can send to
// somebody else, which a useState grid never is.
export default async function ListingsPage({
  searchParams,
}: PageProps<"/listings">) {
  const params = await searchParams;
  const one = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const show = one(params.show);
  const area = one(params.area);
  const from = one(params.from);
  const price = one(params.price);
  const beds = one(params.beds);
  const type = one(params.type);

  return (
    <>
      {/* The title block and the browse it heads are one object, so they sit in
          one wrapper at `gap-20` rather than at `main`'s 10rem. A masthead as
          far from its own list as that list is from the next section is a
          masthead the reader has to decide about; half the distance says which
          side of it the pills belong to. Same wrapper on /agents. */}
      <div className="flex flex-col gap-20">
        {/* The two figures are the two claims this page has to make before a
            visitor scrolls: how much is on the book, and how much of it never
            reaches a portal. The second is the argument the home page's third
            section makes at length, and a browse page that omits it is a browse
            page that looks like every portal. */}
        <PageHeader
          eyebrow="Buy and rent"
          icon={Building03Icon}
          heading="Every home we hold, in one list"
          figures={[
            { value: "1,284", caption: "Homes on the book\nthis morning" },
            {
              value: "41",
              caption: "Private exclusives,\nnone of them public",
            },
          ]}
          lede="The book turns over through the day, so what is below is this morning’s. Filter it by tenure or by what is new, sort it the way you shop, and press any card to reach the agent whose name is on it rather than a switchboard."
        />
        <Browse
          show={isShow(show) ? show : "all"}
          area={area}
          from={from}
          price={price}
          beds={beds}
          type={type}
          sort={sortFrom(one(params.sort))}
        />
      </div>
      <Divider />
      <Book />
    </>
  );
}
