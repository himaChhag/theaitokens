import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI API Cost Calculator - Estimate LLM API Expenses | The AI Tokens",
  description: "Calculate AI API costs for your applications. Estimate expenses for OpenAI, Anthropic, Google APIs with accurate token counting and verified pricing.",
  alternates: { canonical: "/ai-api-cost-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI API Cost Calculator - Estimate LLM API Expenses",
    description: "Calculate AI API costs for your applications. Estimate expenses for OpenAI, Anthropic, Google APIs with accurate token counting and verified pricing.",
    url: "/ai-api-cost-calculator",
    type: "website",
  },
};

export default function AIAPICostCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI API Cost Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate API costs for your AI applications with precision. Estimate expenses across all major providers 
            including OpenAI, Anthropic, and Google with verified pricing and accurate token counting.
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