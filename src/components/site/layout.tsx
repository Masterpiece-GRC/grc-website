import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { LEGAL_NAV, NAV } from "@/content/nav";
import { Action, Reveal, SectionHeading, Shell } from "./primitives";
import { WebGLBackdrop } from "./webgl-backdrop";
import { Wordmark } from "./wordmark";
import { SiteHeader } from "./site-header";
import { InstagramIcon, LinkedInIcon } from "./social-icons";
import {
  businessTelephone,
  companyNumber,
  enquiryEmail,
  instagramHandle,
  instagramUrl,
  legalName,
  linkedInName,
  linkedInUrl,
  registeredOffice,
} from "@/lib/site";

export { SiteHeader };

export function FinalCta({
  eyebrow = "Next step",
  heading,
  copy,
  label,
}: {
  eyebrow?: string;
  heading: string;
  copy: string;
  label: string;
}) {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink-0">
      {/*
        Same fix as the hero, at CTA scale: bloom shapes and a black multiply
        wash so the shader reads as an accent under black, not the other way
        round. This section is the page's closing beat, not its loudest one —
        `field-signature` (the hero's fuller violet+gold blend) stays hero-only
        on purpose, and intensity here is dialled below the hero's 0.72 to
        keep it that way.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 bloom-violet"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-1/4 h-[20rem] w-[20rem] bloom-gold"
      />
      <WebGLBackdrop intensity={0.58} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 cta-wash" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.115_0.012_300/0.15),oklch(0.115_0.012_300/0.24))]"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 grain-strong" />
      <Shell className="relative py-24 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={heading}
            copy={copy}
            tone="dark"
            align="center"
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <Action href="/contact" variant="gold">
              {label}
            </Action>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer data-tone="dark" className="relative isolate overflow-hidden field-authority">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 grain" />
      <Shell className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr_1.2fr]">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-dark-muted">
              Masterpiece GRC Consulting turns complex obligations and risk concerns into practical
              governance, credible evidence and confident decisions.
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold-soft">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-dark-muted transition-colors duration-300 hover:text-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold-soft">Legal</p>
            <ul className="mt-5 space-y-3">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/Masterpiece_GRC_${item.label.replaceAll(" ", "_")}.pdf`}
                    className="text-sm text-on-dark-muted transition-colors duration-300 hover:text-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-gold-soft">Contact</p>
            <address className="mt-5 space-y-4 text-sm leading-relaxed text-on-dark-muted not-italic">
              <p className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                {registeredOffice}
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                <a href={`mailto:${enquiryEmail}`} className="transition-colors hover:text-on-dark">
                  {enquiryEmail}
                </a>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                <a
                  href={`tel:${businessTelephone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-on-dark"
                >
                  {businessTelephone}
                </a>
              </p>
              <p className="flex gap-3">
                <InstagramIcon className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-on-dark"
                >
                  {instagramHandle}
                </a>
              </p>
              <p className="flex gap-3">
                <LinkedInIcon className="mt-0.5 size-4 shrink-0 text-gold-soft" />
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-on-dark"
                >
                  {linkedInName}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div aria-hidden="true" className="my-10 rule-gold" />
        <div className="flex flex-col gap-4 text-xs leading-relaxed text-on-dark-faint">
          <p>
            {legalName} is a company registered in England and Wales. Company No. {companyNumber}.{" "}
            Registered Office: {registeredOffice}.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {legalName}. All rights reserved.</p>
            <p className="sm:max-w-md sm:text-right">
              Consultancy support is not legal advice, regulatory approval or an independent
              certification decision.
            </p>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
