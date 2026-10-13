"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs } from "@base-ui/react/tabs";
import { BrowseModal } from "@/components/estate/browse-modal";
import { Eyebrow } from "@/components/estate/eyebrow";
import {
  by,
  copy,
  sorts,
  tabs,
  type Sort,
} from "@/components/estate/grid-listings";
import { gridHomes, toListing } from "@/components/estate/listings";
import { ListingCard } from "@/components/estate/listing-card";
import { SortSelect } from "@/components/estate/sort-select";
import { Button } from "@/components/ui/button";
import { scrollRow } from "@/components/scroll-row";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// filter() copies before sort() mutates, so the module's own array is never
// reordered under a tab that is not looking.
const shown = (status: string | null, sort: Sort) =>
  gridHomes.filter((home) => !status || home.status === status).sort(by[sort]);

export function GridListings() {
  const [sort, setSort] = useState<Sort>(sorts[0]);

  return (
    <section
      id="browse"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <SectionHeading className="mt-6 max-w-[20ch]">
        {copy.heading}
      </SectionHeading>
      <p className="mt-6 max-w-[58ch] text-base text-muted-foreground">
        {copy.lede}
      </p>

      <Tabs.Root defaultValue={tabs[0].label}>
        {/* The same bar /listings draws, and the same dialog behind its button
            — but this section has no results under it to narrow. Its nine cards
            are a shelf, the tabs are that shelf's own, and the filters are
            about the book: so the dialog stages what a reader picks, keeps the
            counts honest against all twenty-one, and hands them to /listings
            once with the lot applied. A door rather than a control panel. */}
        <div className="mt-24">
          <BrowseModal
            tabs={
              <Tabs.List
                aria-label="Filter homes by where the listing stands"
                className={cn(scrollRow, "gap-2")}
              >
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.label}
                    value={tab.label}
                    className={cn(
                      // Transparent at rest, so the pill dissolves into the
                      // page instead of laying a tint on it — a resting tile
                      // one rung off its ground reads as a stain, not a
                      // control.
                      "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full px-5 text-sm whitespace-nowrap transition-colors outline-none",
                      "text-muted-foreground hover:bg-muted hover:text-foreground",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                      // The chosen tab is the page's neutral dark action, and
                      // it gets its own hover: one rule written for the resting
                      // pill would repaint the filled one pale under the
                      // cursor. Both variants are stacked so they beat the
                      // single-variant hover on specificity rather than on
                      // source order.
                      "data-active:bg-foreground data-active:text-background",
                      "data-active:hover:bg-foreground/90 data-active:hover:text-background",
                    )}
                  >
                    {tab.label}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            }
            sort={<SortSelect value={sort} onChange={setSort} />}
            current={{}}
          />
        </div>

        {tabs.map((tab) => (
          <Tabs.Panel
            key={tab.label}
            value={tab.label}
            className="mt-12 grid gap-x-8 gap-y-10 outline-none sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown(tab.status, sort).map((home) => (
              <ListingCard key={home.address} listing={toListing(home)} />
            ))}
          </Tabs.Panel>
        ))}
      </Tabs.Root>

      {/* The reference closes on a centred pill. Outline rather than the solid:
          the page's one call to action is the dark button in the header and at
          the foot, and a second solid pill in the middle of the scroll spends
          that emphasis on a link to a longer list. */}
      <div className="mt-16 flex justify-center">
        <Button
          variant="outline"
          render={<Link href="/listings" />}
          className="rounded-full"
        >
          {copy.cta}
        </Button>
      </div>
    </section>
  );
}
