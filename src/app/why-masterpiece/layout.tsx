import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Masterpiece GRC Consulting | Evidence-Led Assurance",
  description:
    "Discover Masterpiece GRC Consulting’s practical, proportionate and evidence-led approach to governance, risk, compliance and security assurance.",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
