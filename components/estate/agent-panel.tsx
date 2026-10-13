import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  agents as roster,
  type Agent,
  portrait,
} from "@/components/estate/agents";
import { homes } from "@/components/estate/listings";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// One tinted slab holds the whole roster, the way the catalogue on
// /neighborhoods does: nine people read as entries in one list rather than as
// nine pictures that happen to be adjacent. What the slab costs is size — a
// circular crop at 64px is a face and not a portrait — and what it buys is that
// the photograph above it can be a *house*, which is the thing a visitor is
// here to be shown.
//
// The lid is assigned once over the whole roster rather than per render, so
// filtering to one area cannot hand two agents the same photograph.
const lids = new Map<string, (typeof homes)[number]>();
{
  const taken = new Set<string>();
  for (const agent of roster) {
    const patch = agent.areas.split(" · ");
    const home = homes.find(
      (one) => !taken.has(one.address) && patch.includes(one.area),
    );
    if (home) {
      taken.add(home.address);
      lids.set(agent.name, home);
    }
  }
}

// A section of its own, in the container every other one on this site uses, and
// the same arrangement `/listings` has: a title block, then the browse below it
// at `main`'s own rhythm. It was briefly a child of `PageHeader` to close the
// distance between the pills and the list they filter — with the bar moved
// inside the slab that distance is zero, and the reason for the exception went
// with it. The `-mx-8` runs the slab back out over the container's gutter.
export function AgentPanel({
  agents,
  filter,
}: {
  agents: readonly Agent[];
  /** The pills and the count, inside the slab rather than above it. A filter
      standing on the page while the list it filters sits on a tint is two
      objects; the browse panel on /listings has always drawn them as one, and
      a roster is the same job with people in the cells. */
  filter: ReactNode;
}) {
  return (
    <section
      id="roster"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12">
        {filter}

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const patch = agent.areas.split(" · ");
            const lid = lids.get(agent.name);
            const held = homes.filter((one) => one.area === patch[0]).length;

            return (
              <li
                key={agent.name}
                // A white card on a tint is already a rung clear of its ground,
                // so no hairline: an edge drawn between two surfaces that far
                // apart is the second cue this style does not spend.
                className="overflow-hidden rounded-lg bg-card"
              >
                <div className="relative aspect-3/2">
                  {lid ? (
                    <Image
                      src={lid.src}
                      alt={lid.alt}
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  ) : null}

                  {/* The reference's count-and-arrow pill, and here it counts
                      something a visitor can go and look at. */}
                  <Link
                    href={`/listings?area=${slugify(patch[0])}`}
                    className={cn(
                      reach,
                      "absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 py-1.5 pr-3 pl-4 text-sm shadow-soft backdrop-blur-md transition-colors hover:bg-background",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    )}
                  >
                    <span className="tabular-nums">{held}</span> in {patch[0]}
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  </Link>
                </div>

                {/* The reference cuts a wave out of the card body and sets the
                    avatar into it. A ring in the card's own colour is the same
                    idea at this radius and survives a buyer swapping the crop. */}
                <div className="px-6 pb-7 text-center">
                  <div className="relative mx-auto -mt-10 size-20 overflow-hidden rounded-full ring-4 ring-card">
                    <Image
                      src={portrait(agent.src, 160)}
                      alt={agent.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-medium tracking-tight">
                    {agent.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {agent.title}
                  </p>

                  <p className="mt-5 rounded-sm bg-accent px-4 py-3 text-sm tabular-nums">
                    {agent.license}
                    <span className="mt-1 block text-muted-foreground tabular-nums">
                      {agent.closed} closed · {agent.areas}
                    </span>
                  </p>

                  <a
                    href={`mailto:${agent.email}`}
                    className={cn(
                      reach,
                      "mt-5 inline-flex text-sm underline-offset-4 hover:underline",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    )}
                  >
                    Write to {agent.name.split(" ")[0]}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Two buttons close the panel, which is the reference's own foot.
            Neither is a second roster: one goes to the book these nine hold,
            the other to the form at the page's foot. */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            render={<Link href="/listings" />}
            className="rounded-full"
          >
            Every home they hold
          </Button>
          <Button render={<a href="#book" />} className="rounded-full">
            Book a viewing
          </Button>
        </div>
      </div>
    </section>
  );
}
