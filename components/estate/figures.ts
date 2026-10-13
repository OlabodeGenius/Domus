import {
  Building01Icon,
  Calendar03Icon,
  Clock01Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons";

// The four proof figures, one source for three layouts. They answer to the rest
// of the page: 1,140 closed against 1,284 currently on the market, and a median
// of 11 days to first offer against listing cards that read 1–9 days ago and a
// section 3 tile that says under contract in 9. A reader who adds them up
// should not find a hole.
export const figures = [
  { icon: Calendar03Icon, value: "28", unit: "years", label: "Selling in Greater Boston, since 1998" },
  { icon: Building01Icon, value: "6", unit: "", label: "Offices, each one staffed by the agents who list there" },
  { icon: Home01Icon, value: "1,140", unit: "", label: "Homes closed last year, every one of them ours" },
  { icon: Clock01Icon, value: "11", unit: "days", label: "Median time from listing to first offer" },
] as const;

// The section's own copy, one source. Unlike section 4, the header is *not*
// shared scaffolding here: one of the three layouts puts the headline inside a
// full-bleed frame, which is that layout's whole device, so each variant places
// the header where its own reference puts it. Three placements, one set of
// words — otherwise the sentence drifts the moment one copy is edited.
export const copy = {
  eyebrow: "The numbers",
  heading: "Twenty-eight years of them, and they are all ours",
  lede:
    "Every figure here counts Domus transactions rather than the market's. Six offices, one set of books.",
} as const;
