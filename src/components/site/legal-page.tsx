import type { ReactNode } from "react";
import { PageHero, Reveal, Section, Shell } from "./primitives";

/**
 * Shared shell for the utility notices (Privacy, Cookies, Terms,
 * Accessibility).
 *
 * These pages are required in the footer but are not part of the five marketing
 * pages, so they are deliberately plainer: one column, no disclosure cards, no
 * calls to action competing with the text.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  reviewNote = true,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Set false once the notice has been confirmed by a qualified adviser. */
  reviewNote?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero compact eyebrow={eyebrow} headline={title} copy={intro} />
      <Section>
        <Shell>
          <Reveal>
            <article className="glass mx-auto max-w-3xl rounded-2xl p-7 md:p-12">
              {reviewNote ? (
                <p className="mb-10 rounded-lg border border-gold/30 bg-[oklch(0.944_0.024_88/60%)] px-4 py-3 text-xs leading-relaxed text-foreground">
                  <strong className="font-semibold">Pending review.</strong> This notice describes
                  how the website is actually built and operated. It must be confirmed by
                  Masterpiece GRC Consulting Limited and reviewed by a qualified adviser before
                  launch.
                </p>
              ) : null}
              <div className="legal-prose">{children}</div>
            </article>
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
