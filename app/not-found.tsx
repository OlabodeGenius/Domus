import Link from "next/link";
import { Divider } from "@/components/estate/divider";
import { Eyebrow } from "@/components/estate/eyebrow";
import { ListingCard } from "@/components/estate/listing-card";
import {
  eyebrow as onTheMarket,
  railHomes,
  toListing,
} from "@/components/estate/listings";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The 404, and it catches more than a mistyped URL: this file answers every
// unmatched path on the site, and the ones a buyer's own inventory will make —
// a home that closed, an area renamed, an agent who left. So it is written as a
// page with somewhere to go rather than as an apology, and the three cards are
// the same ones the rail draws, read out of `listings.ts` rather than typed
// here. A 404 quoting a price the book has moved on from is the one page
// nobody would think to check.
//
// No `metadata` export: `not-found.tsx` is not a route and Next ignores one
// here — only the experimental `global-not-found` takes it. The tab reads the
// root layout's title, and the 404 status is Next's own.
export default function NotFound() {
  return (
    <>
      <section className="reveal mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 sm:px-8 pt-12 sm:pt-24 text-center">
        <Eyebrow>404</Eyebrow>

        <SectionHeading as="h1" className="mt-8 max-w-[18ch]">
          That address is not on our books
        </SectionHeading>

        <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
          Either the link is out of date, or the home sold and its page came off
          with it — we take a listing down the week it closes. What is still on
          the market is below.
        </p>

        {/* The pair the site already uses at the foot of a fee tier, in the
            same order and under the same names: a control that reads "Talk to
            an agent" on one page and "Contact us" on another is two actions as
            far as the visitor is concerned. */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/listings"
            className={cn(buttonVariants(), reach, "rounded-full")}
          >
            Browse homes
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              reach,
              "rounded-full",
            )}
          >
            Talk to an agent
          </Link>
        </div>
      </section>

      {/* The label is the divider's, not a second heading: this row is three
          cards under a rule, and an h2 over it would give a dead end the same
          weight as the page's own answer. `main` puts 10rem above the pair and
          the wrapper keeps the rule near what it labels. */}
      <div className="flex flex-col gap-12">
        <Divider>{onTheMarket}</Divider>

        <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {railHomes.slice(0, 3).map((home) => (
              <ListingCard key={home.address} listing={toListing(home)} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
