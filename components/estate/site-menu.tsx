"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Drawer } from "@base-ui/react/drawer";
import {
  ArrowDown01Icon,
  Call02Icon,
  Cancel01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logo } from "@/components/estate/logo";
import { nav } from "@/components/estate/nav-links";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The bar below 1024, and it carries the whole navigation rather than a
// shortened copy of it. What stood here was six flat links wrapping onto two
// rows under the mark — which had two faults worth naming, because both are
// what this file is answering:
//
//   1. **It was a second navigation.** Six labels chosen to fit, against the
//      two menus and twenty-three rows the wide bar offers. Two lists of a
//      site's own pages drift the first time a route is added, and only one of
//      them was ever going to be updated.
//   2. **It was 140px of sticky bar on a 390px phone.** A third of the fold,
//      on every scroll of every page. The bar is now one row at 64px and the
//      rest of it is behind a press.
//
// The groups are native `<details name="site-menu">` — the exclusive-accordion
// trick /faq and the fees table already use here. One open at a time, no state,
// no JavaScript, and it works in a sheet a browser has printed. Base UI ships
// an Accordion and it is not imported: it would be a third disclosure mechanism
// on one site to buy an animation the page can do without.
//
// The sheet itself *is* Base UI, because the four things it has to get right —
// focus trap, scroll lock, escape, and a swipe that tracks the finger — are the
// four a hand-rolled sheet gets wrong. The transform, transition and `--bleed`
// classes below are the vendor's own recipe kept intact; `--bleed` is what
// stops an iOS rubber-band scroll showing the page through the sheet's edge,
// and it is the kind of mechanic that breaks when it is tidied. Only the
// colours and the radius are this style's.
// The class lands on the trigger rather than on a wrapper, because Drawer.Root
// renders no element of its own — and hiding the trigger is enough: the sheet
// is portalled and only exists once something has opened it.
export function SiteMenu({ className }: { className?: string }) {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger
        aria-label="Open menu"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          // reach's icon-only variant: a 40px control is short on both axes, so
          // the target grows a hair on each rather than only vertically.
          "relative after:absolute after:-inset-0.5 after:content-['']",
          className,
        )}
      >
        <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.5} />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-foreground opacity-[calc(0.25*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

        {/* z-50 on both, the same rung the bar itself is on: a portal at the
              body paints above a sticky header only if it is *given* a
              z-index, and the header's backdrop-blur has already made it a
              stacking context. Tied on 50, the later element in the DOM wins,
              and the portal is always the later element — which is exactly how
              the nav panels clear the bar too. Without it the bar draws over
              the top of the sheet and the close button is unpressable. */}
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-stretch justify-end">
          {/* Square on the outer edge and round on the inner one: the sheet is
              flush to the screen edge, and a radius drawn against the bezel is
              a gap, not a corner. */}
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] -mr-[3rem] h-full w-[calc(22rem+3rem)] max-w-[calc(100vw-3rem+3rem)] touch-auto overflow-y-auto overscroll-contain rounded-l-lg bg-popover pr-[3rem] text-popover-foreground shadow-soft-lg outline-none transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [transform:translateX(var(--drawer-swipe-movement-x))] data-ending-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+2px))] data-swiping:select-none supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[22rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:pr-0">
            <Drawer.Content className="flex min-h-full flex-col gap-6 p-6">
              {/* The mark rather than the word Menu: the sheet came out of a
                  bar that has the mark in it, and repeating where you are beats
                  naming what you opened. The heading a dialog owes a screen
                  reader is still there, unseen. */}
              <div className="flex items-center justify-between gap-4">
                <Drawer.Title className="sr-only">Menu</Drawer.Title>
                <Logo className="h-9 w-auto" aria-hidden />
                <Drawer.Close
                  aria-label="Close menu"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "relative after:absolute after:-inset-0.5 after:content-['']",
                  )}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={1.5}
                  />
                </Drawer.Close>
              </div>

              <nav className="flex flex-col">
                {nav.map((entry) =>
                  "href" in entry ? (
                    <Row key={entry.label} href={entry.href} lead>
                      {entry.label}
                    </Row>
                  ) : (
                    <details
                      key={entry.label}
                      name="site-menu"
                      className="group/menu border-b last:border-b-0"
                    >
                      <summary
                        className={cn(
                          reach,
                          "flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-base transition-colors",
                          "hover:text-muted-foreground [&::-webkit-details-marker]:hidden",
                        )}
                      >
                        {entry.label}
                        <HugeiconsIcon
                          icon={ArrowDown01Icon}
                          size={12}
                          strokeWidth={2}
                          aria-hidden
                          className="shrink-0 text-muted-foreground transition-transform duration-200 group-open/menu:rotate-180"
                        />
                      </summary>

                      {/* Indented one step and tinted, so an open group reads as
                          a tray under its label rather than as more of the same
                          list. `bg-accent` is the whisper — the sheet is the
                          rung above the page, and indoors this is the first
                          step down from it. */}
                      <div className="mb-3 flex flex-col gap-4 rounded-sm bg-accent px-4 py-4">
                        {entry.columns.map((column) => (
                          <div key={column.head}>
                            <p className="pb-1 text-xs tracking-widest text-muted-foreground uppercase">
                              {column.head}
                            </p>
                            {column.rows.map((link) => (
                              <Row key={link.href} href={link.href}>
                                {link.label}
                                {link.trail ? (
                                  <span className="text-xs text-muted-foreground tabular-nums">
                                    {link.trail}
                                  </span>
                                ) : null}
                              </Row>
                            ))}
                          </div>
                        ))}
                      </div>
                    </details>
                  ),
                )}
              </nav>

              {/* Pinned to the foot by the margin rather than by a fixed strip:
                  the sheet scrolls, and a bar stuck over a list of links is a
                  bar covering the last two of them. */}
              <div className="mt-auto flex flex-col gap-3 border-t pt-6">
                <Drawer.Close
                  nativeButton={false}
                  render={<a href="tel:+16175550148" />}
                  className={cn(
                    reach,
                    "flex items-center gap-3 text-sm text-foreground tabular-nums transition-colors hover:text-muted-foreground",
                  )}
                >
                  <HugeiconsIcon
                    icon={Call02Icon}
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden
                    className="text-muted-foreground"
                  />
                  (617) 555-0148
                </Drawer.Close>

                <Drawer.Close
                  nativeButton={false}
                  render={<Link href="/contact" />}
                  className={cn(buttonVariants(), "w-full rounded-full")}
                >
                  Book a viewing
                </Drawer.Close>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// Every link in the sheet closes it. A Next.js <Link> inside a modal navigates
// underneath and leaves the sheet standing over the page it just left, which
// reads as a broken press — so the close is the link rather than a wrapper
// around it.
function Row({
  href,
  lead,
  children,
}: {
  href: string;
  /** A top-level label, set at the same weight as the group summaries beside
      it. The rows inside a tray are a step quieter. */
  lead?: boolean;
  children: ReactNode;
}) {
  return (
    <Drawer.Close
      nativeButton={false}
      render={<Link href={href} />}
      className={cn(
        reach,
        "flex items-center justify-between gap-4 transition-colors",
        lead
          ? "border-b py-3 text-base hover:text-muted-foreground"
          : "py-2 text-sm text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Drawer.Close>
  );
}
