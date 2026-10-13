import Link from "next/link";
import { Logo } from "@/components/estate/logo";
import { SiteMenu } from "@/components/estate/site-menu";
import { SiteNav } from "@/components/estate/site-nav";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The reference's idea was the ground: a tinted field holding the left half of
// the bar and stopping on a diagonal about two thirds across. It is gone at the
// user's ask, and what the removal showed is worth writing down — the wedge was
// carrying two jobs and only one of them was the shape.
//
// The second job was termination. A sticky bar over a scrolling page needs an
// edge, and the wedge was drawing one for the two thirds it covered while the
// remaining third relied on `bg-background/85` alone. A hairline does that job
// across the whole width for one class, and it is the cue this style names for
// something resting on the page rather than floating over it.
//
// What is genuinely lost is the arrangement's excuse: the bar is now four
// plain-bar references' worth of even strip, and the interest has to come from
// the nav instead. That is why the menus are here — the ground was the idea,
// and with it gone the panels are.
//
// Buy / Rent / Sell is the triad every US brokerage site studied opens with,
// and it is one trigger here rather than three: `nav-links.ts` folds it into a
// four-column Properties panel, and About lost its own panel in the same pass.
// Four labels where there were six, all of it before geography rather than
// after it. The labels and the routes live in that file — this one draws the
// bar and owns none of what is on it.
//
// Three tiers, and both boundaries are measured in the browser rather than
// picked off the breakpoint list. Mark 91 + nav 385 + Guides-and-pill 209 and
// two 24px gaps is 733 of content — 21 less than the six-label bar measured,
// which is the whole width the merge bought and not enough to move a tier:
//
//   < lg   the mark, the action, and the sheet. `site-menu.tsx` carries the
//          whole nav. This tier used to start at md, where the bar has 704px
//          to spend against a row that has never fit in it — so at exactly 768
//          the actions dropped onto a second row and the bar broke. That is
//          the bug this fixes.
//   ≥ lg   the full bar. 960 available against 733: 227 to spare.
//   ≥ xl   the number joins it, for another 149. At lg that would leave 78px,
//          which is not slack — it is one renamed label away from the same
//          wrap. It waits for 1280, where there is 254.
//
// One row at every width now, so nothing wraps and the bar can take a fixed
// height: 64 on a phone, 80 from lg. That matters more than it looks — a
// sticky bar is subtracted from every screenful the visitor scrolls, and the
// wrapping version was holding 140 of the 844 a phone has.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-6 px-6 sm:px-8 lg:h-20">
        {/* The supplied logo is already a lockup — mark and script side by side
            — so it stands in for the reference's wordmark rather than sitting
            beside it. 40px tall against 14px nav type: height is the knob a
            logo row is tuned with, and the aspect follows.
            The link carries the name, since the logo is a picture of one. */}
        <Link href="/" className={cn(reach, "shrink-0")}>
          <Logo className="h-10 w-auto" />
          <span className="sr-only">Domus</span>
        </Link>

        {/* The reference sets a domain after a hairline slash. A brokerage's
            equivalent is the number somebody rings, and it is the one thing in
            this bar that is worth putting in front of a visitor twice — it is
            in the footer too. `tabular-nums` because it is a figure. */}
        <span aria-hidden className="hidden text-muted-foreground xl:inline">
          /
        </span>
        <a
          href="tel:+16175550148"
          className={cn(
            reach,
            "hidden text-sm text-foreground tabular-nums transition-colors hover:text-muted-foreground xl:inline",
          )}
        >
          (617) 555-0148
        </a>

        <SiteNav className="mx-auto hidden lg:block" />

        <div className="ml-auto flex items-center gap-3 lg:gap-6">
          {/* Saved homes stood here and is gone: it needs an account and a
              backend, and a link to a feature the template cannot ship is
              worse than no link. Guides is a page that exists. */}
          <Link
            href="/guides"
            className={cn(
              reach,
              "hidden text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline",
            )}
          >
            Guides
          </Link>
          {/* Off below sm. The mark, this pill and the sheet measure 305 and
              a 390px phone offers 326, so it *fits* — by 21px, which is not a
              margin, it is the label. Rename this button and the bar breaks on
              the most common screen there is. So it waits for 640, and below
              that the sheet carries the same action at full width, one press
              away and far easier to hit than a pill wedged against a bezel. */}
          <Link
            href="/contact"
            className={cn(
              buttonVariants(),
              reach,
              "hidden rounded-full sm:inline-flex",
            )}
          >
            Book a viewing
          </Link>

          <SiteMenu className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
