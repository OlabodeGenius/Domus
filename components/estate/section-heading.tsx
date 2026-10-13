import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The display line every section opens with. It was a hand-written class string
// in twenty-one places, which is the second-use rule ignored twenty times over:
// the copies agreed on the day they were written and the odd one out is
// invisible in review and obvious on the page.
//
// The component owns the type and nothing else — `text-4xl md:text-5xl` is the
// scale's top pair (36 → 48, no rung between), `tracking-tighter` is the
// optical correction that starts at `text-4xl`, and the leading is the one
// Tailwind already pairs with each size, so there is no `leading-*` here to
// loosen the large step. `text-balance` because a headline is short enough for
// the browser to even the lines.
//
// What is left to the caller is what genuinely varies: the gap above it and the
// measure. Both answer to the section around them — `mt-6` under an eyebrow,
// nothing when the heading opens its own column — and a default here would only
// be overridden at a third of the call sites.
//
// `as` because two pages open with this at `h1` and eighteen sections carry it
// at `h2`. The tag is structure and the size is hierarchy; they are set
// separately on purpose.
export function SectionHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "text-4xl tracking-tighter text-balance md:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
