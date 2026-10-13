import Image from "next/image";
import { photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Stars, copy, quotes, tiles } from "@/components/estate/quotes";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// Quote cards and photo tiles in one grid, and the whole composition is one
// piece of arithmetic.
//
// A quote needs more width than a photograph does — it is the thing being read,
// and a tile carries nothing. But the moment the two sizes differ, the rows
// stop matching by accident: with three quotes and three tiles split 1+2 and
// 2+1, a row of T+2Q and a row of Q+2T are only equal when Q equals T, which is
// the equal grid this is trying to leave.
//
// So the split is the other one. Each row keeps its own track template, and the
// two are chosen to total the same:
//
//     row one   [Q 1.3][T 1][Q 1.3]  = 3.6
//     row two   [T 1][Q 1.6][T 1]    = 3.6
//
// Both rows end exactly where the container ends — that is the balance the
// offset rows never had. What staggers is inside them: the column boundaries
// land at 1.3 / 2.3 on the top row and 1.0 / 2.6 on the bottom, so no seam runs
// straight down the section, and the quotes alternate edges-then-centre. The
// misalignment is the device now, rather than the overhang.
const rowOne = [
  { kind: "quote", i: 0 },
  { kind: "tile", i: 0 },
  { kind: "quote", i: 1 },
] as const;
const rowTwo = [
  { kind: "tile", i: 1 },
  { kind: "quote", i: 2 },
  { kind: "tile", i: 2 },
] as const;

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="mx-auto mb-14 max-w-[46rem] text-center">
        <Eyebrow className="mx-auto">{copy.eyebrow}</Eyebrow>
        <SectionHeading className="mt-6">{copy.heading}</SectionHeading>
        <p className="mx-auto mt-6 max-w-[52ch] text-base text-muted-foreground">
          {copy.lede}
        </p>
      </div>

      <Row cells={rowOne} className="md:grid-cols-[1.3fr_1fr_1.3fr]" />
      <Row cells={rowTwo} className="mt-4 md:grid-cols-[1fr_1.6fr_1fr]" />
    </section>
  );
}

function Row({
  cells,
  className,
}: {
  cells: readonly { kind: "tile" | "quote"; i: number }[];
  className?: string;
}) {
  return (
    // One column below md, where three tracks of any ratio are three slivers.
    // The height is the row's rather than the cell's from md up, so a quote and
    // the tile beside it agree without either one stating a number.
    <div className={cn("grid gap-4 md:h-[300px]", className)}>
      {cells.map((cell) =>
        cell.kind === "tile" ? (
          <div
            key={`tile-${cell.i}`}
            className="relative h-[220px] overflow-hidden rounded-lg md:h-full"
          >
            <Image
              src={photo(tiles[cell.i].src, 800)}
              alt={tiles[cell.i].alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          // Tinted rather than white: the section has no ground, so a bg-card
          // quote would separate from the page by a 1.02 contrast ratio and
          // read as loose text. Tint is the option that needs no edge drawn,
          // and next to the photo tiles it stays the quieter of the two.
          <figure
            key={`quote-${cell.i}`}
            className="flex flex-col justify-between gap-5 rounded-lg bg-accent p-7 md:h-full"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={photo(quotes[cell.i].avatar, 160)}
                    alt={quotes[cell.i].alt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{quotes[cell.i].name}</p>
                  <Stars className="mt-1 block" />
                </div>
              </div>
              <blockquote className="mt-5 text-base text-balance">
                &ldquo;{quotes[cell.i].quote}&rdquo;
              </blockquote>
            </div>
            {/* The reference closes each card with the product underlined. Here
                that is the address, which is what the sitemap asks this section
                to carry and the thing an adjective cannot stand in for. */}
            <figcaption className="text-sm text-muted-foreground">
              {quotes[cell.i].name.split(" ")[0]}{" "}
              <span className="underline underline-offset-4">
                {quotes[cell.i].did}
              </span>
              {", "}
              {quotes[cell.i].area}
            </figcaption>
          </figure>
        ),
      )}
    </div>
  );
}
