import { Action, PageHero, Reveal, Section, Shell } from "@/components/site/primitives";
import { NAV } from "@/content/nav";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <PageHero
        compact
        eyebrow="404"
        headline="That page is not here."
        copy="The address may have changed, or the link that brought you here may be out of date. The five main sections of the site are listed below."
        actions={
          <>
            <Action href="/">Return Home</Action>
            <Action href="/contact" variant="ghost-dark">
              Start a Conversation
            </Action>
          </>
        }
      />

      <Section>
        <Shell>
          <Reveal>
            <nav aria-label="Site sections" className="glass mx-auto max-w-2xl rounded-2xl p-7 md:p-8">
              <p className="eyebrow text-teal">Go to</p>
              <ul className="mt-6">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between border-b border-hairline py-4 text-sm text-foreground transition-colors duration-300 hover:text-teal"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </Shell>
      </Section>
    </>
  );
}
