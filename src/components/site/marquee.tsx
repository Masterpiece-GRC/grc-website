import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Infinite horizontal scroller for short label lists (capability strips,
 * category tags). The list is rendered twice back to back and the track is
 * animated by exactly -50%, so the loop is seamless regardless of item
 * count. Pauses on hover; runs slower — not shorter — on small screens so
 * it stays legible without turning into a tap target.
 */
export function Marquee({
  items,
  tone = "dark",
  duration = 30,
  className,
}: {
  items: readonly string[];
  tone?: Tone;
  /** Seconds for one full loop at desktop speed. */
  duration?: number;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]",
        "[-webkit-mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track flex w-max items-center gap-x-10 group-hover/marquee:[animation-play-state:paused]">
        {[0, 1].map((rep) => (
          <ul key={rep} aria-hidden={rep === 1} className="flex shrink-0 items-center gap-x-10">
            {items.map((item, i) => (
              <li
                key={`${rep}-${i}`}
                className={cn(
                  "eyebrow flex items-center gap-3 whitespace-nowrap",
                  dark ? "text-on-dark-muted" : "text-violet",
                )}
              >
                {/* The mark's four-pointed star, used as the separator glyph. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2 w-2 shrink-0 [mask-image:var(--star-mask)] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:var(--star-mask)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]",
                    dark ? "bg-gold" : "bg-violet",
                  )}
                />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}