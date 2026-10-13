import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { portrait } from "@/components/estate/agents";
import { photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import type { Guide } from "@/components/estate/posts";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The reference holds a small label alone in the far-left margin and sets the
// statement indented well right of it, with a wide band of empty page before
// three figures run edge to edge along the foot. All three parts do a job here:
// the margin carries where you came from and who wrote this, the statement is
// the title and its standfirst, and the figures are the numbers the guide goes
// on to show its working for.
//
// The figures are the reason this reference was picked over anything in
// blog-sections. A guide that opens on a photograph and a date is a blog; one
// that opens on three numbers has already told you what it is going to argue.
export function GuideHero({ post }: { post: Guide }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8 pt-12 sm:pt-24">
      <div className="grid gap-10 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
        {/* The margin column. Everything in it is small and stacked, which is
            what lets the title beside it run at display size without the two
            competing. */}
        <div className="flex flex-col gap-6">
          <Link
            href="/guides"
            className={cn(
              reach,
              "inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            <ChevronLeftIcon className="size-4" aria-hidden />
            All guides
          </Link>

          <Eyebrow>{post.category}</Eyebrow>

          <div className="flex items-center gap-3">
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
              <span className="mt-1 block font-normal text-muted-foreground tabular-nums">
                {post.date} · {post.read} min
              </span>
            </span>
          </div>
        </div>

        <div>
          <SectionHeading as="h1" className="max-w-[22ch]">
            {post.title}
          </SectionHeading>
          <p className="mt-8 max-w-[58ch] text-base text-muted-foreground">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* The reference's wide band of empty page, then the three figures spread
          across the foot on dashed rules. The caption breaks itself, and the
          two halves take the two ink levels this style ships. */}
      <ul className="mt-20 grid gap-8 sm:grid-cols-3 md:mt-28">
        {post.figures.map((figure) => {
          const [label, note] = figure.caption.split("\n");
          return (
            <li key={figure.value}>
              {/* The same `text-4xl` the browse pages' title block sets its
                  figures at, and for the same reason: a page's h1 tops its own
                  type scale. The reference runs these larger than its statement
                  line, but there the figures are the statement — here the title
                  is the subject and three numerals at 60px next to it read as
                  the headline, numerals filling the em where lowercase does
                  not. Biggest thing in this band, still under the title. */}
              <p className="text-4xl tracking-tighter tabular-nums">
                {figure.value}
              </p>
              <p className="mt-6 border-t border-dashed pt-4 font-medium">
                {label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{note}</p>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-16 aspect-16/9 overflow-hidden rounded-lg sm:aspect-2/1">
        <Image
          src={photo(post.src, 2400)}
          alt={post.alt}
          fill
          sizes="(min-width: 1200px) 1136px, 92vw"
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
