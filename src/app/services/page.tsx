import Image from "next/image";
import type { Metadata } from "next";
import { FinalCta } from "@/components/site/layout";
import {
  Action,
  Card,
  CheckList,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Shell,
  TextLink,
} from "@/components/site/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  engagementFormats,
  isoFaqs,
  isoJourney,
  isoSupport,
  isoWhoFor,
  services,
} from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import evidence from "@/assets/evidence-documentation.jpg";

const TITLE = "GRC & Information Security Consulting Services | Masterpiece GRC";
const DESCRIPTION =
  "Explore ISO 27001, security governance, risk, audit readiness, third-party risk, access governance and fractional security leadership services.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Services", path: "/services" }])),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(isoFaqs)) }}
      />

      <PageHero
        compact
        eyebrow="Our Services"
        headline="GRC services built around how your organisation actually works."
        copy="From ISO 27001 and security governance to risk, audit readiness and supplier assurance, our services are designed to create sustainable capability rather than temporary compliance."
        actions={
          <>
            <Action href="/contact">Find the Right Support</Action>
            <Action href="/services#iso-27001" variant="ghost-dark">
              ISO 27001 &amp; ISMS
            </Action>
          </>
        }
      />

      {/*
        Service portfolio. Every card now shows both its "who this is for"
        line and its "typical support" text at once — nothing is hidden
        behind hover — with the CTA link visible underneath. Hover only
        drives the card's built-in glow/lift/line effects.
      */}
      <Section>
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Service portfolio"
              title="Eight practice areas, one connected method."
              copy="Each area sets out the problem it addresses and the support typically provided. Scope is agreed before any work begins."
            />
          </Reveal>
          <div className="mt-14 space-y-4">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 40}>
                <Card
                  id={`service-${service.id}`}
                  index={String(i + 1).padStart(2, "0")}
                  title={service.title}
                  copy={service.for}
                  className="scroll-mt-32"
                >
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.support}
                  </p>
                  <div className="mt-4">
                    <TextLink href="/contact">Request a consultation on this area</TextLink>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/*
        Engagement formats. `overflow="visible"` so the sticky image below
        can actually hold — Section normally clips with `overflow-hidden`
        for its decorative gradients, which otherwise breaks
        `position: sticky` on anything inside it. The image sits in a
        `lg:sticky` wrapper and holds while the list on the left scrolls
        past; `lg:min-h-[115vh]` gives the row a little real scroll distance
        to work with.
      */}
      <Section tone="muted" overflow="visible">
        <Shell className="grid lg:min-h-[95vh] lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
              <SectionHeading
                eyebrow="Engagement formats"
                title="Five ways to work with us."
                copy="Deliverables, assumptions and exclusions are recorded before work begins."
              />
              <ul className="mt-10 space-y-3">
                {engagementFormats.map((format) => (
                  <li
                    key={format}
                    className="flex items-center gap-4 border-b border-hairline pb-3 text-sm text-foreground"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <figure className="glass relative overflow-hidden rounded-2xl p-2">
                <Image
                  src={evidence}
                  alt="Governance documentation and a control register prepared for review"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  placeholder="blur"
                  className="h-full w-full rounded-xl object-cover"
                />
              </figure>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/*
        Flagship: ISO 27001 & ISMS. `overflow="visible"` because two
        sub-blocks further down ("Who this is for" / "What support
        includes", and the FAQ) use sticky-scroll and need an unclipped
        path up to the viewport. This section also renders the animated
        `backdrop` (WebGLBackdrop) and a grain overlay — both are
        `absolute inset-0`, so they stay confined to the section's own box
        regardless of the section's overflow setting; if the backdrop
        turns out to render anything larger than its container, it's worth
        a visual check here specifically.
      */}
      <Section tone="dark" backdrop id="iso-27001" overflow="visible" className="scroll-mt-24">
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="ISO/IEC 27001 Consulting"
              title="Build an ISMS that works before, during and after certification."
              copy="We help organisations design, implement, improve and assure information security management systems (ISMS) that reflect real risks, produce credible evidence and support independent certification."
              tone="dark"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Action href="/contact" variant="gold">
                Request an ISO 27001 Consultation
              </Action>
              <Action href="/why-masterpiece" variant="ghost-dark">
                View the Delivery Approach
              </Action>
            </div>
          </Reveal>

          {/*
            "Who this is for" stays put (sticky, left) while "What support
            includes" scrolls past on the right. lg:min-h-[115vh] gives the
            row scroll room; the support cards below now show their full
            text always, and sit in a masonry column layout so one longer
            card doesn't leave dead space under its shorter neighbour.
          */}
          <div className="mt-20 grid gap-14 lg:min-h-[115vh] lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h3 className="text-xl font-semibold text-on-dark">Who this is for</h3>
                <div className="mt-6">
                  <CheckList items={isoWhoFor} tone="dark" columns={1} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
                <h3 className="text-xl font-semibold text-on-dark">What support includes</h3>
                <div className="mt-6 columns-1 gap-5 sm:columns-2">
                  {isoSupport.map((item) => (
                    <Card
                      key={item.title}
                      tone="dark"
                      title={item.title}
                      copy={item.copy}
                      className="mb-5 break-inside-avoid"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/*
            Delivery journey — text always visible, hover stays purely
            visual, masonry columns so heights stay independent per card.
          */}
          <Reveal>
            <h3 className="mt-20 text-xl font-semibold text-on-dark">Delivery journey</h3>
          </Reveal>
          <div className="mt-8 columns-1 gap-6 md:columns-3 lg:columns-5">
            {isoJourney.map((step, i) => (
              <Reveal key={step.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card tone="dark" index={step.index} title={step.title} copy={step.copy} />
              </Reveal>
            ))}
          </div>

          {/*
            FAQ — the heading and disclaimer stay put (sticky, left) while
            the question list scrolls past on the right. The accordion's
            own expand/collapse behaviour is unrelated to this and
            untouched — that's a per-question interaction, not a hover
            reveal.
          */}
          <div className="mt-20 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:mt-15">
                <h3 className="text-xl font-semibold text-on-dark">Frequently asked questions</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted justify-center">
                  Certification decisions rest with an independent certification body. We prepare,
                  implement and assess readiness — nothing more is claimed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="lg:flex lg:flex-col lg:justify-center">
                <Accordion type="single" collapsible className="w-full">
                  {isoFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.q}
                      value={faq.q}
                      className="border-b border-hairline-dark"
                    >
                      <AccordionTrigger className="cursor-pointer text-left text-base text-on-dark hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-on-dark-muted">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <Card
              tone="dark"
              title="How we describe certification"
              className="mt-16 border-gold/35"
            >
              <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">
                Masterpiece GRC Consulting is not a certification body and does not guarantee a
                certification outcome, regulatory approval or audit result. Support is consultancy
                support: it prepares an organisation for an independent assessment, and the
                certification decision rests entirely with the certification body.
              </p>
            </Card>
          </Reveal>
        </Shell>
      </Section>

      <FinalCta
        eyebrow="Not sure which service fits?"
        heading="Not sure which service fits the problem?"
        copy="Describe the outcome, audit, risk or obligation you are dealing with. We will help define the right scope before work begins."
        label="Find the Right Support"
      />
    </>
  );
}
