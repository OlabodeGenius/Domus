import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { photo } from "@/components/estate/areas";
import { agents, closedBy } from "@/components/estate/agents";
import { posts, writers } from "@/components/estate/posts";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";
import { reach } from "@/components/reach";
import { cn, slugify, spell } from "@/lib/utils";

// The shelf above says these are written by the people doing the work. This is
// that claim with the license numbers attached, and it is the section that
// stops a content grid reading as a content grid: four faces, four numbers a
// visitor can check, and a way into what each writer files.
//
// Everything on it is counted off `posts` and `agents` rather than typed. A
// fourth writer, or a fourth guide from one of these three, moves the figures
// without anybody editing a sentence.
export function GuideWriters() {
  // Writers first, then the roster behind them, cut to the row the grid draws.
  // Nobody is typed in: a fourth byline pushes the senior agent out of the
  // fourth cell on its own.
  const shown = [
    ...writers,
    ...agents.filter((agent) => !writers.includes(agent)),
  ].slice(0, 4);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      {/* The reference sets one line top-left against empty page. The lede sits
          opposite rather than under it, because the figure it carries is the
          argument the portraits below cannot make on their own. */}
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
        <SectionHeading className="max-w-[20ch]">
          Every byline is an agent with a license
        </SectionHeading>
        <p className="max-w-[46ch] text-base text-muted-foreground">
          Nobody here is a content writer. The three who write closed{" "}
          <span className="tabular-nums">{closedBy(writers)}</span> homes
          between them last year out of the {spell(agents.length)} agents on the
          roster, which is where the invoices in these guides come from.
        </p>
      </div>

      <div className="relative mt-16 pb-12 md:mt-20">
        {/* The reference's band, and its whole point is that it cuts across the
            portraits rather than clearing them. Drawn at the container's width
            and run back out over the gutter, which is where every other band on
            this site stops. */}
        <div
          aria-hidden
          className="absolute -inset-x-6 top-28 bottom-0 rounded-lg bg-accent sm:-inset-x-8"
        />

        {/* Four columns and four faces: the three who file guides, then the
            senior agent standing behind them. That is the reference's own count
            per row and the size it draws a portrait at — three across a 1200px
            container gave each face 356px, and at that size an arch-topped
            portrait stops supporting the section and becomes it. The fourth
            cell is a card like the other three rather than a paragraph, because
            a row that ends in prose reads as a row that ran out of people. */}
        <ul className="relative grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((person) => {
            const written = posts.filter(
              (post) => post.author.name === person.name,
            );
            const subject = written[0]?.category;

            return (
              <li key={person.name} className="group/writer">
                {/* Arch-topped, which is the reference's one shape and the
                    reason the band reads as cutting rather than as a stripe. */}
                <div className="relative aspect-3/4 overflow-hidden rounded-t-full rounded-b-sm">
                  <Image
                    src={photo(person.src, 720)}
                    alt={person.alt}
                    fill
                    sizes="(min-width: 640px) 340px, 90vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 border-t pt-4">
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {person.title}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground tabular-nums">
                      {person.license}
                    </p>
                  </div>

                  {/* A writer's slot points at what they have filed. The fourth
                      has filed nothing, so it carries the figure she would be
                      quoted on instead — same corner, same size, and the reader
                      learns who writes here without being told. */}
                  {subject ? (
                    <Link
                      href={`/guides?subject=${slugify(subject)}`}
                      scroll={false}
                      className={cn(
                        reach,
                        "inline-flex shrink-0 items-center gap-1.5 text-sm whitespace-nowrap transition-colors hover:text-foreground",
                        "text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      )}
                    >
                      <span className="tabular-nums">{written.length}</span> on{" "}
                      {subject.toLowerCase()}
                      <ArrowUpRightIcon className="size-3.5" aria-hidden />
                    </Link>
                  ) : (
                    <p className="shrink-0 text-sm whitespace-nowrap text-muted-foreground tabular-nums">
                      {person.closed} closed
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* The link the fourth cell used to carry as a paragraph, now standing
            under the row where a reader looks once they have finished reading
            faces. */}
        <div className="relative mt-12 flex justify-center">
          <Button
            variant="outline"
            render={<Link href="/agents" />}
            className="rounded-full"
          >
            View all {spell(agents.length)} agents
            <ArrowUpRightIcon className="size-3.5" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
