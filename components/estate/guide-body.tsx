import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { portrait } from "@/components/estate/agents";
import type { Guide } from "@/components/estate/posts";
import { ShareButton } from "@/components/estate/saved";
import { reach } from "@/components/reach";
import { cn, slugify } from "@/lib/utils";

// One reading column and a rail, which is the shape an article of this length
// wants. The column keeps the
// site's own prose treatment — `text-base` in muted at about 62 characters,
// the same setting /about's story runs at — so a guide reads like the rest of
// the site rather than like a plugin dropped into it.
//
// The rail carries what a reader reaches for mid-article and nothing else: how
// far in they are, who wrote this, and the link. It is sticky from `lg`, under
// the 80px header the shell mounts.
export function GuideBody({ post }: { post: Guide }) {
  // `flatMap` rather than `filter`: a filter leaves the union in place and
  // the rail would be mapping over blocks that might not have a heading on
  // them. This hands back the strings themselves.
  const headings = post.body.flatMap((block) =>
    "h" in block ? [block.h] : [],
  );

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        {/* The rail comes first in the source and second on screen: a contents
            list is read before an article, and on a phone it has to arrive
            before the thing it lists rather than 2,000px below it. */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg bg-accent p-6">
            <p className="text-sm font-medium">On this page</p>
            <ol className="mt-4 flex flex-col gap-3">
              {headings.map((heading, i) => (
                <li key={heading} className="flex gap-3 text-sm">
                  <span
                    aria-hidden
                    className="text-muted-foreground tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <Link
                    href={`#${slugify(heading)}`}
                    className={cn(
                      reach,
                      "text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    )}
                  >
                    {heading}
                  </Link>
                </li>
              ))}
            </ol>

            {/* The one control on the page that is not a link, and it needs no
                server: it writes this URL to the clipboard, which is what
                somebody halfway through a guide about closing costs actually
                wants to do with it. */}
            <div className="mt-6 border-t pt-6">
              <ShareButton className="w-full justify-center" />
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={portrait(post.author.src, 144)}
                  alt={post.author.alt}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="text-sm font-medium">
                {post.author.name}
                <span className="mt-1 block font-normal text-muted-foreground">
                  {post.author.title}
                </span>
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {post.author.line}
            </p>

            <p className="mt-4 text-sm text-muted-foreground tabular-nums">
              {post.author.license}
            </p>

            <a
              href={`mailto:${post.author.email}`}
              className={cn(
                reach,
                "mt-4 inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline",
                "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              )}
            >
              Write to {post.author.name.split(" ")[0]}
              <ArrowUpRightIcon className="size-3.5" aria-hidden />
            </a>
          </div>
        </aside>

        {/* `[&>*:first-child]:mt-0` rather than `first:mt-0` on every block:
            the gap above each kind is a property of that kind, and the only
            exception is whichever one opens the article. */}
        <div className="max-w-[62ch] lg:col-start-1 lg:row-start-1 [&>*:first-child]:mt-0">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ block }: { block: Guide["body"][number] }) {
  if ("h" in block) {
    return (
      // `scroll-mt-28` clears the sticky header, or the rail's own links land
      // the heading they jumped to underneath it.
      <h2
        id={slugify(block.h)}
        className="mt-16 scroll-mt-28 text-2xl tracking-tight"
      >
        {block.h}
      </h2>
    );
  }

  if ("p" in block) {
    return <p className="mt-6 text-base text-muted-foreground">{block.p}</p>;
  }

  if ("list" in block) {
    return (
      <ul className="mt-6 flex flex-col gap-3">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3 text-base text-muted-foreground">
            <span
              aria-hidden
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if ("table" in block) {
    const { head, rows, total } = block.table;
    return (
      <div className="mt-8 overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent">
              <th scope="col" className="px-5 py-3 text-left font-medium">
                {head[0]}
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium">
                {head[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t">
                <td className="px-5 py-3 text-muted-foreground">{label}</td>
                <td className="px-5 py-3 text-right tabular-nums">{value}</td>
              </tr>
            ))}
            {total ? (
              <tr className="border-t bg-accent font-medium">
                <td className="px-5 py-3">{total[0]}</td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {total[1]}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <aside className="mt-10 rounded-lg bg-accent p-6 sm:p-8">
      <p className="text-base">{block.note}</p>
      {block.link ? (
        <Link
          href={block.link.href}
          className={cn(
            reach,
            "mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          )}
        >
          {block.link.label}
          <ArrowUpRightIcon className="size-3.5" aria-hidden />
        </Link>
      ) : null}
    </aside>
  );
}
