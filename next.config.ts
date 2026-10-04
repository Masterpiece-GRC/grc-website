import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 * The blueprint requires HTTPS, secure headers and no non-essential tracking,
 * so the CSP below allows only self-hosted assets plus the consultation-booking
 * embed origins, which are switched on with BOOKING_EMBED_ORIGIN once the
 * approved account exists.
 */
const bookingOrigin = process.env.NEXT_PUBLIC_BOOKING_EMBED_ORIGIN ?? "";

/*
 * `next dev` needs two allowances the built site does not, so they are scoped
 * to development and are absent from every production response:
 *  - 'unsafe-eval': React's development build calls eval() for debugging
 *    features such as reconstructing call stacks across environments, and the
 *    fast-refresh client evaluates hot updates the same way. The production
 *    build never does.
 *  - ws: / wss:: fast refresh talks to the dev server over a WebSocket.
 */
const dev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; 'unsafe-inline' is ignored by
  // browsers that honour the nonce/strict-dynamic pair but keeps older ones working.
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  `frame-src 'self'${bookingOrigin ? ` ${bookingOrigin}` : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Production only: over http://localhost this is ignored, but a dev server
  // reached over a LAN address would have its own assets upgraded and fail.
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
