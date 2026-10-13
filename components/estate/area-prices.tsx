"use client";

import { ChartColumnIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { areas } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { reach } from "@/components/reach";
import { cn, signed } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Six bars on one baseline, which is the only arrangement that answers the
// question this page keeps raising: not what Back Bay costs, but what Back Bay
// costs against the other five. A table would carry more columns and none of
// the comparison — a reader has to do the subtraction themselves.
//
// The bars start at zero and are scaled to the tallest, so the height is the
// figure rather than a flattering crop of it. A chart in a template gets read
// by somebody who will put their own numbers in it, and a baseline that is not
// zero is a lie they inherit.
const metrics = [
  {
    key: "median",
    label: "Median asking",
    of: (area: (typeof areas)[number]) => area.price,
    read: (area: (typeof areas)[number]) => area.median,
  },
  {
    key: "sqft",
    label: "Price per sq ft",
    of: (area: (typeof areas)[number]) => area.perSqft,
    read: (area: (typeof areas)[number]) => `$${area.perSqft.toLocaleString()}`,
  },
  {
    key: "days",
    label: "Days to first offer",
    of: (area: (typeof areas)[number]) => area.days,
    read: (area: (typeof areas)[number]) => `${area.days} days`,
  },
] as const;

// Both computed rather than written down, so the sentence under the chart
// cannot end up naming an area the data has since overtaken.
const fastest = areas.reduce((most, area) =>
  area.change > most.change ? area : most,
);
const flattest = areas.reduce((least, area) =>
  area.change < least.change ? area : least,
);

// The tallest bar in pixels, and the reason it is a number here rather than a
// percentage in the markup: a bar sized at `height: 74%` sits in a flex column
// beside its own figure, so the browser shrinks it to make room for the type —
// and shrink is proportional to the base, which takes more off the tall bars
// than off the short ones. The chart then reads as a flatter market than the
// book actually holds, which is the one thing a chart may not do.
const TALLEST = 300;

export function AreaPrices() {
  const [key, setKey] = useState<(typeof metrics)[number]["key"]>("median");
  const metric = metrics.find((one) => one.key === key) ?? metrics[0];
  const top = Math.max(...areas.map(metric.of));

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="flex flex-col items-start">
        <Eyebrow icon={ChartColumnIcon}>What they cost</Eyebrow>
        <SectionHeading className="mt-6 max-w-[20ch]">
          Twenty minutes apart, and three times the price
        </SectionHeading>
        <p className="mt-6 max-w-[58ch] text-base text-muted-foreground">
          Beacon Hill and Somerville sit at either end of the same Red Line
          ride. Everything below is what we hold on our own book this morning
          rather than a market index.
        </p>
      </div>

      <div className="mt-16 -mx-6 rounded-lg bg-accent p-6 md:mt-24 sm:-mx-8 sm:p-12">
        {/* The reference's breadcrumb line, with the switch opposite it and one
            hairline under the pair. It says where the figures come from, which
            is the question a chart in a template gets asked first. */}
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-b pb-8">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Domus book · this morning
          </p>
          <div
            role="group"
            aria-label="Choose a figure"
            className="flex flex-wrap gap-2"
          >
            {metrics.map((one) => (
              <button
                key={one.key}
                type="button"
                onClick={() => setKey(one.key)}
                aria-pressed={one.key === key}
                className={cn(
                  reach,
                  "inline-flex h-10 items-center rounded-full px-5 text-sm whitespace-nowrap transition-colors",
                  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  one.key === key
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {one.label}
              </button>
            ))}
          </div>
        </div>

        {/* The chart, at the width six captions need. Below md the same six run
            as rows instead: a caption set inside a 48px column is a caption
            turned on its side, and a chart nobody can read is worse than a
            list. */}
        <div className="mt-10 hidden items-end gap-1 md:flex">
          {areas.map((area) => {
            const focal = metric.of(area) === top;
            return (
              <div key={area.name} className="min-w-0 flex-1">
                <p className="px-3 pb-3 text-2xl tracking-tight tabular-nums lg:text-3xl">
                  {metric.read(area)}
                </p>
                <div
                  style={{
                    height: Math.round((metric.of(area) / top) * TALLEST),
                  }}
                  className={cn(
                    "flex flex-col justify-end rounded-t-sm px-3 pb-4 transition-colors",
                    focal ? "bg-primary/12" : "bg-card",
                  )}
                >
                  <p className="truncate text-sm font-medium">{area.name}</p>
                  {/* The focal bar is the one column with a fill under its
                      caption, and muted ink on that composite measures 4.14 —
                      under the floor. The ink goes up rather than the fill
                      coming down: the fill is the thing carrying the figure,
                      and any tint light enough for muted ink to clear 4.5 is
                      too light to read as the tallest bar. */}
                  <p
                    className={cn(
                      "mt-1 truncate text-sm tabular-nums",
                      focal ? "" : "text-muted-foreground",
                    )}
                  >
                    {area.active} homes
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 md:hidden">
          {areas.map((area) => {
            const focal = metric.of(area) === top;
            return (
              <div key={area.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium">{area.name}</p>
                  <p className="text-2xl tracking-tight tabular-nums">
                    {metric.read(area)}
                  </p>
                </div>
                {/* A bar carries a value rather than a surface, so the
                    whisper band does not govern it and these are deliberately
                    past it: a fill held to 1.19 against its own track is a bar
                    nobody can read. The track is the surface and it whispers. */}
                <div className="mt-2 h-3 rounded-full bg-card">
                  <div
                    style={{ width: `${(metric.of(area) / top) * 100}%` }}
                    className={cn(
                      "h-full rounded-full transition-colors",
                      focal ? "bg-primary/60" : "bg-primary/30",
                    )}
                  />
                </div>
                <p className="mt-2 text-sm tabular-nums text-muted-foreground">
                  {area.active} homes
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[70ch] text-base text-muted-foreground">
          {fastest.name} has moved furthest in twelve months, up{" "}
          <span className="font-medium text-foreground tabular-nums">
            {signed(fastest.change)}
          </span>
          , and {flattest.name} is the one that has not moved at all at{" "}
          <span className="font-medium text-foreground tabular-nums">
            {signed(flattest.change)}
          </span>
          . Your agent will tell you which of those two a house on your street
          is actually in.
        </p>
      </div>
    </section>
  );
}
