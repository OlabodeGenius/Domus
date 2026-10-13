import Image from "next/image";
import Link from "next/link";
import { agents, portrait } from "@/components/estate/agents";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { Button } from "@/components/ui/button";

// The reference sets a statement across four lines on a tinted panel and cuts
// three photographs into it as pills, sitting on the baseline between the
// words. It is the one section on this page carrying photography at all, which
// is why it opens the page rather than closes it: everything under it is a
// figure, an address or a notice.
//
// The panel is the tinted band, not a rung between. Numbers further down is the
// inverted one, and the timeline between them carries no ground of its own —
// two bands never touch on this page.
//
// The three photographs are already on the site. A brokerage arguing that it
// shoots its own listings should not be the page that introduces a stock photo
// nothing else has seen, and each of these is a frame a visitor meets again on
// a listing, an area or the roster.
const cutouts = [
  {
    src: portrait(agents[0].src, 200),
    alt: "Tom Brennan, founding partner",
  },
  {
    src: "https://images.unsplash.com/photo-1627141234469-24711efb373c?w=200&q=75",
    alt: "A dark-clad house with tall windows, photographed for a listing",
  },
  {
    src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=200&q=75",
    alt: "A white sofa beside a fireplace under exposed beams",
  },
];

// Sized in `em` so a cutout tracks the line it is set in rather than a pixel
// height that stops matching the moment the heading steps up at md. The pill is
// wider than it is tall, which is the reference's shape and also the only
// proportion that survives being cut out of a line of type.
function Cutout({ index }: { index: number }) {
  const cutout = cutouts[index];
  return (
    <span className="mx-1.5 inline-block h-[0.72em] w-[1.5em] overflow-hidden rounded-full align-[-0.08em]">
      <Image
        src={cutout.src}
        alt={cutout.alt}
        width={200}
        height={120}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function AboutStory() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12 md:p-16">
        <Eyebrow>How we work</Eyebrow>

        {/* No cutout closes the sentence. The pill carries its own side
            margin, so a full stop set after one lands a space away from the
            word it belongs to, and at 48px that gap reads as a typo. */}
        <SectionHeading className="mt-8 max-w-[30ch]">
          Nobody hands you off. The agent
          <Cutout index={0} />
          who prices your house is the one who photographs it
          <Cutout index={1} />
          and the one who sits in it
          <Cutout index={2} />
          on Sunday.
        </SectionHeading>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
          <p className="max-w-[62ch] text-base text-muted-foreground">
            Tom Brennan spent nine years at a franchise before he left it. The
            commission split was the smaller half of why. The larger half was
            that a seller in Brookline got a call centre in Chicago, and the
            photographer who shot the listing had never seen the street.
          </p>
          <p className="max-w-[62ch] text-base text-muted-foreground">
            So the whole chain stays in one office. We shoot the photography and
            hold the open houses ourselves, and the license number on a listing
            at the first valuation is the one on it at closing. Forty agents
            later that has not changed.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button size="lg" render={<Link href="/agents" />}>
            Meet the agents
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/listings" />}
          >
            {"See what's on the market"}
          </Button>
        </div>
      </div>
    </section>
  );
}
