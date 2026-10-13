import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { type Guide, posts, slugOf } from "@/components/estate/posts";
import { SectionHeading } from "@/components/estate/section-heading";

// Three guides, ranked rather than sliced: the other one on this subject comes
// first, then the rest in the order the shelf holds them. With six guides and
// two per subject that is one same-subject guide and two from elsewhere, which
// is the row a reader who just finished one actually wants.
function nextThree(current: Guide) {
  const others = posts.filter((post) => post.title !== current.title);
  const sameSubject = others.filter(
    (post) => post.category === current.category,
  );
  return [
    ...sameSubject,
    ...others.filter((post) => post.category !== current.category),
  ].slice(0, 3);
}

export function GuideRelated({ post }: { post: Guide }) {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <Eyebrow>Keep reading</Eyebrow>
        <SectionHeading className="mt-6 max-w-[22ch]">
          What we would hand you next
        </SectionHeading>
      </div>

      <ul className="mt-16 grid gap-8 md:grid-cols-3">
        {nextThree(post).map((next) => (
          <li key={next.title} className="group/card relative flex flex-col">
            <div className="relative aspect-3/2 overflow-hidden rounded-lg">
              <Image
                src={photo(next.src, 720)}
                alt={next.alt}
                fill
                sizes="(min-width: 768px) 360px, 90vw"
                className="object-cover transition-[filter] duration-300 group-hover/card:brightness-[0.8]"
              />
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              <span className="tabular-nums">{next.date}</span>
              <span aria-hidden className="mx-2 text-muted-foreground/50">
                ·
              </span>
              <span className="tabular-nums">{next.read} min</span>
            </p>

            <h3 className="mt-3 pb-6 text-base font-medium tracking-tight text-balance">
              <Link
                href={`/guides/${slugOf(next)}`}
                className="underline-offset-4 outline-none after:absolute after:inset-0 after:content-[''] group-hover/card:underline focus-visible:underline"
              >
                {next.title}
              </Link>
            </h3>

            {/* The reference's hairline and read link close every card on the
                same line, which only holds if the titles above them do not.
                `mt-auto` is what keeps the row's feet aligned when one title
                wraps to three lines and its neighbour wraps to two — but auto
                collapses to nothing on the tallest card, and the rule sits at
                the top edge of the padding, so `pt-4` cannot hold it off the
                title. The gap above it is `pb-6` on the title instead. */}
            <p className="mt-auto flex items-center justify-between gap-4 border-t pt-4 text-sm font-medium">
              Read this guide
              <ChevronRightIcon
                className="size-4 shrink-0 transition-transform group-hover/card:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0"
                aria-hidden
              />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
