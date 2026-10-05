"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import {
  contactPreferenceOptions,
  enquiryServiceOptions,
  MIN_FILL_SECONDS,
  sectorOptions,
  timeframeOptions,
} from "@/content/contact";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Server-side validation, anti-spam, and delivery of the enquiry form — one
 * path instead of two. This used to validate here and send email through a
 * separate /api route with its own field names and its own crude in-memory
 * rate limiter; the two had drifted apart (different field names entirely)
 * to the point that submitting the real form never sent an email at all.
 * Consolidated: a Server Action can call Resend directly, so there is no
 * reason for a second network hop through an API route to do it.
 *
 * Every field is validated again here regardless of what the browser did:
 * client-side constraints are a convenience for the visitor, never a control.
 * Only the information needed to answer the enquiry is collected, and the
 * optional marketing consent is captured as a separate field with its own
 * default of "off" so it is never bundled into the enquiry's lawful basis.
 */

const RESEND_API_KEY = process.env["RESEND_API_KEY"];
const ENQUIRY_RECIPIENT = process.env["ENQUIRY_RECIPIENT"] ?? "info@masterpiecegrcconsulting.com";
// Must be an address on a domain verified with Resend — an unverified
// sender fails at send time, not at build time, so this is worth checking
// directly in the Resend dashboard if enquiries silently stop arriving.
const ENQUIRY_SENDER = "Masterpiece GRC Consulting <info@masterpiecegrcconsulting.com>";

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables.");
}

const resend = new Resend(RESEND_API_KEY);

const trimmed = (max: number) => z.string().trim().max(max);

const EnquirySchema = z.object({
  fullName: trimmed(80).min(2, "Enter your full name."),
  email: trimmed(120).pipe(z.string().email("Enter a valid email address.")),
  telephone: trimmed(32)
    .regex(/^[0-9+()\-.\s]*$/u, "Use digits, spaces and the characters + ( ) - only.")
    .optional()
    .default(""),
  organisation: trimmed(120).min(2, "Enter your organisation's name."),
  role: trimmed(80).optional().default(""),
  sector: z.enum(sectorOptions, { message: "Select a sector." }),
  service: z.enum(enquiryServiceOptions as unknown as [string, ...string[]], {
    message: "Select the area you would like to discuss.",
  }),
  contactPreference: z.union([z.enum(contactPreferenceOptions), z.literal("")]),
  timeframe: z.union([z.enum(timeframeOptions), z.literal("")]),
  message: trimmed(2000).min(20, "Please give us at least a sentence or two of context."),
  privacyAck: z.literal("on", {
    message: "Please confirm you have read the Privacy Notice so we can respond to you.",
  }),
  marketingOptIn: z.literal("on").optional(),
});

export type EnquiryState = {
  status: "idle" | "error";
  /** Field-level messages, keyed by input name. */
  errors?: Record<string, string[]>;
  /** A single message covering the whole form. */
  formError?: string;
};

// initialEnquiryState moved to ./enquiry-state.ts — a "use server" file may
// only export async functions, and a plain object export (this was one)
// breaks that rule. See enquiry-state.ts for the fix and why it's separate.

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  /* ---- Anti-spam: honeypot ---- */
  // A field hidden from sight and from assistive technology. Real visitors
  // never fill it in; naive bots fill every input they find.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "error", formError: "This enquiry could not be submitted." };
  }

  /* ---- Anti-spam: minimum completion time ---- */
  const renderedAt = Number(formData.get("renderedAt"));
  if (
    Number.isFinite(renderedAt) &&
    renderedAt > 0 &&
    Date.now() - renderedAt < MIN_FILL_SECONDS * 1000
  ) {
    return {
      status: "error",
      formError: "That was submitted unusually quickly. Please review the form and try again.",
    };
  }

  /* ---- Anti-spam: rate limit per hashed client ---- */
  // This replaces the separate in-memory Map that lived in the old /api
  // route — same job, one implementation instead of two that could disagree
  // with each other about who's been rate-limited.
  const headerList = await headers();
  const key = clientKey(headerList.get("x-forwarded-for"), headerList.get("x-real-ip"));
  const limit = checkRateLimit(key);

  if (!limit.allowed) {
    return {
      status: "error",
      formError:
        "Several enquiries have already been sent from this connection. Please try again shortly.",
    };
  }

  /* ---- Validation ---- */
  const parsed = EnquirySchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    telephone: formData.get("telephone") ?? "",
    organisation: formData.get("organisation") ?? "",
    role: formData.get("role") ?? "",
    sector: formData.get("sector") ?? "",
    service: formData.get("service") ?? "",
    contactPreference: formData.get("contactPreference") ?? "",
    timeframe: formData.get("timeframe") ?? "",
    message: formData.get("message") ?? "",
    privacyAck: formData.get("privacyAck") ?? "",
    marketingOptIn: formData.get("marketingOptIn") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: z.flattenError(parsed.error).fieldErrors as Record<string, string[]>,
      formError: "Please correct the highlighted fields.",
    };
  }

  const data = parsed.data;

  /* ---- Send ---- */
  try {
    await resend.emails.send({
      from: ENQUIRY_SENDER,
      to: ENQUIRY_RECIPIENT,
      replyTo: data.email,
      subject: `Enquiry from ${data.fullName} (${data.organisation})`,
      text: [
        `Full name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Telephone: ${data.telephone || "Not provided"}`,
        `Organisation: ${data.organisation}`,
        `Role: ${data.role || "Not provided"}`,
        `Sector: ${data.sector}`,
        `Area to discuss: ${data.service}`,
        `Contact preference: ${data.contactPreference || "No preference"}`,
        `Timeframe: ${data.timeframe || "Not specified"}`,
        `Marketing opt-in: ${data.marketingOptIn === "on" ? "Yes" : "No"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch (err) {
    // A Resend failure (bad API key, unverified sender domain, their service
    // being down) must not look like a successful submission to the visitor
    // — surface it as a form error instead of silently redirecting anyway.
    console.error("Enquiry email send failed:", err);
    return {
      status: "error",
      formError:
        "We could not send your enquiry just now. Please try again shortly, or email us directly.",
    };
  }

  redirect("/thank-you");
}