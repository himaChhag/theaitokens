import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WebVitals from "@/components/analytics/WebVitals";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://theaitokens.com"),
  title: "theaitokens — Token Counter & Cost Calculator",
  description:
    "Accurate token counts with provider-native counters + verified pricing.",
  keywords:
    "AI tokens, token counter, cost calculator, OpenAI pricing, Claude pricing, Gemini pricing, GPT-4 cost, AI API pricing, GPT-5 pricing, Anthropic pricing, xAI Grok pricing, Meta Llama pricing",
  authors: [{ name: "The AI Tokens" }],
  creator: "The AI Tokens",
  publisher: "The AI Tokens",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://theaitokens.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theaitokens.com",
    siteName: "The AI Tokens",
    title: "theaitokens — Token Counter & Cost Calculator",
    description:
      "Calculate AI token costs and compare pricing across 45+ models from 9 major providers. Free token counter and cost calculator.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Token Counter and Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "theaitokens — Token Counter & Cost Calculator",
    description:
      "Calculate AI token costs and compare pricing across 45+ models from 9 major providers. Free token counter and cost calculator.",
    images: ["/og-image.png"],
    creator: "@theaitokens",
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
    description:
      "Comprehensive AI token counter and cost calculator for all major AI providers including OpenAI, Anthropic, Google, and more.",
    sameAs: ["https://github.com/theaitokens"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The AI Tokens",
    url: "https://theaitokens.com",
    description:
      "Calculate AI token costs and compare pricing across 45+ models from 9 major providers. Free token counter and cost calculator.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://theaitokens.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Token Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free AI token counter and cost calculator supporting OpenAI GPT, Anthropic Claude, Google Gemini, and 6 other major AI providers.",
    featureList: [
      "Token counting for 45+ AI models",
      "Real-time cost calculation",
      "Provider comparison tools",
      "Budget planning features",
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1E3A8A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Tokens" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.theaitokens.com" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" type="image/png" />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <>
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${process.env.NEXT_PUBLIC_ADSENSE_ID}",
                    enable_page_level_ads: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {/* Enhanced Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationJsonLd),
          }}
        />

        <Header />
        {children}
        <Footer />
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
