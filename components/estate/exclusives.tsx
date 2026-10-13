import Image from "next/image";
import Link from "next/link";
import { LockKeyIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eyebrow } from "@/components/estate/eyebrow";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// The reference gives each tick its own hue. This palette spends one vivid
// colour and it is already on the action, so the ticks share the brand and are
// separated by the hairlines the reference puts between them.
const points = [
  "The seller asked us not to advertise it: a move already planned, a divorce, a tenant still in place",
  "It never reaches a portal, so it is never marked stale, never cut in public and never re-listed",
  "Registered buyers see it first, usually a week before it could reach a portal, and often it never does",
];

export function Exclusives() {
  return (
    <section
      id="exclusives"
      className="reveal mx-auto grid w-full max-w-[1200px] gap-14 px-6 sm:px-8 lg:grid-cols-[45fr_55fr] lg:gap-16"
    >
      <div className="flex flex-col">
        <Eyebrow icon={LockKeyIcon}>Not on any portal</Eyebrow>

        <SectionHeading className="mt-8 max-w-[14ch]">
          The homes we are asked not to advertise
        </SectionHeading>

        <p className="mt-6 max-w-[46ch] text-base text-muted-foreground">
          A private exclusive is a home we are selling for an owner who does not
          want a sign on the lawn. You will not find these anywhere else,
          because there is nowhere else they appear.
        </p>

        <Link
          href="/contact"
          className={cn(buttonVariants(), reach, "mt-9 w-fit rounded-full")}
        >
          Request access
        </Link>

        {/* The reference drops its tick list to the foot of the column, well
            clear of the copy above it, with a hairline under every row rather
            than around the group. mt-auto keeps that gap at whatever height the
            photo column ends up. */}
        <ul className="mt-14 lg:mt-auto lg:pt-14">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3.5 border-b py-4">
              <HugeiconsIcon
                icon={Tick02Icon}
                size={18}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-primary"
                aria-hidden
              />
              <span className="text-base text-muted-foreground">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative h-[320px] overflow-hidden rounded-lg sm:h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1280&q=75"
            alt="A low concrete house alongside a long swimming pool"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
          {/* The reference floats a white card low on its photo. Here that card
              is the whole argument of the section: everything a listing card
              normally carries, except the one field that would let you go
              around us. */}
          <div className="absolute right-4 bottom-4 left-4 rounded-lg bg-card p-5 sm:right-auto sm:max-w-[340px]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-base font-medium tabular-nums">$2,850,000</p>
              <span className="flex items-center gap-2 rounded-full bg-chip px-3 py-1 text-sm text-primary">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-primary"
                />
                Exclusive
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground tabular-nums">
              5 beds · 4 baths · 3,650 sqft · Chestnut Hill
            </p>
            <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
              Address released to registered buyers
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* One saturated tile among neutral ones, which is what the
              reference's green tile becomes here — bg-chip rather than a
              second hue. */}
          <div className="rounded-lg bg-card shadow-soft p-6">
            <p className="text-sm font-medium">Off-market right now</p>
            <p className="mt-5 text-3xl tracking-tight tabular-nums">41</p>
            <p className="mt-2 text-sm text-muted-foreground">
              homes across Greater Boston, held by our agents and shown by
              appointment
            </p>
          </div>

          <div className="rounded-lg shadow-soft bg-card p-6">
            <p className="text-sm font-medium">How access works</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-chart-1"
                />
                Register, which takes about a minute
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-chart-3"
                />
                An agent releases what matches, same day
              </li>
            </ul>
            {/* The reference closes this tile with a ring gauge. A ring is a
                data fill: it encodes a value rather than a surface, so neither
                the whisper band nor the ink floor governs it — it runs on
                --chart-1, the brand hue's own ramp. */}
            <div className="mt-6 flex items-center gap-4 border-t pt-5">
              <svg
                viewBox="0 0 36 36"
                className="size-14 shrink-0 -rotate-90"
                aria-hidden
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="4"
                  className="stroke-muted"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="stroke-chart-1"
                  strokeDasharray="58.5 97.4"
                />
              </svg>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground tabular-nums">
                  3 in 5
                </span>{" "}
                of these sell before they would ever have been listed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
