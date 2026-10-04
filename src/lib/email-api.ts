import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env["RESEND_API_KEY"];

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set in environment variables.");
}

const resend = new Resend(RESEND_API_KEY);

const contacts = {
  "GRC": { label: "GRC Consulting", email: "info@masterpiecegrcconsulting.com" },
} as const;

type Service = keyof typeof contacts;

// crude in-memory rate limit — resets on redeploy, fine for low-traffic sites
const submissions = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string) {
  const now = Date.now();
  const last = submissions.get(ip) ?? 0;
  if (now - last < WINDOW_MS) return true;
  submissions.set(ip, now);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
    }

    const body = await req.json();
    const { fullname, email, organization, "job-title": jobTitle, phone, sector, "area of discussion": areaOfDiscussion, "how we can help": howWeCanHelp } = body;

    if (!fullname || !email || !organization || !sector || !areaOfDiscussion || !howWeCanHelp) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    // honeypot field — see form change below
    if (body.website) {
      return NextResponse.json({ ok: true }); // silently accept, don't send
    }

    const contact: { label: string; email: string } = contacts["GRC"];
    

    await resend.emails.send({
      from: "Masterpiece GRC Consulting <enquiries@masterpiecegrcconsulting.com>", // must be a verified domain address
      to: contact.email,
      replyTo: email,
      subject: `${contact.label} enquiry from ${fullname}`,
      text: `Full Name: ${fullname}\nEmail: ${email}\nOrganization: ${organization || "Not provided"}\nJob Title: ${jobTitle || "Not provided"}\nPhone: ${phone || "Not provided"}\nSector: ${sector || "Not provided"}\nArea of Discussion: ${areaOfDiscussion || "Not provided"}\nHow we can help: ${howWeCanHelp || "Not provided"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}