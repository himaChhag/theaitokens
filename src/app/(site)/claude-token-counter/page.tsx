import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Claude Token Counter - Anthropic API Token Calculator | The AI Tokens",
  description: "Count tokens for Claude models with Anthropic's official tokenizer. Accurate counts for Opus, Sonnet, Haiku with real-time cost estimates.",
  alternates: { canonical: "/claude-token-counter" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Claude Token Counter - Anthropic API Token Calculator",
    description: "Count tokens for Claude models with Anthropic's official tokenizer. Accurate counts for Opus, Sonnet, Haiku with real-time cost estimates.",
    url: "/claude-token-counter",
    type: "website",
  },
};

export default function ClaudeTokenCounterPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Claude Token Counter</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Count tokens for all Claude models using Anthropic's native tokenizer. Get precise token counts for Opus, Sonnet, Haiku, 
            and all variants with accurate cost calculations based on official Anthropic pricing.
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