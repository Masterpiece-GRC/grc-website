import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.1 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3.5 8.7h3.2v11.8H3.5V8.7Zm5.2 0h3.1v1.6h.1c.5-.9 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1v6.1h-3.2V15c0-1.3 0-3.1-1.9-3.1-2 0-2.3 1.5-2.3 3v5.6H8.7V8.7Z" />
    </svg>
  );
}
