import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { Building03Icon } from "@hugeicons/core-free-icons";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The title block every inner page opens with. It was `ListingsHeader` until
// /neighborhoods wanted the same block with its own two figures in it, and the
// second use is a component — two hand-written copies would agree on the day
// they were written and disagree by the third edit, and the odd one out is
// invisible in review and obvious on the page.
//
// The reference is a title block and nothing else: an eyebrow, a headline with
// a lot of air under it, then a low row of two oversized figures on the left
// with a paragraph set out to the right of them. The air is the whole idea —
// the figures land far enough below the headline that they read as a second
// beat rather than as a caption.
//
// Two figures, and the row is built for two. The reference's proportion is
// `1fr 1fr 1.2fr`, so a third would have to come out of the paragraph's column
// and it is the paragraph that carries the page's argument.
//
// A detail route opens with a breadcrumb where a browse route opens with the
// badge, and anything under the block belongs *inside* this section — `main` is
// one flex column with a 10rem gap, so a way back mounted beside this component
// lands 160px from the heading it belongs to. Both are slots here for that
// reason rather than for flexibility's sake.
export function PageHeader({
  eyebrow,
  icon,
  heading,
  figures,
  lede,
  back,
  children,
}: {
  eyebrow: string;
  icon?: typeof Building03Icon;
  heading: string;
  /** An oversized value over a caption the caller breaks itself, with `\n`
      where the reference breaks it: two short lines under the figure rather
      than one long one beside it. */
  figures: [
    { value: string; caption: string },
    { value: string; caption: string },
  ];
  /** Rich, because every page so far sets a figure inside this sentence. */
  lede: ReactNode;
  /** The way back, on a detail route. A link rather than the browser's own
      button: a visitor who landed here off a search never pressed the index,
      and history.back() would take them off the site. */
  back?: { href: string; label: string };
  /** Anything the page hangs off the foot of its title block — a photo band, a
      strip of controls. Inside this section so the rhythm above it is the
      section gap and the rhythm to it is not. */
  children?: ReactNode;
}) {
  return (
    <section
      // One top padding for every page that opens with this block. The
      // breadcrumb used to buy a tighter one because it was a smaller thing to
      // open on; sharing the badge's row, it is the same thing to open on, and
      // an h1 that lands 32px higher on the detail routes than on the browse
      // ones is the inconsistency that trade was paying for.
      //
      // Halved below sm. 96px of air over a headline is generous on a desktop
      // screenful and most of a phone's first one — the same gap that reads as
      // composure at 1200px reads as a page that failed to load at 375.
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8 pt-12 sm:pt-24"
    >
      {/* One row, not two stacked ones. A breadcrumb over a badge over a
          headline is three beats before the page says its own name, and it
          pushed the h1 119px below the bar where the browse pages put it at 96.
          Sharing a line reads as a trail and gives the height back.

          The wrapper is also load-bearing on its own: the link and the Eyebrow
          are both `inline-flex`, so left as loose siblings they *already* laid
          out on one line — with the link sitting inside the badge's row rather
          than beside it. A flex parent is what puts them on one baseline, and
          it is why the listing page's own breadcrumb is inside a flex row. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        {back ? (
          <Link
            href={back.href}
            className={cn(
              reach,
              "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            <ChevronLeftIcon className="size-4" aria-hidden />
            {back.label}
          </Link>
        ) : null}

        {/* Off below sm, where the two do not fit on one line: wrapped, the
            separator is a dot left dangling at the end of the first row, which
            reads as a typo rather than as a trail. The row's own gap does the
            separating there. */}
        {back ? (
          <span
            aria-hidden
            className="hidden text-sm text-muted-foreground/60 sm:block"
          >
            /
          </span>
        ) : null}

        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
      </div>

      <SectionHeading as="h1" className="mt-6 max-w-[18ch]">
        {heading}
      </SectionHeading>

      {/* The reference's low row: figures left, paragraph right, both landing
          on one baseline a long way under the headline. */}
      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
        {figures.map((figure) => (
          <div key={figure.value}>
            <p className="text-4xl tracking-tighter tabular-nums">
              {figure.value}
            </p>
            <p className="mt-4 text-sm whitespace-pre-line text-muted-foreground">
              {figure.caption}
            </p>
          </div>
        ))}

        <p className="text-base text-muted-foreground">{lede}</p>
      </div>

      {children ? <div className="mt-16 md:mt-20">{children}</div> : null}
    </section>
  );
}
