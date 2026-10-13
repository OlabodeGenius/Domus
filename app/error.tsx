"use client";

import Link from "next/link";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The other half of `not-found.tsx`. That file answers a path that was never
// there; this one answers a path that was, and threw on the way to the screen.
// Both are pages with somewhere to go rather than apologies, which is the only
// version of either worth shipping in a template — a buyer inherits whatever
// their own data does at 2am, and the two files are where it surfaces.
//
// `"use client"` is the convention's, not a choice: an error boundary holds
// `reset` and `reset` is a callback, so this file cannot be a server component.
// It sits under the root layout, so the bar and the footer are still drawn and
// the visitor is never stranded on a bare page. What it does *not* catch is a
// throw in the layout itself — that needs `global-error.tsx`, which ships its
// own <html> and <body> and is not worth the second shell here.
//
// No listings under it, unlike the 404. A page that just failed to render is
// the wrong moment to run three more cards through the same renderer.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="reveal mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 sm:px-8 pt-12 sm:pt-24 text-center">
      <Eyebrow>Error</Eyebrow>

      <SectionHeading as="h1" className="mt-8 max-w-[18ch]">
        This page stopped halfway
      </SectionHeading>

      <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
        The link is right and your connection is fine — whatever broke is on our
        side. Loading it again clears most of these. If it stops in the same
        place twice, an agent can pull the record up by hand.
      </p>

      {/* The pair every dead end on this site closes with, in the same order
          and under the same names — except the first is an action rather than a
          route, because there is a page here to retry. */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className={cn(buttonVariants(), reach, "rounded-full")}
        >
          Try again
        </button>
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

      {/* Next puts a digest on production errors and withholds the message, so
          this is the whole of what a visitor can carry to the person who can
          look it up. Absent in dev, where the overlay has already said more. */}
      {error.digest ? (
        <p className="mt-9 font-mono text-xs text-muted-foreground">
          {error.digest}
        </p>
      ) : null}
    </section>
  );
}
