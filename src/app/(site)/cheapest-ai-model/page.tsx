import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Cheapest AI Model - Find Most Cost-Effective LLM | The AI Tokens",
  description: "Find the cheapest AI model for your needs. Compare costs across OpenAI, Claude, Gemini to identify the most cost-effective language model.",
  alternates: { canonical: "/cheapest-ai-model" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Cheapest AI Model - Find Most Cost-Effective LLM",
    description: "Find the cheapest AI model for your needs. Compare costs across OpenAI, Claude, Gemini to identify the most cost-effective language model.",
    url: "/cheapest-ai-model",
    type: "website",
  },
};

export default function CheapestAIModelPage() {
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
            Cheapest AI Model
          </h1>
          <p style={{ 
            marginTop: 12, 
            opacity: 0.8, 
            maxWidth: 860,
            lineHeight: 1.6,
            color: "#64748b"
          }}>
            Find the most cost-effective AI model for your specific use case. Compare pricing across all major providers 
            to identify the cheapest option that meets your quality and performance requirements.
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