import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Open to everything, which for a brokerage is the only correct answer — every
// page on this site exists to be found. The file earns its place on the second
// line rather than the first: a sitemap nobody is told about is a sitemap that
// waits to be discovered, and Search Console is not the only crawler that
// matters.
//
// A buyer whose staging site runs on a public domain wants the opposite of this
// file, and the honest way to get it is `NEXT_PUBLIC_SITE_URL` pointing
// somewhere private plus a `disallow: "/"` here — not a robots rule guarding a
// site that is otherwise wide open.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
