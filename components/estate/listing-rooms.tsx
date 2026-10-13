// Not a section and so no `// ref:` line: the rows are drawn inside the
// listing's reading column, and listing-facts.tsx carries the reference they
// came from. This file is the six rows and the shape of one of them.
import {
  Bathtub01Icon,
  BedDoubleIcon,
  Car01Icon,
  KitchenUtensilsIcon,
  Sofa01Icon,
  Tree01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type Home } from "@/components/estate/listings";

// The reference is a tour itinerary: six stops, each with a tile, a title and
// one line. A home walks through rooms instead of places, and the four rows
// that can read a fact off the record read it rather than describing it.
export const rooms = (home: Home) => [
  {
    icon: Sofa01Icon,
    title: "Living and dining",
    line: `The main floor runs open from the front door to the back, and the plan measures ${home.sqft.toLocaleString("en-US")} sqft in total.`,
  },
  {
    icon: KitchenUtensilsIcon,
    title: "Kitchen",
    line: "Gas range, a full run of counter, and stools for three at the end of it.",
  },
  {
    icon: BedDoubleIcon,
    title: `${home.beds} bedrooms`,
    line: "The main bedroom takes the quiet side of the building. Every other one holds a double bed and a desk.",
  },
  {
    icon: Bathtub01Icon,
    title: `${home.baths} bathrooms`,
    line: "Tiled to the ceiling, and the pressure holds on the top floor when the shower is running.",
  },
  { icon: Tree01Icon, title: "Outside", line: home.outdoor },
  { icon: Car01Icon, title: "Parking", line: home.parking },
];

/** One row of the list, so the six are written once. */
export function RoomRow({
  room,
}: {
  room: { icon: typeof Sofa01Icon; title: string; line: string };
}) {
  return (
    <li className="flex gap-5 border-b py-6">
      <span
        aria-hidden
        className="grid size-12 shrink-0 place-items-center rounded-sm bg-accent"
      >
        <HugeiconsIcon
          icon={room.icon}
          size={20}
          strokeWidth={1.5}
          className="text-primary"
        />
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-medium">{room.title}</h3>
        <p className="mt-1.5 max-w-[54ch] text-sm text-pretty text-muted-foreground">
          {room.line}
        </p>
      </div>
    </li>
  );
}
