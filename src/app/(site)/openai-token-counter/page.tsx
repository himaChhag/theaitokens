import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "OpenAI Token Counter - GPT-4, GPT-3.5 Token Calculator | The AI Tokens",
  description: "Count tokens for OpenAI models with precision. Official GPT-4, GPT-4o, GPT-3.5 tokenizer with accurate counts and cost estimates.",
  alternates: { canonical: "/openai-token-counter" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "OpenAI Token Counter - GPT-4, GPT-3.5 Token Calculator",
    description: "Count tokens for OpenAI models with precision. Official GPT-4, GPT-4o, GPT-3.5 tokenizer with accurate counts and cost estimates.",
    url: "/openai-token-counter",
    type: "website",
  },
};

export default function OpenAITokenCounterPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>OpenAI Token Counter</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Count tokens for all OpenAI models using the official tokenizer. Get precise token counts for GPT-4, GPT-4o, GPT-3.5, 
            and all variants with real-time cost calculations based on verified OpenAI pricing.
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