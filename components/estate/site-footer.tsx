import Link from "next/link";
import { Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { head } from "@/components/estate/areas";
import { Logo } from "@/components/estate/logo";

// The reference runs two link lists and then an address block with a phone
// number, each column its own length from a shared top edge. A brokerage is
// the case that block was made for: a licensed office has a street address and
// a phone, and a visitor checking whether an agency is real looks for exactly
// those two.
//
// Every label is a route. Two are gone rather than pointed somewhere close
// enough — New developments and Careers were labels with nowhere to go, and a
// template that ships a dead link ships the buyer a bug report. The two `/#`
// hrefs are sections of the home page, which is where those two arguments are
// made in full.
const columns = [
  {
    heading: "Browse",
    links: [
      { label: "Homes for sale", href: "/listings" },
      { label: "Homes for rent", href: "/listings?show=rent" },
      { label: "Private exclusives", href: "/#exclusives" },
      { label: "Neighborhoods", href: "/neighborhoods" },
      { label: "What it costs", href: "/#fees" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Domus", href: "/about" },
      { label: "Our agents", href: "/agents" },
      { label: "Guides", href: "/guides" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// The one number on the site. Exported because the listing page's agent card
// prints it too, and two copies of a phone number is where the wrong one lives.
// It comes off the Brookline record in areas.ts now, which is where /about
// prints the same address a third time.
export const phone = head.phone;

// The brokerage licence, for the same reason. Three sections carry it: this
// baseline row, the figures band on the home page, and the fair housing notice
// on /about. A number that appears three times and disagrees with itself is
// worse than one that appears once.
export const license = "MA #01998765";

const office = [head.street, head.city, phone];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-32 pb-12 sm:px-8 sm:pt-40">
        <div className="grid gap-14 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            {/* Mark plus set wordmark before; one wordmark now, so the row it
                needed goes with it. No accessible name here — the copyright
                line below already names the company, and a footer that says it
                twice to a screen reader says it once too often. */}
            <Logo className="h-12 w-auto" />
            {/* The reference's statement is the largest thing in the footer and
                carries no weight of its own; at 24px it is still under the size
                where the emphasis step comes off, so it keeps font-medium. */}
            <p className="mt-7 max-w-[18ch] text-2xl font-medium tracking-tight">
              Every listing on this site is one of ours.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <p className="text-sm font-medium">{column.heading}</p>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-sm font-medium">Office</p>
              <address className="mt-5 flex flex-col gap-3.5 text-sm text-muted-foreground not-italic">
                {office.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          </div>
        </div>

        {/* The reference puts a notice and an accent link in the baseline row
            opposite the copyright. In this market that slot is not optional and
            it is not a cookie banner: a US brokerage has to carry the equal
            housing mark, its license number and a route to the fair housing
            notice, and a template without the slot is one the buyer retrofits. */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Domus Realty LLC. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <HugeiconsIcon
              icon={Home01Icon}
              size={16}
              strokeWidth={1.5}
              aria-hidden
            />
            <span>Equal Housing Opportunity</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">Brokerage license {license}</span>
            {/* Underline on hover rather than an opacity. text-primary at /80 is a
                third ink level made by fading the second, which is the one thing
                the palette has no room for — it drops under the floor at every
                lightness worth using. An underline costs no contrast at all. */}
            <Link
              href="/about#fair-housing"
              className="text-primary underline-offset-4 hover:underline"
            >
              Fair Housing Notice
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
