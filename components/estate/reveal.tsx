"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The whole reveal layer, mounted once, rather than a wrapper component around
// each of the twelve sections. Sections stay server components and none of them
// has to know this exists — they carry one class and nothing else.
//
// Querying the DOM from React is not how state is meant to flow, and that is
// the point: this is not state. It is decoration bolted on after the page has
// already rendered correctly without it, which is the only shape a reveal
// animation is allowed to have in a template someone else will ship.
//
// The ordering below is the whole safety argument, so it is worth stating
// plainly: **nothing is hidden until the observer itself says it is off
// screen.** The obvious version hides all twelve up front and lets the observer
// reveal them, and it has one catastrophic failure — an observer that never
// fires leaves a blank page. Here the same callback owns both directions, so
// an observer that never fires leaves the page exactly as it was rendered.
//
// **No `.reveal` section may sit inside a `<Suspense>` boundary, and this file
// is why `cacheComponents` is off.** `data-reveal` is written onto an element
// React rendered, and React compares attributes when it hydrates. Today the
// whole tree hydrates in one pass before this effect runs, so there is nothing
// to disagree about. A boundary breaks that: what is inside it hydrates after
// this observer has already marked it, and React logs a mismatch it then
// refuses to patch. Partial prerendering does the same thing to every route at
// once, by splitting layout and page hydration everywhere.
//
// Measured, not assumed — a boundary on /listings, /agents and /guides warned
// on those three; the flag warned on all twelve; production was clean either
// way. The whole account, and what it would cost to keep the prerender, is in
// next.config.ts.
//
// The conflict is this component writing to React's DOM from the layout. Moving
// that state into the sections themselves, or into the CSS route globals.css
// rejects on its own terms, takes the constraint with it.
//
// It is mounted in the root layout, which is what makes the pathname the
// effect's one dependency rather than an empty array. The layout does not
// remount on a route change, so an effect that ran once would hold an observer
// pointed at the sections of whichever page the visitor happened to open first
// — every page after it renders with no reveal at all, and nothing says so,
// because the failure mode here is a page that looks finished.
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const sections = [...document.querySelectorAll<HTMLElement>(".reveal")];
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Anything on screen in the first callback was never hidden, so
            // this is a no-op for it rather than a fade from nothing.
            el.dataset.reveal = "shown";
            io.unobserve(el);
          } else if (!el.dataset.reveal) {
            el.dataset.reveal = "pending";
          }
        }
      },
      // A tenth of the viewport of overlap before it counts, so the section is
      // committed to being on screen rather than one pixel into it.
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of sections) io.observe(el);

    // Switching the OS setting mid-visit should not leave a section stuck at
    // opacity 0 waiting for a scroll the user has stopped making.
    const release = () => {
      if (!reduced.matches) return;
      io.disconnect();
      for (const el of sections) delete el.dataset.reveal;
    };
    reduced.addEventListener("change", release);

    return () => {
      io.disconnect();
      reduced.removeEventListener("change", release);
    };
  }, [pathname]);

  return null;
}
