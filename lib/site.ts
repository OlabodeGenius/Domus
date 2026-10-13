// Where this site lives, in one place, because three files need it and none of
// them can ask the others: `metadataBase` in the root layout, the absolute URLs
// in `sitemap.ts`, and the sitemap reference in `robots.ts`.
//
// The order is the deploy story. On Vercel the middle line is set for you, so a
// buyer who clones this and presses Deploy gets correct absolute URLs with no
// configuration at all — which is the whole reason this is not a hard-coded
// string. Set NEXT_PUBLIC_SITE_URL to override it, which is what a custom
// domain and any host that is not Vercel both want. Localhost is the last
// resort so `next dev` and a bare `next build` still produce valid URLs rather
// than throwing.
//
// VERCEL_PROJECT_PRODUCTION_URL is the *production* domain on every
// environment, deliberately: a preview build that advertised its own throwaway
// hostname in a sitemap is a preview build asking Google to index it.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// The share card. A generated one would want the site's own face — Geist, the
// warm near-white, the hairline — and `next/font` leaves nothing at a stable
// path to hand `next/og`, so the honest options were a card in the wrong
// typeface or the photograph the home page already opens on. This is the
// photograph, cropped to 1200×630 by the same query the rest of the site uses.
export const shareImage =
  "https://images.unsplash.com/photo-1548990044-11586bc151f2?w=1200&h=630&fit=crop&q=80";
