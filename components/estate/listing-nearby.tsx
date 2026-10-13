import { Home01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Eyebrow } from "@/components/estate/eyebrow";
import { ListingCard } from "@/components/estate/listing-card";
import { homes, toListing, type Home } from "@/components/estate/listings";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Three cards, and the order is a rank rather than a filter: the same tenure
// first, then the same neighborhood, then whatever is left. A filter would have
// shipped two cards on a three-column grid for half the book — most areas hold
// three or four homes, and one of those is the one being read.
//
// Tenure outranks the area because it is the harder mismatch: a $3,150 let
// among three houses for sale is a different category on the same shelf, where
// the next town over is only further away.
//
// sort() is stable, so homes that tie keep the order the book has them in.
const near = (home: Home) => {
  const rank = (other: Home) =>
    (other.for === home.for ? 0 : 2) + (other.area === home.area ? 0 : 1);

  return homes
    .filter((other) => other !== home)
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, 3);
};

export function ListingNearby({ home }: { home: Home }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <div>
          <Eyebrow icon={Home01Icon}>Also on the book</Eyebrow>
          {/* Not "More in Brookline": an area holds three or four homes and one
              of them is this one, so the third card is often from the next
              neighborhood over. A heading that names the area would be wrong
              about a third of the time. The tenure never is — the rank above
              puts it first, and there are fifteen sales and six lets to draw
              three from. The link opposite names the area instead, and that
              one goes somewhere the area is genuinely the filter. */}
          <SectionHeading className="mt-6">
            {home.for === "sale" ? "More homes for sale" : "More homes to rent"}
          </SectionHeading>
        </div>

        <Button
          variant="outline"
          render={<Link href={`/listings?area=${slugify(home.area)}`} />}
        >
          Every home in {home.area}
        </Button>
      </div>

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {near(home).map((other) => (
          <li key={other.address} className="flex">
            <ListingCard listing={toListing(other)} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
