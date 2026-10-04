import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GRC & Information Security Consulting Services | Masterpiece GRC",
  description:
    "Explore ISO 27001, security governance, risk, audit readiness, third-party risk, access governance and fractional security leadership services.",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
