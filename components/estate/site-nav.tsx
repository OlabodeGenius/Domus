"use client";

import Link from "next/link";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { nav } from "@/components/estate/nav-links";
import { cn } from "@/lib/utils";

// Two panel shapes on one bar: a plain dropdown (one column) and a large
// megamenu (four), beside two plain links. The two-column shape went out with
// the Sell menu when buy, rent and sell became one trigger — the same markup
// draws it, so a buyer lifting this bar gets a three-column panel by deleting a
// column from the big one rather than by finding a third example of it.
//
// Every href is a route or an anchor that exists. A megamenu is where dead
// links hide best: four columns of plausible labels look like a site map, and
// nobody presses all nineteen. These are the ten routes this template ships
// plus the home page's own section ids, and nothing else.
//
// The behaviour is Base UI's, already in the project. Hover intent with a
// close delay, the pointer travelling diagonally into a panel without it
// snapping shut, arrow keys, escape, focus return, and one popup that morphs
// its own width between menus rather than four that pop — those are the things
// a hand-rolled nav gets wrong, and they are the reason a bar is worth a client
// component at all.

// `closeOnClick` on every Link, because Base UI defaults it to false and that
// default is written for a nav that navigates: the browser unloads the document
// and takes the open panel with it. Next.js does not unload anything — it swaps
// the tree under a bar that never remounted — so without this the panel is
// still standing over the page it just sent you to, and the pointer has to
// leave the bar to dismiss it.
//
// A trigger and a plain link have to be the same object optically, or the bar
// reads as two rows of type at one height. 40px tall, so the hit target is met
// by the control rather than by `reach`'s pseudo-element.
const item =
  "inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm text-muted-foreground transition-colors select-none hover:text-foreground data-popup-open:text-foreground";

// A row rests on the popup's own white and darkens by one rung. Indoors the
// ladder has two steps and this is the first: `bg-muted` here would read as a
// pressed state on a surface this bright.
const row =
  "flex items-center justify-between gap-6 rounded-sm px-3 py-2 text-sm text-foreground no-underline transition-colors hover:bg-accent";

export function SiteNav({ className }: { className?: string }) {
  return (
    <NavigationMenu.Root
      // 100ms rather than the 50 Base UI defaults to. At 50 a pointer crossing
      // the bar on its way to the pill opens two panels behind it.
      delay={100}
      closeDelay={100}
      className={className}
    >
      <NavigationMenu.List className="flex items-center gap-1.5">
        {nav.map((entry) =>
          "href" in entry ? (
            <NavigationMenu.Item key={entry.label}>
              <NavigationMenu.Link
                closeOnClick
                render={<Link href={entry.href} />}
                className={item}
              >
                {entry.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={entry.label}>
              <NavigationMenu.Trigger className={item}>
                {entry.label}
                <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180">
                  {/* 12 rather than the 16 an inline icon takes elsewhere, at
                      the user's ask: this one is a punctuation mark on a label
                      rather than an icon beside it, and at 16 it read as a
                      second object in the trigger. */}
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={12}
                    strokeWidth={2}
                  />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>

              {/* The panel slides in from the side the pointer came from and
                  out toward the side it is going, which is what makes one
                  morphing popup read as one object rather than as a panel
                  being swapped. `data-activation-direction` is Base UI's. */}
              <NavigationMenu.Content
                className={cn(
                  "p-4 transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "data-starting-style:opacity-0 data-ending-style:opacity-0",
                  "data-starting-style:data-[activation-direction=left]:-translate-x-12",
                  "data-starting-style:data-[activation-direction=right]:translate-x-12",
                  "data-ending-style:data-[activation-direction=left]:translate-x-12",
                  "data-ending-style:data-[activation-direction=right]:-translate-x-12",
                )}
              >
                {/* One hairline between columns, drawn by `divide-x` so a
                    four-column panel and a one-column panel need no different
                    markup — the single column simply never draws one. */}
                <div className="flex divide-x">
                  {entry.columns.map((column) => (
                    <div
                      key={column.head}
                      className="min-w-[13rem] px-3 first:pl-0 last:pr-0"
                    >
                      <p className="px-3 pb-2 text-xs tracking-widest text-muted-foreground uppercase">
                        {column.head}
                      </p>
                      <ul className="flex flex-col">
                        {column.rows.map((link) => (
                          <li key={link.href}>
                            <NavigationMenu.Link
                              closeOnClick
                              render={<Link href={link.href} />}
                              className={row}
                            >
                              {link.label}
                              {link.trail ? (
                                <span className="text-xs text-muted-foreground tabular-nums">
                                  {link.trail}
                                </span>
                              ) : null}
                            </NavigationMenu.Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        {/* `fixed`, because the anchor is inside a sticky bar: an absolutely
            positioned portal at the body writes page coordinates, and the
            trigger stops having any the moment the page scrolls under it.

            The `before` block is the diagonal bridge — an invisible strip
            filling the 8px gap, so a pointer moving from the trigger to the
            panel never crosses bare page and never triggers the close. */}
        <NavigationMenu.Positioner
          sideOffset={8}
          // Centred on the trigger at the user's ask. It used to hang from the
          // trigger's left edge the way both references do, and what that
          // actually produced was a right-aligned panel: 864px of megamenu
          // hung at x=570 wants to end at 1434, so on a 1440 window the
          // collision shifted it back until its right edge kissed the rim, and
          // the alignment a reader saw was the window's rather than the bar's.
          //
          // Centred it clears the rim on its own — no shift, so the panel is
          // where the prop says it is. Below about 1150 the shift comes back,
          // which is the same clamp the old alignment lived under all the way
          // up to 1440 rather than a new fault.
          align="center"
          collisionPadding={{ left: 16, right: 16 }}
          collisionAvoidance={{ side: "none" }}
          positionMethod="fixed"
          className="z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:top-[-8px] before:right-0 before:left-0 before:h-2 before:content-[''] data-instant:transition-none"
        >
          {/* Shadow and no border. A popover has left the surface, so it takes
              the style's own lifted shadow; the hairline shadcn generates would
              be the resting cue drawn on a floating thing. */}
          <NavigationMenu.Popup className="h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-lg bg-popover text-popover-foreground shadow-soft-lg transition-[opacity,transform,width,height] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
