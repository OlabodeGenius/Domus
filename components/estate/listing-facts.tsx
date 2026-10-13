import Image from "next/image";
import { Call02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agentFor, portrait } from "@/components/estate/agents";
import { ConveyColumn, conveys } from "@/components/estate/listing-included";
import { RoomRow, rooms } from "@/components/estate/listing-rooms";
import { mlsOf, type Home } from "@/components/estate/listings";
import { phone } from "@/components/estate/site-footer";
import { ViewingScheduler } from "@/components/estate/viewing-scheduler";

// The table an American listing is expected to carry, and all of it is either
// already on the record or arithmetic over it. Ten rows so the pairs stay even
// across two columns — the sixth is the one figure a buyer works out by hand,
// so the page does it instead.
const factsOf = (home: Home) => [
  ["Property type", home.type],
  ["Year built", String(home.built)],
  ["Bedrooms", String(home.beds)],
  ["Bathrooms", String(home.baths)],
  ["Interior", `${home.sqft.toLocaleString("en-US")} sqft`],
  home.for === "sale"
    ? [
        "Price per sqft",
        `$${Math.round(home.price / home.sqft).toLocaleString("en-US")}`,
      ]
    : ["Rent per sqft", `$${(home.price / home.sqft).toFixed(2)} / mo`],
  ["Parking", home.parking],
  ["Outdoor space", home.outdoor],
  ["Days on market", String(home.days)],
  ["MLS #", mlsOf(home)],
];

// The whole record in one column, with the one thing to do about it riding the
// rail opposite. Three blocks rather than three sections: a reader deciding
// about a house reads the description, the rooms and the contract list in one
// go, and a card that scrolls away between them is a phone number they have to
// go and find again.
export function ListingFacts({ home }: { home: Home }) {
  const agent = agentFor(home);
  const lists = conveys(home);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-20">
        {/* min-w-0, because a grid item's default is min-content and the widest
            fact row — a label against "Fenced garden, 0.19 acres" — is wider
            than a phone. Without it the column refuses to shrink and the whole
            page grows a horizontal scrollbar at 390. */}
        <div className="min-w-0">
          {/* Not the page's 4xl section heading: the address above is the only
              display line this page gets, and a second one at the same size
              would make the description compete with the home. */}
          <h2 className="text-2xl font-medium tracking-tight">
            About this home
          </h2>
          <p className="mt-6 max-w-[62ch] text-base text-pretty text-muted-foreground">
            {home.blurb}
          </p>

          {/* Hairlines and no stripes. A tint across alternate rows would spend
              the one step a table has, and it would spend it on decoration —
              the line divides without darkening either side of itself. */}
          <dl className="mt-14 grid sm:grid-cols-2 sm:gap-x-12">
            {factsOf(home).map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b py-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-right text-sm font-medium tabular-nums">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-20 text-2xl font-medium tracking-tight">Inside</h2>
          <p className="mt-4 max-w-[62ch] text-base text-muted-foreground">
            What an agent would tell you while you walked through, in the order
            you would walk it.
          </p>
          <ul className="mt-8 grid md:grid-cols-2 md:gap-x-12">
            {rooms(home).map((room) => (
              <RoomRow key={room.title} room={room} />
            ))}
          </ul>

          <h2 className="mt-20 text-2xl font-medium tracking-tight">
            {lists.eyebrow}
          </h2>
          <p className="mt-4 max-w-[62ch] text-base text-muted-foreground">
            {home.for === "sale"
              ? "Ask on the day and you get a promise. This is the list that goes into the offer."
              : "Nothing here is a surprise on the first bill, and anything the landlord agrees to change goes on the lease itself."}
          </p>
          <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            <ConveyColumn title={lists.inTitle} items={lists.in} kind="in" />
            <ConveyColumn title={lists.outTitle} items={lists.out} kind="out" />
          </div>
        </div>

        {/* The card follows the whole column down on a wide screen: the
            reading side now runs the table, the rooms and the contract list,
            and the name to call should be on screen at every line of it. Below
            lg it is simply the next block, which is the order it would be read
            in anyway. */}
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border bg-card p-8">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Listing agent
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={portrait(agent.src, 160)}
                  alt={agent.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-medium">{agent.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {agent.title}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-pretty text-muted-foreground">
              {agent.line}
            </p>

            {/* The license number is this industry's own credibility artefact,
                so it is printed rather than implied — it is the one line on
                this card a reader can go and check. */}
            <dl className="mt-6 flex flex-col gap-3 border-t pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">License</dt>
                <dd className="tabular-nums">{agent.license}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Covers</dt>
                <dd className="text-right">{agent.areas}</dd>
              </div>
            </dl>

            {/* The slot, not the six fields: the form at the foot of the page
                takes the name and the phone number, and this takes the one
                thing a visitor standing on a single listing actually wants to
                say — which day, and what time. Asking for both here would be
                the conversion asked for twice. */}
            <ViewingScheduler agent={agent.name} />

            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <HugeiconsIcon
                icon={Call02Icon}
                size={16}
                strokeWidth={1.5}
                aria-hidden
              />
              or call{" "}
              <a
                href={`tel:+1${phone.replace(/\D/g, "")}`}
                className="tabular-nums underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {phone}
              </a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
