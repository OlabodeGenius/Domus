import {
  Calendar03Icon,
  Home01Icon,
  InformationCircleIcon,
  Money01Icon,
  RulerIcon,
  Sun01Icon,
  Tick02Icon,
  WashingMachineIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eyebrow } from "@/components/estate/eyebrow";
import { money, TAX_RATE, type Home } from "@/components/estate/listings";
import { SectionHeading } from "@/components/estate/section-heading";

// The reference closes on six things a visitor asks the host before booking.
// A buyer and a tenant ask different six, and four of each are the questions
// this market asks every time. Two read off the record.
export const notes = (home: Home) =>
  home.for === "sale"
    ? [
        {
          icon: Money01Icon,
          title: "Taxes",
          line: `About ${money((home.price * TAX_RATE) / 12)} a month at the city rate, billed quarterly.`,
        },
        {
          icon: Sun01Icon,
          title: "Heating and cooling",
          line: "Gas heat with a newer boiler, and split units on the top two floors.",
        },
        {
          icon: Tick02Icon,
          title: "Inspection",
          line: "Bring your inspector before you write. The seller has not pre-inspected.",
        },
        {
          icon: Calendar03Icon,
          title: "Offers",
          line: "They go to the seller as they arrive, and we tell you where yours stands.",
        },
        {
          icon: Home01Icon,
          title: "Closing",
          line: "Forty-five days is normal here. The seller can move faster if you can.",
        },
        {
          icon: RulerIcon,
          title: "Floor area",
          line: `${home.sqft.toLocaleString("en-US")} sqft measured to the inside walls, not to the deed.`,
        },
      ]
    : [
        {
          icon: Money01Icon,
          title: "Due at signing",
          line: `${money(home.price * 3)} covers first, last and the deposit. The broker fee is separate.`,
        },
        {
          icon: Sun01Icon,
          title: "Utilities",
          line: "Heat and hot water are in the rent. Electricity is yours from the day you take keys.",
        },
        {
          icon: WashingMachineIcon,
          title: "Laundry",
          line: "In the unit on this one, so nothing goes down to a shared basement.",
        },
        {
          icon: Home01Icon,
          title: "Pets",
          line: "Cats yes, dogs case by case, and the landlord decides before you sign.",
        },
        {
          icon: Calendar03Icon,
          title: "Lease",
          line: home.lease ?? "Twelve months, renewable.",
        },
        {
          icon: Tick02Icon,
          title: "Move-in",
          line: `${home.status}. We can hold a date once the application clears.`,
        },
      ];

export function ListingNotes({ home }: { home: Home }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <Eyebrow icon={InformationCircleIcon}>
        {home.for === "sale" ? "Before you offer" : "Before you apply"}
      </Eyebrow>
      <SectionHeading className="mt-6 max-w-[20ch]">
        Six things people ask us next
      </SectionHeading>

      <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {notes(home).map((note) => (
          <NoteTile key={note.title} note={note} />
        ))}
      </ul>
    </section>
  );
}

/** One cell, so the wide grid and the narrow column draw the same object. */
export function NoteTile({
  note,
}: {
  note: { icon: typeof Money01Icon; title: string; line: string };
}) {
  return (
    <li>
      <HugeiconsIcon
        icon={note.icon}
        size={24}
        strokeWidth={1.5}
        className="text-primary"
        aria-hidden
      />
      <h3 className="mt-5 text-base font-medium">{note.title}</h3>
      <p className="mt-2 max-w-[38ch] text-sm text-pretty text-muted-foreground">
        {note.line}
      </p>
    </li>
  );
}
