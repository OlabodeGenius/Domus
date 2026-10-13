import Link from "next/link";
import { subjects } from "@/components/estate/posts";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// The same control /agents runs over the roster, over three subjects instead of
// six areas: the query is the state, the server renders the answer, and a
// reader who wants the two Costs guides can send that URL to somebody else.
// Six guides fit on one screen without it — what it buys is that the subject a
// visitor arrived with is the first thing they can act on, and it costs no
// JavaScript to offer.
export function GuideFilter({
  subject,
  showing,
  total,
}: {
  /** Already resolved against `subjects` by the route, so an unrecognised slug
      never reaches here and the shelf cannot render empty. */
  subject?: string;
  showing: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[undefined, ...subjects].map((name) => {
          const active = name === subject;
          return (
            <Link
              key={name ?? "all"}
              href={name ? `/guides?subject=${slugify(name)}` : "/guides"}
              // A filter is a link on this site, and a link scrolls to the top
              // by default, which throws the reader back to the masthead from
              // the control they just pressed.
              scroll={false}
              aria-current={active ? "page" : undefined}
              className={cn(
                reach,
                "inline-flex h-10 items-center rounded-full px-5 text-sm whitespace-nowrap transition-colors",
                // Transparent at rest, hovering to `bg-muted` rather than to
                // `bg-accent`: the slab under these pills is the accent, so a
                // hover drawn there would land on the pill's own ground.
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                active &&
                  "bg-foreground text-background hover:bg-foreground/90 hover:text-background",
              )}
            >
              {name ?? "Every guide"}
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
        {subject ? (
          <> on {subject.toLowerCase()}, newest first.</>
        ) : (
          <>, newest first. Every one of them opens without a form.</>
        )}
      </p>
    </div>
  );
}
