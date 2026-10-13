// Not a section and so no `// ref:` line: the two columns are drawn inside the
// listing's reading column, and listing-facts.tsx carries the reference they
// came from. This file is the two lists and the shape of one column.
import { BanIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type Home } from "@/components/estate/listings";
import { cn } from "@/lib/utils";

// What changes hands and what leaves with the owner. Every purchase and every
// lease argues about this list at some point, so the page prints it before
// anybody has to ask. The parking line reads off the record; the rest are the
// six that come up on a Massachusetts contract.
export const conveys = (home: Home) =>
  home.for === "sale"
    ? {
        eyebrow: "Fixtures and fittings",
        inTitle: "Stays with the house",
        outTitle: "Leaves with the owner",
        in: [
          "Range, hood and dishwasher",
          "Washer and dryer",
          "Every blind and curtain rail",
          "Ceiling fixtures throughout",
          home.parking,
          "Shed, ladder and the garden tools in it",
        ],
        out: [
          "The staging furniture, all of it",
          "The dining room chandelier",
          "Two stone planters by the door",
          "The freezer in the basement",
          "The workbench and its tools",
          "Whatever is in the attic on closing day",
        ],
      }
    : {
        eyebrow: "The lease",
        inTitle: "Covered by the rent",
        outTitle: "Billed on top",
        in: [
          "Heat and hot water",
          "Water and sewer",
          "Snow clearing and the lawn",
          "Range, fridge and dishwasher",
          home.parking,
          "Repairs the landlord is responsible for",
        ],
        out: [
          "Electricity",
          "Internet and television",
          "Renter's insurance, and we ask for proof",
          "First month, last month and a deposit at signing",
          "A pet fee, on the leases that allow pets",
          "The end-of-lease clean",
        ],
      };

// The reference sets a tick down one column and a slashed circle down the
// other. Both marks stay ink rather than turning green and red: a chandelier
// the seller is taking is not a failure.
export function ConveyColumn({
  title,
  items,
  kind,
}: {
  title: string;
  items: string[];
  kind: "in" | "out";
}) {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted-foreground uppercase">
        {title}
      </p>
      <ul className="mt-6 flex flex-col gap-4 border-t pt-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm">
            <HugeiconsIcon
              icon={kind === "in" ? Tick02Icon : BanIcon}
              size={16}
              strokeWidth={1.5}
              className={cn(
                "mt-0.5 shrink-0",
                kind === "in" ? "text-primary" : "text-muted-foreground",
              )}
              aria-hidden
            />
            <span className={cn(kind === "out" && "text-muted-foreground")}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
