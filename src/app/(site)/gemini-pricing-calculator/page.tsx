import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Gemini Pricing Calculator - Google AI API Cost Estimator | The AI Tokens",
  description: "Calculate Google Gemini API costs for Pro, Flash, and all variants. Accurate token counting with verified Google AI pricing rates.",
  alternates: { canonical: "/gemini-pricing-calculator" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gemini Pricing Calculator - Google AI API Cost Estimator",
    description: "Calculate Google Gemini API costs for Pro, Flash, and all variants. Accurate token counting with verified Google AI pricing rates.",
    url: "/gemini-pricing-calculator",
    type: "website",
  },
};

export default function GeminiPricingCalculatorPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Gemini Pricing Calculator</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate exact costs for all Google Gemini models including Pro, Flash, and specialized variants. 
            Uses Google's native tokenizer and official pricing rates for accurate cost estimation.
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