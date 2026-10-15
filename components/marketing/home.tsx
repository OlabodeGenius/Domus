import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  FileCheck2,
  Home,
  Menu,
  Wallet,
} from "lucide-react";
import { ThemeFrame, ThemeToggle } from "@/components/theme-toggle";

const screens = [
  ["01", "Dashboard", "Every unit, resident, and deadline.", "/admin"],
  [
    "02",
    "Properties & units",
    "See occupancy and monthly rent at a glance.",
    "/admin/properties",
  ],
  [
    "03",
    "Residents",
    "Find who lives where, with the right details close by.",
    "/admin/tenants",
  ],
  [
    "04",
    "Lease expirations",
    "Keep upcoming dates and renewal drafts in view.",
    "/admin/leases",
  ],
  [
    "05",
    "Payments",
    "Review the sample ledger and print a receipt.",
    "/admin/payments",
  ],
];

const faqs = [
  [
    "Who is Domus for?",
    "Domus is designed for independent landlords and small property teams managing residential homes. This preview uses one illustrative Boston portfolio, with 148 units across five properties.",
  ],
  [
    "Can I import my existing portfolio?",
    "CSV and spreadsheet import are not implemented in this preview. You can explore the sample records and try adding a property or resident; those changes stay in the current browser session.",
  ],
  [
    "Does Domus process rent payments?",
    "No. Payments shows a sample ledger and printable receipt view. It does not connect to a bank, charge a tenant, or move money.",
  ],
  [
    "Will Domus remind me about renewals or late rent?",
    "The dashboard and lease screen make upcoming dates and sample overdue balances visible. Automated email, SMS, or Slack notifications are not part of this demo.",
  ],
  [
    "Can residents or other agents sign in?",
    "This version has no authentication, shared accounts, or resident portal. The admin workspace is an interactive product preview, not a multi-user service.",
  ],
  [
    "Can I export or keep changes?",
    "Some screens offer local demo actions, but records are not saved to a Domus database. Do not use this preview for real resident or financial information.",
  ],
  [
    "What does Domus cost?",
    "Production plans and pricing have not been published. The figures and records on this page describe the sample portfolio, not a subscription offer.",
  ],
  [
    "Is Domus SOC 2 certified?",
    "No certification or production security commitment is represented here. This public preview has no production backend; avoid entering personal, payment, or confidential information.",
  ],
];

const sampleDetails = [
  {
    icon: CalendarDays,
    figure: "6 days",
    title: "A lease coming due",
    detail: "Elena Rodriguez · Nov 18, 2026",
  },
  {
    icon: Wallet,
    figure: "$2,450",
    title: "A balance to follow up",
    detail: "One sample payment marked overdue",
  },
  {
    icon: Home,
    figure: "144 / 148",
    title: "Homes shown as occupied",
    detail: "Calculated from five sample properties",
  },
  {
    icon: FileCheck2,
    figure: "$186,200",
    title: "Rent recorded as received",
    detail: "November sample ledger · Nov 12",
  },
];

