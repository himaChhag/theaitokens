import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI Pricing Calculator - Compare Costs Across All Models | The AI Tokens",
  description: "Calculate AI model costs instantly. Compare pricing for OpenAI GPT-4, Claude, Gemini, and more. Get accurate token counts and cost estimates.",
  alternates: { canonical: "/ai-pricing-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Pricing Calculator - Compare Costs Across All Models",
    description: "Calculate AI model costs instantly. Compare pricing for OpenAI GPT-4, Claude, Gemini, and more. Get accurate token counts and cost estimates.",
    url: "/ai-pricing-calculator",
    type: "website",
  },
};

export default function AIPricingCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI Pricing Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Compare costs across all major AI models including OpenAI GPT-4, Claude, and Gemini. 
            Get instant token counts and accurate pricing estimates using verified rates from official sources.
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