import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { LockKeyIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

// One eyebrow for the whole page. Section 3's badge was the third hand-written
// treatment on this page — a dot-and-caps line in two sections, a bare caps line
// in the hero, this badge in a third — which is exactly the drift the
// second-use rule exists to stop. Whichever one wins, there has to be one.
//
// Worth knowing that this is not the eyebrow SKILL.md prescribes. That one is
// `text-xs uppercase tracking-widest text-muted-foreground` — smaller, quieter,
// and carrying no surface of its own. This is a badge: text-sm, sentence case,
// on a card a rung above whatever is behind it. It is a deliberate departure at
// the user's ask, and the thing to watch is that it puts a bordered surface at
// the top of every section, where the prescribed eyebrow puts nothing.
//
// The glyph carries the brand hue and the label stays ink. That mattered more
// when the hue was green; the page ships on Ink, where --primary is a warm
// near-black three points off --foreground, so the dot now reads as a bullet
// rather than as a colour. The split is kept anyway — it is what makes the
// component survive a buyer rotating the hue back to something vivid.
export function Eyebrow({
  icon,
  children,
  className,
}: {
  icon?: typeof LockKeyIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm",
        className,
      )}
    >
      {icon ? (
        <HugeiconsIcon icon={icon} size={16} strokeWidth={1.5} className="text-primary" aria-hidden />
      ) : (
        <span aria-hidden className="size-1.5 rounded-full bg-primary" />
      )}
      {children}
    </p>
  );
}
