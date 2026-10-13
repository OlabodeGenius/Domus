import { HugeiconsIcon } from "@hugeicons/react";
import { BookingForm, copy } from "@/components/estate/booking-form";
import { SectionHeading } from "@/components/estate/section-heading";

export function Book({ area }: { area?: string }) {
  // Both halves run to their own edge of the viewport, which is what makes
  // this a split-bleed rather than a split. The dark half is genuinely
  // inverted, which is the one translation the style names for a band this
  // far below the page.
  return (
    <section
      id="book"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="grid items-stretch gap-y-10 lg:grid-cols-2">
        <div className="-ml-6 rounded-r-lg bg-foreground px-6 py-14 text-background sm:-ml-8 sm:px-12 lg:-ml-[calc((100vw-1200px)/2+2rem)] lg:py-20 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          <div className="lg:max-w-[26rem]">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-background/12 px-4 py-2 text-sm">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-background"
              />
              {copy.eyebrow}
            </p>
            <SectionHeading className="mt-6">{copy.heading}</SectionHeading>
            <p className="mt-6 text-base">{copy.lede}</p>
            {/* One ink level exists on an inverted ground, so these sit back by
                size rather than by a second colour or an opacity. */}
            {/* One ink level, so the icon cannot sit back by colour either —
                it sits back by weight instead, drawn at 1.5 against text that
                is solid. gap-3 rather than 2.5 now that each line opens with a
                glyph: the row needs the air the bare sentence did not. */}
            <ul className="mt-8 flex flex-col gap-3.5 border-t border-background/15 pt-8">
              {copy.reassurances.map(({ icon, line }) => (
                <li key={line} className="flex items-center gap-3 text-sm">
                  <HugeiconsIcon
                    icon={icon}
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:py-6 lg:pl-12">
          <BookingForm area={area} />
        </div>
      </div>
    </section>
  );
}
