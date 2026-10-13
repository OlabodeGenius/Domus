import {
  cardsHeading,
  eyebrow,
  railHomes,
  toListing,
} from "@/components/estate/listings";
import { Eyebrow } from "@/components/estate/eyebrow";
import { ListingCard } from "@/components/estate/listing-card";
import { Rail } from "@/components/estate/rail";
import { SectionHeading } from "@/components/estate/section-heading";

// Section 2 built on the reference's card rather than section 2's own: the address
// leads at display size, the photos sit in an inset panel that pages like a
// listing carousel, and the money lands in the grey two-line footnote the
// reference closes on — which is the one move worth taking wholesale. A price
// set small and grey beside a large name is a card that sells the home rather
// than the number, and it is why the price keeps ink weight inside that line
// while the terms around it stay muted.
//
// The card itself is listing-card.tsx now. It moved out the moment the browse
// grid wanted the same one: what stays here is the rail, and the only thing this
// section still says about a card is how wide it is.
export function MarketCards() {
  return (
    // Full-bleed like section 2's own rail, and for the same reason: the cards
    // are cut by the viewport and a band stopping at the container would draw a
    // line through the middle of the cut.
    <section id="market" className="reveal overflow-hidden">
      <Rail
        of="homes"
        heading={
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <SectionHeading className="mt-5 max-w-[16ch]">
              {cardsHeading}
            </SectionHeading>
          </div>
        }
      >
        {railHomes.map(toListing).map((listing) => (
          <ListingCard
            key={listing.address}
            listing={listing}
            className="w-[300px] shrink-0 snap-start sm:w-[340px]"
          />
        ))}
      </Rail>
    </section>
  );
}
