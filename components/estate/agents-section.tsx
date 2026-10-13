import Image from "next/image";
import Link from "next/link";
import { agents, copy, portrait } from "@/components/estate/agents";
import { Eyebrow } from "@/components/estate/eyebrow";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/estate/section-heading";

export function Agents() {
  return (
    <section
      id="agents"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="mx-auto max-w-[46rem] text-center">
        <Eyebrow className="mx-auto">{copy.eyebrow}</Eyebrow>
        <SectionHeading className="mt-6">{copy.heading}</SectionHeading>
        <p className="mx-auto mt-6 max-w-[56ch] text-base text-muted-foreground">
          {copy.lede}
        </p>
      </div>

      <ul className="mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agents.slice(0, 4).map((agent) => (
          // The slab is gone, so these are white cards standing on the page at
          // 1.02 — a hairline is the cue they are resting, and it is the one
          // this section would not have needed had the panel survived.
          <li
            key={agent.name}
            className="rounded-lg border bg-card p-7 text-center"
          >
            {/* Circular and small, as the reference draws them: an avatar
                rather than a photograph. That is what lets a row of them read
                as a list of people instead of as a gallery. */}
            <div className="relative mx-auto size-24 overflow-hidden rounded-full">
              <Image
                src={portrait(agent.src, 200)}
                alt={agent.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <h3 className="mt-5 text-lg font-medium">{agent.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{agent.title}</p>

            {/* The reference's star pill, carrying the figure a rating stands
                in for here. bg-accent reads against the card; on the tinted
                panel it would have been the card's own colour. */}
            <p className="mx-auto mt-5 w-fit rounded-full bg-accent px-4 py-1.5 text-sm tabular-nums">
              {agent.closed} closed
            </p>
            <p className="mt-4 text-xs tabular-nums text-muted-foreground">
              {agent.license}
            </p>
          </li>
        ))}
      </ul>

      {/* Two buttons under the grid, which is the reference's own foot. Neither
          opens a second form — the dark one jumps to the one at the page's
          foot, the outline one to the section that explains the process. */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {/* Was "How we work", pointing at the section directly below it. The
            roster is the one section on this page that now has a page of its
            own, and the reader who wants the rest of the team has nowhere else
            to be sent — how we work is one scroll away either way. */}
        <Button variant="outline" render={<Link href="/agents" />}>
          Meet the team
        </Button>
        <Button render={<a href="#book" />}>Book a viewing</Button>
      </div>
    </section>
  );
}
