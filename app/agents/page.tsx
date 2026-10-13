import type { Metadata } from "next";
import { UserMultiple02Icon } from "@hugeicons/core-free-icons";
import { AgentFilter } from "@/components/estate/agent-filter";
import { AgentJoin } from "@/components/estate/agent-join";
import { AgentLicense } from "@/components/estate/agent-license";
import { AgentPanel } from "@/components/estate/agent-panel";
import { agents, agentsIn, closedBy } from "@/components/estate/agents";
import { areas } from "@/components/estate/areas";
import { Book } from "@/components/estate/book";
import { PageHeader } from "@/components/estate/page-header";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The agents who answer the phone — Domus",
  description:
    "Nine agents across Greater Boston, each with the license number you can look up, the neighborhoods they cover and what they closed last year.",
};

// The roster, and the second belief the brief is ordered around: that the
// people handling this inventory are named, licensed and accountable. The
// license number is this industry's credibility artefact, so the roster prints
// it and the section under it explains what one is worth.
//
// The roster is decided and it is the panel: one tinted slab holding the pills,
// the count and nine cards, each card opening on a home that agent is holding
// with their face notched into its foot. The hairline rows and the tile grid
// read against it are deleted, and so is the chooser that held all three. It is
// a section of its own under the block, which is the arrangement /listings has
// had since it was built — the pills sit at the head of the slab rather than on
// the page above it, so no distance is left between a control and the list it
// drives.
//
// The filter is a link like every other on this site. An unrecognised slug
// resolves to nothing and the page falls back to all nine, which is why there
// is no empty state here: every area on the book carries at least two agents,
// and a slug that is not an area cannot narrow the list at all.
export default async function AgentsPage({
  searchParams,
}: PageProps<"/agents">) {
  const params = await searchParams;
  const slug = Array.isArray(params.area) ? params.area[0] : params.area;
  const named = areas.find((area) => slugify(area.name) === slug)?.name;
  const shown = named ? agentsIn(named) : agents;

  return (
    <>
      {/* One wrapper at `gap-20` for the block and the roster it heads, the
          same pairing /listings makes with its own browse: the masthead and the
          list under it are one object, and `main`'s 10rem is what separates
          that object from what comes next. */}
      <div className="flex flex-col gap-20">
        <PageHeader
          eyebrow="Our agents"
          icon={UserMultiple02Icon}
          heading="The people who answer the phone"
          figures={[
            { value: "40", caption: "Agents across\nour six offices" },
            {
              value: `${closedBy(agents)}`,
              caption: "Homes the nine below\nclosed last year",
            },
          ]}
          lede="Nine of the forty, and the nine who take listings in the six areas this site covers. Every license number on the page is one you can check against the state register before you let anybody through your front door."
        />

        <AgentPanel
          agents={shown}
          filter={
            <AgentFilter
              area={named}
              showing={shown.length}
              total={agents.length}
            />
          }
        />
      </div>

      <AgentLicense />
      <AgentJoin />
      <Book />
    </>
  );
}
