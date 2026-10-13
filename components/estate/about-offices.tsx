import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Building03Icon } from "@hugeicons/core-free-icons";
import { agentsIn } from "@/components/estate/agents";
import { areas, head } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { cn, slugify, spell } from "@/lib/utils";

// Six offices, one per area, off the same array the neighborhoods page reads.
// That is the whole reason the addresses went onto `areas` rather than into a
// file of their own: the count in each card comes from `agentsIn`, which is
// what /agents filters on, so an office cannot advertise a fifth agent the
// roster has never heard of.
//
// The tiles on /neighborhoods are photographs of these same six places, so
// these carry none. A card is recognised by what is inside it long before it is
// recognised by its layout, and six more area photographs would read as that
// section moved onto this page.
export function AboutOffices() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <Eyebrow icon={Building03Icon}>Where we are</Eyebrow>
          <SectionHeading className="mt-6 max-w-[20ch]">
            Six offices. Walk into any of them.
          </SectionHeading>
        </div>
        <p className="max-w-[38ch] text-base text-muted-foreground">
          Each one is staffed by the agents who list in that area, so whoever
          picks up knows the street you are asking about. All six keep Saturday
          hours.
        </p>
      </div>

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
        {areas.map((area) => {
          const staff = agentsIn(area.name);
          const slug = slugify(area.name);
          return (
            <li
              key={area.name}
              className="flex flex-col rounded-lg border bg-card p-8"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="text-xl tracking-tight">{area.name}</h3>
                {area.office.street === head.street ? (
                  <p className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    Head office
                  </p>
                ) : null}
              </div>

              <address className="mt-4 text-sm text-muted-foreground not-italic">
                <p>{area.office.street}</p>
                <p>{area.office.city}</p>
                {/* A real tel: link rather than a printed number. It is the one
                    thing a visitor standing on the street with a phone in their
                    hand actually wants, and it costs an href. */}
                <a
                  href={`tel:${area.office.phone.replace(/[^0-9]/g, "")}`}
                  className={cn(
                    "mt-3 inline-block tabular-nums underline-offset-4",
                    "transition-colors hover:text-foreground hover:underline",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  )}
                >
                  {area.office.phone}
                </a>
              </address>

              {/* Pinned to the foot with mt-auto, because Jamaica Plain's name
                  wraps at lg where Back Bay's does not, and a row of six cards
                  whose last lines sit at five different heights is the thing
                  the eye reads before it reads any of them. */}
              <Link
                href={`/agents?area=${slug}`}
                className={cn(
                  "mt-auto flex items-center gap-1.5 pt-8 text-sm text-primary",
                  "underline-offset-4 hover:underline",
                  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                )}
              >
                {spell(staff.length)} {staff.length === 1 ? "agent" : "agents"}{" "}
                here
                <ChevronRightIcon className="size-4" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
