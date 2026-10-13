"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Clock01Icon,
  Mail01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agents, portrait } from "@/components/estate/agents";
import {
  areaOptions,
  copy as promise,
  field,
  Picker,
} from "@/components/estate/booking-form";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const focus =
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

// Same lookup `head` makes in areas.ts, and for the same reason: the roster's
// order is load-bearing — `agentFor` reads it to answer who covers an area — so
// a desk keyed by index would repoint itself the day somebody is promoted.
const by = (name: string) =>
  agents.find((agent) => agent.name === name) ?? agents[0];

// Four desks, and each one is a person already on the roster with the title
// that puts them there: the first-time-buyer agent takes buying, the agent
// whose sellers are second-time movers takes selling, the lettings agent takes
// renting, and whatever fits none of the three goes to the founding partner.
// A fifth would need a fifth job title the roster does not have.
//
// `reply` stays inside the two hours the rest of the site promises — steps.tsx
// puts it in a heading, the booking form puts it in a reassurance and the FAQ
// repeats it — and the page header's measured 51-minute median sits under all
// four. A desk that answered by the end of the day would make this page the one
// that contradicts the other ten.
const desks = [
  {
    topic: "Buying",
    about: "A home to buy, or a first look at what is out there",
    agent: by("Jonah Reiss"),
    first:
      "Sends the three that fit before he rings, so the call has something in it.",
    reply: "Usually inside the hour",
  },
  {
    topic: "Selling",
    about: "A valuation, or a home you are ready to list",
    agent: by("Marisol Vega"),
    first:
      "Walks the place before she prices it. Nothing here is valued off a screen.",
    reply: "Inside two hours, and she calls rather than writes",
  },
  {
    topic: "Renting",
    about: "A let, from either side of it",
    agent: by("Sean Halloran"),
    first:
      "Checks what comes empty on the first, which is never what is on the site yet.",
    reply: "Inside the hour, seven days a week",
  },
  {
    topic: "Something else",
    about: "Press, a complaint, or a question about the fee",
    agent: by("Tom Brennan"),
    first:
      "Reads it himself. Twenty-eight years in, he still takes the ones that fit nobody else.",
    reply: "Inside two hours, from him and not a desk",
  },
];

export function ContactForm() {
  const [topic, setTopic] = useState(desks[0].topic);
  const desk = desks.find((one) => one.topic === topic) ?? desks[0];

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* One slab split by a seam, which is the reference's whole shape. The
          left half is the indoor first step down from the slab; the right half
          is the slab itself, so the fields separate by hairline rather than by
          tint — the same trade the reference makes, and the reason `field`
          spells its border colour out.

          The halves swap order below lg. Stacked in source order the desk card
          would sit above the tiles that change it, and a card that answers a
          control the reader has not reached yet reads as a decoration rather
          than as an answer. */}
      <div className="flex flex-col overflow-hidden rounded-lg border bg-card lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        <div className="order-2 flex flex-col justify-center bg-accent px-6 py-12 sm:px-12 lg:order-none lg:py-16">
          {/* The reference floats a card in this half. It floats here too, so
              it takes a shadow rather than a hairline — a border between a card
              and a tint this far below it is the second cue the style spends
              only one of. */}
          <div className="rounded-lg bg-card p-6 shadow-soft sm:p-7">
            <p className="text-sm text-muted-foreground">Who picks this up</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={portrait(desk.agent.src, 112)}
                  alt={desk.agent.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-medium tracking-tight">
                  {desk.agent.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {desk.agent.title}
                </p>
              </div>
            </div>

            <p className="mt-5 rounded-sm bg-accent px-4 py-3 text-sm">
              {desk.first}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5 text-sm">
              <span className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-primary"
                  aria-hidden
                />
                {desk.reply}
              </span>
              <a
                href={`mailto:${desk.agent.email}`}
                className={cn(
                  reach,
                  "flex items-center gap-2 underline-offset-4 hover:underline",
                  focus,
                )}
              >
                <HugeiconsIcon
                  icon={Mail01Icon}
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-primary"
                  aria-hidden
                />
                {desk.agent.email}
              </a>
            </div>
          </div>

          {/* The four promises the closing band makes on every other route.
              This page does not mount that band — its form *is* the page — so
              they are said here instead of nowhere. */}
          <ul className="mt-10 flex flex-col gap-3.5 border-t pt-8 text-sm text-muted-foreground">
            {promise.reassurances.map(({ icon, line }) => (
              <li key={line} className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={icon}
                  size={18}
                  strokeWidth={1.5}
                  className="shrink-0"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 px-6 py-12 sm:px-12 lg:order-none lg:py-16">
          <form className="grid gap-5 sm:grid-cols-2">
            {/* Native radios under the tiles, so one arrow key moves between
                four choices and the group announces itself as one. The input is
                inside its label rather than beside it, which is why the focus
                ring is drawn with `has-[:focus-visible]` — `peer-` only reaches
                a later sibling. */}
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">What is it about</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {desks.map((one) => {
                  const on = one.topic === topic;
                  return (
                    <label
                      key={one.topic}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition-colors",
                        "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
                        on
                          ? "border-primary bg-card"
                          : "border-transparent bg-accent hover:bg-muted",
                      )}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={one.topic}
                        checked={on}
                        onChange={() => setTopic(one.topic)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors",
                          on ? "border-primary" : "border-border bg-card",
                        )}
                      >
                        {on ? (
                          <span className="size-2 rounded-full bg-primary" />
                        ) : null}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">
                          {one.topic}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {one.about}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-sm font-medium">Name</span>
              {/* text-base on every input: iOS Safari zooms the page when focus
                  lands on anything smaller. */}
              <input
                id="ask-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                className={field}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                id="ask-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={field}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Phone</span>
              <input
                id="ask-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(617) 555-0000"
                className={field}
              />
            </label>
            <Picker
              id="ask-time"
              name="time"
              label="Best time to call"
              options={["Morning", "Afternoon", "Evening", "Any time"]}
              initial="Any time"
            />
            <Picker
              id="ask-area"
              name="area"
              label="Which part of town"
              options={areaOptions}
              initial="Brookline"
              className="sm:col-span-2"
            />
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">
                Anything we should know
              </span>
              <textarea
                id="ask-message"
                name="message"
                rows={4}
                placeholder="A street, a school district, a moving date, whatever matters."
                className={cn(field, "h-auto rounded-lg py-2.5")}
              />
            </label>

            {/* The reference closes its fields with a checkbox line. Round
                rather than square, because every other control on this site is
                a pill and a 16px square would be the one corner style that
                disagrees. */}
            <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
              <input
                type="checkbox"
                name="text-too"
                defaultChecked
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-border bg-card transition-colors",
                  "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
                  "peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
                  // The tick is a descendant of the peer's sibling, not a
                  // sibling itself, so `peer-checked:` cannot be written on it
                  // — the variant compiles to a general-sibling selector. The
                  // box is the sibling, so it reaches down for the glyph.
                  "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
                )}
              >
                <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
              </span>
              <span className="text-sm text-muted-foreground">
                Text me as well as email. On a Saturday it is the faster of the
                two.
              </span>
            </label>

            {/* 44px, which the craft floor reserves for the one call to action
                on a page. This page has one. */}
            <Button
              type="submit"
              size="lg"
              className={cn("w-full rounded-full sm:col-span-2")}
            >
              Send it to {desk.agent.name.split(" ")[0]}
            </Button>
            <p className="text-sm text-muted-foreground sm:col-span-2">
              We use this to reply and for nothing else. No list, no third
              party.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
