import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaAgent } from "@/components/estate/area-agent";
import { AreaAround } from "@/components/estate/area-around";
import { AreaHero } from "@/components/estate/area-hero";
import { AreaListings } from "@/components/estate/area-listings";
import { AreaNumbers } from "@/components/estate/area-numbers";
import { AreaSpots } from "@/components/estate/area-spots";
import { areas } from "@/components/estate/areas";
import { Book } from "@/components/estate/book";
import { slugify } from "@/lib/utils";

// Six records in, six pages out, every one of them built at build time. The
// links into here were already written before this route existed — the home
// page's fourth section, /neighborhoods' six cards and the plan on both — and
// all of them derive the segment through `slugify` over the name, which is what
// this reads back.
//
// `areaBySlug` lives here rather than in areas.ts on purpose: that file imports
// nothing so `area-spots.check.ts` can run it under bare node, and `slugify`
// arrives through the `@/` alias, which bare node does not resolve.
const areaBySlug = (slug: string) =>
  areas.find((area) => slugify(area.name) === slug);

export function generateStaticParams() {
  return areas.map((area) => ({ slug: slugify(area.name) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) return {};

  return {
    title: `${area.name} — what it costs and what we hold there — Domus`,
    description: `${area.line} Median asking ${area.median} across ${area.active} homes on our own book, and ${area.days} days to a first offer.`,
  };
}

export default async function NeighborhoodPage({
  params,
}: PageProps<"/neighborhoods/[slug]">) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  // Every section is decided now. The header is the title block /listings and
  // /neighborhoods already open with, its two figures filled from this area and
  // a photo band hung off its foot; the market section closes on four axes
  // rather than on a list of the six; and the agent is that agent's own line at
  // 48px with their face set into it. Each of the three had two other versions
  // read in place against it, and each section's own file carries the winner's
  // `// ref:` line.
  //
  // Six sections under the header: what it costs against the other five, where
  // it sits and how long the ride in takes, what is within a walk, what we are
  // holding there, who answers for it, and the form the rest of the site
  // already ships.
  return (
    <>
      <AreaHero area={area} />
      <AreaNumbers area={area} />
      <AreaAround area={area} />
      <AreaSpots area={area} />
      <AreaListings area={area} />
      <AreaAgent area={area} />
      <Book area={area.name} />
    </>
  );
}
