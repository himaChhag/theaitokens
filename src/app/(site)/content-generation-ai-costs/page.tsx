import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Content Generation AI Costs - Writing & Content Creation Pricing | The AI Tokens",
  description: "Calculate AI costs for content generation and writing. Estimate pricing for blog posts, articles, marketing copy using GPT, Claude, Gemini.",
  alternates: { canonical: "/content-generation-ai-costs" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Content Generation AI Costs - Writing & Content Creation Pricing",
    description: "Calculate AI costs for content generation and writing. Estimate pricing for blog posts, articles, marketing copy using GPT, Claude, Gemini.",
    url: "/content-generation-ai-costs",
    type: "website",
  },
};

export default function ContentGenerationAICostsPage() {
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
            Content Generation AI Costs
          </h1>
          <p style={{ 
            marginTop: 12, 
            opacity: 0.8, 
            maxWidth: 860,
            lineHeight: 1.6,
            color: "#64748b"
          }}>
            Calculate AI costs for content generation and writing applications. Estimate pricing for blog posts, articles, 
            marketing copy, and creative writing using models from OpenAI, Anthropic, and Google.
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