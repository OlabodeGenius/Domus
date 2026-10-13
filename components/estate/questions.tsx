// reference's eyebrow is a bare grey word; this page has one eyebrow component
// and it is a badge, so the badge is what sits there. Departed twice: the
// accordion is exclusive and opens on the first row, where the reference leaves
// the open row to chance — six answers all closed is a section that shows
// nothing, and a page whose FAQ opens empty reads as a page hiding the answers.
// Departed three times: the reference's photo is bare, and a big image here
// carries a fragment of the product.)
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  CheckmarkCircle02Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { agents, portrait } from "@/components/estate/agents";
import { photo } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { questions } from "@/components/estate/faq";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/estate/section-heading";

// The agent who answers, read rather than retyped — the accordion two columns
// over has a row about choosing your own agent, and it would be the same one.
const [, replier] = agents;

// The overlay family, one recipe so the four read as one set. Opaque rather
// than the hero's glass: the hero owns that treatment, and a second section
// repeating it makes the page look like it has one trick. The cast is
// hand-written because over a photograph both shipped tokens are too tight and
// too cold — this one is wider, warmer, and carries the hairline itself.
const float =
  "absolute rounded-lg bg-card shadow-[0_2px_6px_hsl(30_6%_10%/0.06),0_22px_44px_-14px_hsl(30_6%_10%/0.30)]";

// The reference sets its header hard left over the split rather than centred
// over it, which is the one thing that keeps a 50/50 section from reading as two
// unrelated halves: the heading starts on the photo's edge and the picture hangs
// under it.
export function Questions() {
  return (
    <section
      id="faq"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="max-w-[34rem]">
        <Eyebrow>Questions</Eyebrow>
        <SectionHeading className="mt-6">
          Everything people ask before they call
        </SectionHeading>
      </div>

      {/* items-start, and the photo carries its own ratio: stretched to the row
          it would grow and shrink every time a row opens, and a picture that
          resizes on a click is the section drawing attention to its own
          mechanics. The column is free to be taller or shorter than it. */}
      <div className="mt-14 grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Two boxes and not one. Nothing breaks this edge any more, so the
            outer box is not holding the overlays in — it is keeping the clip
            off them: overflow-hidden here would cut every card's shadow at the
            picture's rim, and the radius belongs to the photograph. */}
        <div className="relative aspect-[4/5] lg:aspect-[6/7]">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <Image
              src={photo(
                "https://images.unsplash.com/photo-1641963168072-48f0857dd8a9",
                1100,
              )}
              alt="Bougainvillea in flower against a cream stucco building with iron balcony rails"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* The arrangement is the user's, read off a reference frame: all
              four inside the picture on one inset, three down the left rail and
              the judgement alone on the right. The top and bottom cards sit at
              the same 48px off their edge, so the left rail is bracketed rather
              than drifting; the two in the middle are percentages, because the
              frame is 4/5 on a phone and 6/7 on a desktop and a pixel offset
              between them lands somewhere different on each.

              1 — a state, and the one that answers the question a reader is
              actually holding: does anybody reply. */}
          <div
            className={cn(
              float,
              "top-12 left-6 flex items-center gap-3 p-2.5 pr-5 sm:left-8",
            )}
          >
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={portrait(replier.src, 80)}
                alt={replier.alt}
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-sm font-medium">
                {replier.name.split(" ")[0]} replied
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                <span className="tabular-nums">41 min</span> after the question
              </span>
            </span>
          </div>

          {/* 2 — a number, and the row four places down says the same eleven
              days in a sentence. Foot of the left rail, under the mark, and
              ranged left with it: the reference reads the two as one stack.

              Two of the four come off below lg. The frame is the same picture
              at half the width there, and four overlays on it stop reading as
              a photograph — the style's own "one is plenty on a small frame".
              These two are the ones the accordion already says in words. */}
          <div
            className={cn(
              float,
              "bottom-12 left-6 hidden px-4 py-3 sm:left-8 lg:block",
            )}
          >
            <p className="text-2xl tracking-tight tabular-nums">11 days</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Median listing to first offer
            </p>
          </div>

          {/* 3 — a mark, answering row one. A pill rather than a card, so the
              four are not four of the same size. */}
          <div
            className={cn(
              float,
              "bottom-[24%] left-6 hidden items-center gap-2 rounded-full py-2.5 pr-5 pl-3 sm:left-8 lg:flex",
            )}
          >
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={16}
              strokeWidth={1.5}
              className="text-primary"
              aria-hidden
            />
            <span className="text-sm">Nothing to pay until it sells</span>
          </div>

          {/* 4 — a judgement, the heaviest of the four and the only one on the
              right rail. It rides at a quarter down the frame where the two
              small ones are up, and drops to the foot below lg, where they are
              both gone and the frame would otherwise be top-heavy. */}
          <div
            className={cn(
              float,
              "right-6 bottom-12 p-5 sm:right-8 lg:top-[26%] lg:bottom-auto",
            )}
          >
            <p className="flex items-center gap-1" aria-hidden>
              {/* Heroicons' solid star, at the user's call. A rating is a
                  filled mark and this one is drawn as a filled shape, where the
                  stroked set it replaced only looked filled once a fill class
                  was laid over the outline. */}
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="size-3.5 text-primary" />
              ))}
            </p>
            <p className="mt-2.5 text-sm">
              <span className="font-medium tabular-nums">4.9</span> from{" "}
              <span className="tabular-nums">312</span> sellers
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Verified after closing, last two years
            </p>
          </div>
        </div>

        {/* Native exclusive accordion, the same `name` trick section 5 uses —
            one open at a time, no JavaScript, and it survives a page printed or
            read without scripts. */}
        <div className="flex flex-col gap-1">
          {questions.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className={cn(
                "group/faq rounded-lg transition-colors open:bg-accent",
                // Hover is per state: the open row already owns a ground, and
                // repainting it on hover would hide the ink that says it is
                // open. Only the closed rows light up.
                "[&:not([open])]:hover:bg-accent/60",
              )}
            >
              <summary
                className={cn(
                  reach,
                  "flex cursor-pointer list-none items-center justify-between gap-6 p-6",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                <span className="text-base font-medium text-balance">
                  {item.q}
                </span>
                {/* One tile, one glyph, and the close mark is the plus turned
                    45 degrees — the same drawing an × is. Two glyphs swapped at
                    the moment of the press would be the one thing on this row
                    that does not travel with the panel opening under it.

                    A 36px circle, at the user's call, which is the closed
                    neighbourhood row's marker to the pixel. The glyph inside it
                    is 16px rather than that row's 18: this tile carries a
                    border once the row opens, and the ring reads as weight the
                    borderless one does not have.

                    On hover the closed tile goes transparent rather than
                    matching the hover tint — an alpha laid over the same alpha
                    composites darker, so the only way the tile can *be* the
                    hover ground is to stop painting one. And the open row's
                    button is exempt: its variants are stacked so the pair beats
                    the single-variant hover on specificity rather than on
                    whichever way the sheet happens to be written out. */}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center transition-colors",
                    "rounded-full bg-accent group-hover/faq:bg-transparent",
                    "group-open/faq:border group-open/faq:bg-card group-open/faq:group-hover/faq:bg-card",
                  )}
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 ease-out group-open/faq:rotate-45"
                    aria-hidden
                  />
                </span>
              </summary>
              {/* Indented to the question, and stopped short of the tile so the
                  answer never runs under the close button. */}
              <p className="max-w-[52ch] px-6 pb-6 text-base text-muted-foreground">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
