import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Reveal } from "@/components/estate/reveal";
import { SiteFooter } from "@/components/estate/site-footer";
import { SiteHeader } from "@/components/estate/site-header";
import { shareImage, siteUrl } from "@/lib/site";
import "./globals.css";

// The generated @theme inline maps --font-sans → var(--font-sans), so the
// next/font variable has to be named --font-sans, not --font-geist-sans.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The root fallback. Every route that matters exports its own title and
// description, so those two are what an unnamed route inherits rather than what
// the home page shows.
//
// Everything under `metadataBase` is different: it is inherited by all twelve
// routes and none of them restates it. That is the point — eleven pages each
// writing their own `openGraph` block is eleven places for the card to drift,
// and Next merges the parent's into every child for free. A page that wants its
// own share image sets `openGraph.images` alone and keeps the rest.
//
// `metadataBase` itself is the load-bearing line. Without it Next cannot turn a
// relative image path into the absolute URL a crawler requires, and every
// `openGraph` block on the site silently resolves against nothing — the shape
// of bug that only shows up as a blank card in somebody else's chat window.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Domus",
  description: "A Greater Boston brokerage.",
  openGraph: {
    siteName: "Domus",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "A curved white apartment building, its balconies stacked against a clear sky",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// The shell is the layout's, not the page's. Eleven routes draw the same bar
// and the same footer, and the gap between sections is the same rhythm on every
// one of them — a page that owned those three would be a page that could get
// them wrong.
//
// No vertical padding here and none on any section: main is a flex column with
// one gap, so every boundary is 10rem and a <Divider> is a child, which makes
// its own boundary 20rem without anybody stating a second number. The first
// section of each page sets its own pt, because a gap only exists between
// children.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth` for anchor links, and the
      // router has to be able to turn it off for the fraction of a second it
      // takes to put a new page at the top. Without this attribute Next skips
      // that override and its scroll-to-top becomes a smooth scroll that the
      // incoming render cancels — every route change lands wherever the last
      // page was scrolled to.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex flex-col gap-32 sm:gap-40">{children}</main>
        <SiteFooter />
        {/* A behaviour, not a section: it renders nothing and every page's
            sections carry the one class it looks for. */}
        <Reveal />
      </body>
    </html>
  );
}
