import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "GPT-4 Pricing Calculator - OpenAI GPT-4o Cost Estimator | The AI Tokens",
  description: "Calculate GPT-4 and GPT-4o API costs with precision. Accurate token counting using OpenAI's official tokenizer and verified pricing rates.",
  alternates: { canonical: "/gpt-4-pricing-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GPT-4 Pricing Calculator - OpenAI GPT-4o Cost Estimator",
    description: "Calculate GPT-4 and GPT-4o API costs with precision. Accurate token counting using OpenAI's official tokenizer and verified pricing rates.",
    url: "/gpt-4-pricing-calculator",
    type: "website",
  },
};

export default function GPT4PricingCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ 
            fontSize: 30, 
            margin: 0, 
            color: "#0F172A",
            fontWeight: 700,
            letterSpacing: -0.5
          }}>
            GPT-4 Pricing Calculator
          </h1>
          <p style={{ 
            marginTop: 12, 
            opacity: 0.8, 
            maxWidth: 860,
            lineHeight: 1.6,
            color: "#64748b"
          }}>
            Calculate exact costs for GPT-4, GPT-4o, and all variants with precision. 
            Uses OpenAI's official tokenizer and verified pricing rates for the most accurate cost estimates available.
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