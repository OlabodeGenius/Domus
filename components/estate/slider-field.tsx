"use client";

import { useId } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// The second use is a component. The payment calculator on a listing page and
// the affordability panel on /home-2 draw the same control three times each,
// and two copies of the Base UI value-shape workaround below is one copy that
// gets fixed and one that keeps reporting NaN.
//
// The value rides the label rather than the thumb: it changes on every drag,
// and a figure that moves with the thumb is a figure the eye has to chase.
export function SliderField({
  label,
  value,
  min,
  max,
  step,
  now,
  onChange,
  hideLabel,
  className,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  now: number;
  onChange: (next: number) => void;
  /** The label goes to a screen reader only. For the one caller that already
      prints the figure directly above the track — the affordability ring — and
      would otherwise say the same thing twice, six pixels apart. It is hidden,
      not dropped: a slider with no accessible name is a slider nobody can
      operate without seeing it. */
  hideLabel?: boolean;
  className?: string;
}) {
  // Base UI hands the root's aria-labelledby down to the thumb's input, so the
  // label is associated without a `for` on a control that renders no input id.
  const labelId = useId();

  return (
    <div className={cn("min-w-[14rem] flex-1", className)}>
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
          hideLabel && "sr-only",
        )}
      >
        <span id={labelId} className="text-sm font-medium">
          {label}
        </span>
        <span className="text-sm tabular-nums text-muted-foreground">
          {value}
        </span>
      </div>
      <Slider
        aria-labelledby={labelId}
        min={min}
        max={max}
        step={step}
        // An array of one, not a bare number: the registry component counts
        // thumbs off `Array.isArray(value)` and falls back to `[min, max]` —
        // two of them — for anything else.
        value={[now]}
        // And it comes back in either shape. Base UI treats a one-element array
        // as a range on the way in and as a single value on the way out, so a
        // drag reports a number where the keyboard reports an array. Reading
        // only one of them is a NaN on the page the first time it is dragged.
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
        className={cn(hideLabel ? "mt-0" : "mt-6")}
      />
    </div>
  );
}
