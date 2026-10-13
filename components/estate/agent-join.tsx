import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { agents } from "@/components/estate/agents";
import { Eyebrow } from "@/components/estate/eyebrow";
import { SectionHeading } from "@/components/estate/section-heading";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// One sentence with the control set into it as a word, which is the whole
// reference and the whole section. It is here because a roster page is read by
// two people and only one of them wants a house: the other is an agent deciding
// where to hang their license, and every brokerage site in this market answers
// them somewhere. Answering them in one line keeps the page's own subject.
//
// The mail goes to the founding partner rather than to a careers address that
// does not exist, and the pill is a mailto rather than a link to a page this
// site does not have.
const [lead] = agents;

export function AgentJoin() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8">
      <div className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
        <Eyebrow>Joining Domus</Eyebrow>

        <SectionHeading className="mt-10">
          We take on two agents a year.{" "}
          <a
            href={`mailto:${lead.email}`}
            className={cn(
              reach,
              // The pill sits inside display type, so it is sized against the
              // body scale rather than against the line it is set in — a
              // control drawn at 48px would stop reading as a control.
              "mx-1 inline-flex translate-y-[-0.08em] items-center gap-3 rounded-full bg-muted py-1.5 pr-1.5 pl-5 align-middle text-base tracking-normal transition-colors hover:bg-accent",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
            )}
          >
            Write to {lead.name.split(" ")[0]}
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-full bg-foreground text-background"
            >
              <ArrowUpRightIcon className="size-4" />
            </span>
          </a>{" "}
          if one of them is you.
        </SectionHeading>
      </div>
    </section>
  );
}
