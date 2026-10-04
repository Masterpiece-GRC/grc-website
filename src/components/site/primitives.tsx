"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { WebGLBackdrop } from "./webgl-backdrop";
import { Reveal } from "./reveal";
import { Spotlight, useSpotlight } from "./spotlight";
import { Marquee } from "./marquee";

export { Reveal, Marquee };

/* ---------- Structure ---------- */

type SectionTone = "light" | "muted" | "dark" | "white";

/**
 * A page section. Light tones use layered mist "fields" rather than a single
 * flat fill so adjacent sections separate without hard colour blocks; the dark
 * tone carries a grain overlay to stop large black areas banding.
 *
 * Dark sections may opt into the animated WebGL field with `backdrop`.
 *
 * `data-tone` is load-bearing, not decorative: `data-tone="light"` flips the
 * semantic tokens (background/foreground/card/muted/border) for everything
 * inside it, so children never have to know which kind of section they sit in.
 * Black is the document base, so dark is the default and light is the opt-in.
 */
export function Section({
  children,
  tone = "light",
  className,
  id,
  backdrop = false,
  overflow = "hidden",
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  backdrop?: boolean;
  /**
   * `overflow-hidden` clips this section's decorative gradients/grain, but
   * it also breaks `position: sticky` on anything inside it — a sticky
   * descendant needs an unclipped path up to the scrolling viewport. Pass
   * "visible" for any section that contains sticky-scroll content.
   */
  overflow?: "hidden" | "visible";
}) {
  const tones: Record<SectionTone, string> = {
    light: "field-mist text-foreground",
    muted: "field-quiet text-foreground",
    white: "bg-card text-card-foreground",
    dark: "field-authority",
  };

  const dark = tone === "dark";
  const withBackdrop = dark && backdrop;

  return (
    <section
      id={id}
      data-tone={dark ? "dark" : "light"}
      className={cn(
        "relative isolate py-20 md:py-28",
        overflow === "hidden" && "overflow-hidden",
        withBackdrop ? "bg-ink-0 text-on-dark" : tones[tone],
        className,
      )}
    >
      {withBackdrop ? (
        <>
          <WebGLBackdrop intensity={0.62} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.115_0.012_300/0.68),oklch(0.115_0.012_300/0.46))]"
          />
        </>
      ) : null}
      {dark ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 grain" />
      ) : null}
      {children}
    </section>
  );
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("shell", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 eyebrow",
        tone === "dark" ? "text-gold-soft" : "text-violet",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-px w-8",
          tone === "dark"
            ? "bg-[image:linear-gradient(90deg,var(--gold),transparent)]"
            : "bg-[image:linear-gradient(90deg,var(--violet),transparent)]",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div className={cn(align === "center" && "flex justify-center")}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-[2rem] leading-[1.1] font-semibold md:text-[2.7rem]",
          tone === "dark" ? "text-on-dark" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Buttons and links ---------- */

type ActionVariant = "solid" | "outline" | "ghost-dark" | "gold" | "header-dark" | "header-light";

/**
 * `solid` is violet — the signature colour, and the right default for a primary
 * action. `gold` stays the exception: the guidelines reserve it for quality and
 * achievement, so one gold action per page at most, otherwise it stops meaning
 * anything.
 */
export function Action({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-medium tracking-wide transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-calm)]";

  const variants: Record<ActionVariant, string> = {
    solid: "sheen-violet hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
    outline:
      "border border-hairline-strong bg-[oklch(1_0_0/55%)] text-foreground backdrop-blur-sm hover:border-violet/50 hover:bg-[oklch(1_0_0/85%)] hover:text-violet hover:shadow-[var(--shadow-glass-on-light)]",
    "ghost-dark":
      "border border-hairline-dark-strong bg-[oklch(1_0_0/6%)] text-on-dark backdrop-blur-sm hover:border-gold/55 hover:bg-[oklch(1_0_0/12%)] hover:text-gold-soft",
    gold: "glass-gold hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass-lift)]",
    "header-dark": "header-cta-dark hover:-translate-y-0.5",
    "header-light": "header-cta-light hover:-translate-y-0.5",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

export function TextLink({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300",
        tone === "dark" ? "text-gold-soft hover:text-gold" : "text-violet hover:text-ink",
      )}
    >
      <span className="border-b border-current/30 pb-0.5 transition-colors duration-300 group-hover:border-current">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* ---------- Static card — always shows its own content; hover is purely visual ---------- */

export function Card({
  id,
  title,
  copy,
  index,
  eyebrow,
  tone = "light",
  serifTitle = false,
  className,
  children,
}: {
  /** Optional DOM id, used for in-page links to a card. */
  id?: string;
  title: ReactNode;
  copy?: ReactNode;
  index?: string;
  eyebrow?: string;
  tone?: "light" | "dark";
  /** Serif title, for quotations and insight titles only (blueprint typography rule). */
  serifTitle?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <article
      id={id}
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative isolate overflow-hidden rounded-xl p-7 transition-[box-shadow,border-color,background-color,transform] duration-300 ease-[var(--ease-calm)] md:p-8",
        dark
          ? "glass-dark hover:border-gold/35"
          : "glass hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass-lift)]",
        className,
      )}
    >
      <Spotlight dark={dark} />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 rule-gold origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:scale-x-100"
      />
      {index ? (
        <p
          className={cn(
            "text-[0.78rem] font-medium tracking-[0.2em] tabular-nums",
            // Gold is a light colour (L≈0.83). On a white glass card it needs
            // the deeper end of the family to stay legible.
            // Gold is reserved for one-off moments (a section eyebrow, the
            // travelling network pulse) — not repeated on every card in a
            // grid, which is what "sparingly" rules out. Violet's lighter
            // family member does the job on dark glass instead.
            dark ? "text-violet-lum" : "text-violet",
          )}
        >
          {index}
        </p>
      ) : null}
      {eyebrow ? (
        <p className={cn("eyebrow", index && "mt-4", dark ? "text-violet-lum" : "text-violet")}>
          {eyebrow}
        </p>
      ) : null}
      <h3
        className={cn(
          "leading-snug font-semibold",
          serifTitle ? "font-serif text-xl tracking-normal" : "text-lg",
          (index || eyebrow) && "mt-3",
          dark ? "text-on-dark" : "text-foreground",
        )}
      >
        {title}
      </h3>
      {copy ? (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "my-4 block h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:scale-x-100",
              dark ? "rule-fine-dark" : "rule-fine",
            )}
          />
          <p
            className={cn(
              "text-sm leading-relaxed",
              dark ? "text-on-dark-muted" : "text-muted-foreground",
            )}
          >
            {copy}
          </p>
        </>
      ) : null}
      {children}
    </article>
  );
}

