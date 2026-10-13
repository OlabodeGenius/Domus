import type { MetadataRoute } from "next";
import { areas } from "@/components/estate/areas";
import { homes, slugOf as homeSlug } from "@/components/estate/listings";
import { posts, slugOf as postSlug } from "@/components/estate/posts";
import { siteUrl } from "@/lib/site";
import { slugify } from "@/lib/utils";

// Forty-four pages, and until this file existed a crawler could only find the
// thirty-three behind a filter by walking every link on the site. The three
// index routes are the ones that hurt: /listings shows nine of twenty-one at a
// time, so twelve homes were reachable only through a query string no crawler
// is obliged to guess.
//
// Derived, never typed out. Every URL below comes from the same array and the
// same slug function the route itself reads, which is the rule `slugify` in
// `lib/utils.ts` is written down for — a home added to `listings.ts` is in the
// sitemap that afternoon, and one taken off cannot leave a 404 behind in it.
//
// `priority` is deliberately absent from everything but the home page. Google
// has said for years that it ignores the field, and a number nobody reads is a
// number that goes stale and misleads the next person to open this file.
//
// /home-2 is not here, and that is the one judgement call in the file. It is
// the same book behind a second front door — a demonstration for the buyer,
// who keeps one home page and deletes the other. Listing both would ask Google
// to choose between two near-identical homepages, which is a question with no
// good answer. A buyer who ships /home-2 as their home page swaps the routes
// rather than adding a line here.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteUrl}${path}`;

  // Both static and generated pages are rebuilt together, so one date for the
  // whole file is the truth rather than a simplification. It is stamped at
  // build time; `next build` is what moves it.
  const built = new Date();

  return [
    { url: url("/"), lastModified: built, changeFrequency: "daily", priority: 1 },
    { url: url("/listings"), lastModified: built, changeFrequency: "hourly" },
    { url: url("/neighborhoods"), lastModified: built, changeFrequency: "weekly" },
    { url: url("/agents"), lastModified: built, changeFrequency: "weekly" },
    { url: url("/guides"), lastModified: built, changeFrequency: "weekly" },
    { url: url("/about"), lastModified: built, changeFrequency: "monthly" },
    { url: url("/contact"), lastModified: built, changeFrequency: "monthly" },

    // The twenty-one homes. Hourly, because the book is the one thing on this
    // site that a brokerage genuinely changes through the day — the home page
    // says so in its own first line.
    ...homes.map((home) => ({
      url: url(`/listings/${homeSlug(home)}`),
      lastModified: built,
      changeFrequency: "hourly" as const,
    })),

    ...areas.map((area) => ({
      url: url(`/neighborhoods/${slugify(area.name)}`),
      lastModified: built,
      changeFrequency: "weekly" as const,
    })),

    ...posts.map((post) => ({
      url: url(`/guides/${postSlug(post)}`),
      lastModified: built,
      changeFrequency: "monthly" as const,
    })),
  ];
}
