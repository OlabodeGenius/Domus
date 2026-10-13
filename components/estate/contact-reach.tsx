import Image from "next/image";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  Building03Icon,
  BubbleChatIcon,
  Call02Icon,
  CustomerService01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agentFor, portrait } from "@/components/estate/agents";
import { head } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { money, railHomes } from "@/components/estate/listings";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

const focus =
  "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

// The text line is its own number rather than the switchboard's, because a
// landline that advertises SMS is the one detail in a contact section a reader
// checks by trying it. The switchboard is the head office's own, read off the
// same record the bar, the footer and /about all print — four printings, one
// source.
const switchboard = head.phone;
const texts = "(617) 555-0155";
const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${head.street}, ${head.city}`,
)}`;

const routes = [
  {
    icon: Call02Icon,
    heading: "Call the switchboard",
    value: switchboard,
    href: `tel:${switchboard.replace(/[^0-9]/g, "")}`,
    note: "Nine to seven, seven days. One number reaches all six offices.",
  },
  {
    icon: BubbleChatIcon,
    heading: "Text the agent on call",
    value: texts,
    href: `sms:${texts.replace(/[^0-9]/g, "")}`,
    note: "Saturdays included. This is the one that answers fastest.",
  },
  {
    icon: Mail01Icon,
    heading: "Email the front desk",
    value: "hello@domusrealty.com",
    href: "mailto:hello@domusrealty.com",
    note: "Read by whoever is on the desk and passed to a name the same hour.",
  },
  {
    // Building03, which is the glyph /about already spends on an office. A
    // door at 22px is a sliver beside three round ones and reads as a rule
    // rather than as an icon.
    icon: Building03Icon,
    heading: "Come to the head office",
    value: head.street,
    href: map,
    note: `${head.city}. Saturdays ten to four, and nobody needs an appointment.`,
  },
];

// The thread is a real listing and the agent the rest of the site would send
// you for it — `agentFor` is what the listing page and the area page both call,
// so the face in the phone cannot be a person who does not cover Brookline.
const home = railHomes[0];
const answering = agentFor(home);

export function ContactReach() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="mx-auto max-w-[44ch] text-center">
        <Eyebrow icon={CustomerService01Icon}>Other ways in</Eyebrow>
        <SectionHeading className="mt-6">
          Ring it, text it, or walk in
        </SectionHeading>
        <p className="mt-6 text-base text-muted-foreground">
          A form is not the only way to reach a person here. Three of these put
          you through to someone today; the fourth is a door on Beacon Street
          that is open on Saturdays.
        </p>
      </div>

      <div className="mt-16 grid items-center gap-6 md:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Routes from={0} />
        <Thread />
        <Routes from={2} />
      </div>
    </section>
  );
}

// Two per side, which is what the reference's symmetry is built on — a fifth
// route would have to break one column or sit under the phone.
function Routes({ from }: { from: 0 | 2 }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
      {routes.slice(from, from + 2).map((route) => (
        <li key={route.heading} className="rounded-lg bg-accent p-6 sm:p-7">
          <HugeiconsIcon
            icon={route.icon}
            size={22}
            strokeWidth={1.5}
            className="text-primary"
            aria-hidden
          />
          <h3 className="mt-5 text-base font-medium">{route.heading}</h3>
          <a
            href={route.href}
            // The map is the one route out of this section that is not a
            // protocol handler, so it is the one that would take a reader off
            // the page they were about to write on.
            target={route.href.startsWith("http") ? "_blank" : undefined}
            rel={route.href.startsWith("http") ? "noreferrer" : undefined}
            className={cn(
              reach,
              "mt-2 inline-block text-base tabular-nums underline-offset-4 hover:underline",
              focus,
            )}
          >
            {route.value}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">{route.note}</p>
        </li>
      ))}
    </ul>
  );
}

// The reference's centre is a phone, and the one thing worth putting on its
// screen here is the promise the rest of the page states in words. Six minutes
// against a two-hour commitment is the whole argument, so the stamps are the
// content and the bubbles are the frame.
//
// role="img" rather than aria-hidden: a reader who cannot see it should get
// what it is *for* in one line, not the six fragments of chrome it is made of,
// and not nothing at all.
function Thread() {
  return (
    <div
      role="img"
      aria-label="A text thread. A Saturday viewing at 14 Chestnut Street is asked for at 9:41 and answered at 9:47."
      className="relative order-first mx-auto w-[264px] rounded-xl bg-foreground p-3 shadow-soft-lg lg:order-none"
    >
      <span
        aria-hidden
        className="absolute top-5 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-foreground"
      />

      <div className="flex h-[520px] flex-col overflow-hidden rounded-lg bg-background">
        <div className="flex shrink-0 items-center gap-3 border-b px-4 pt-11 pb-3">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={portrait(answering.src, 64)}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{answering.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              Domus · {head.city.split(",")[0]}
            </p>
          </div>
        </div>

        {/* justify-end so the thread sits on the composer the way a real one
            does, and so an extra line pushes the oldest message off the top
            rather than leaving a gap under the last. */}
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-4 py-4">
          <p className="max-w-[85%] self-end rounded-sm bg-foreground px-4 py-2.5 text-sm text-background">
            Is {home.address} still free to see on Saturday?
          </p>
          <p className="self-end text-xs text-muted-foreground tabular-nums">
            9:41
          </p>

          <div className="mt-2 flex max-w-[85%] items-center gap-3 self-start rounded-sm bg-accent p-2">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={home.src}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{home.address}</p>
              {/* The price alone. Beds or an area beside it truncates in a
                  204px bubble, and a listing card cut off mid-word is the one
                  thing on this screen that would read as a bug rather than as
                  a message. */}
              <p className="truncate text-xs text-muted-foreground tabular-nums">
                {money(home.price)}
              </p>
            </div>
          </div>

          <p className="max-w-[85%] self-start rounded-sm bg-accent px-4 py-2.5 text-sm">
            It is — eleven or two. I can open both.
          </p>
          <p className="self-start text-xs text-muted-foreground tabular-nums">
            9:47 · six minutes later
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t px-3 py-3">
          <span className="flex-1 rounded-full bg-accent px-4 py-2 text-sm text-muted-foreground">
            Message
          </span>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <ArrowUpIcon className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}
