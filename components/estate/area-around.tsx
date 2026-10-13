import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { MetroIcon } from "@hugeicons/core-free-icons";
import { AreaPlan } from "@/components/estate/area-plan";
import { areas, photo, type Area } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { slugify } from "@/lib/utils";

// The reference sets copy and one oversized figure on the left, and stacks a
// tile over a run of rows on the right, all of it on a tinted band. The tile is
// the plan; the rows are the other five, which is what turns this section from
// a description into the way through the site — a visitor who has decided this
// area is too dear needs the next one to be one press away, not a trip back to
// the index.
//
// The plan itself is `area-plan.tsx`, the same drawing /neighborhoods mounts.
// Handed no `onChoose` it renders five links and one plain chip, so this whole
// section stays a server component and ships no JavaScript.
export function AreaAround({ area }: { area: Area }) {
  const others = areas.filter((one) => one.name !== area.name);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-16">
          {/* Sticky, because the column opposite is a plan over five rows
              and runs a third taller than this one. Left in normal flow the
              figure either sits stranded halfway down or leaves that much
              air under it; pinned, the name and the ride stay beside
              whichever of the five is being read. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow icon={MetroIcon} className="bg-card">
              Where it sits
            </Eyebrow>
            <SectionHeading className="mt-6 max-w-[16ch]">
              {area.name}, and the ride in
            </SectionHeading>

            {/* The reference breaks its column with a dashed rule and drops the
                figure well below it, so the number reads as a second beat
                rather than as a caption to the heading. */}
            <p className="mt-10 max-w-[40ch] border-t border-dashed pt-8 text-sm text-muted-foreground">
              The plan opposite is drawn, not surveyed. What it is honest about
              is arrangement: which of the six you would be next to, and which
              side of the river you would wake up on.
            </p>

            <div className="mt-14">
              <p className="text-6xl tracking-tighter tabular-nums">
                {area.commute} min
              </p>
              <p className="mt-4 max-w-[32ch] text-sm text-muted-foreground">
                Door to Downtown Crossing on the T, at nine in the morning and
                with one change at most.
              </p>
            </div>
          </div>

          <div>
            {/* The reference's tile, lifted off the band. shadow-soft and no
                border: that token opens with its own hairline ring, so
                declaring both would draw the edge twice. */}
            <div className="rounded-lg bg-card p-4 shadow-soft sm:p-5">
              <AreaPlan chosen={area.name} />
              <p className="mt-4 px-1 text-sm text-muted-foreground">
                Each of the other five below opens its own page.
              </p>
            </div>

            {/* The reference's rows, dashed-ruled between. Each is one link
                covering the whole row rather than a row with a button in the
                corner: a 56px target beats a 36px one, and there is only one
                place a row like this can go. */}
            <ul className="mt-8">
              {others.map((one) => (
                <li
                  key={one.name}
                  className="group relative flex items-center gap-4 border-t border-dashed py-4 first:border-t-0 first:pt-0"
                >
                  <Image
                    src={photo(one.src, 96)}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-sm object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium">
                      <Link
                        href={`/neighborhoods/${slugify(one.name)}`}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline group-focus-within:underline-offset-4"
                      >
                        {one.name}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                      {one.active} on the book
                      <span aria-hidden className="px-1.5">
                        ·
                      </span>
                      {one.median}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-card px-3.5 py-1.5 text-sm tabular-nums">
                    {one.commute} min
                  </span>
                  {/* Off below sm: the row is 326px there, and the glyph's
                      36px is what pushes the second line to three. The whole
                      row is the link either way, so nothing is lost. */}
                  <span
                    aria-hidden
                    className="hidden shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:block"
                  >
                    <ArrowUpRightIcon className="size-5" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