export function CheckList({
  items,
  tone = "light",
  columns = 2,
}: {
  items: readonly string[];
  tone?: "light" | "dark";
  columns?: 1 | 2 | 3;
}) {
  const cols = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  } as const;

  return (
    <ul className={cn("grid gap-x-10 gap-y-4", cols[columns])}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex gap-3.5 pb-4",
            tone === "dark" ? "border-b border-hairline-dark" : "border-b border-hairline",
          )}
        >
          {/*
            The bullet is the mark's four-pointed star rather than a rotated
            square — the same geometry the brand uses everywhere else, masked
            so it inherits whichever colour the tone calls for.
          */}
          <span
            aria-hidden="true"
            className={cn(
              "mt-1.5 h-2.5 w-2.5 shrink-0 [mask-image:var(--star-mask)] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:var(--star-mask)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",
              tone === "dark" ? "bg-gold" : "bg-violet",
            )}
          />
          <span
            className={cn(
              "text-sm leading-relaxed",
              tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Page hero ---------- */

export function PageHero({
  eyebrow,
  headline,
  copy,
  actions,
  strip,
  compact = false,
}: {
  eyebrow: string;
  headline: string;
  copy: string;
  actions?: ReactNode;
  strip?: readonly string[];
  compact?: boolean;
}) {
  return (
    <header data-hero="true" data-tone="dark" className="relative isolate overflow-hidden bg-ink-0">
      {/*
        Soft blurred bloom, laid down BEFORE the canvas and independent of it.
        This is what makes the hero read as "soft gradients with grain and
        blur" even on a device where the raymarch has degraded to nothing —
        the WebGLBackdrop's own fallback is a flat --field-signature paint,
        and these blooms sit on top of that regardless of whether the canvas
        ever draws a frame.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[36rem] w-[36rem] bloom-violet"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-[26rem] w-[26rem] bloom-gold"
      />
      {/*
        Intensity is deliberately below 1 here. The raymarch is tuned to look
        right in isolation, but full-strength on top of the blooms above and
        under the wash below pushes the frame past "signature accent" into
        "the shader is the brand" — the opposite of black being the base.
      */}
      {/*
        Intensity was dialled down (from 1.0) when this backdrop was a loud
        raymarched terrain, to keep black dominant. The network shader that
        replaced it is intrinsically much dimmer — thin lines and small
        nodes over mostly-black space — so the same 0.72 buried it. Back up
        near full; black stays dominant on its own here because the network
        only lights a small fraction of the frame's area, not because the
        signal is turned down.
      */}
      <WebGLBackdrop intensity={0.95} />
      {/*
        Hero wash — a black multiply layer over the canvas. This is the actual
        fix for black not reading as dominant: it crushes whatever the shader
        draws back toward black except its own brightest highlights, the same
        way the brand's reference photography lets violet/gold break through
        a mostly-black frame rather than fill it.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-wash" />
      {/*
        Contrast scrim, on top of the wash. It is weighted to the left, where
        the headline and body copy sit, and falls away toward the right so the
        animated field still shows through instead of being flattened into a
        solid block. Decorative, so it must never intercept a pointer event.
      */}
      <div
        aria-hidden="true"
        // className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,oklch(0.115_0.012_300/0.90)_0%,oklch(0.115_0.012_300/0.70)_38%,oklch(0.115_0.012_300/0.30)_68%,oklch(0.115_0.012_300/0)_100%)]"
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 grain-strong" />
      <Shell
        className={cn(
          "relative",
          compact ? "pt-36 pb-20 md:pt-44 md:pb-24" : "pt-40 pb-24 md:pt-52 md:pb-32",
        )}
      >
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className={cn(
                "mt-6 font-semibold text-on-dark",
                compact
                  ? "text-[2.5rem] leading-[1.06] md:text-[3.35rem]"
                  : "text-[2.5rem] leading-[1.04] md:text-[4rem]",
              )}
            >
              {headline}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">
              {copy}
            </p>
          </Reveal>
          {actions ? (
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>
            </Reveal>
          ) : null}
        </div>
      </Shell>
      {strip ? (
        <div className="relative glass-bar py-5">
          <Marquee items={strip} tone="dark" />
        </div>
      ) : null}
    </header>
  );
}