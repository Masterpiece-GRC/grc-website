import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Masterpiece GRC Consulting | Start a Conversation",
  description:
    "Describe the governance, risk, compliance or information security problem you are dealing with and we will identify an appropriate next step.",
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
