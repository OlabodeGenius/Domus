import Link from "next/link";
import { areas } from "@/components/estate/areas";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// The roster's one control, and it is a link like every other filter on this
// site: the query is the state, the server renders the answer, and a visitor
// who found the two agents covering Beacon Hill can send that page to somebody
// else. Nine names would fit on one screen without it — the reason it is here
// is that "who covers my street" is the question a roster is actually read
// with, and answering it in a URL costs no JavaScript.
export function AgentFilter({
  area,
  showing,
  total,
}: {
  /** The named area, already resolved against `areas` by the route — an
      unrecognised slug never reaches here, which is what keeps the list from
      rendering empty. */
  area?: string;
  showing: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[undefined, ...areas.map((one) => one.name)].map((name) => {
          const active = name === area;
          return (
            <Link
              key={name ?? "all"}
              href={name ? `/agents?area=${slugify(name)}` : "/agents"}
              // A filter is a link here, and a link scrolls to the top by
              // default — which throws the reader back to the masthead every
              // time they narrow the list, from a control they were looking at
              // when they pressed it. The query changes what is under the
              // pills; it does not change where the reader is.
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                reach,
                "inline-flex h-10 items-center rounded-full px-5 text-sm whitespace-nowrap transition-colors",
                // Transparent at rest: a resting pill one rung off its ground
                // reads as a stain rather than as a control, and this ground is
                // already a tint. Which is also why the hover is `bg-muted` and
                // not `bg-accent` — the slab underneath is the accent, so a
                // hover drawn there would land on the pill's own colour.
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                // The chosen slice is the page's neutral dark action, and it
                // carries its own hover — one rule written for the resting pill
                // would repaint the filled one pale under the cursor.
                active &&
                  "bg-foreground text-background hover:bg-foreground/90 hover:text-background",
              )}
            >
              {name ?? "Every agent"}
            </Link>
          );
        })}
      </div>

      {/* What the pills just did, in the one line a filtered list owes. */}
      <p className="mt-10 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground tabular-nums">
          {showing}
        </span>{" "}
        of <span className="tabular-nums">{total}</span>
        {area ? (
          <> who take listings in {area}. The other thirty-one work the eight
            areas outside these six.</>
        ) : (
          <> in the six areas on this site. The other thirty-one work the eight
            outside them.</>
        )}
      </p>
    </div>
  );
}
