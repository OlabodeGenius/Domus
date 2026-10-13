import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
import { ListingCard } from "@/components/estate/listing-card";
import { homes, toListing } from "@/components/estate/listings";
import { type Area } from "@/components/estate/areas";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

// A filter and not a rank, which is the opposite call from the one the listing
// page's row of three makes — there the area is a near miss and here it is the
// whole subject, so a home from the next town over would be answering a
// question nobody asked.
//
// Three cards and never four. The book holds three or four in each area, and
// the fourth landed alone on a second row; a carousel to hide one card is more
// machinery than the card is worth, and the button beside the heading is
// already the way to the rest. Fewest days on market wins the three places,
// which is the one order a reader coming to an area page is asking for.
export function AreaListings({ area }: { area: Area }) {
  const here = homes
    .filter((home) => home.area === area.name)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);
  const lets = here.filter((home) => home.for === "rent").length;

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <div>
          <Eyebrow icon={Home01Icon}>On the book here</Eyebrow>
          <SectionHeading className="mt-6 max-w-[20ch]">
            What is standing in {area.name} this morning
          </SectionHeading>
          <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
            The three newest of the{" "}
            <span className="text-foreground tabular-nums">{area.active}</span>{" "}
            we hold here, least time on the market first.
            {lets > 0
              ? ` ${lets === 1 ? "One is a let" : `${lets} are lets`}, the rest are for sale.`
              : " All three are for sale."}
          </p>
        </div>

        <Button
          variant="outline"
          render={<Link href={`/listings?area=${slugify(area.name)}`} />}
          className="rounded-full"
        >
          Every home in {area.name}
          <ArrowUpRightIcon data-icon="inline-end" aria-hidden />
        </Button>
      </div>

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {here.map((home) => (
          <li key={home.address} className="flex">
            <ListingCard listing={toListing(home)} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}
