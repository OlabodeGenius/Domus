import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { portrait } from "@/components/estate/agents";
import { photo } from "@/components/estate/areas";
import { type Guide, slugOf } from "@/components/estate/posts";
import { cn } from "@/lib/utils";

// Six guides as six equals, and the pick of the six layouts this shelf was
// built at. No focal tile, no stagger, no row worth more room than its
// neighbours — every card carries the same slots at the same size, and the only
// thing deciding the order is the date.
//
// That is the argument it won on, and it is the one none of the other five
// could make: the moment a layout marks one guide as the lead, a reader who
// filtered to *Selling* is being told which of their two is the better one.
// Here the pills narrow the shelf and nothing else editorialises. The five that
// lost — a featured bento, a masonry, an accordion index, a rack of covers and
// a two-band spread — came out with the chooser, along with the four references
// they spent, which go back unspent since none of them shipped.
//
// The reference gives its cards no surface: the content sits on the page and
// the photograph is the only object. Held here, against the slab rather than
// against white, which is what keeps the excerpt readable at six across two
// rows.
export function GuideShelf({
  posts,
  filter,
}: {
  posts: readonly Guide[];
  filter: ReactNode;
}) {
  return (
    <section
      id="shelf"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12">
        {filter}

        {/* `gap-y` well over `gap-x`: two rows of cards with no surface of
            their own separate by air alone, and equal gaps in both directions
            would read as one field of twelve things rather than as six. */}
        <ul
          className={cn(
            "mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2",
            // Two cards in a three-column grid leave the last column empty and
            // the row reads as unfinished. Every subject carries two guides, so
            // the filtered shelf is the common case rather than the edge one.
            posts.length > 2 && "lg:grid-cols-3",
          )}
        >
          {posts.map((post) => (
            <li key={post.title} className="group/card relative flex flex-col">
              <div className="relative aspect-16/10 overflow-hidden rounded-lg">
                <Image
                  src={photo(post.src, 720)}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-[filter] duration-300 group-hover/card:brightness-[0.8]"
                />
              </div>

              {/* The reference's date-then-pill order, kept: the date is the
                  thing that sorts this grid, so it reads first and the subject
                  answers behind it. The chip is the neutral one, because a
                  subject is a role and not a status. */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="tabular-nums">{post.date}</span>
                <span className="rounded-full bg-foreground/6 px-3 py-1">
                  {post.category}
                </span>
              </div>

              <h3 className="mt-4 text-lg tracking-tight text-balance">
                <Link
                  href={`/guides/${slugOf(post)}`}
                  className="underline-offset-2 outline-none after:absolute after:inset-0 after:z-10 after:content-[''] group-hover/card:underline focus-visible:underline"
                >
                  {post.title}
                </Link>
              </h3>

              {/* Three lines whatever the excerpt runs to, so the author rows
                  below land on one line across a row of three. `mt-auto` on
                  the row is what holds that when a title wraps to three lines
                  in one column and two in the next. */}
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                {post.excerpt}
              </p>

              {/* The reference closes every card on the writer, stacked rather
                  than run together — name in ink over the role in muted, both
                  at one size. It is the claim this page's lede makes, that the
                  agents taking the calls are the ones writing these. */}
              <div className="mt-auto flex items-center gap-3 pt-6">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={portrait(post.author.src, 120)}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="text-sm font-medium">
                  {post.author.name}
                  <span className="mt-0.5 block font-normal text-muted-foreground">
                    {post.author.title}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
