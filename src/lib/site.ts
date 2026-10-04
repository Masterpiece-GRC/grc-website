/**
 * Site-wide constants.
 *
 * The canonical origin comes from the environment, never from source, so the
 * same build can be promoted between environments. Set NEXT_PUBLIC_SITE_URL to
 * the approved production domain before launch — canonical URLs, the sitemap,
 * robots.txt and Open Graph images all derive from it.
 */
const FALLBACK_ORIGIN = "http://localhost:3000";

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  // Vercel-style preview deployments expose their own host.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return FALLBACK_ORIGIN;
}

export const siteUrl = resolveSiteUrl();

/** Customer-facing name. */
export const brandName = "Masterpiece GRC Consulting";

/** Legal entity name, used where the registered company must be identified. */
export const legalName = "Masterpiece GRC Consulting Limited";
export const companyNumber = "16957176";
export const registeredOffice = "71–75 Shelton Street, London, England, WC2H 9JQ";
export const businessTelephone = "07975 649404";
export const instagramHandle = "@masterpiecegrc";
export const instagramUrl = "https://www.instagram.com/masterpiecegrc/";
export const linkedInUrl = "https://www.linkedin.com/company/masterpiece-grc-consulting-limited/";
export const linkedInName = "Masterpiece GRC Consulting Limited";

export const brandDescription =
  "Masterpiece GRC Consulting helps growing and regulated organisations turn governance, risk, compliance and information security requirements into practical controls, credible evidence and confident decisions.";

/**
 * Enquiry destination. Held in the environment so the address is not published
 * in source control and can be changed without a code change.
 */
export const enquiryEmail =
  process.env.ENQUIRY_EMAIL?.trim() || "info@masterpiecegrcconsulting.com";

/**
 * Booking embed (Calendly / Microsoft Bookings). Left empty until the approved
 * account, availability, privacy settings and confirmation emails are
 * configured — the embed must not load before then.
 */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "";
