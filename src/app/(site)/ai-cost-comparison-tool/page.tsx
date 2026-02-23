import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "AI Cost Comparison Tool - Compare LLM Pricing | The AI Tokens",
  description: "Compare AI model costs side-by-side with our comprehensive comparison tool. Analyze pricing for OpenAI, Claude, Gemini, and more in real-time.",
  alternates: { canonical: "/ai-cost-comparison-tool" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Cost Comparison Tool - Compare LLM Pricing",
    description: "Compare AI model costs side-by-side with our comprehensive comparison tool. Analyze pricing for OpenAI, Claude, Gemini, and more in real-time.",
    url: "/ai-cost-comparison-tool",
    type: "website",
  },
};

export default function AICostComparisonToolPage() {
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
            AI Cost Comparison Tool
          </h1>
          <p style={{ 
            marginTop: 12, 
            opacity: 0.8, 
            maxWidth: 860,
            lineHeight: 1.6,
            color: "#64748b"
          }}>
            Compare AI model costs side-by-side with real-time calculations. Analyze pricing differences across all major providers 
            and find the best value for your specific use case and budget requirements.
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