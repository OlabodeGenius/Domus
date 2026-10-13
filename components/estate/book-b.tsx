import Image from "next/image";
import Link from "next/link";
import { photo } from "@/components/estate/areas";
import { SectionHeading } from "@/components/estate/section-heading";

// The mid-page ask, built on the reference rather than departing from it the
// way the closing section does: centred copy on the dark half, a photograph
// filling the other, and a single pill button instead of a form. It began as a
// candidate for the closing band and took the off-market register's slot
// instead, which is the better home for it — a band this dark needs light
// sections either side, and it now has them.
//
// The button is a jump to the form at the foot, not a second form. That is what
// lets one page carry the same ask twice without asking for the conversion
// twice.
//
// This file and `book.tsx` are built on one layout spent twice on the home
// page, which is deliberate rather than a duplicate to clean up: this section
// and the closing band are meant to read as the same offer met twice, once in
// passing and once at the end, and building the second on a different shape
// would have made them look like two different asks. No other pair on the page
// gets that licence.
//
// Two translations, both tone rather than structure, so neither is a departure:
// the reference's lime pill becomes the inverted neutral action, because this
// palette's brand hue is a near-black and a near-black button on a near-black
// band is not a button; and its email fallback becomes the office line the
// footer already prints, rather than inventing a second contact channel for one
// sentence.
const copy = {
  heading: "Every door on this site opens with one call",
  lede: "Fifteen minutes with a licensed agent: the streets you have been watching, what they are really going for, and the homes that never reach this site at all.",
  action: "Book a viewing",
  fallback: "Rather not book online?",
  phone: "(617) 555-0148",
} as const;

export function BookB() {
  return (
    <section
      id="book-b"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      {/* -mx-8 from lg so the pair cancels the container's gutters and reads
          as one band across the column, the way the reference's does across
          its page. Below lg it keeps the gutter — a stacked panel with a 24px
          radius running into the viewport edge reads as a clipped card.
          The gap between the halves is the reference's too — it is what keeps
          the photograph an object beside the panel rather than a fill inside
          it. */}
      <div className="grid items-stretch gap-4 lg:-mx-8 lg:grid-cols-2">
        {/* Centred on both axes, which is the reference's whole composition:
            the copy is a block floating in the dark rather than a column set
            against its top-left corner. */}
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-lg bg-foreground px-6 py-16 text-center text-background sm:px-12 lg:min-h-[520px]">
          <SectionHeading className="max-w-[16ch]">
            {copy.heading}
          </SectionHeading>

          <p className="mt-6 max-w-[44ch] text-base">{copy.lede}</p>

          {/* 44px is the one tall control on the page and a closing band is
              where it belongs; 24px of inline padding is half of it. */}
          <Link
            href="#book"
            className="mt-9 inline-flex h-10 items-center gap-1 rounded-full bg-background px-6 text-base font-medium text-foreground transition-colors hover:bg-background/90"
          >
            {copy.action}
          </Link>

          {/* One ink level exists on an inverted ground, so this line sits back
              by size rather than by a second colour or an opacity, and the
              number is told apart from the sentence by its underline. */}
          <p className="mt-6 text-sm">
            {copy.fallback}{" "}
            <a
              href={`tel:${copy.phone.replace(/[^0-9]/g, "")}`}
              className="whitespace-nowrap underline underline-offset-4 tabular-nums"
            >
              {copy.phone}
            </a>
          </p>
        </div>

        <div className="relative min-h-[280px] overflow-hidden rounded-lg lg:min-h-[520px]">
          <Image
            src={photo(
              "https://images.unsplash.com/photo-1521119989659-a83eee488004",
              1100,
            )}
            alt="A man in a dark polo neck, photographed outdoors against a pale sky"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
