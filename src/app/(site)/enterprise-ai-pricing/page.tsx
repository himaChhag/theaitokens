import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Enterprise AI Pricing - Large Scale LLM Cost Calculator | The AI Tokens",
  description: "Calculate enterprise AI costs at scale. Estimate pricing for high-volume usage across OpenAI, Claude, Gemini with bulk pricing considerations.",
  alternates: { canonical: "/enterprise-ai-pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Enterprise AI Pricing - Large Scale LLM Cost Calculator",
    description: "Calculate enterprise AI costs at scale. Estimate pricing for high-volume usage across OpenAI, Claude, Gemini with bulk pricing considerations.",
    url: "/enterprise-ai-pricing",
    type: "website",
  },
};

export default function EnterpriseAIPricingPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Enterprise AI Pricing</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate AI costs for enterprise-scale deployments. Estimate pricing for high-volume usage across all major providers 
            with considerations for bulk pricing, volume discounts, and enterprise-specific features.
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