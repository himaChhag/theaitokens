import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Claude Pricing Calculator - Anthropic API Cost Estimator | The AI Tokens",
  description: "Calculate Claude API costs for Opus, Sonnet, and Haiku models. Accurate token counting with verified Anthropic pricing rates.",
  alternates: { canonical: "/claude-pricing-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Claude Pricing Calculator - Anthropic API Cost Estimator",
    description: "Calculate Claude API costs for Opus, Sonnet, and Haiku models. Accurate token counting with verified Anthropic pricing rates.",
    url: "/claude-pricing-calculator",
    type: "website",
  },
};

export default function ClaudePricingCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Claude Pricing Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate exact costs for all Claude models including Opus, Sonnet, and Haiku variants. 
            Uses Anthropic's native tokenizer and official pricing rates for precise cost estimation.
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