import type { Metadata } from "next";
import { MailSend01Icon } from "@hugeicons/core-free-icons";
import { AboutOffices } from "@/components/estate/about-offices";
import { ContactForm } from "@/components/estate/contact-form";
import { ContactReach } from "@/components/estate/contact-reach";
import { PageHeader } from "@/components/estate/page-header";

export const metadata: Metadata = {
  title: "Contact Domus — four desks, and a name on each",
  description:
    "Say what it is about and it goes to the agent who handles it: buying, selling, renting, or none of the three. Six offices across Greater Boston, and nobody here takes more than two hours to answer.",
};

// The page the header's own button has been pointing at since the nav stopped
// being anchors, and the last of the eleven the sitemap asks for. It owes three
// things and it is built as three: the full field set, the offices, and the
// response-time promise — which is not a sentence here but a figure, a per-desk
// line and a six-minute reply printed on a phone.
//
// It does not mount `Book`. Every other route closes on that band because its
// form is the page's last chance; here the form *is* the page, and a closing
// band would be the same field set twice with a different ground behind it.
// The four reassurances that band carries move into the slab's tinted half
// instead, so the promise is still made once.
//
// `AboutOffices` is /about's, unchanged. Six branches with their addresses,
// their phone numbers and the count of agents who work them already exist and
// already read off `areas.ts` — a second cut of them here would be six more
// places for Brookline's number to drift, which is the reason those addresses
// went onto the area records in the first place.
//
// What is left after this: `not-found`.
export default function ContactPage() {
  return (
    <>
      {/* One wrapper at `gap-20` for the title block and the panel it heads,
          the pairing /listings, /agents and /guides all make. The slab carries
          no heading of its own for the same reason their panels do not. */}
      <div className="flex flex-col gap-20">
        <PageHeader
          eyebrow="Contact"
          icon={MailSend01Icon}
          heading="Write to a person, not to an inbox"
          figures={[
            {
              value: "51 min",
              caption: "Median first reply\nlast month, not a target",
            },
            {
              value: "6",
              caption: "Offices, and all six\nkeep Saturday hours",
            },
          ]}
          lede="Say what it is about and it goes to the agent who handles that, by name rather than to a shared inbox. Nobody here takes more than two hours to answer. Last month the middle of them took fifty-one minutes."
        />

        <ContactForm />
      </div>

      <ContactReach />
      <AboutOffices />
    </>
  );
}
