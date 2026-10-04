import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Masterpiece GRC Consulting | Practical GRC Expertise",
  description:
    "Learn how Masterpiece GRC Consulting delivers practical, evidence-led governance, risk, compliance and information security support.",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
