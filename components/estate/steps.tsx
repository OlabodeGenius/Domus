import {
  Calendar03Icon,
  File01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

// Three steps, three artefacts, one source — three layouts draw them. The
// artefact is the point of this section: a step that says "we find you homes"
// is a promise, and a step that shows the alert it sends is evidence. Every
// figure in them answers the rest of the page — Brookline's median is $1.42M,
// 14 Chestnut is the hero's listing at $1,275,000, and the offer lands inside
// the 11-day median section 5 quotes.
export const steps = [
  {
    n: 1,
    icon: Mail01Icon,
    title: "Tell us what you are after",
    line: "One conversation, then a search that runs itself. You hear from us when something fits, not every week.",
    ticks: [
      "A twenty-minute call, in the office or on the phone",
      "An alert the morning a match lists, not a weekly digest",
      "Private exclusives included from the first day",
    ],
  },
  {
    n: 2,
    icon: Calendar03Icon,
    title: "See them, this weekend",
    line: "Your agent books the viewings around you and comes to all of them. Never a colleague at the door.",
    ticks: [
      "Viewings booked around your week, not around ours",
      "The same agent at every door",
      "A written read on the street by that evening",
    ],
  },
  {
    n: 3,
    icon: File01Icon,
    title: "Offer, and we take it from there",
    line: "We write it, we negotiate it, and we run the closing. You sign twice, and the next thing you get is the keys.",
    ticks: [
      "We draft the offer and do the negotiating",
      "Inspection, appraisal and lender all chased by us",
      "Two signatures from you, then the keys",
    ],
  },
] as const;

export const copy = {
  eyebrow: "How it works",
  heading: "Three steps, and an agent who replies within two hours",
  lede: "The part people dread is the waiting. Each step below says what happens, and how long it takes.",
} as const;

// The reference mockups all run to the foot of their card and are cut by it.
// These do the same: `overflow-hidden` on the card, and the artefact given more
// height than the space it sits in.
export function Artefact({ n, className }: { n: number; className?: string }) {
  return (
    <div className={cn("rounded-lg bg-card p-5 shadow-soft", className)}>
      {n === 1 && <SavedSearch />}
      {n === 2 && <TourSchedule />}
      {n === 3 && <OfferSummary />}
    </div>
  );
}

function SavedSearch() {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-chip">
          <HugeiconsIcon
            icon={Mail01Icon}
            size={16}
            strokeWidth={1.5}
            className="text-primary"
            aria-hidden
          />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">Brookline, 4+ beds</p>
          <p className="text-sm text-muted-foreground">Saved search · daily</p>
        </div>
      </div>
      <p className="mt-5 border-t pt-4 text-sm">
        <span className="font-medium tabular-nums">3 new</span>{" "}
        <span className="text-muted-foreground">under $1.5M this morning</span>
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {[
          "18 Sewall Ave · $1,395,000",
          "7 Kent St · $1,240,000",
          "92 Harvard St · $1,480,000",
        ].map((row) => (
          <p
            key={row}
            className="rounded-sm bg-accent px-3 py-2 text-sm text-muted-foreground tabular-nums"
          >
            {row}
          </p>
        ))}
      </div>
    </>
  );
}

function TourSchedule() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">Saturday 14 February</p>
        <p className="text-sm text-muted-foreground tabular-nums">3 viewings</p>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t pt-4">
        {[
          { at: "2:00pm", where: "14 Chestnut St", who: "Tom" },
          { at: "3:15pm", where: "26 Linden St", who: "Tom" },
          { at: "4:30pm", where: "71 Perkins St", who: "Tom" },
        ].map((slot) => (
          <div
            key={slot.at}
            className="flex items-baseline gap-3 rounded-sm bg-accent px-3 py-2.5"
          >
            <span className="w-16 shrink-0 text-sm font-medium tabular-nums">
              {slot.at}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">
              {slot.where}
            </span>
            <span className="text-sm text-muted-foreground">{slot.who}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function OfferSummary() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">14 Chestnut St</p>
        {/* The chip treatment every other pill on the page uses. This was the
            one raw hue in the whole route — a green that belonged to no token
            and answered to no brand switch. */}
        <span className="rounded-full bg-chip px-3 py-1 text-sm text-primary">
          Accepted
        </span>
      </div>
      <p className="mt-5 text-3xl tracking-tight tabular-nums">$1,250,000</p>
      <p className="mt-1 text-sm text-muted-foreground tabular-nums">
        Offered against $1,275,000 asking
      </p>
      <dl className="mt-5 flex flex-col gap-2.5 border-t pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Accepted in</dt>
          <dd className="tabular-nums">2 days</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Closing</dt>
          <dd className="tabular-nums">28 March</dd>
        </div>
      </dl>
    </>
  );
}
