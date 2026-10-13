// Three clients, one source for three layouts. Every quote carries a fact
// rather than an adjective, and every fact answers something already on the
// page: the agents are the four in section 6, and nineteen days to sell sits
// against the eleven-day median to first offer in section 5.
export const quotes = [
  {
    avatar: "https://images.unsplash.com/photo-1659481993364-4512775ed911",
    alt: "A woman with light hair, photographed against a plain background",
    name: "Naomi Alvarez",
    area: "Somerville",
    did: "Bought 43 Willow Ave",
    quote:
      "Daniel sent me three places on the Tuesday and I saw all three on the Saturday. The one I bought was the second.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1609371497456-3a55a205d5eb",
    alt: "A person in a grey crew neck, photographed indoors",
    name: "Peter Lindqvist",
    area: "Back Bay",
    did: "Sold 12 Fairfield St",
    quote:
      "It sat with another firm for four months without an offer. Marisol relisted it and it was under contract in nineteen days.",
  },
  {
    avatar: "https://images.unsplash.com/photo-1701728667207-54b43dbdab97",
    alt: "A woman wearing glasses, photographed against a dark background",
    name: "Grace Okonkwo",
    area: "Cambridge",
    did: "Bought 8 Ellery St",
    quote:
      "Two offers fell through before this one. Tom rang me both times before I had seen the email, and had the next viewing booked.",
  },
] as const;

// The reference's photo tiles carry nothing and sit at the same size as the
// quote cards. These are the agency's own interiors.
export const tiles = [
  {
    src: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    alt: "A white sofa beside a fireplace",
  },
  {
    src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    alt: "Pale sofas facing built-in cabinets under a coffered ceiling",
  },
  {
    src: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20",
    alt: "A tan leather sectional under an arched mirror",
  },
] as const;

export const copy = {
  eyebrow: "What clients say",
  heading: "Three of the three hundred and twelve",
  lede: "Every review we have is on the page it was left on. These three are here because each one names a number rather than an adjective.",
} as const;

// Five filled stars, in the brand hue. Convention says gold; convention does
// not buy this palette a second vivid colour.
export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="Rated 5 out of 5">
      <svg
        viewBox="0 0 100 18"
        className="h-3.5 w-auto fill-primary"
        aria-hidden
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            transform={`translate(${i * 20} 0)`}
            d="M9 0.8 11.4 6.1 17.2 6.8 12.9 10.7 14.1 16.4 9 13.5 3.9 16.4 5.1 10.7 0.8 6.8 6.6 6.1Z"
          />
        ))}
      </svg>
    </span>
  );
}
