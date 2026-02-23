import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "OpenAI Pricing Calculator - GPT-4, GPT-3.5 Cost Estimator | The AI Tokens",
  description: "Calculate OpenAI API costs for GPT-4, GPT-4o, GPT-3.5 and all models. Accurate token counting with verified pricing from OpenAI's official rates.",
  alternates: { canonical: "/openai-pricing-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "OpenAI Pricing Calculator - GPT-4, GPT-3.5 Cost Estimator",
    description: "Calculate OpenAI API costs for GPT-4, GPT-4o, GPT-3.5 and all models. Accurate token counting with verified pricing from OpenAI's official rates.",
    url: "/openai-pricing-calculator",
    type: "website",
  },
};

export default function OpenAIPricingCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>OpenAI Pricing Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate exact costs for all OpenAI models including GPT-4, GPT-4o, GPT-3.5, and specialized variants. 
            Uses OpenAI's native tokenizer and official pricing rates for maximum accuracy.
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