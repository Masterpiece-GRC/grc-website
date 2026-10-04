import { industries, serviceOptions } from "./site";

/**
 * Enquiry form options and copy.
 *
 * Shared by the client form and the server-side validator so the rendered
 * options and the accepted values can never drift apart — a mismatch would
 * either reject a legitimate submission or accept an unvalidated value.
 */

export const sectorOptions = [
  ...industries.map((sector) => sector.title),
  "Public sector or not-for-profit",
  "Other or not listed",
] as const;

export const enquiryServiceOptions = serviceOptions;

export const contactPreferenceOptions = [
  "Email",
  "Telephone",
  "Online video call",
] as const;

export const timeframeOptions = [
  "As soon as possible",
  "Within the next month",
  "Within the next three months",
  "Later this year",
  "Exploring options — no fixed date",
] as const;

/** Minimum seconds between the form rendering and a plausible human submission. */
export const MIN_FILL_SECONDS = 3;

export const privacyAcknowledgement =
  "I have read the Privacy Notice and understand how Masterpiece GRC Consulting will use the information in this enquiry to respond to it.";

export const marketingConsentLabel =
  "Optional: I would also like to receive occasional insights and updates by email. This is separate from my enquiry and I can withdraw it at any time.";
