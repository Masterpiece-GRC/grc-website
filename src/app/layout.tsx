import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.masterpiecegrcconsulting.com/"),

  title: "Masterpiece GRC Consulting | Governance, Risk & Compliance",

  description:
    "Masterpiece GRC Consulting helps growing and regulated organisations turn governance, risk, compliance and information security requirements into practical controls, credible evidence and confident decisions.",

  keywords: [
    "GRC consulting UK",
    "GRC consultancy UK",
    "governance risk compliance UK",
    "business GRC consulting UK",
    "cybersecurity GRC consulting UK",
    "information security consulting UK",
    "information security governance UK",
    "security governance consulting UK",
    "ISO 27001 consultants UK",
    "ISO 27001 consultancy UK",
    "ISO 27001 compliance UK",
    "ISO 27001 implementation UK",
    "ISO 27001 readiness consulting UK",
    "ISO 27001 certification consulting UK",
    "risk management consulting UK",
    "cyber risk consulting UK",
    "information security risk consulting UK",
    "compliance consulting UK",
    "cybersecurity compliance consulting UK",
    "security compliance consultancy UK",
    "IT risk and compliance UK",
    "technology risk consulting UK",
    "cyber governance consulting UK",
    "cyber risk and compliance UK",
    "security risk assessment UK",
    "information security risk assessment UK",
    "security audit readiness UK",
    "compliance audit readiness UK",
    "ISO audit readiness UK",
    "cybersecurity audit consulting UK",
    "information security audit consulting UK",
    "security assurance consulting UK",
    "cybersecurity assurance UK",
    "supplier assurance UK",
    "third party risk management UK",
    "third party security risk UK",
    "supplier risk management UK",
    "vendor risk management UK",
    "cybersecurity supplier assurance UK",
    "security controls consulting UK",
    "information security controls UK",
    "security controls implementation UK",
    "GRC consulting London",
    "ISO 27001 consultants London",
    "cybersecurity GRC London",
    "information security consulting London",
    "GRC consulting Manchester",
    "ISO 27001 consultants Manchester",
    "cybersecurity GRC Manchester",
    "information security consulting Manchester",
    "GRC consulting Birmingham",
    "ISO 27001 consultants Birmingham",
    "cybersecurity GRC Birmingham",
    "information security consulting Birmingham",
    "UK cyber security governance consultants",
    "UK risk compliance and security consultants",
    "UK governance risk compliance services",
    "UK information security consultancy",
    "UK cyber risk consultancy",
    "UK security assurance consultancy",
    "UK compliance and risk consultancy",
    "UK GRC services",
  ],

  openGraph: {
    title: "Masterpiece GRC Consulting | Governance, Risk & Compliance",
    description:
      "Practical governance, risk, compliance and information security consulting for growing and regulated organisations.",
    url: "https://www.masterpiecegrcconsulting.com",
    siteName: "Masterpiece GRC Consulting",
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Masterpiece GRC Consulting | Governance, Risk & Compliance",
    description:
      "Practical governance, risk, compliance and information security consulting for growing and regulated organisations.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}