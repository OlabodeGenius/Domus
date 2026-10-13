"use client";

import { useState } from "react";
import { getDefaultClassNames } from "react-day-picker";
import { Calendar03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useOnClient } from "@/components/estate/on-client";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// The half of a viewing a form cannot ask for: which day, and what time. The
// booking form at the foot of the page takes the six fields; this takes the
// slot, and it is the control a visitor standing on one listing actually wants.
//
// A month grid rather than a rail of the next seven days, which is what stood
// here first: a week is not long enough for the viewer who wants the Saturday
// after next, and they are the reason this control exists at all. The price of
// that reach is a reader counting squares, and the grid opens on tomorrow
// already selected so the common case is still one press.
//
// No backend, and none needed for the thing this demonstrates — the confirmed
// panel is state. `setBooked` below is the one line a buyer rewires.
const slots = ["9:00 am", "11:00 am", "2:00 pm", "4:00 pm"];

const startOfDay = (from: Date) => {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  return date;
};

const addDays = (from: Date, count: number) => {
  const date = startOfDay(from);
  date.setDate(date.getDate() + count);
  return date;
};

export function ViewingScheduler({ agent }: { agent: string }) {
  const onClient = useOnClient();
  const today = onClient ? startOfDay(new Date()) : null;

  // Undefined rather than tomorrow, so nothing has to be seeded in an effect:
  // the day is the pick when there is one and tomorrow when there is not.
  const [picked, setPicked] = useState<Date>();
  const [month, setMonth] = useState<Date>();
  const day = picked ?? (today ? addDays(today, 1) : undefined);

  // The first slot, not null: a card that opens with its own call to action
  // greyed out is asking the reader to work out what unlocks it. Nine in the
  // morning is also the honest default — it is the one an agent offers first.
  const [time, setTime] = useState(slots[0]);
  const [booked, setBooked] = useState<{ day: Date; time: string } | null>(
    null,
  );

  const long = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  if (booked) {
    return (
      <div className="mt-8 rounded-sm bg-accent p-6">
        <p className="flex items-center gap-2 text-sm font-medium">
          <HugeiconsIcon
            icon={Tick02Icon}
            size={16}
            strokeWidth={2}
            className="text-primary"
            aria-hidden
          />
          Viewing requested
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {long(booked.day)}, {booked.time}
          </span>{" "}
          with {agent}. We will call to confirm within the hour.
        </p>
        <button
          type="button"
          onClick={() => setBooked(null)}
          className={cn(
            "mt-4 text-sm underline-offset-4 hover:underline",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            reach,
          )}
        >
          Pick another time
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t pt-8">
      <p className="flex items-center gap-2 text-sm font-medium">
        <HugeiconsIcon
          icon={Calendar03Icon}
          size={16}
          strokeWidth={1.5}
          className="text-primary"
          aria-hidden
        />
        Pick a day to walk through
      </p>

      {/* The registry calendar, and the only things passed to it are the ones
          this card owns.

          `w-full` over the registry's `w-fit`, composed with its own root class
          rather than fought with a second width utility — two of those on one
          element are settled by stylesheet order, not by which was written
          last. The month then fills the rail the way the slots below do; left
          at `w-fit` it is a 280px block floating above a full-width row.

          The cap is the other half of that: 22.25rem is the rail's own content
          width, so on the rail the grid is exactly full width and below lg —
          where this card stops being a rail and takes the whole page — it stays
          the size it is here instead of growing a 90px square per day.

          Full width and 40px days are not the same number: seven days across
          356px is a 51px column. So the column stretches and the day inside it
          does not — `max-w-10` caps the button and `mx-auto` centres it, which
          leaves the week spanning the card while each target stays the size it
          was. A max-width is also the one way to beat the button's own `w-full`
          without two width utilities racing on one element.

          `td > button` rather than `[data-day]`, because react-day-picker puts
          that attribute on the cell as well as on the button inside it — capping
          both is what pins the column to 40px, and then the row runs 48px short
          of the weekday letters above it, which are `flex-1` and stay on 51px.
          A header that has stopped sitting over its own column is the visible
          half of that; the invisible half is a calendar drawn 308px wide inside
          a 356px box, which is the thing the border was hiding.

          The cell gets `flex-1` to sit back on the header's grid, and
          `aspect-auto` to drop the square it no longer needs — left square the
          51px column would make every row 51px tall to hold a 40px button.

          `--cell-size` is the floor, not the width: the day cell carries
          `min-w-(--cell-size)`, so anything wider than a seventh of the
          narrowest card this card ever is — a phone — overflows it. The columns
          stretch past it on their own wherever there is room.

          No edge and no fill: the month is already the biggest thing on the
          card, and a box drawn round it only repeats the card's own border one
          rung in. `bg-background` would be the wrong fill anyway — that is the
          page, a rung *below* the card it would be sitting on. */}
      {today ? (
        <Calendar
          mode="single"
          selected={day}
          onSelect={(next) => next && setPicked(next)}
          month={month ?? day}
          onMonthChange={setMonth}
          disabled={{ before: addDays(today, 1) }}
          startMonth={today}
          classNames={{
            root: cn(
              getDefaultClassNames().root,
              "mx-auto w-full max-w-[22.25rem]",
            ),
          }}
          // Round days, the shape every booking calendar uses. The button reads
          // its corner from `--cell-radius` rather than `rounded-full` because
          // the registry rounds the first and last column's button from the
          // cell, in that same token: a button asking for `calc(infinity * 1px)`
          // on three corners and 9999px on the fourth gets every corner scaled
          // down to the smallest that fits, and Sunday comes out square.
          //
          // `today` is the one state the registry tints on the cell rather than
          // on the button, so its square came out the width of the column — 51px
          // against everyone else's 40. The tint moves onto the button and the
          // month goes back to one size.
          //
          // A day already gone is struck through, the way every booking
          // calendar does it: the 50% the registry fades it to says "quieter",
          // and a reader still has to try the square to learn it is shut. The
          // rule through the number says it before the press.
          className="mt-4 bg-transparent p-0 [&_td>button:disabled]:line-through [--cell-radius:9999px] [--cell-size:2rem] [&_td]:aspect-auto [&_td]:flex-1 [&_td>button]:mx-auto [&_td>button]:max-w-10 [&_td>button]:rounded-(--cell-radius) [&_td[data-today]]:bg-transparent [&_td[data-today]>button]:bg-muted"
        />
      ) : (
        // Same height as the grid it stands in for, so the card does not jump
        // under the reader when the real month arrives.
        <div
          aria-hidden
          className="mt-4 h-[20rem] animate-pulse rounded-sm bg-accent"
        />
      )}

      <div
        role="group"
        aria-label="Time"
        className="mt-4 grid grid-cols-2 gap-2"
      >
        {slots.map((one) => (
          <button
            key={one}
            type="button"
            onClick={() => setTime(one)}
            aria-pressed={one === time}
            className={cn(
              "rounded-full py-2 text-sm tabular-nums transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              one === time
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-accent hover:bg-muted",
            )}
          >
            {one}
          </button>
        ))}
      </div>

      {/* 44px, and no `reach` behind it: that pseudo-element exists to give a
          36px control a 40px target, and this control is already past both. */}
      <Button
        type="button"
        size="lg"
        disabled={!day || !time}
        onClick={() => day && time && setBooked({ day, time })}
        className="mt-5 w-full rounded-full"
      >
        Request this time
      </Button>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {day && time
          ? `${long(day)} at ${time}. An agent confirms by phone.`
          : "Choose a time to continue."}
      </p>
    </div>
  );
}
