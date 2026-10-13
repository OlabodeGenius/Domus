import Image from "next/image";
import Link from "next/link";
import { agentFor, portrait } from "@/components/estate/agents";
import { photo, type Area } from "@/components/estate/areas";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Button } from "@/components/ui/button";
import { UserSquareIcon } from "@hugeicons/core-free-icons";

// The reference sets one sentence at display size across four lines on a tinted
// panel, with pill-shaped photo cutouts sitting *between the words* rather than
// beside them, an eyebrow above and two pill buttons below.
//
// The sentence is the agent's own line. Two other versions of this section were
// built and read in place against it — the closings figure at 72px beside a
// portrait in a circle-and-rules frame, and a strip with the agent as a large
// circle and the neighborhood cut into its corner — and both printed that line
// at `text-base` in a corner. At 48px it stops being a caption under a portrait
// and becomes the thing the section is: a named person saying what they do, in
// their own words, with their face inside the sentence. The two losers and the
// chooser that held all three came out with the decision.
//
// The cutouts land at word boundaries rather than at fixed characters, so a
// four-word quote and a sixteen-word one both wrap without a picture landing
// mid-word. Both positions are clamped, which is what stops the second cutout
// overtaking the first on a short line.
const cutouts = (line: string) => {
  const words = line.replace(/\s+/g, " ").trim().split(" ");
  const first = Math.min(3, Math.max(1, words.length - 2));
  const second = Math.max(first + 2, Math.round(words.length * 0.62));

  return {
    open: words.slice(0, first).join(" "),
    middle: words.slice(first, second).join(" "),
    close: words.slice(second).join(" "),
  };
};

export function AreaAgent({ area }: { area: Area }) {
  const agent = agentFor({ area: area.name });
  const { open, middle, close } = cutouts(agent.line);

  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="-mx-6 rounded-lg bg-accent p-6 sm:-mx-8 sm:p-12 lg:p-16">
        <Eyebrow icon={UserSquareIcon} className="bg-card">
          Who lists here
        </Eyebrow>

        {/* One paragraph, not a flex row of words: the cutouts are
            `inline-block`, so they sit in the text's own line box and the
            browser wraps around them the way the reference does. A flex layout
            would have to guess the line breaks. */}
        <p className="mt-10 max-w-[24ch] text-4xl/[1.25] tracking-tighter text-balance md:max-w-none md:text-5xl/[1.25]">
          <span aria-hidden>“</span>
          {open}{" "}
          <Image
            src={portrait(agent.src, 320)}
            alt=""
            width={160}
            height={96}
            className="mx-1 inline-block h-[0.9em] w-[1.7em] rounded-full object-cover align-baseline"
          />{" "}
          {middle}{" "}
          <Image
            src={photo(area.src, 320)}
            alt=""
            width={160}
            height={96}
            className="mx-1 inline-block h-[0.9em] w-[1.6em] rounded-full object-cover align-baseline"
          />{" "}
          {close}
          <span aria-hidden>”</span>
        </p>

        {/* The attribution the reference has no slot for, and this page cannot
            do without: the license number is what the whole route is arguing
            from, and a quote with no name on it is a quote from nobody. */}
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-6 border-t pt-8">
          <Image
            src={portrait(agent.src, 112)}
            alt={agent.alt}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover"
          />
          <p className="text-base">
            <span className="font-medium">{agent.name}</span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {agent.title}
              <span aria-hidden className="px-1.5">
                ·
              </span>
              <span className="tabular-nums">{agent.license}</span>
              <span aria-hidden className="px-1.5">
                ·
              </span>
              {agent.closed} closed last year
            </span>
          </p>

          <div className="ml-auto flex flex-wrap gap-3">
            <Button render={<Link href="#book" />} className="rounded-full">
              Book a viewing
            </Button>
            <Button
              variant="outline"
              render={<Link href="/agents" />}
              className="rounded-full bg-card"
            >
              The whole roster
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
