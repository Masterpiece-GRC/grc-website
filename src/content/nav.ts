/** Primary navigation — the five marketing pages agreed for this build. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-masterpiece", label: "Why Masterpiece" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Utility pages. Required in the footer by the blueprint but deliberately
 * excluded from the five marketing pages and from the main navigation.
 */
export const LEGAL_NAV = [
  { href: "/privacy-notice", label: "Privacy Notice" },
  { href: "/cookie-notice", label: "Cookie Notice" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/accessibility-statement", label: "Accessibility Statement" },
] as const;
