import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "LLM Pricing Comparison - Compare AI Model Costs | The AI Tokens",
  description: "Compare pricing across all major LLM providers. Side-by-side cost analysis for OpenAI, Anthropic, Google, and more with real-time calculations.",
  alternates: { canonical: "/llm-pricing-comparison" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "LLM Pricing Comparison - Compare AI Model Costs",
    description: "Compare pricing across all major LLM providers. Side-by-side cost analysis for OpenAI, Anthropic, Google, and more with real-time calculations.",
    url: "/llm-pricing-comparison",
    type: "website",
  },
};

export default function LLMPricingComparisonPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>LLM Pricing Comparison</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Compare costs across all major language model providers in real-time. 
            Get side-by-side pricing analysis for OpenAI, Anthropic, Google, and more with accurate token counting.
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