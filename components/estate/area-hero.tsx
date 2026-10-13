import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Location01Icon } from "@hugeicons/core-free-icons";
import { photo, type Area } from "@/components/estate/areas";
import { PageHeader } from "@/components/estate/page-header";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

// The header, and the pick is the block the site already owns. Two other
// versions were built and read in place against it — copy on a tinted slab with
// the photograph and three floating figure pills, and a full-bleed photograph
// with the name at 96px across its foot — and both came off with the decision,
// along with the chooser that held all three.
//
// What the pick costs is the photograph's place in the argument: a band under
// the block is a picture the reader meets after the figures rather than with
// them, and the full-bleed version was the one that led with it. What it buys
// is that /listings and /neighborhoods already open with this exact block, four
// more routes still owe one, and a visitor crossing between them reads one
// masthead rather than three.
//
// The badge says Greater Boston rather than Neighborhood. On one row with the
// way back it would otherwise read "All six neighborhoods · Neighborhood",
// which is the same word twice; the market is the one thing this site commits
// to on every page and says out loud nowhere above the footer, so the trail
// runs index → region → this place.
//
// The band is a slot on `PageHeader` rather than a section of its own. `main`
// is one flex column with a 10rem gap, so a second section here would have put
// 160px between a title block and its own photograph.
export function AreaHero({ area }: { area: Area }) {
  return (
    <PageHeader
      back={{ href: "/neighborhoods", label: "All six neighborhoods" }}
      eyebrow="Greater Boston"
      icon={Location01Icon}
      heading={area.name}
      figures={[
        { value: area.median, caption: "Median asking\nacross our own book" },
        {
          value: `${area.active}`,
          caption: `Homes standing in\n${area.name} this morning`,
        },
      ]}
      lede={
        <>
          {area.line}{" "}
          <span className="text-foreground">
            First offers land in {area.days} days here
          </span>
          , against a median of eleven across the six.
        </>
      }
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          src={photo(area.src, 2400)}
          alt={area.alt}
          width={1200}
          height={500}
          // 21/9 is a band at 1136 across and a letterbox slot at 326, where it
          // comes out 140px tall and stops being a photograph. Squarer on a
          // phone, which is the only place the ratio has to change.
          className="aspect-3/2 w-full object-cover sm:aspect-21/9"
          priority
        />
      </div>

      {/* The band's own footnote row: what the streets here are built of on the
          left, the way onto the book on the right. `stock` sits here rather
          than opening the section on what is within a walk — that section is
          about transit, schools and shops, and a sentence about brownstones was
          answering a question it had not asked. */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="max-w-[52ch] text-sm text-muted-foreground">
          {area.stock}
        </p>
        <Button
          render={<Link href={`/listings?area=${slugify(area.name)}`} />}
          className="rounded-full"
        >
          See {area.active} homes here
          <ArrowUpRightIcon data-icon="inline-end" aria-hidden />
        </Button>
      </div>
    </PageHeader>
  );
}
