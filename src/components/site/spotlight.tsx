"use client";

import { useRef, type PointerEvent, type RefObject } from "react";

/**
 * Tracks pointer position within an element and writes it straight to CSS
 * custom properties (`--spot-x` / `--spot-y`) on the DOM node, so the glow
 * can move every frame without triggering a React re-render. Touch pointers
 * are ignored — there is no continuous hover to track on a tap.
 */
export function useSpotlight<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  onPointerMove: (event: PointerEvent<T>) => void;
} {
  const ref = useRef<T>(null);

  function onPointerMove(event: PointerEvent<T>) {
    if (event.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return { ref, onPointerMove };
}

/**
 * Soft radial glow that follows the pointer within its positioned ancestor.
 * It sits at a negative stack level (see `.spotlight` in globals.css / the
 * `isolate` wrapper on every card), so it paints above the card's own glass
 * background but never has to fight card content for z-index. Opacity only
 * switches on while the card's `group` is hovered, so moving the pointer
 * from card to card reads as the glow travelling between them.
 */
export function Spotlight({ dark = false }: { dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      data-spot={dark ? "dark" : "light"}
      className="spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 ease-[var(--ease-calm)] group-hover:opacity-100"
    />
  );
}