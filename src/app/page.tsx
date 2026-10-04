import type { Metadata } from "next";
import { FinalCta } from "@/components/site/layout";
import {
  Action,
  Card,
  CheckList,
  Eyebrow,
  Marquee,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Shell,
  TextLink,
} from "@/components/site/primitives";
import {
  audiences,
  capabilityStrip,
  deliveryMethod,
  differentiators,
  featuredServices,
  industries,
  insightArticles,
  insightCategories,
  outcomes,
} from "@/content/site";
import {
  brandDescription,
  brandName,
  businessTelephone,
  companyNumber,
  enquiryEmail,
  legalName,
  siteUrl,
} from "@/lib/site";

const TITLE = "Masterpiece GRC Consulting | Governance, Risk & Compliance";
const DESCRIPTION =
  "Practical GRC, ISO 27001, information security governance, risk and assurance support for growing and regulated organisations.";

export const metadata: Metadata = {
  // The home page carries the full brand title rather than the "%s | brand" template.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

/**
 * Organization structured data. Deliberately limited to facts the blueprint
 * confirms — no invented address, telephone number, founding date, employee
 * count, review rating or award.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organisation`,
  name: legalName,
  alternateName: brandName,
  url: siteUrl,
  description: brandDescription,
  email: enquiryEmail,
  telephone: businessTelephone,
  identifier: { "@type": "PropertyValue", propertyID: "Company Number", value: companyNumber },
  address: {
    "@type": "PostalAddress",
    streetAddress: "71–75 Shelton Street",
    addressLocality: "London",
    addressCountry: "GB",
    postalCode: "WC2H 9JQ",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  knowsAbout: [
    "ISO/IEC 27001",
    "Information security management systems",
    "Security governance and operating models",
    "Risk management and control assurance",
    "Internal audit and certification readiness",
    "Third-party and supplier risk",
    "Identity and access governance",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <PageHero
        eyebrow="Governance, Risk, Compliance & Information Security"
        headline="Build trust into the way your organisation operates."
        copy="Masterpiece GRC Consulting helps growing and regulated organisations turn governance, risk, compliance and information security requirements into practical controls, credible evidence and confident decisions."
        strip={capabilityStrip}
        actions={
          <>
            <Action href="/contact">Book a Strategic Consultation</Action>
            <Action href="/services" variant="ghost-dark">
              Explore Our Services
            </Action>
          </>
        }
      />

      {/*
        The client problem. `overflow="visible"` is essential here —
        Section normally clips with `overflow-hidden` for its decorative
        gradients, but that also breaks `position: sticky` on anything
        inside it. `lg:min-h-[118vh]` gives the row a little real scroll
        distance beyond the taller column so the sticky image has
        somewhere to hold, without ballooning the section with dead space.
      */}
      <Section overflow="visible">
        <Shell className="grid gap-14 lg:min-h-[118vh] lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
              <SectionHeading
                eyebrow="The client problem"
                title="Complex requirements. Clear direction."
                copy="Compliance should not live in disconnected policies, spreadsheets and last-minute audit activity. We help organisations establish clear ownership, proportionate controls and reliable evidence so that risk can be managed consistently and assurance can withstand scrutiny."
              />
              {/*
                Gold is reserved for the hero/CTA/webgl-pulse moments — see
                globals.css and the Card fix in primitives.tsx. A gold divider
                on every content section stops being special, so this one
                (and the matching one in the founder block below) uses the
                violet rule instead.
              */}
              <div aria-hidden="true" className="mt-10 rule-violet max-w-sm" />
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Masterpiece GRC Consulting turns complex obligations and risk concerns into
                practical governance, credible evidence and confident decisions.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <div
                role="img"
                aria-label="Abstract purple, black and gold brand gradient"
                className="relative isolate h-[25rem] overflow-hidden rounded-2xl border border-hairline-dark-strong bg-ink-0 md:h-[34rem]"
              >
                <div aria-hidden="true" className="absolute inset-0 field-authority" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-15 [filter:brightness(0)_invert(1)]"
                  style={{ backgroundImage: "url('/logo.png')" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -left-16 h-[22rem] w-[22rem] bloom-violet blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute right-[-4rem] bottom-[-3rem] h-[20rem] w-[20rem] bloom-gold blur-2xl"
                />
                <div aria-hidden="true" className="absolute inset-0 grain-strong" />
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Featured services */}
      <Section tone="muted" id="services">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Featured services"
              title="Support shaped around obligations, risk and delivery."
              copy=""
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card
                  index={String(i + 1).padStart(2, "0")}
                  title={service.title}
                  copy={service.copy}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12">
              <TextLink href="/services">View all services</TextLink>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Outcomes */}
      <Section tone="dark">
        <Shell className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Outcomes"
              title="From compliance activity to operating confidence."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={120}>
            <CheckList items={outcomes} tone="dark" columns={2} />
          </Reveal>
        </Shell>
      </Section>

      {/* Delivery method */}
      <Section>
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Delivery method"
              title="A disciplined route from uncertainty to assurance."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-4">
            {deliveryMethod.map((step, i) => (
              <Reveal key={step.title} delay={i * 70} className="mb-6 break-inside-avoid">
                <Card index={step.index} title={step.title} copy={step.copy} />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/*
        Who we support. Same fix as above: `overflow="visible"` so the
        sticky heading actually holds, and a lighter `lg:min-h-[112vh]`
        instead of a large fixed viewport multiple — the checklist already
        supplies most of the extra height on its own.
      */}
      <Section tone="muted" overflow="visible">
        <Shell className="grid gap-14 lg:min-h-[112vh] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Who we support"
                title="Senior teams that need defensible assurance."
                copy="Our work suits organisations where trust, evidence, accountability and continuity are critical."
              />
              <div className="mt-8">
                <TextLink href="/why-masterpiece">See sector relevance and our method</TextLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
              <CheckList items={audiences} columns={1} />
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Sectors */}
      <Section>
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Sectors"
              title="Risk is universal. Context is not."
              copy="We align recognised good practice with the real operating environment of sectors where trust, evidence, accountability and continuity are critical."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-4">
            {industries.map((sector, i) => (
              <Reveal key={sector.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card title={sector.title} copy={sector.copy} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12">
              <TextLink href="/why-masterpiece#industries">Read the full sector approach</TextLink>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Reasons to choose Masterpiece */}
      <Section tone="dark">
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Reasons to choose Masterpiece"
              title="Advice is only valuable when it can be used."
              copy="Every engagement is scoped, delivered and handed over so the organisation keeps the capability afterwards."
              tone="dark"
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card tone="dark" title={item.title} copy={item.copy} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-12">
              <TextLink href="/why-masterpiece" tone="dark">
                See how we work and what we will not claim
              </TextLink>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Founder credibility */}
      <Section tone="muted">
        <Shell>
          <Reveal>
            <div className="grid gap-10 rounded-2xl glass p-8 md:grid-cols-[0.85fr_1.15fr] md:p-12">
              <div>
                <Eyebrow>Senior-led delivery</Eyebrow>
                <p className="mt-5 text-2xl leading-snug font-semibold text-foreground">
                  Adewole Daniel Adekunle
                </p>
                {/*
                  Was `text-teal` — a leftover class name from the palette
                  this codebase used before the brand guidelines came in.
                  Because a legacy alias in globals.css maps --color-teal to
                  --violet, this rendered correctly (violet) despite the wrong
                  name, which is exactly why it survived unnoticed until now.
                  That alias is a temporary migration ramp, not a permanent
                  fixture — fixing the name here rather than relying on it.
                */}
                <p className="mt-2 text-sm text-violet">Founder</p>
                <div aria-hidden="true" className="mt-8 rule-violet" />
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li>ISO/IEC 27001 Lead Auditor</li>
                  <li>ISO/IEC 27001 Lead Implementer</li>
                  <li>Cisco Cybersecurity Essentials</li>
                  <li>GDPR training</li>
                </ul>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Adewole Daniel Adekunle is an information security, accreditation and audit
                  specialist with professional experience spanning security governance, assurance,
                  consulting and regulated environments. Clients deal directly with the person
                  accountable for the quality of the work.
                </p>
                <p>
                  He holds an LLM in Governance, Risk Management and Compliance and an LLB in Law
                  from the University of Hertfordshire. His work has included ISO/IEC 27001, Cyber
                  Essentials, PCI DSS, third-party risk management, identity and access governance,
                  Segregation of Duties, data protection and remediation management.
                </p>
                <div className="pt-2">
                  <TextLink href="/about">Read about our approach and values</TextLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Insights & resources */}
      <Section tone="dark">
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Insights and resources"
              title="Practical thinking for better governance and assurance."
              copy="Clear guidance for leaders and practitioners responsible for information security, risk, compliance, audit readiness and organisational trust."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={100}>
            <Marquee items={insightCategories} tone="dark" className="mt-10" />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {insightArticles.map((article, i) => (
              <Reveal key={article.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card
                  tone="dark"
                  eyebrow={article.category}
                  title={article.title}
                  copy={article.copy}
                  serifTitle
                />
              </Reveal>
            ))}
            <Reveal delay={360} className="mb-6 break-inside-avoid">
              <Card
                tone="dark"
                title="Receive practical GRC and information security insight."
                className="border-gold/35"
              >
                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                  Insight articles are published here as they are released. To be notified, send an
                  enquiry and tick the optional updates box — marketing consent is recorded
                  separately from your enquiry and you can withdraw it at any time.
                </p>
                <div className="mt-7">
                  <TextLink href="/contact" tone="dark">
                    Request insight updates
                  </TextLink>
                </div>
              </Card>
            </Reveal>
          </div>
        </Shell>
      </Section>

      <FinalCta
        eyebrow="Start here"
        heading="Start with the risk, obligation or assurance gap that matters most."
        copy="Share the challenge you are facing. We will help you determine the right scope, priorities and next steps."
        label="Book a Strategic Consultation"
      />
    </>
  );
}
