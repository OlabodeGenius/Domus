"use client";

import { useState, useSyncExternalStore } from "react";
import {
  FavouriteIcon,
  Link04Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// Saved homes, held in localStorage and nowhere else. The brief dropped the
// header's "Saved homes" link because the feature needed state and a backend —
// half of that was true. The state is four lines of module scope; the backend
// is what a *shared* list across two devices would need, and no template demo
// is signing anyone in. So the list lives on the one machine that made it, and
// the buyer swaps `read`/`write` below for their own endpoint.
//
// One store rather than a hook per button: the heart on a card and the pill on
// the detail page are the same home, and two useStates would have disagreed
// the moment both were on screen.
const KEY = "domus:saved";

// A stable reference, because useSyncExternalStore compares snapshots by
// identity and a fresh [] every read is an infinite render.
const EMPTY: string[] = [];

let saved: string[] = EMPTY;
let read = false;
const listeners = new Set<() => void>();

const subscribe = (fn: () => void) => {
  // The first subscriber is what pulls the list off the disk, and it cannot
  // happen any earlier: this file renders on the server too, where there is no
  // localStorage, and a snapshot that differs between the two is a hydration
  // mismatch. React re-reads the snapshot immediately after subscribing, so
  // the fill lands on the first paint after mount without an effect.
  if (!read) {
    read = true;
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(stored)) saved = stored as string[];
    } catch {
      // A store that is corrupt, full or switched off is an empty one. A list
      // of saved homes is not worth an error boundary.
    }
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export function toggleSaved(id: string) {
  saved = saved.includes(id)
    ? saved.filter((one) => one !== id)
    : [...saved, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    // Written through anyway: the in-memory list is the one this session reads.
  }
  listeners.forEach((fn) => fn());
}

export const useSaved = () =>
  useSyncExternalStore(
    subscribe,
    () => saved,
    () => EMPTY,
  );

// Two drawings, not one component with a flag: a labelled pill standing on the
// page and a glass disc floating on a photograph are different objects, and the
// only thing they share is the store above.

/** The detail page's control: a labelled pill beside the way back. */
export function SavePill({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const on = useSaved().includes(id);

  return (
    <button
      type="button"
      onClick={() => toggleSaved(id)}
      aria-pressed={on}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition-colors",
        "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        reach,
        className,
      )}
    >
      {/* Colour in the icon and not in the label, which is the style's own
          move. Saved is the one state on this site that borrows a hue from
          outside the palette: a heart is red everywhere a visitor has ever
          seen one, and a filled near-black heart reads as a pressed button
          rather than a home somebody kept. */}
      <HugeiconsIcon
        icon={FavouriteIcon}
        size={16}
        strokeWidth={1.5}
        className={cn(on && "fill-rose-500 text-rose-500")}
        aria-hidden
      />
      {on ? "Saved" : "Save"}
    </button>
  );
}

/** The card's control: a glass disc in the corner of the photograph. */
export function SaveToggle({
  id,
  label,
  className,
}: {
  id: string;
  /** Which home this one saves. A grid or a result column draws one of these
      per card, and without it a screen reader hears the same three words
      fifteen times with nothing to tell them apart. */
  label?: string;
  className?: string;
}) {
  const on = useSaved().includes(id);
  const what = label ? `${on ? "Remove" : "Save"} ${label}` : undefined;

  return (
    <button
      type="button"
      onClick={() => toggleSaved(id)}
      aria-pressed={on}
      aria-label={what ?? (on ? "Remove from saved homes" : "Save this home")}
      className={cn(
        // Glass rather than an opaque pill: it sits on a photograph whose
        // colour is not ours to predict, and the blur is what keeps the glyph
        // legible over a white kitchen and a dark facade alike.
        "grid size-9 place-items-center rounded-full bg-card/80 backdrop-blur-sm transition-colors",
        // Drawn at 36 and reaching 40, and on both axes rather than one:
        // `reach` is written for a pill, which is only short vertically. This
        // is a disc, so it takes its own inset instead.
        "relative after:absolute after:-inset-0.5 after:content-['']",
        "hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        size={16}
        strokeWidth={1.5}
        className={cn(on && "fill-rose-500 text-rose-500")}
        aria-hidden
      />
    </button>
  );
}

/** Copies the page's own URL. The one share sheet that needs no service. */
export function ShareButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm transition-colors",
        "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        reach,
        className,
      )}
    >
      <HugeiconsIcon
        icon={copied ? Tick02Icon : Link04Icon}
        size={16}
        strokeWidth={1.5}
        aria-hidden
      />
      {/* aria-live so the confirmation is announced rather than only seen —
          the label is the whole feedback this control gives. */}
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
