import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LicenseIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agents } from "@/components/estate/agents";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The roster above prints nine license numbers and says nothing about what one
// is worth. This section is that sentence: Massachusetts keeps the record, the
// record is public, and the four things the firm carries on top of it are here
// rather than in a paragraph nobody reads.
//
// The reference stacks a photograph carrying one overlay above two tinted
// tiles, with the copy, the button and three ruled tick rows opposite. What
// this borrows is that arrangement; the overlay is a register entry rather than
// a heart-rate card, and it is the one place on the site where the artefact
// itself is drawn.

// The state's own license lookup. A buyer selling into another state points
// this at their own register, which is why it is a constant at the top of the
// file rather than an href buried in the markup.
const REGISTER = "https://elicensing.mass.gov/CitizenAccess/";

const office = {
  src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1280&q=75",
  alt: "An office corridor behind glass partitions, lit from the far end",
};

const promises = [
  "Every number on this page matches a record the state keeps, not one we wrote.",
  "A broker reads every offer before it leaves the office, including ours.",
  "Fair housing training runs once a year, and the notice sits on our About page.",
];

// The card drawn over the photograph. The founding partner's entry, because it
// is the one a seller checks first and the one the roster puts at its head.
const [lead] = agents;

export function AgentLicense() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-20">
        <div className="flex flex-col">
          <Eyebrow icon={LicenseIcon}>License and cover</Eyebrow>

          <SectionHeading className="mt-6 max-w-[16ch]">
            Look any of us up before you call
          </SectionHeading>

          <p className="mt-6 max-w-[44ch] text-base text-muted-foreground">
            Massachusetts publishes every salesperson and broker license it
            issues, with the status and the renewal date against the name. Ours
            are printed above so you do not have to ask for them.
          </p>

          <div className="mt-10">
            <Button
              render={
                <a href={REGISTER} target="_blank" rel="noreferrer noopener" />
              }
              className="rounded-full"
            >
              Open the state register
              <ArrowUpRightIcon className="size-4" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          </div>

          {/* The reference's ruled rows, low in the column. `mt-auto` rather
              than a fixed gap: the photo column opposite is the taller of the
              two, and the rows are what fills the difference. */}
          <ul className="mt-16 flex flex-col lg:mt-auto lg:pt-10">
            {promises.map((line, i) => (
              <li
                key={line}
                className={cn(
                  "flex items-start gap-4 py-5 text-base text-muted-foreground",
                  i > 0 && "border-t",
                )}
              >
                <HugeiconsIcon
                  icon={Tick02Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden
                />
                <span>
                  {line.startsWith("Fair housing") ? (
                    <>
                      Fair housing training runs once a year, and the notice
                      sits on our{" "}
                      <Link
                        href="/about#fair-housing"
                        className={cn(
                          reach,
                          "underline underline-offset-4 hover:no-underline",
                          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                        )}
                      >
                        About page
                      </Link>
                      .
                    </>
                  ) : (
                    line
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* overflow-hidden on the frame that clips the photo, never on the
              wrapper, or the card breaking its corner gets clipped with it. */}
          <div className="relative">
            <div className="relative aspect-3/2 overflow-hidden rounded-lg">
              <Image
                src={office.src}
                alt={office.alt}
                fill
                sizes="(min-width: 1024px) 640px, 90vw"
                className="object-cover"
              />
            </div>

            {/* The register entry, opaque and floating, so it is legible over
                whatever part of the photograph it lands on.

                It only floats from `sm` up. At 390 the card is as tall as the
                photograph is and covers everything but two slivers of it, which
                is an overlay that has eaten its own frame — so on a phone it
                sits under the picture and merely overlaps its foot. */}
            <div className="relative -mt-8 mx-4 rounded-lg bg-card p-6 shadow-soft sm:absolute sm:-bottom-8 sm:left-6 sm:mx-0 sm:mt-0 sm:w-[min(22rem,calc(100%-3rem))]">
              <p className="text-sm text-muted-foreground">
                Massachusetts register
              </p>
              <p className="mt-3 text-xl tracking-tight">{lead.name}</p>
              <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                {lead.license} · Salesperson since {lead.since}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                Active · renews 31 March 2027
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-accent p-6">
              <p className="text-sm text-muted-foreground">
                Errors and omissions
              </p>
              <p className="mt-4 text-3xl tracking-tighter tabular-nums">$2M</p>
              <p className="mt-2 text-sm text-muted-foreground">
                per claim, renewed each January and carried on every file we
                open
              </p>
            </div>

            <div className="rounded-lg bg-accent p-6">
              <p className="text-sm text-muted-foreground">Licenses current</p>
              <p className="mt-4 text-3xl tracking-tighter tabular-nums">
                {agents.length} of {agents.length}
              </p>
              {/* One dot per agent, which is the figure above drawn rather than
                  restated: nine of them, and they are countable. */}
              <ul aria-hidden className="mt-4 flex flex-wrap gap-1.5">
                {agents.map((agent) => (
                  <li
                    key={agent.name}
                    className="size-2 rounded-full bg-primary"
                  />
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                re-checked at each two-year renewal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
