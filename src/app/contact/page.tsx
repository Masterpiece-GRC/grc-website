import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { InstagramIcon, LinkedInIcon } from "@/components/site/social-icons";
import {
  Action,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Shell,
} from "@/components/site/primitives";
import {
  bookingUrl,
  businessTelephone,
  enquiryEmail,
  instagramHandle,
  instagramUrl,
  linkedInName,
  registeredOffice,
  linkedInUrl
} from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Contact Masterpiece GRC Consulting | Start a Conversation";
const DESCRIPTION =
  "Describe the governance, risk, compliance or information security problem you are dealing with and we will identify an appropriate next step.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const whatHappensNext = [
  "We acknowledge your enquiry and confirm we have understood the problem.",
  "Where it is useful, we arrange a short introductory conversation at no cost.",
  "We set out an appropriate next step, the scope it would cover and what it excludes.",
  "Nothing proceeds until scope, deliverables and assumptions are agreed in writing.",
];

const helpfulContext = [
  "The obligation, standard, client requirement or audit you are responding to.",
  "Any deadline you are working towards.",
  "What already exists — policies, a risk register, previous assessments.",
  "Who owns information security or compliance today, formally or in practice.",
  "The size and shape of the organisation, and where the sensitive information sits.",
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Contact", path: "/contact" }])),
        }}
      />

      <PageHero
        compact
        eyebrow="Contact"
        headline="Start with the challenge that matters most."
        copy="Tell us what you are trying to achieve, the risk or obligation you are facing and any relevant deadline. We will review the enquiry and identify an appropriate next step"
        actions={<Action href="/contact">Book a consultation</Action>}
      />

      {/* Contact details and enquiry form */}
      <Section>
        <Shell className="grid items-start gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Contact details"
                title="Let’s stay connected."
                copy="Use the details below if you would prefer to contact us directly."
              />
              <address className="mt-10 overflow-hidden rounded-2xl glass not-italic">
                <div className="rule-gold" aria-hidden="true" />
                <dl className="divide-y divide-hairline">
                  <div className="flex gap-4 p-5 md:p-6">
                    <dt className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-mist text-teal">
                      <MapPin aria-hidden="true" className="size-5" />
                    </dt>
                    <dd>
                      <p className="eyebrow text-teal">Location</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {registeredOffice}
                      </p>
                    </dd>
                  </div>
                  <div className="flex gap-4 p-5 md:p-6">
                    <dt className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold-mist text-gold">
                      <InstagramIcon className="size-5" />
                    </dt>
                    <dd>
                      <p className="eyebrow text-teal">Instagram</p>
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-medium text-foreground transition-colors hover:text-teal"
                      >
                        {instagramHandle}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-4 p-5 md:p-6">
                    <dt className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-mist text-teal">
                      <LinkedInIcon className="size-5" />
                    </dt>
                    <dd>
                      <p className="eyebrow text-teal">LinkedIn</p>
                      <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-medium text-foreground transition-colors hover:text-teal"
                      >
                        {linkedInName}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-4 p-5 md:p-6">
                    <dt className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold-mist text-gold">
                      <Mail aria-hidden="true" className="size-5" />
                    </dt>
                    <dd>
                      <p className="eyebrow text-teal">Email</p>
                      <a
                        href={`mailto:${enquiryEmail}`}
                        className="mt-2 inline-block text-sm font-medium break-all text-foreground transition-colors hover:text-teal"
                      >
                        {enquiryEmail}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-4 p-5 md:p-6">
                    <dt className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-mist text-teal">
                      <Phone aria-hidden="true" className="size-5" />
                    </dt>
                    <dd>
                      <p className="eyebrow text-teal">Telephone</p>
                      <a
                        href={`tel:${businessTelephone.replace(/\s/g, "")}`}
                        className="mt-2 inline-block text-sm font-medium text-foreground transition-colors hover:text-teal"
                      >
                        {businessTelephone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </address>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Enquiry form"
              title="Send an enquiry."
              copy="We only ask for the information we need in order to understand and respond to your enquiry."
            />
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Booking */}
      <Section tone="dark" backdrop id="book" className="scroll-mt-24">
        <Shell className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Introductory conversation"
              title="Book a consultation."
              copy="A short, no-cost conversation to understand the problem, test whether we are the right fit and agree an appropriate next step."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={120}>
            {bookingUrl ? (
              <div className="rounded-2xl glass-dark p-8 md:p-10">
                <p className="text-sm leading-relaxed text-on-dark-muted">
                  Choose a time that suits you. The booking page opens in a new tab and is operated
                  by our scheduling provider, so no third-party scheduling code runs on this site
                  until you choose to go there.
                </p>
                <div className="mt-8">
                  {/* Deliberately a link, not an inline embed: an embed would
                      load the provider's scripts (and any tracking they carry)
                      for every visitor, before any consent is given. */}
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-medium tracking-wide glass-gold transition-[box-shadow,transform] duration-300 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass-lift)]"
                  >
                    Open the Booking Page
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl glass-dark p-8 md:p-10">
                <p className="eyebrow text-gold-soft">Not yet enabled</p>
                <p className="mt-5 text-sm leading-relaxed text-on-dark-muted">
                  Online booking is switched on once the scheduling account, availability, privacy
                  settings and confirmation emails have been configured and tested. Until then, the
                  enquiry form is the fastest route to a conversation and we will propose times by
                  reply.
                </p>
                <div className="mt-8">
                  <Action href="/contact#main" variant="ghost-dark">
                    Use the Enquiry Form
                  </Action>
                </div>
              </div>
            )}
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
