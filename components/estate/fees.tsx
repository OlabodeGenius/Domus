import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eyebrow } from "@/components/estate/eyebrow";
import { reach } from "@/components/reach";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Listing-side commission, which is the number every seller asks first and
// almost no brokerage site prints. Printing it is the section's whole argument,
// so the figures are the largest thing in it.
//
// Plausible, not quoted: 2.5–3.5% listing-side is the band Greater Boston
// actually runs at, and every figure here is a claim about nobody. Swap them
// for your own before you launch.
const tiers = [
  {
    name: "List",
    line: "Everything needed to put a home on the market and sell it well, with nothing to pay up front.",
    rate: "2.5%",
    unit: "of sale price",
    includes: [
      "Photography and a floor plan",
      "Listed on MLS and every major portal",
      "Open houses run by your agent",
      "Offer review and negotiation",
    ],
  },
  {
    name: "List and stage",
    line: "The same, with the house prepared before a single photo is taken.",
    rate: "3%",
    unit: "of sale price",
    featured: true,
    badge: "Most sellers",
    includes: [
      "Everything in List",
      "Staging consult and furniture hire",
      "Pre-list repairs project-managed",
      "Twilight shoot and a video tour",
      "Paid placement on the two big portals",
    ],
  },
  {
    name: "Off-market",
    line: "Sold quietly to our registered buyers, with no portal listing and no sign on the lawn.",
    rate: "3.5%",
    unit: "of sale price",
    includes: [
      "No portal listing and no lawn sign",
      "Released to our registered buyers first",
      "Private viewings by appointment only",
      "Withdraw at any point, at no cost",
    ],
  },
];

export function Fees() {
  return (
    <section
      id="fees"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="flex flex-col items-center text-center">
        <Eyebrow>What it costs</Eyebrow>
        <SectionHeading className="mt-6 max-w-[20ch]">
          The fee, printed, before you ask for it
        </SectionHeading>
        <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
          Listing-side commission only, paid at closing and out of the proceeds.
          Nothing is owed if the home does not sell.
        </p>
      </div>

      {/* One slab holding all three, which is what makes the middle tier read as
          lifted *out* of something rather than merely bigger. The slab is
          section-sized whatever its markup says, so it takes the band rung —
          bg-accent — and the lift comes from the card's own cast rather than
          from sinking the ground under it. */}
      <div className="mt-16 rounded-lg bg-accent p-4 sm:p-6 md:p-8 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8 lg:p-10">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "flex flex-col p-4 max-lg:not-first:mt-8 sm:p-6 lg:p-2",
              tier.featured &&
                // It overhangs the slab's top and bottom on the wide layout, as
                // the reference has it. Raised, so a cast and no border.
                //
                // -my-16 rather than -my-10: the slab already carries 40px of
                // its own padding, so the first 40px of pull only reaches the
                // slab's edge. Everything past that is the overhang.
                "rounded-lg bg-card p-4 shadow-soft sm:p-8 lg:-my-16 lg:p-10",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
              <h3 className="text-base font-medium">{tier.name}</h3>
              {tier.badge ? (
                <span className="shrink-0 rounded-full bg-chip px-3 py-1 text-sm text-primary">
                  {tier.badge}
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{tier.line}</p>

            {/* Baseline-aligned rather than centred, so the unit sits on the
                figure's baseline the way the reference sets it. */}
            <p className="mt-8 flex items-baseline gap-2">
              <span className="text-5xl tracking-tighter tabular-nums">
                {tier.rate}
              </span>
              <span className="text-sm text-muted-foreground">{tier.unit}</span>
            </p>

            <a
              href="#book"
              // outline rather than secondary on the two plain tiers: a filled
              // grey button on a tinted slab is a button sitting on its own
              // colour, which is a button nobody can see.
              className={cn(
                buttonVariants({
                  variant: tier.featured ? "default" : "outline",
                }),
                reach,
                "mt-8 w-full rounded-full",
              )}
            >
              Talk to an agent
            </a>

            {/* The reference labels this list "WHAT'S INCLUDED:" in caps. The
                label is dropped: a tick list under a price needs no heading to
                be understood, and it was the section's fifth type size. */}
            <ul className="mt-8 flex flex-col gap-3">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={16}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
