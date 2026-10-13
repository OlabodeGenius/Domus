"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs } from "@base-ui/react/tabs";
import { useState } from "react";
import { portrait } from "@/components/estate/agents";
import { photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { copy, posts, slugOf } from "@/components/estate/posts";
import { scrollRow } from "@/components/scroll-row";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Two guides at a time instead of six, and the subject is the thing being
// chosen rather than the layout — which is what a row this wide buys: the
// excerpt gets read at its full measure instead of being clamped to two lines
// in a column 360px across.
//
// The row is Base UI's Tabs for the same reason section 12 is: arrow keys,
// Home and End and a roving tabindex are the part nobody writes twice.
const categories = [...new Set(posts.map((post) => post.category))];

export function Guides() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="guides"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <Tabs.Root value={active} onValueChange={(v) => setActive(Number(v))}>
        {/* The reference's split header: the eyebrow holds a narrow left
            column on its own and everything else — heading, lede, tabs — sits
            in the right one, so the section opens off-centre. */}
        <div className="grid gap-8 md:grid-cols-[12rem_1fr]">
          <Eyebrow className="h-fit">{copy.eyebrow}</Eyebrow>

          <div>
            <SectionHeading className="max-w-[22ch]">
              {copy.heading}
            </SectionHeading>
            <p className="mt-6 max-w-[52ch] text-base text-muted-foreground">
              {copy.lede}
            </p>

            <Tabs.List
              aria-label="Guides by subject"
              className={cn(scrollRow, "mt-10 gap-3")}
            >
              {categories.map((category, i) => (
                // The same pill as section 12's, down to the transparent
                // border on the chosen one: without it the pill loses 2px the
                // moment it is picked, and a row that resizes as you move
                // along it is a row that flinches.
                <Tabs.Tab
                  key={category}
                  value={i}
                  className={cn(
                    "inline-flex h-10 shrink-0 cursor-pointer items-center rounded-full border bg-card px-5 text-sm whitespace-nowrap transition-colors outline-none",
                    "text-muted-foreground hover:text-foreground",
                    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "data-active:border-transparent data-active:bg-foreground data-active:text-background!",
                  )}
                >
                  {category}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>
        </div>

        {categories.map((category, i) => (
          <Tabs.Panel key={category} value={i} className="mt-24 outline-none">
            {/* A hairline above the first row and one under each: every line
                drawn once, and no row carries a fill — a striped row would
                spend the only step left on a section with no ground. */}
            <ul className="border-t">
              {posts
                .filter((post) => post.category === category)
                .map((post) => (
                  <li
                    key={post.title}
                    className="group/row relative grid items-center gap-8 border-b py-10 md:grid-cols-2 md:gap-12"
                  >
                    <div>
                      {/* The category is a role rather than a status, so the
                          chip is the neutral one and the date stays plain ink
                          beside it. Legal here because the row carries no fill
                          of its own — a striped row would spend the rung the
                          chip is standing on. */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-foreground/6 px-3 py-1 text-sm text-muted-foreground">
                          {post.category}
                        </span>
                        <span className="text-sm text-muted-foreground tabular-nums">
                          {post.date}
                        </span>
                      </div>

                      <h3 className="mt-4 max-w-[26ch] text-2xl tracking-tight text-balance">
                        <Link
                          href={`/guides/${slugOf(post)}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* No max-width of its own: the column is half a
                          1200px container, so the excerpt already measures
                          about 68 characters — inside the 45–75 band, and a
                          cap written here would be a dead number the day the
                          container changes. */}
                      <p className="mt-4 text-base text-muted-foreground max-w-lg text-balance">
                        {post.excerpt}
                      </p>

                      {/* The byline closes the row on its own, because the
                          section's own lede claims these are written by the
                          agents rather than by a content team — and the avatar
                          is the same photograph section 11 prints the license
                          under.

                          No read link beside it: the whole row is already the
                          link, through the title's inset overlay and the
                          photograph's own anchor, so a third way in would only
                          be a label pretending to be a control. */}
                      <div className="mt-8 flex items-center gap-3">
                        <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={portrait(post.author.src, 96)}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </span>
                        {/* A split-weight line: the name in ink at medium, the
                            role beside it in muted at the same size, so the
                            byline needs no second type size. */}
                        <span className="text-sm font-medium">
                          {post.author.name}
                          {" · "}
                          <span className="font-normal text-muted-foreground">
                            {post.author.title}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* The photograph is a link of its own rather than being
                        left to the title's inset overlay: the frame is
                        positioned and comes later in the row, so it paints
                        over that overlay and a click on the picture would
                        otherwise land on nothing. Hidden from the
                        accessibility tree and out of the tab order, because
                        the title beside it already says where it goes. */}
                    <Link
                      href={`/guides/${slugOf(post)}`}
                      aria-hidden
                      tabIndex={-1}
                      className="relative block aspect-[16/9] overflow-hidden rounded-lg"
                    >
                      <Image
                        src={photo(post.src, 1200)}
                        alt={post.alt}
                        fill
                        sizes="(min-width: 768px) 560px, 90vw"
                        className="object-cover transition-[filter] duration-300 group-hover/row:brightness-[0.8]"
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </Tabs.Panel>
        ))}
      </Tabs.Root>

      {/* Outside Tabs.Root on purpose: it goes to all six guides rather than
          to the two the chosen subject is showing, so it must not read as
          part of the panel it happens to sit under.

          The neutral dark action rather than the brand hue — this page's
          --primary is a warm near-black, so the two would draw the same
          button, and this one survives a buyer rotating the hue. Centred
          under the closing hairline, which is where a list that has run out
          puts its way on. */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/guides"
          className="inline-flex h-10 items-center gap-1 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          View all guides
          <span className="tabular-nums">({posts.length})</span>
        </Link>
      </div>
    </section>
  );
}
