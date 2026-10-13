"use client";

import { useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Artefact, copy, steps } from "@/components/estate/steps";
import { scrollRow } from "@/components/scroll-row";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// One step at a time instead of three at once, which is the
// trade this layout is offering: the artefact gets the room to be read rather
// than being cut off by the foot of a column, and the reader has to press
// something to see step two.
//
// The progress bar is the reference's, and it is doing the job a tab row
// normally cannot — saying how many there are and where you are in them.
const width = ["w-1/3", "w-2/3", "w-full"];

// The row is Base UI's Tabs rather than three buttons carrying tab roles by
// hand. The ARIA was already right; what was missing is the part nobody writes
// twice — arrow keys, Home and End, and a roving tabindex so the row is one
// stop rather than three. Same argument field-select.tsx makes about the
// listbox: this file is the look, the primitive is the behaviour.
//
// Activation stays manual, which is Base UI's default and the WAI-ARIA advice
// for panels this heavy: an arrow key moves the focus ring, Enter commits.
export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <SectionHeading className="mt-6 max-w-[24ch]">
        {copy.heading}
      </SectionHeading>
      <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
        {copy.lede}
      </p>

      <Tabs.Root value={active} onValueChange={(v) => setActive(Number(v))}>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <Tabs.List
            aria-label="The three steps"
            className={cn(scrollRow, "gap-3")}
          >
            {steps.map((one, i) => (
              // The transparent border on the selected pill is not decoration:
              // without it the pill loses 2px the moment it is chosen, and a
              // row that resizes as you move along it is a row that flinches.
              <Tabs.Tab
                key={one.n}
                value={i}
                className={cn(
                  "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full border bg-card px-5 text-sm whitespace-nowrap transition-colors outline-none",
                  "text-muted-foreground hover:text-foreground",
                  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "data-active:border-transparent data-active:bg-foreground data-active:text-background!",
                )}
              >
                {one.title}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {/* A data fill, as in layout A: it encodes position rather than a
              surface, so neither the whisper band nor the ink floor governs it. */}
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="h-1 w-32 overflow-hidden rounded-full bg-muted"
            >
              <span
                className={cn(
                  "block h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none",
                  width[active],
                )}
              />
            </span>
            <span className="text-sm text-muted-foreground tabular-nums">
              {active + 1}/{steps.length}
            </span>
          </div>
        </div>

        {steps.map((one, i) => (
          <Tabs.Panel
            key={one.n}
            value={i}
            className="mt-10 grid gap-4 outline-none lg:grid-cols-[1.5fr_1fr]"
          >
            <Step step={one} />
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </section>
  );
}

function Step({ step }: { step: (typeof steps)[number] }) {
  return (
    <>
      <div className="flex flex-col rounded-lg border bg-card p-8 lg:p-10">
        <span className="flex w-fit items-center gap-2 rounded-full bg-accent px-4 pl-3 py-1.5 text-sm tabular-nums">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          Step {step.n}
        </span>

        <h3 className="mt-8 max-w-[16ch] text-2xl tracking-tight text-balance">
          {step.title}
        </h3>
        <p className="mt-4 max-w-[46ch] text-base text-muted-foreground">
          {step.line}
        </p>

        {/* Pushed to the card's foot, where the reference has them, so the
            three panels are the same height whatever their copy runs to. */}
        <ul className="mt-12 flex flex-col gap-3 lg:mt-16">
          {step.ticks.map((tick) => (
            <li key={tick} className="flex items-start gap-3 text-sm">
              <HugeiconsIcon
                icon={Tick02Icon}
                size={18}
                strokeWidth={1.5}
                className="mt-px shrink-0 text-primary"
                aria-hidden
              />
              {tick}
            </li>
          ))}
        </ul>
      </div>

      {/* The reference's right half is a tinted panel holding white cards,
          which is what the artefact already is — so the panel is the frame
          and the artefact is what it frames. Centred rather than pinned to
          the top: the panel takes its height from the card beside it and the
          three artefacts are not the same length, so anything else leaves a
          different amount of bare tint under each step. */}
      <div className="flex items-center overflow-hidden rounded-lg bg-accent p-6">
        <Artefact n={step.n} className="w-full" />
      </div>
    </>
  );
}
