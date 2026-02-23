import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI Translation Pricing - Language Translation Cost Calculator | The AI Tokens",
  description: "Calculate AI translation costs for multilingual applications. Estimate pricing for language translation services using GPT, Claude, Gemini models.",
  alternates: { canonical: "/ai-translation-pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Translation Pricing - Language Translation Cost Calculator",
    description: "Calculate AI translation costs for multilingual applications. Estimate pricing for language translation services using GPT, Claude, Gemini models.",
    url: "/ai-translation-pricing",
    type: "website",
  },
};

export default function AITranslationPricingPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI Translation Pricing</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate AI costs for translation and multilingual applications. Estimate pricing for language translation services, 
            localization projects, and multilingual content using models from OpenAI, Anthropic, and Google.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <Estimator />
          <Sidebar />
        </div>
      </Container>
    </main>
  );
}