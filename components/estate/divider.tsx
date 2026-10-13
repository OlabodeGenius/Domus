import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// The rule between two sections, in the two forms this page uses.
//
// Not `border-t` on the section: that draws across the section's whole box,
// which is the container *plus* its 32px gutters, so the line overshoots the
// column it is dividing by that much on both sides. A rule wider than the
// content it separates reads as a mistake rather than as a rule. This one is
// laid in the same container the content is, so it starts and stops where the
// content does.
//
// Given a label it becomes the same rule broken around a word, which is what
// the logo wall opens with — that row was always a divider, so it is this
// component rather than a second copy of the idea.
export function Divider({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {children ? (
        <div className="flex items-center gap-4">
          <Rule />
          <p className="shrink-0 text-xs tracking-widest text-muted-foreground uppercase">
            {children}
          </p>
          <Rule className="flex-row-reverse" />
        </div>
      ) : (
        <div className="h-px bg-border" />
      )}
    </div>
  );
}

// The rule ends in a dot on the label side, so the pair points inward at the
// label. The right-hand one is the same element reversed rather than a second
// component with its parts swapped.
function Rule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("flex min-w-0 flex-1 items-center gap-1.5", className)}
    >
      <span className="h-px min-w-0 flex-1 bg-border" />
      <span className="size-1 shrink-0 rounded-full bg-border" />
    </span>
  );
}
