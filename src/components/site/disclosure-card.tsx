"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spotlight, useSpotlight } from "./spotlight";

type Tone = "light" | "dark";

type DisclosureCardProps = {
  /** Optional DOM id, so the card can be an in-page anchor target. */
  id?: string;
  /** Two-digit sequence marker, e.g. "01". Tabular sans — serif is reserved for quotations. */
  index?: string;
  /** Small uppercase label above the title (category, sector, practice area). */
  eyebrow?: string;
  title: ReactNode;
  /** Optional line that stays visible at all times, closed or open. */
  summary?: ReactNode;
  /** The text hidden until hover (desktop) or tap (touch). */
  children: ReactNode;
  tone?: Tone;
  /** Serif title, for quotations and insight titles only (blueprint typography rule). */
  serifTitle?: boolean;
  className?: string;
};

/**
 * Hover-to-reveal card on pointer-capable devices (mouse, trackpad, stylus);
 * on touch, where hovering has no meaning, it falls back to tap-to-reveal.
 * The card carries no visible "Details" affordance — it stays clean until
 * hovered — but keeps `aria-expanded`/`role="region"` so the reveal is still
 * announced to screen readers. The hidden copy stays in the DOM at all
 * times so it remains crawlable and searchable in-page; it is animated with
 * a `grid-template-rows: 0fr -> 1fr` transition (no height measurement in
 * JavaScript) and marked `inert` while closed so it leaves both the
 * accessibility tree and the focus order. The card's own box is sized to
 * exactly its closed-state content — no forced stretch — so there's no
 * dead space left under it before it's hovered.
 */
export function DisclosureCard({
  id,
  index,
  eyebrow,
  title,
  summary,
  children,
  tone = "light",
  serifTitle = false,
  className,
}: DisclosureCardProps) {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const triggerId = `${uid}-trigger`;
  const dark = tone === "dark";
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  // Decide once (and on any input-mode change, e.g. a 2-in-1 laptop being
  // undocked) whether this device has real hover. Mouse/trackpad -> hover
  // owns `open`. Touch -> the click handler below owns it.
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <article
      id={id}
      ref={ref}
      data-open={open}
      onPointerMove={onPointerMove}
      onMouseEnter={() => canHover && setOpen(true)}
      onMouseLeave={() => canHover && setOpen(false)}
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-xl transition-[box-shadow,border-color,background-color,transform] duration-300 ease-[var(--ease-calm)]",
        dark
          ? "glass-dark hover:border-gold/35 data-[open=true]:border-gold/45"
          : "glass hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass-lift)] data-[open=true]:shadow-[var(--shadow-glass-lift)]",
        className,
      )}
    >
      <Spotlight dark={dark} />

      {/* Gold hairline that draws in on hover and stays while open. */}
      <span
        aria-hidden="true"
        className="rule-gold absolute inset-x-0 top-0 origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-calm)] group-hover:scale-x-100 group-focus-within:scale-x-100 group-data-[open=true]:scale-x-100"
      />

      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            // On hover-capable devices the article's own pointer handlers
            // above already own `open`; a click here would just fight them.
            if (!canHover) setOpen((v) => !v);
          }}
          onFocus={() => canHover && setOpen(true)}
          onBlur={() => canHover && setOpen(false)}
          className={cn(
            "flex w-full flex-col items-start gap-0 p-7 text-left md:p-8",
            canHover ? "cursor-default" : "cursor-pointer",
            "focus-visible:outline-offset-[-2px]",
          )}
        >
          {index ? (
            <span
              className={cn(
                "text-[0.78rem] font-medium tabular-nums tracking-[0.2em]",
                // Same reasoning as Card: gold repeated on every disclosure
                // card in a grid is overuse, not the "special" the brand
                // guidelines describe.
                dark ? "text-violet-lum" : "text-violet",
              )}
            >
              {index}
            </span>
          ) : null}

          {eyebrow ? (
            <span
              className={cn("eyebrow", index && "mt-4", dark ? "text-violet-lum" : "text-violet")}
            >
              {eyebrow}
            </span>
          ) : null}

          <span
            className={cn(
              "leading-snug font-semibold",
              serifTitle ? "font-serif text-xl tracking-normal" : "text-lg",
              (index || eyebrow) && "mt-3",
              dark ? "text-on-dark" : "text-foreground",
            )}
          >
            {title}
          </span>

          {summary ? (
            <span
              className={cn(
                "mt-3 line-clamp-3 text-sm leading-relaxed group-data-[open=true]:hidden",
                dark ? "text-on-dark-muted" : "text-muted-foreground",
              )}
            >
              {summary}
            </span>
          ) : null}
        </button>
      </h3>

      {/* Hidden panel — 0 height until hovered/tapped, so it adds nothing to the card's own size. */}
      <div className="disclosure" data-open={open}>
        <div>
          <div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            inert={!open}
            className="px-7 pb-7 md:px-8 md:pb-8"
          >
            <span
              aria-hidden="true"
              className={cn("mb-5 block", dark ? "rule-fine-dark" : "rule-fine")}
            />
            <div
              className={cn(
                "space-y-4 text-sm leading-relaxed",
                dark ? "text-on-dark-muted" : "text-muted-foreground",
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}