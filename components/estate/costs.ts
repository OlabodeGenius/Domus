// The three things a calculator needs and none of the book, in a module that
// imports nothing — the discipline `areas.ts` keeps, for a second reason.
//
// These lived in `listings.ts` beside the twenty-one records, which reads
// correctly and cost 44KB. `listing-costs.tsx` is a client component and it
// wants exactly a rate, a rate and a formatter; importing them from the book
// pulled the book across the boundary with them, so every one of the twenty-one
// listing pages shipped all twenty-one records — blurbs, photo sets and all —
// to render one panel about one home.
//
// `listings.ts` re-exports all three, so nothing that already reads them from
// there had to change. The rule is only for the client side: a `"use client"`
// file takes them from here, and a server one may take them from either.
//
// Same argument `shortMoney` in `lib/utils.ts` is already written down for.
// This is where it goes when the value is the niche's rather than generic.

// The city's effective property tax, which both the payment calculator and the
// listing's own notes quote.
export const TAX_RATE = 0.0107; // Massachusetts effective property tax, annual

// Beside it, and moved out of `listing-costs.tsx` when a second calculator
// wanted it: /home-2 runs the mortgage backwards — a monthly budget in, a price
// band out — and a rate that differed between the two panels would put two
// answers to one arithmetic on one site.
export const INSURANCE_RATE = 0.004; // homeowner's insurance, annual, of price

// One currency formatter for the site: a second copy is where one of them loses
// its thousands separator. Rounded, because the calculator divides and a
// mortgage is not quoted in cents.
export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
