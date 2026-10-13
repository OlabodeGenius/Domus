import type { NextConfig } from "next";

// `cacheComponents: true` is deliberately absent, and so are the <Suspense>
// boundaries that would go with it. Both were built, measured and taken back
// out; this note is what stops the next person rebuilding them.
//
// What they buy: /listings, /agents and /guides read a query string, so each is
// server-rendered on demand. Partial prerendering would make the masthead above
// the filter static on the CDN and stream only the list.
//
// What they cost: `reveal.tsx` is mounted in the root layout and writes
// `data-reveal` onto sections from an IntersectionObserver. A <Suspense>
// boundary defers hydration of what is inside it past the moment that observer
// runs, so React finds an attribute it never rendered and logs a hydration
// mismatch. `cacheComponents` widens the same fault to every route, because it
// splits layout and page hydration everywhere, not only behind a boundary.
//
// Measured rather than assumed, and in that order — the boundary alone warns on
// its own three routes, the flag warns on all twelve, and a production
// `next start` is clean either way. Dev-only noise, but dev is where the buyer
// of this template lives.
//
// The fix that keeps the prerender is `suppressHydrationWarning` on all
// fifty-three sections carrying `.reveal` — a workaround in fifty-three files
// and a silent trap for whoever writes the fifty-fourth. The prize is a
// cacheable shell on three routes whose dynamic work is filtering a typed
// array. Not worth it at this size.
//
// The conflict is `reveal.tsx` writing to React's DOM from the layout. Anything
// that removes that removes this constraint with it.
const nextConfig: NextConfig = {
  images: {
    // The photo URLs on this site are immutable — a Unsplash id addresses one
    // file forever, and the width and quality are baked into the query. Next's
    // default is four hours, which on Vercel means paying to transform the same
    // 59 photographs into the same sizes six times a day. A year is the honest
    // TTL for content that cannot change; a buyer pointing this at a CMS whose
    // images *are* mutable should turn it back down.
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.lummi.ai" },
    ],
  },
};

export default nextConfig;
