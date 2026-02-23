import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI Token Cost Estimator - Calculate LLM API Costs | The AI Tokens",
  description: "Estimate AI token costs across all major language models. Calculate input/output tokens and total API costs for GPT, Claude, Gemini, and more.",
  alternates: { canonical: "/ai-token-cost-estimator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Token Cost Estimator - Calculate LLM API Costs",
    description: "Estimate AI token costs across all major language models. Calculate input/output tokens and total API costs for GPT, Claude, Gemini, and more.",
    url: "/ai-token-cost-estimator",
    type: "website",
  },
};

export default function AITokenCostEstimatorPage() {
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
            AI Token Cost Estimator
          </h1>
          <p style={{ 
            marginTop: 12, 
            opacity: 0.8, 
            maxWidth: 860,
            lineHeight: 1.6,
            color: "#64748b"
          }}>
            Estimate token costs for any AI language model with precision. Calculate input and output tokens, 
            compare pricing across providers, and get accurate cost projections for your AI applications.
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