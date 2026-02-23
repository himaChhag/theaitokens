import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://theaitokens.com"),
  title: "theaitokens — Token Counter & Cost Calculator",
  description: "Accurate token counts with provider-native counters + verified pricing.",
  keywords: "AI tokens, token counter, cost calculator, OpenAI pricing, Claude pricing, Gemini pricing, GPT-4 cost, AI API pricing",
  authors: [{ name: "The AI Tokens" }],
  creator: "The AI Tokens",
  publisher: "The AI Tokens",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaitokens.com",
    siteName: "The AI Tokens",
    title: "theaitokens — Token Counter & Cost Calculator",
    description: "Accurate token counts with provider-native counters + verified pricing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "theaitokens — Token Counter & Cost Calculator",
    description: "Accurate token counts with provider-native counters + verified pricing.",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The AI Tokens",
    url: "https://theaitokens.com",
    logo: "https://theaitokens.com/logo.svg",
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}