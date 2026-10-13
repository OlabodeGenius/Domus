"use client";

import { useRouter } from "next/navigation";
import { field } from "@/components/estate/booking-form";
import { sorts, type Sort } from "@/components/estate/grid-listings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// The one client component on the browse page, and it holds no state of its
// own: the sort lives in the URL, so picking a row is a navigation and the
// server renders the sorted grid. That is what keeps a sorted page shareable,
// and what keeps the twenty-one cards out of the JavaScript bundle.
//
// The hrefs are computed on the server and handed down as plain strings — a
// function crossing this boundary would not serialise, and building the query
// here would mean this file knowing about every other filter on the page.
export function SortSelect({
  value,
  hrefs,
  onChange,
}: {
  value: Sort;
  /** One href per sort, in the same order as `sorts` — /listings sorts in the
      URL, so its control is a link like everything else in that bar. */
  hrefs?: string[];
  /** Or a setter, for the home page's section, whose nine cards are client
      state and whose sort has nothing to put in a query. One control either
      way: the second drawing of a dropdown is where two of them start to
      differ by four pixels. */
  onChange?: (next: Sort) => void;
}) {
  const router = useRouter();

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        const sort = next as Sort;
        if (onChange) return onChange(sort);
        const href = hrefs?.[sorts.indexOf(sort)];
        // Same reason the pills beside it pass `scroll={false}`: re-sorting a
        // grid is not a reason to send the reader back to the page's title.
        if (href) router.push(href, { scroll: false });
      }}
    >
      {/* The booking form's own control, down to the exported class string, and
          the same two overrides the home page's sort takes: no label above it,
          and a fixed width so the trigger does not resize as you pick from it. */}
      <SelectTrigger
        aria-label="Sort these homes"
        // 184px: the longest sort reads 111 at 14px, and the rest is the
        // field's own padding, the chevron and the air between them. Fixed
        // rather than fit, so the trigger does not resize under the cursor as
        // you pick from it.
        //
        // text-sm rather than the field's own 16px: every other control in this
        // bar — the tenure pills, the filter button — is 14, and the sort was
        // the one reading a size larger than the row it sits in.
        className={cn(field, "mt-0 w-46 cursor-pointer pe-4 text-sm")}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="p-1">
        <SelectGroup className="p-0">
          {sorts.map((one) => (
            <SelectItem
              key={one}
              value={one}
              className="rounded-full py-2 pl-4 text-sm"
            >
              {one}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
