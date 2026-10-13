// Six questions, answered with the numbers the rest of the page already
// commits to — the 1,284 count, the 41 exclusives, the fee band, the eleven-day
// median, the two-hour reply. An FAQ that disagrees with its own page is worse
// than no FAQ.
//
// Six, because the layout that won holds six rows beside a photograph and a
// seventh would push the column past the picture. The two a seller asks first —
// what the house is worth, and how long it takes — are both in.
export const questions = [
  {
    q: "Do you charge anything before the sale?",
    a: "No. Photography, staging consult, floor plan and portal placement are all carried by us and settled out of the proceeds at closing. If the home does not sell, you owe nothing.",
  },
  {
    q: "What does an exclusive listing mean for me as a buyer?",
    a: "It is a home we are selling for an owner who asked us not to advertise it. Register once and your agent releases the matching ones to you, usually about a week before anything could reach a portal, and often before it reaches one at all.",
  },
  {
    q: "How current are the listings on this site?",
    a: "Every listing here is ours, so it changes when our own system changes rather than on a portal's overnight feed. The count and the timestamp under the search are both live.",
  },
  {
    q: "What is my home actually worth?",
    a: "A valuation is a visit rather than a form. An agent walks the house, reads the last twelve months of closings on your street, and leaves you a range in writing with every comparable it was drawn from, on the day.",
  },
  {
    q: "How long does a sale actually take?",
    a: "Eleven days is our median from listing to first offer, and about seven weeks from there to the closing table. A house priced above its street runs longer, and an agent will tell you that on the valuation visit rather than after eleven days of silence.",
  },
  {
    q: "Can I choose which agent I work with?",
    a: "Yes. Pick one from the agents section and ask for them by name on the booking form. If you have no preference we match on the area you are searching and on who has capacity in the week you want to be viewing.",
  },
] as const;
