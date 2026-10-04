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
} from "@/components/site/primitives";
import {
  differentiators,
  engagementTriggers,
  industries,
  problemsSolved,
  qualityCommitments,
} from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Why Masterpiece GRC Consulting | Evidence-Led Assurance";
const DESCRIPTION =
  "Discover Masterpiece GRC Consulting’s practical, proportionate and evidence-led approach to governance, risk, compliance and security assurance.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/why-masterpiece" },
  openGraph: { url: "/why-masterpiece", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function WhyMasterpiecePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Why Masterpiece", path: "/why-masterpiece" }]),
          ),
        }}
      />

      <PageHero
        compact
        eyebrow="Why Masterpiece"
        headline="Advice is only valuable when it can be used."
        copy="Our work is designed to leave clients with stronger decisions, clearer ownership and evidence they can continue to use — not a shelf of documents that immediately becomes outdated."
        actions={<Action href="/contact">Start a Conversation</Action>}
      />

      {/* Differentiators — text always visible, hover stays purely visual */}
      <Section>
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Six differentiators"
              title="How the work is scoped, performed and handed over."
              copy="What each differentiator means in delivery."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card index={String(i + 1).padStart(2, "0")} title={item.title} copy={item.copy} />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/*
        Quality commitments. Mirror image of the sticky pattern used
        elsewhere: here it's the RIGHT column (the checklist) that stays
        put while the LEFT heading scrolls past. `overflow="visible"` so
        Section's usual `overflow-hidden` (for its decorative gradients)
        doesn't block the sticky positioning, and `lg:min-h-[115vh]` gives
        the row a little real scroll distance to work with.
      */}
      <Section tone="dark" overflow="visible">
        <Shell className="relative grid gap-14 lg:min-h-[20vh] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Quality commitments"
                title="What we will and will not claim."
                copy="Accuracy protects your organisation as much as ours."
                tone="dark"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:flex lg:flex-col lg:justify-center">
              <CheckList items={qualityCommitments} tone="dark" columns={1} />
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Problems we help solve — text always visible, hover stays purely visual */}
      <Section tone="muted">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Examples of problems we help solve"
              title="Familiar situations, structured responses."
              copy="How we would respond to each situation."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {problemsSolved.map((item, i) => (
              <Reveal key={item.quote} delay={i * 60} className="mb-6 break-inside-avoid">
                <Card title={`“${item.quote}”`} serifTitle copy={item.copy} />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Industries — text always visible, hover stays purely visual */}
      <Section id="industries" className="scroll-mt-24">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              title="Risk is universal. Context is not."
              copy="Our approach is tailored to sectors where trust, evidence, accountability and continuity are critical. We align recognised good practice with the organisation’s real operating environment."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2">
            {industries.map((sector, i) => (
              <Reveal key={sector.title} delay={i * 70} className="mb-6 break-inside-avoid">
                <Card index={String(i + 1).padStart(2, "0")} title={sector.title} copy={sector.copy} />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Engagement triggers */}
      <Section tone="dark">
        <Shell className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Common triggers for engagement"
              title="Bring the sector context. We will bring the structure."
              tone="dark"
            />
            <div className="mt-10">
              <Action href="/contact" variant="gold">
                Discuss Your Sector and Requirements
              </Action>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CheckList items={engagementTriggers} tone="dark" columns={1} />
          </Reveal>
        </Shell>
      </Section>

      <FinalCta
        eyebrow="Next step"
        heading="Put a senior, evidence-led perspective on the problem."
        copy="Describe the risk, obligation or assurance gap you are dealing with and we will identify an appropriate next step."
        label="Start a Conversation"
      />
    </>
  );
}