"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV } from "@/content/nav";
import { Action, Shell } from "./primitives";
import { Wordmark } from "./wordmark";

/**
 * Fixed navigation bar.
 *
 * The bar has two tones, and picking the right one is the whole point of the
 * `overHero` state. While a dark hero is still behind the bar it is dark glass
 * with light text. The moment the hero has scrolled away it inverts to pale
 * glass with dark text — otherwise a black bar hanging over a mist section
 * reads as a leftover slab of the hero rather than as navigation.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Is a dark hero still sitting behind the bar? The root's top edge is pulled
   * down by the bar's own height, so the hero counts as "behind the bar" only
   * while its lower edge is still inside that band. Pages without a hero
   * (utility notices, thank-you, 404) resolve to the light tone immediately.
   */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }

    setOverHero(true);
    const observer = new IntersectionObserver(
      (entries) => setOverHero(entries[0]?.isIntersecting ?? false),
      { rootMargin: "-88px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape so the drawer is keyboard-dismissible.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = overHero;
  const bar = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-mist-lift focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink focus:shadow-[var(--shadow-glass-lift)]"
      >
        Skip to main content
      </a>
      {/*
        `pointer-events-none` on the bar itself with `pointer-events-auto` on its
        contents: the bar is fixed and full-width, so without this its empty
        gutters silently intercept clicks on the section scrolling underneath.

        The skip link above is deliberately pinned to explicit light tokens
        rather than `bg-card`/`text-foreground`: it renders outside any section,
        where the semantic tokens still resolve to the dark base, and a dark
        chip on a dark hero would make the link invisible at the exact moment a
        keyboard user needs to see it.
      */}
      <header
        data-tone={dark ? "dark" : "light"}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-300 ease-[var(--ease-calm)]",
          bar ? "py-3.5" : "border-b border-transparent py-7",
          bar && (dark ? "glass-bar" : "glass-bar-light"),
        )}
      >
        <Shell className="pointer-events-auto flex items-center justify-between gap-6">
          <Wordmark size="header" dark={dark} />
          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm transition-colors duration-300",
                    dark
                      ? active
                        ? "text-on-dark"
                        : "text-on-dark-muted hover:text-on-dark"
                      : active
                        ? "text-ink"
                        : "text-ash hover:text-violet",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 origin-left transition-transform duration-300 ease-[var(--ease-calm)]",
                      // Gold underline on the dark bar; on the pale bar gold is
                      // too light to register, so the active marker is violet.
                      dark ? "rule-gold" : "rule-violet",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <Action
              href="/contact"
              variant={dark ? "header-dark" : "header-light"}
              className="px-5 py-3 text-xs"
            >
              Book a Consultation
            </Action>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "cursor-pointer rounded-lg p-1 lg:hidden",
              dark ? "text-on-dark" : "text-ink",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </Shell>
        <nav
          id="mobile-nav"
          aria-label="Main (mobile)"
          inert={!open}
          className={cn("disclosure lg:hidden", open && "pointer-events-auto")}
          data-open={open}
        >
          <div>
            <div
              className={cn("mt-3.5 border-t", dark ? "border-hairline-dark" : "border-hairline")}
            >
              <Shell className="flex flex-col py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "border-b py-4 text-sm transition-colors duration-300",
                      dark
                        ? "border-hairline-dark text-on-dark-muted hover:text-gold-soft aria-[current=page]:text-on-dark"
                        : "border-hairline text-ash hover:text-violet aria-[current=page]:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <Action
                  href="/contact"
                  variant={dark ? "header-dark" : "header-light"}
                  className="mt-6"
                >
                  Book a Consultation
                </Action>
              </Shell>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}