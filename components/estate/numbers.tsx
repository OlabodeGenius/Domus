import { copy, figures } from "@/components/estate/figures";
import { SectionHeading } from "@/components/estate/section-heading";
import { license } from "@/components/estate/site-footer";

// Two credentials where the reference puts two certification badges. They are
// the same two the footer already carries, because a licence number that
// appears twice on a page and disagrees with itself is worse than one that
// appears once.
const credentials = [
  { label: "Licensed brokerage", value: license },
  { label: "Fair housing", value: "Equal Housing Opportunity" },
];

export function Numbers() {
  // The reference's deep maroon band is genuinely inverted — white ink on a
  // saturated ground — so it comes across as bg-foreground text-background
  // rather than as a rung. That is the one translation the style names for a
  // band this dark.
  //
  // Only one ink level exists here, and that is worth saying: the palette
  // ships --foreground and --muted-foreground for light grounds and nothing
  // for dark ones. Rather than invent a second level out of an opacity —
  // which the style bans and which never clears the floor anyway — the
  // hierarchy is carried by size, which is the style's own answer for
  // anything that has to sit back further than two levels allow.
  return (
    <section
      id="numbers"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="-mx-6 overflow-hidden rounded-lg bg-foreground text-background sm:-mx-8">
        {/* The reference sets its eyebrow and headline top-left and its
            certifications top-right, across the gutter, with the columns starting
            below both. The eyebrow is the page's badge, inverted: on this ground
            it takes the card's own ground rather than a border it cannot show. */}
        <div className="grid gap-10 p-6 sm:p-12 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-background/12 px-4 py-2 text-sm">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-background"
              />
              {copy.eyebrow}
            </p>
            <SectionHeading className="mt-6 max-w-[18ch]">
              {copy.heading}
            </SectionHeading>
            <p className="mt-6 max-w-[46ch] text-base">{copy.lede}</p>
          </div>
          <dl className="flex gap-10 md:pt-2">
            {credentials.map((credential) => (
              <div key={credential.label}>
                <dt className="text-sm">{credential.label}</dt>
                <dd className="mt-2 text-sm tabular-nums">
                  {credential.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Four columns divided by vertical hairlines, the figure pinned to the
            foot of each — which is where the reference's weight sits and why its
            shape reads bottom-heavy. The rule colour is the ground's own ink at
            the one alpha this band can afford, since a border token keyed to a
            light page is invisible here. */}
        <div className="grid grid-cols-2 border-t border-background/15 md:grid-cols-4">
          {figures.map((figure) => (
            <div
              key={figure.label}
              className="flex min-h-56 flex-col justify-between gap-10 border-background/15 p-6 sm:p-8 [&:not(:nth-child(2n))]:border-r md:[&:not(:last-child)]:border-r md:[&:nth-child(2n)]:border-r"
            >
              <p className="max-w-[16ch] text-sm">{figure.label}</p>
              <p className="text-5xl tracking-tighter tabular-nums">
                {figure.value}
                {figure.unit && (
                  <span className="ml-2 text-lg">{figure.unit}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
