import type { Metadata } from "next";
import {
  Action,
  Card,
  PageHero,
  Reveal,
  Section,
  Shell,
} from "@/components/site/primitives";
import { enquiryEmail } from "@/lib/site";

const TITLE = "Enquiry received";

export const metadata: Metadata = {
  title: TITLE,
  description: "Your enquiry has reached Masterpiece GRC Consulting.",
  alternates: { canonical: "/thank-you" },
  // A confirmation page has no standalone value in search results.
  robots: { index: false, follow: false },
};

const next = [
  {
    index: "01",
    title: "We confirm we have understood it",
    copy: "You will receive an acknowledgement, and where the request is unclear we will ask before assuming.",
  },
  {
    index: "02",
    title: "We propose an appropriate next step",
    copy: "Usually a short introductory conversation at no cost, with times proposed by reply.",
  },
  {
    index: "03",
    title: "Nothing proceeds until scope is agreed",
    copy: "Deliverables, assumptions and exclusions are recorded in writing before any work begins.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Enquiry received"
        headline="Thank you — your enquiry has reached us."
        copy="We aim to acknowledge enquiries within one working day. If your enquiry is time-critical, say so in a follow-up and we will prioritise it."
        actions={<Action href="/services">Explore the Services</Action>}
      />

      <Section>
        <Shell>
          <Reveal>
            <h2 className="text-[2rem] leading-[1.1] font-semibold text-foreground md:text-[2.4rem]">
              What happens next.
            </h2>
          </Reveal>
          <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
            {next.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <Card index={step.index} title={step.title} copy={step.copy} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="glass mt-14 rounded-2xl p-7 md:p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your enquiry details are used to understand and respond to your request. If you
                ticked the optional consent box, insights and updates are handled separately from
                that and you can withdraw consent at any time. See the{" "}
                <a
                  href="/privacy-notice"
                  className="font-medium text-teal underline decoration-teal/35 underline-offset-2 transition-colors duration-300 hover:decoration-teal"
                >
                  Privacy Notice
                </a>
                .
                {enquiryEmail ? (
                  <>
                    {" "}
                    If you need to add anything, reply to the acknowledgement or write to{" "}
                    <a
                      href={`mailto:${enquiryEmail}`}
                      className="font-medium text-teal underline decoration-teal/35 underline-offset-2 transition-colors duration-300 hover:decoration-teal"
                    >
                      {enquiryEmail}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            </div>
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