function DashboardPreview() {
  return (
    <div className="overflow-hidden border border-[var(--landing-rule)] bg-[var(--admin-panel)] shadow-soft-lg">
      <div className="flex items-center justify-between border-b border-[var(--landing-rule)] px-4 py-3 sm:px-6">
        <span className="font-serif text-lg">Domus</span>
        <span className="flex items-center gap-1.5 text-[8px] text-[var(--admin-muted)] sm:text-[9px]">
          <span className="size-1.5 rounded-full bg-[var(--admin-green)]" />
          Sample portfolio
        </span>
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-[8px] uppercase tracking-[0.13em] text-[var(--admin-muted)] sm:text-[9px]">
          Portfolio overview
        </p>
        <h3 className="font-serif mt-1 text-2xl sm:text-3xl">
          Good morning, Sarah.
        </h3>
        <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--landing-rule)] border-y border-[var(--landing-rule)] py-4">
          {[
            ["Scheduled rent", "$218,450"],
            ["Units", "148"],
            ["Residents", "382"],
          ].map(([label, value]) => (
            <div key={label} className="px-2 first:pl-0 last:pr-0 sm:px-4">
              <p className="text-[7px] uppercase tracking-[0.08em] text-[var(--admin-muted)] sm:text-[8px]">
                {label}
              </p>
              <p className="admin-num mt-1.5 text-xs tracking-tight sm:text-base">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 pt-5 sm:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-medium sm:text-[10px]">
                November rent recorded
              </p>
              <span className="admin-num text-[8px] text-[var(--admin-muted)]">
                85.2%
              </span>
            </div>
            <div className="mt-2 h-1.5 bg-[var(--admin-soft)]">
              <div className="h-full w-[85.2%] bg-[var(--admin-blue)]" />
            </div>
            <div className="mt-2 flex justify-between text-[8px] text-[var(--admin-muted)]">
              <span className="admin-num">$186,200 recorded</span>
              <span className="admin-num">$218,450</span>
            </div>
            <div className="mt-4 grid h-16 grid-cols-6 items-end gap-1">
              {[42, 53, 48, 69, 74, 85].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full items-end bg-[var(--admin-soft)]"
                >
                  <div
                    className="w-full bg-[var(--admin-blue)]"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[7px] text-[var(--admin-muted)]">
              {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[9px] font-medium sm:text-[10px]">On the list</p>
              <span className="admin-num text-[8px] text-[var(--admin-muted)]">
                03
              </span>
            </div>
            {[
              ["Lease ending", "Elena Rodriguez · 1F", "var(--admin-amber)"],
              ["Payment overdue", "Elena Rodriguez · 1F", "var(--admin-red)"],
              ["Maintenance", "Commonwealth · Lobby", "var(--admin-green)"],
            ].map(([title, detail, color]) => (
              <div
                key={title}
                className="flex gap-2 border-t border-[var(--landing-rule)] py-2"
              >
                <span
                  className="mt-1 size-1.5 shrink-0 rounded-full"
                  style={{ background: color }}
                />
                <div>
                  <p className="text-[8px] font-medium sm:text-[9px]">{title}</p>
                  <p className="mt-0.5 text-[7px] text-[var(--admin-muted)] sm:text-[8px]">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--landing-rule)] pt-3 text-[7px] text-[var(--admin-muted)] sm:text-[8px]">
          <span>Sarah&apos;s sample portfolio · Boston</span>
          <span>November 12, 2026</span>
        </div>
      </div>
    </div>
  );
}

function ReceiptPreview() {
  return (
    <div className="border border-[var(--landing-rule)] bg-[var(--admin-panel)] p-5 shadow-soft-lg sm:p-7">
      <div className="flex items-start justify-between border-b border-[var(--landing-rule)] pb-5">
        <div>
          <p className="font-serif text-2xl">Domus</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.13em] text-[var(--admin-muted)]">
            Sample payment receipt
          </p>
        </div>
        <span className="border border-[var(--landing-rule)] px-2 py-1 text-[8px] text-[var(--admin-green)]">
          Recorded
        </span>
      </div>
      <div className="py-6">
        <p className="text-[8px] uppercase tracking-[0.1em] text-[var(--admin-muted)]">
          Amount recorded
        </p>
        <p className="admin-num mt-2 text-4xl tracking-tight">$2,850</p>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[var(--landing-rule)] py-5 text-[9px]">
        {[
          ["Resident", "Maya Chen"],
          ["Payment date", "Nov 1, 2026"],
          ["Property", "Beacon House · 4B"],
          ["Method", "ACH transfer · sample"],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-[var(--admin-muted)]">{label}</p>
            <p className="mt-1 font-medium">{value}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-dashed border-[var(--landing-rule)] pt-4 text-[8px] leading-4 text-[var(--admin-muted)]">
        Preview only. This record is seeded demo data, not a bank confirmation or
        cryptographically verified receipt.
      </p>
    </div>
  );
}

export function MarketingHome() {
  return (
    <ThemeFrame>
      <header className="border-b border-[var(--landing-rule)]">
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Domus home">
            <span className="grid size-8 place-items-center bg-[var(--admin-ink)] text-xs font-medium text-[var(--admin-panel)]">
              D
            </span>
            <span className="font-serif text-[21px] tracking-tight">Domus</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 md:flex"
          >
            <a href="#product" className="text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Product</a>
            <a href="#how-it-works" className="text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">How it works</a>
            <a href="#questions" className="text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Questions</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden text-[11px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)] sm:block"
            >
              Open the demo
            </Link>
            <a
              href="mailto:hello@domusrealty.com?subject=Domus%20demo"
              className="inline-flex items-center gap-2 border-b border-[var(--admin-ink)] pb-1 text-[11px] font-medium"
            >
              Book a demo <ArrowUpRight size={12} />
            </a>
            <ThemeToggle />
            <details className="relative md:hidden">
              <summary
                aria-label="Open navigation"
                className="grid size-8 cursor-pointer list-none place-items-center text-[var(--admin-ink)]"
              >
                <Menu size={18} />
              </summary>
              <nav className="absolute right-0 top-10 z-20 grid w-48 border border-[var(--landing-rule)] bg-[var(--admin-panel)] p-2 shadow-soft-lg">
                <a href="#product" className="px-3 py-2.5 text-[11px]">Product</a>
                <a href="#how-it-works" className="px-3 py-2.5 text-[11px]">How it works</a>
                <a href="#questions" className="px-3 py-2.5 text-[11px]">Questions</a>
                <Link href="/admin" className="px-3 py-2.5 text-[11px]">Open the demo</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:pt-40">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">
            <span className="size-1.5 rounded-full bg-[var(--admin-green)]" />
            Property management <span aria-hidden="true">·</span> 148 sample units
          </p>
          <h1 className="font-serif mt-8 max-w-[18ch] text-[clamp(3.5rem,8vw,4.5rem)] leading-[1.05] tracking-[-0.03em] font-normal text-ink">
            Every door here is one of ours
          </h1>
          <p className="mt-7 max-w-prose font-sans text-lg leading-relaxed text-ink-secondary">
            Five properties, 148 homes, and 382 resident records in one
            illustrative portfolio. Domus brings the daily details into view,
            from the next lease date to the rent recorded this month.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="mailto:hello@domusrealty.com?subject=Domus%20demo"
              className="inline-flex items-center gap-2 border-b border-[var(--admin-ink)] pb-1 text-sm font-medium"
            >
              Book a demo <ArrowRight size={14} />
            </a>
            <p className="text-[11px] text-[var(--admin-muted)]">
              Rather not book online?{" "}
              <a className="underline underline-offset-4" href="tel:+16175550148">
                (617) 555-0148
              </a>
            </p>
          </div>
          <p className="mt-8 flex items-center gap-2 text-[9px] text-[var(--admin-muted)]">
            <span className="size-1.5 rounded-full bg-[var(--admin-green)]" />
            Sample portfolio · figures last updated for this preview on Nov 12,
            2026
          </p>
        </section>

        <section aria-label="Sample portfolio metrics" className="border-y border-[var(--landing-rule)] bg-[var(--admin-panel)]">
          <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12">
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-[var(--landing-rule)]">
              {[
                ["148", "Units tracked"],
                ["97.3%", "Occupancy in sample book"],
                ["$218,450", "Scheduled monthly rent"],
                ["6 days", "To next sample lease end"],
              ].map(([value, label]) => (
                <div key={label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <p className="admin-num text-3xl tracking-[-0.055em] sm:text-4xl">{value}</p>
                  <p className="mt-2 text-[10px] text-[var(--admin-muted)] sm:text-[11px]">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-[var(--landing-rule)] pt-4 text-[9px] italic text-[var(--admin-muted)] sm:text-[10px]">
              These figures come from Domus&apos;s seeded demo portfolio, not a live
              customer book or third-party feed.
            </p>
          </div>
        </section>

        <section id="product" className="mx-auto max-w-[1240px] scroll-mt-12 px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">The product · five screens</p>
              <h2 className="font-serif mt-5 text-5xl leading-[0.98] tracking-tight sm:text-6xl">Five screens, one dashboard.</h2>
              <p className="mt-5 max-w-prose text-xs leading-6 text-[var(--admin-muted)] sm:text-sm">
                Not another portal or spreadsheet. One considered place for
                properties, residents, leases, and rent — built around the
                everyday work of looking after homes.
              </p>
              <ol className="mt-8 border-t border-[var(--landing-rule)]">
                {screens.map(([number, title, description, href]) => (
                  <li key={number} className="grid grid-cols-[28px_1fr] gap-3 border-b border-[var(--landing-rule)] py-3.5">
                    <span className="admin-num pt-0.5 text-[9px] text-[var(--admin-muted)]">{number}</span>
                    <div>
                      <Link href={href} className="group inline-flex items-center gap-2 text-[11px] font-medium hover:text-[var(--admin-blue)]">
                        {title}<ArrowUpRight size={11} className="opacity-0 transition group-hover:opacity-100" />
                      </Link>
                      <p className="mt-1 text-[9px] leading-4 text-[var(--admin-muted)]">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/admin" className="mt-7 inline-flex items-center gap-2 text-[10px] font-medium text-[var(--admin-blue)] hover:underline">
                Explore the sample dashboard <ArrowRight size={13} />
              </Link>
            </div>
            <div>
              <DashboardPreview />
              <p className="mt-3 text-right text-[8px] uppercase tracking-[0.12em] text-[var(--admin-muted)]">Illustrative interface · November 12, 2026</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--landing-rule)] bg-[var(--admin-panel)]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">The numbers</p>
              <h2 className="font-serif mt-4 text-5xl leading-[1] tracking-tight sm:text-6xl">The numbers. Yours, not ours.</h2>
              <p className="mt-5 text-xs leading-6 text-[var(--admin-muted)] sm:text-sm">
                The live product is not connected in this preview. These sample-book
                figures show the details Domus brings together — not customer
                results or industry averages.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 border-l border-t border-[var(--landing-rule)] sm:grid-cols-4">
              {[
                ["148", "Units in the sample book", "Across five properties"],
                ["97.3%", "Sample occupancy", "144 of 148 units"],
                ["$186,200", "Rent recorded", "November sample ledger"],
                ["$218,450", "Monthly rent scheduled", "Across the sample book"],
              ].map(([figure, label, detail]) => (
                <article key={label} className="border-b border-r border-[var(--landing-rule)] p-4 sm:p-6">
                  <p className="admin-num text-2xl tracking-[-0.05em] sm:text-3xl">{figure}</p>
                  <p className="mt-3 text-[9px] font-medium sm:text-[10px]">{label}</p>
                  <p className="mt-1.5 text-[8px] leading-4 text-[var(--admin-muted)] sm:text-[9px]">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-[1240px] scroll-mt-12 px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-5 border-t border-[var(--landing-rule)] pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">A practical tour</p>
            <div>
              <h2 className="font-serif max-w-3xl text-4xl leading-[1.04] sm:text-5xl">Three steps, and a tool you can actually try.</h2>
              <p className="mt-4 max-w-prose text-[11px] leading-6 text-[var(--admin-muted)] sm:text-xs">
                The current preview uses sample records rather than a live migration.
                Here is what you can explore today.
              </p>
            </div>
          </div>
          <div className="mt-10">
            {[
              {
                number: "1/3",
                title: "Start with a portfolio",
                text: "Open the seeded Boston book or add sample property and resident records. See how homes, occupants, leases, and rent fit together.",
                bullets: ["Browse five properties and 148 units", "Review resident and lease records", "Try adding records in the demo workspace"],
                icon: Home,
              },
              {
                number: "2/3",
                title: "Keep dates in view",
                text: "The lease pipeline and dashboard bring upcoming expirations and sample payment follow-ups into one place, so you can decide what needs attention.",
                bullets: ["Scan lease dates by time to expiration", "Prepare a renewal draft for review", "See sample payment status in context"],
                icon: CalendarDays,
              },
              {
                number: "3/3",
                title: "Review the whole book",
                text: "Move between properties, residents, leases, and the payment ledger without rebuilding the picture in another spreadsheet.",
                bullets: ["Compare scheduled and recorded rent", "Open the sample receipt and print view", "Keep demo changes in this browser session"],
                icon: FileCheck2,
              },
            ].map(({ number, title, text, bullets, icon: Icon }) => (
              <article key={number} className="grid gap-6 border-t border-[var(--landing-rule)] py-8 sm:py-10 lg:grid-cols-[70px_0.9fr_1.1fr] lg:gap-10">
                <p className="admin-num text-[10px] text-[var(--admin-muted)]">{number}</p>
                <div>
                  <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{title}</h3>
                  <p className="mt-4 max-w-prose text-[10px] leading-6 text-[var(--admin-muted)] sm:text-[11px]">{text}</p>
                  <ul className="mt-5 space-y-2">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-[9px] leading-4">
                        <Check size={12} className="mt-0.5 shrink-0 text-[var(--admin-green)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[var(--landing-rule)] bg-[var(--admin-panel)] p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-[var(--landing-rule)] pb-3">
                    <span className="text-[10px] font-medium">{title}</span>
                    <Icon size={15} className="text-[var(--admin-muted)]" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {(number === "1/3"
                      ? [["Beacon House", "42 units · 97.6%"], ["Commonwealth", "36 units · 97.2%"], ["The Kendall", "28 units · 96.4%"]]
                      : number === "2/3"
                        ? [["Nov 18", "Elena Rodriguez · 1F"], ["Nov 30", "Oliver James · 2A"], ["Dec 31", "Maya Chen · 4B"]]
                        : [["Rent scheduled", "$218,450"], ["Rent recorded", "$186,200"], ["Sample receipt", "Maya Chen · $2,850"]]
                    ).map(([label, detail]) => (
                      <div key={label} className="flex items-center justify-between gap-3 border-b border-[var(--landing-rule)] pb-3 last:border-0 last:pb-0">
                        <span className="text-[9px] font-medium">{label}</span>
                        <span className="admin-num text-right text-[8px] text-[var(--admin-muted)]">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 border-t border-[var(--landing-rule)] pt-3 text-[8px] leading-4 text-[var(--admin-muted)]">
                    Preview records only · not a live service
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--landing-rule)] bg-[var(--admin-panel)]">
          <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-12">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">Inside the sample book</p>
              <div>
                <h2 className="font-serif text-4xl leading-[1.04] sm:text-5xl">Four details, not invented testimonials.</h2>
                <p className="mt-4 max-w-prose text-[10px] leading-5 text-[var(--admin-muted)] sm:text-[11px]">
                  We do not have verified customer reviews to quote. These
                  illustrative records show the kind of information in the demo.
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 border-l border-t border-[var(--landing-rule)] sm:grid-cols-4">
              {sampleDetails.map(({ icon: Icon, figure, title, detail }) => (
                  <article key={title} className="border-b border-r border-[var(--landing-rule)] p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <Icon size={16} strokeWidth={1.5} className="text-[var(--admin-muted)]" />
                      <span className="admin-num text-[9px] text-[var(--admin-muted)]">SAMPLE</span>
                    </div>
                    <p className="admin-num mt-8 text-2xl tracking-tight sm:text-3xl">{figure}</p>
                    <h3 className="mt-2 text-[10px] font-medium">{title}</h3>
                    <p className="mt-2 text-[8px] leading-5 text-[var(--admin-muted)]">{detail}</p>
                  </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">A closer look · Payments</p>
            <h2 className="font-serif mt-5 text-5xl leading-[1.01] sm:text-6xl">A rent receipt, ready to print.</h2>
            <p className="mt-6 text-xs leading-6 text-[var(--admin-muted)] sm:text-sm">
              Open a payment in the sample ledger to see a printable receipt with
              the resident, amount, date, and property together.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "A print-friendly receipt view",
                "Payment details tied to a sample ledger entry",
                "No bank connection or payment processing in this preview",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[10px]">
                  <Check size={13} className="mt-0.5 shrink-0 text-[var(--admin-green)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/admin/payments" className="mt-8 inline-flex items-center gap-2 text-[10px] font-medium text-[var(--admin-blue)] hover:underline">
              See a sample receipt <ArrowRight size={13} />
            </Link>
          </div>
          <ReceiptPreview />
        </section>

        <section id="questions" className="scroll-mt-12 border-y border-[var(--landing-rule)] bg-[var(--admin-panel)]">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">Before you step inside</p>
              <h2 className="font-serif mt-5 text-5xl leading-[1.02] sm:text-6xl">Everything people ask before they begin.</h2>
              <p className="mt-5 max-w-sm text-xs leading-6 text-[var(--admin-muted)]">A straightforward note about what this preview can do, and what it cannot.</p>
              <a href="mailto:hello@domusrealty.com" className="mt-5 inline-flex items-center gap-2 text-[10px] text-[var(--admin-blue)] hover:underline">
                Write to the Domus team <ArrowRight size={13} />
              </a>
            </div>
            <div className="border-t border-[var(--landing-rule)]">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group border-b border-[var(--landing-rule)]">
                  <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-[10px] font-medium sm:py-5 sm:text-xs">
                    <span className="admin-num w-5 shrink-0 text-[9px] text-[var(--admin-muted)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{question}</span>
                    <ChevronDown size={14} className="shrink-0 text-[var(--admin-muted)] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-[65ch] pb-5 pl-8 pr-8 text-[10px] leading-6 text-[var(--admin-muted)] sm:text-[11px]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto grid max-w-[1240px] gap-8 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--admin-muted)]">Take a look around</p>
            <h2 className="font-serif mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-7xl">Tell us your units. We&apos;ll show you the dashboard.</h2>
            <p className="mt-5 max-w-xl text-xs leading-6 text-[var(--admin-muted)] sm:text-sm">
              Explore the sample portfolio at your own pace, or get in touch to
              talk through what you need. The current workspace is a demo, not
              a connected account.
            </p>
            <p className="mt-4 text-[10px] text-[var(--admin-muted)]">No account required to explore this preview.</p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <Link href="/admin" className="inline-flex h-11 items-center justify-center gap-3 bg-[var(--admin-ink)] px-5 text-xs font-medium text-[var(--admin-panel)] transition hover:opacity-85">
              Open the demo dashboard <ArrowRight size={14} />
            </Link>
            <a href="tel:+16175550148" className="text-[10px] text-[var(--admin-muted)] underline decoration-[var(--landing-rule)] underline-offset-4 hover:text-[var(--admin-ink)]">
              Rather talk? (617) 555-0148
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-rule)] bg-[var(--admin-panel)]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span className="grid size-7 place-items-center bg-[var(--admin-ink)] text-[9px] text-[var(--admin-panel)]">D</span>
                <span className="font-serif text-xl">Domus</span>
              </Link>
              <p className="mt-4 max-w-[28ch] text-[10px] leading-5 text-[var(--admin-muted)]">A thoughtful workspace for the details of residential property management.</p>
              <p className="mt-4 text-[9px] text-[var(--admin-muted)]">Boston, Massachusetts</p>
            </div>
            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">Product</h2>
              <ul className="mt-4 space-y-3">
                {[
                  ["Dashboard", "/admin"],
                  ["Properties", "/admin/properties"],
                  ["Residents", "/admin/tenants"],
                  ["Expirations", "/admin/leases"],
                  ["Payments", "/admin/payments"],
                  ["Maintenance", "/admin/maintenance"],
                  ["Documents", "/admin/documents"],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">Company</h2>
              <ul className="mt-4 space-y-3">
                <li><Link href="/about" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">About Domus</Link></li>
                <li><Link href="/contact" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Contact</Link></li>
                <li><a href="mailto:hello@domusrealty.com?subject=Domus%20demo" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Book a demo</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">Resources</h2>
              <ul className="mt-4 space-y-3">
                <li><Link href="/admin" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Preview workspace</Link></li>
                <li><a href="#questions" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Demo limitations</a></li>
                <li><a href="mailto:hello@domusrealty.com" className="text-[10px] text-[var(--admin-muted)] hover:text-[var(--admin-ink)]">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--landing-rule)] pt-5 text-[8px] leading-4 text-[var(--admin-muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Domus. Sample portfolio data shown for demonstration.</p>
            <p>No certification, payment processing, or production service is represented.</p>
          </div>
        </div>
      </footer>
    </ThemeFrame>
  );
}
