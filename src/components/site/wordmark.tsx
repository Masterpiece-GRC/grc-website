import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gcrLogo from "@/assets/gcr-logo.png";

export function Wordmark({
  size = "footer",
  dark = true,
}: {
  size?: "header" | "footer";
  /**
   * The source asset is a single flat white mark on transparent PNG, not a
   * multi-tone image. That's what makes `brightness(0)` a safe fix rather
   * than a hack: it multiplies every RGB channel by zero while leaving alpha
   * untouched, so a solid-white glyph on transparency becomes solid black on
   * the same transparency — exactly, with no second asset required. This
   * would NOT be safe on a logo with gradients or more than one tone, since
   * brightness(0) flattens everything it touches to pure black.
   *
   * Defaults to true (white, unmodified) because most callers of this
   * component sit on a dark surface — the footer always does. The header is
   * the one place this needs to flip, and it already tracks its own light/
   * dark state as `dark` — pass that straight through.
   */
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0"
      aria-label="Masterpiece GRC Consulting — home"
    >
      <Image
        src={gcrLogo}
        alt=""
        priority={size === "header"}
        className={cn(
          "transition-[opacity,filter] duration-300 ease-[var(--ease-calm)] group-hover:opacity-85",
          size === "header" ? "h-auto w-36 sm:w-40" : "h-auto w-48 sm:w-56",
          !dark && "brightness-0",
        )}
      />
    </Link>
  );
}