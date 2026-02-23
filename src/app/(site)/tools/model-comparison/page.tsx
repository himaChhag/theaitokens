import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import ModelComparison from "@/components/comparison/ModelComparison";
import { Suspense } from "react";
import LoadingFallback from "@/components/comparison/LoadingFallback";

export default function ModelComparisonPage() {
  return (
    <main>
      <Container>
        {/* Disclaimer */}
        <div
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            border: "1px solid #f59e0b",
            borderRadius: 12,
            padding: 16,
            marginTop: 22,
            marginBottom: 16,
          }}
        >
          <div style={{ fontWeight: 600, color: "#92400e", marginBottom: 6, fontSize: 14 }}>
            🔄 Model Comparison Tool
          </div>
          <div style={{ color: "#78350f", lineHeight: 1.4, fontSize: 13 }}>
            Compare up to 5 AI models side-by-side with the same prompt. Get token counts, costs, and performance metrics 
            to make informed decisions about which model works best for your use case.
          </div>
        </div>

        <div style={{ padding: "0 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>AI Model Comparison</h1>
          <p style={{ marginTop: 8, opacity: 0.8 }}>
            Compare multiple AI models side-by-side with the same prompt to find the best option for your needs.
          </p>
        </div>
        
        <div style={{ display: "grid", gap: 14 }}>
          <Suspense fallback={<LoadingFallback />}>
            <ModelComparison />
          </Suspense>
          <Sidebar />
        </div>
      </Container>
    </main>
  );
}

export const metadata = {
  title: "AI Model Comparison Tool - Compare Multiple Models Side-by-Side",
  description: "Compare up to 5 AI models simultaneously with the same prompt. Get token counts, costs, and performance metrics from OpenAI, Anthropic, Google, and more.",
  keywords: "AI model comparison, compare AI models, OpenAI vs Anthropic, GPT vs Claude, model performance comparison, AI cost comparison, token count comparison",
  openGraph: {
    title: "AI Model Comparison Tool - Compare Multiple Models Side-by-Side",
    description: "Compare up to 5 AI models simultaneously with the same prompt. Get token counts, costs, and performance metrics from OpenAI, Anthropic, Google, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Model Comparison Tool - Compare Multiple Models Side-by-Side",
    description: "Compare up to 5 AI models simultaneously with the same prompt. Get token counts, costs, and performance metrics.",
  },
};