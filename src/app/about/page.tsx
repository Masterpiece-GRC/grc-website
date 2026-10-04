import Image from "next/image";
import type { Metadata } from "next";
import { FinalCta } from "@/components/site/layout";
import {
  Action,
  Card,
  CheckList,
  Eyebrow,
  PageHero,
  Reveal,
  Section,
  SectionHeading,
  Shell,
} from "@/components/site/primitives";
import { howWeWork, missionVision, values } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import leadership from "@/assets/leadership-discussion.jpg";

const TITLE = "About Masterpiece GRC Consulting | Practical GRC Expertise";
const DESCRIPTION =
  "Learn how Masterpiece GRC Consulting delivers practical, evidence-led governance, risk, compliance and information security support.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- Static, developer-authored JSON-LD; no user input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "About", path: "/about" }])),
        }}
      />

      <PageHero
        compact
        eyebrow="About Masterpiece GRC Consulting"
        headline="Serious governance. Practical delivery."
        copy="Masterpiece GRC Consulting was created to help organisations move beyond fragmented compliance activity and build governance, risk and information security systems that work in practice."
        actions={<Action href="/contact">Discuss Your Requirements</Action>}
      />

      {/*
        Company story. `overflow="visible"` is essential — Section normally
        clips with `overflow-hidden` for its decorative gradients, but that
        also breaks `position: sticky` on anything inside it. The image sits
        in a `lg:sticky` wrapper on the right and holds in place while the
        text on the left scrolls past; `lg:min-h-[118vh]` gives the row a
        little real scroll distance beyond the taller column so there's
        somewhere for the image to hold, without a big empty section.
      */}
      <Section overflow="visible">
        <Shell className="grid gap-14 lg:min-h-[118vh] lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
              <SectionHeading
                eyebrow="Our story"
                title="Designed for organisations that need clarity, not complexity."
              />
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Masterpiece GRC Consulting Limited is a UK-based specialist consultancy supporting
                  growing and regulated organisations with governance, risk, compliance and
                  information security. We combine structured analysis with practical
                  implementation, helping clients understand what matters, establish ownership,
                  create reliable evidence and prepare for external scrutiny.
                </p>
                <p>
                  Our work is proportionate to the organisation: rigorous enough to build
                  confidence, but grounded enough to operate day to day.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:sticky lg:top-28">
              <figure className="relative overflow-hidden rounded-2xl glass p-2">
                <Image
                  src={leadership}
                  alt="Senior leaders reviewing risk and control documentation in a boardroom"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  placeholder="blur"
                  className="h-full w-full rounded-xl object-cover"
                />
              </figure>
            </div>
          </Reveal>
        </Shell>
      </Section>

      {/* Mission and vision — text always visible, hover stays purely visual */}
      <Section tone="dark">
        <Shell className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Mission and vision"
              title="A clear purpose, held to a high standard."
              tone="dark"
            />
          </Reveal>
          <div className="mt-12 columns-1 gap-6 md:columns-2">
            {missionVision.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="mb-6 break-inside-avoid">
                <Card tone="dark" title={item.title} copy={item.copy} />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Values — text always visible, hover stays purely visual */}
      <Section tone="muted">
        <Shell>
          <Reveal>
            <SectionHeading
              eyebrow="Values"
              title="Four commitments that shape every engagement."
              copy="What each commitment means in practice."
            />
          </Reveal>
          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="mb-6 break-inside-avoid">
                <Card
                  index={String(i + 1).padStart(2, "0")}
                  title={value.title}
                  copy={value.copy}
                />
              </Reveal>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Consultant experience */}
            <Section>
              <Shell className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <Reveal>
                  <div>
                    <Eyebrow>Our consultants</Eyebrow>
                    <h2 className="mt-5 text-[2rem] leading-[1.1] font-semibold md:text-[2.7rem]">
                      Cross-disciplinary GRC expertise
                    </h2>
                    <ul className="mt-8 space-y-4 border-l border-violet/25 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      <li>10+ Years’ Experience</li>
                      <li>Big Four Consulting Backgrounds</li>
                      <li>Cross-Industry Experience</li>
                      <li>Governance, Risk &amp; Compliance</li>
                      <li>Cybersecurity &amp; Assurance</li>
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                    <p>
                      Masterpiece GRC Consulting brings together experienced consultants with backgrounds
                      across Big Four professional services, global organisations and regulated industries.
                    </p>
                    <p>
                      Our team has more than 10 years of combined experience across governance, risk,
                      compliance, cybersecurity, information security, audit and assurance. We have
                      supported organisations across a broad range of sectors, giving us the experience
                      to understand different regulatory environments, operational challenges and levels
                      of organisational maturity.
                    </p>
                    <p>
                      Our expertise includes ISO/IEC 27001, Cyber Essentials, PCI DSS, information
                      security governance, third-party risk, internal audit, data protection, access
                      governance, regulatory compliance and remediation.
                    </p>
                    <p>
                      We combine recognised standards with practical business experience to design
                      solutions that are proportionate, implementable and built around the realities of
                      each organisation.
                    </p>
                    <p className="border-l-2 border-violet pl-5 text-lg leading-snug font-semibold text-foreground md:text-xl">
                      Different backgrounds. Shared standards. One objective: governance, risk and
                      compliance that works in practice.
                    </p>
                  </div>
                </Reveal>
              </Shell>
            </Section>

      {/*
        How we work. Mirrors "Who we support" on the homepage: the heading on
        the LEFT is wrapped in `lg:sticky` and holds in place, while the
        checklist on the right scrolls past. `overflow="visible"` again so
        sticky actually works, and a modest `lg:min-h-[112vh]` for scroll room.
      */}
      <Section tone="muted" overflow="visible">
        <Shell className="grid gap-14 lg:min-h-[112vh] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="How we work"
                title="Senior-led, evidence-led and proportionate."
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
              <CheckList items={howWeWork} columns={1} />
            </div>
          </Reveal>
        </Shell>
      </Section>

      <FinalCta
        eyebrow="Next step"
        heading="Tell us what your organisation needs to be able to demonstrate."
        copy="We will help you determine the right scope, priorities and next steps before any work begins."
        label="Discuss Your Requirements"
      />
    </>
  );
}
