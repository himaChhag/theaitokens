import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "theaitokens — Token Counter & Cost Calculator",
  description:
    "Accurate token counts with provider-native counters + verified pricing.",
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