import type { Metadata } from "next";
import { BookOpen01Icon } from "@hugeicons/core-free-icons";
import { Book } from "@/components/estate/book";
import { GuideFilter } from "@/components/estate/guide-filter";
import { GuideShelf } from "@/components/estate/guide-shelf";
import { GuideWriters } from "@/components/estate/guide-writers";
import { PageHeader } from "@/components/estate/page-header";
import { posts, postsIn, subjects, totalRead } from "@/components/estate/posts";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guides to buying and selling in Greater Boston — Domus",
  description:
    "Six guides on buying, selling and what it costs, written by the agents taking the calls. Closing statements, staging invoices and condo fees, with the numbers left in.",
};

// The content surface, and the one route on this site whose job is to keep
// somebody reading rather than to move them along. It closes the last link the
// home page was carrying to nowhere: the header's Guides, the footer's Company
// column and the home section's own View all have all pointed here since the
// nav stopped being anchors.
//
// Everything reads `posts.ts`, which is also what the home page's eleventh
// section and every article page read, so a date on a card and a date on the
// page it opens cannot disagree.
//
// The filter is a link like every other on this site. An unrecognised slug
// resolves to nothing and the shelf falls back to all six, which is why this
// page ships no empty state: every subject carries two guides, and a slug that
// is not a subject cannot narrow the list at all.
export default async function GuidesPage({
  searchParams,
}: PageProps<"/guides">) {
  const params = await searchParams;
  const slug = Array.isArray(params.subject)
    ? params.subject[0]
    : params.subject;
  const named = subjects.find((subject) => slugify(subject) === slug);
  const shown = named ? postsIn(named) : posts;

  return (
    <>
      {/* One wrapper at `gap-20` for the block and the shelf it heads, the
          pairing /listings and /agents both make: the masthead and the list
          under it are one object, and `main`'s 10rem separates that object from
          what comes next. */}
      <div className="flex flex-col gap-20">
        <PageHeader
          eyebrow="Guides"
          icon={BookOpen01Icon}
          heading="The long answers, with the invoices left in"
          figures={[
            {
              value: `${totalRead} min`,
              caption: "The whole shelf,\nread end to end",
            },
            { value: "0", caption: "Sign-ups, downloads\nor email gates" },
          ]}
          lede="Six guides on buying, selling and what the whole thing costs, written by three of our agents between showings. Each one prints the numbers it argues from, down to the line items on a closing statement we ran in April."
        />

        <GuideShelf
          posts={shown}
          filter={
            <GuideFilter
              subject={named}
              showing={shown.length}
              total={posts.length}
            />
          }
        />
      </div>

      <GuideWriters />
      <Book />
    </>
  );
}
