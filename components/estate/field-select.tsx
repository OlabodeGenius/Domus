"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { SearchField } from "@/components/estate/search-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// The hero search's dropdown, replacing the native <select> both search forms
// used to draw. Native was the right first answer — it costs no JavaScript and
// its keyboard behaviour is free — but it renders the operating system's list
// rather than the page's, so the one control a visitor is most likely to touch
// was the one control that did not belong to the design.
//
// What was worth losing that for came out of the reference, and it is three
// things a native listbox cannot do:
//
//   1. **A header block.** The reference opens its panel with who the menu is
//      about. Here that is the field itself and one line of context — the
//      median, what a bed means, where the inventory comes from. A native
//      option list has no room for a sentence.
//   2. **A trailing slot on the row.** The reference hangs a badge or a small
//      meter off the right of a row. Here it is how many homes the choice
//      leaves you with, which is the number that makes a price filter a
//      decision rather than a guess.
//   3. **A section label between groups.** "At least" over the bed counts, so
//      the list reads as a sentence rather than as six unexplained symbols.
//
// What is *not* hand-rolled is the listbox itself. Base UI is already in this
// project, and arrow keys, type-ahead, focus return, escape, click-outside and
// the hidden native <select> that makes the form submit are exactly the things
// a hand-written dropdown gets wrong. This file is the panel; the behaviour is
// the primitive's.
export function FieldSelect({
  field,
  className,
  value,
  onValueChange,
}: {
  field: SearchField;
  /** The trigger's presentation — a card's value line in one form, a bar segment in the other. */
  className?: string;
  /** Given as a pair, the field is controlled and something outside it can
      read the choice. The portal home's search bar needs that — its count cell
      is the same four answers run through `matching()` — and the two forms that
      only submit still leave both off and stay uncontrolled. */
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const split = field.group?.from ?? field.options.length;
  const lead = field.options.slice(0, split);
  const tail = field.options.slice(split);

  return (
    <Select
      name={field.name}
      {...(onValueChange
        ? {
            value,
            // The primitive can hand back null when a selection is cleared,
            // and there is no cleared state in these menus — every field has
            // an "any" option instead. Falling back to the initial keeps the
            // caller's state a plain string rather than making four call
            // sites handle a case the UI cannot reach.
            onValueChange: (next: string | null) =>
              onValueChange(next ?? field.initial),
          }
        : { defaultValue: field.initial })}
    >
      <SelectTrigger
        aria-label={field.label}
        className={cn(
          // The trigger is not a control of its own here: it is the value line
          // of whatever card or segment it sits in, so every edge shadcn gives
          // it comes off and the parent keeps its own focus treatment.
          "w-full cursor-pointer justify-between border-0 bg-transparent p-0 shadow-none",
          "data-[size=default]:h-auto focus-visible:ring-0",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent
        alignItemWithTrigger={false}
        align="start"
        sideOffset={14}
        className="w-(--anchor-width) min-w-72 p-2"
      >
        {/* The reference's identity block: a glyph, the name of the thing, and
            one line under it. Not selectable, and it is why this panel opts out
            of alignItemWithTrigger — an item-aligned menu would try to lay the
            chosen row over the trigger and slide the header off the top of it. */}
        <div className="flex items-start gap-3 px-3 pt-2 pb-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent">
            <HugeiconsIcon
              icon={field.icon}
              size={18}
              strokeWidth={1.5}
              aria-hidden
            />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium">{field.label}</p>
            {field.note ? (
              <p className="mt-1 text-sm text-muted-foreground">{field.note}</p>
            ) : null}
          </div>
        </div>

        <SelectGroup className="p-0">
          {lead.map((option) => (
            <Row key={option.value} value={option.value} homes={option.homes} />
          ))}
        </SelectGroup>

        {tail.length > 0 && field.group ? (
          <SelectGroup className="p-0">
            <SelectLabel className="px-3 pt-4 pb-2 text-sm">
              {field.group.label}
            </SelectLabel>
            {tail.map((option) => (
              <Row key={option.value} value={option.value} homes={option.homes} />
            ))}
          </SelectGroup>
        ) : null}
      </SelectContent>
    </Select>
  );
}

// rounded-sm, because these are rows inside a container rather than controls of
// their own — and the highlight is a fill one rung down, which is the whole cue.
function Row({ value, homes }: { value: string; homes?: string }) {
  return (
    <SelectItem
      value={value}
      indicator="start"
      className="rounded-sm py-2.5 text-sm"
      trailing={
        homes ? (
          <span className="ml-auto shrink-0 text-sm text-muted-foreground tabular-nums">
            {homes}
          </span>
        ) : null
      }
    >
      {value}
    </SelectItem>
  );
}
