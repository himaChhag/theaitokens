import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "GPT Token Counter - GPT-4, GPT-3.5 Token Calculator | The AI Tokens",
  description: "Count GPT tokens with OpenAI's official tokenizer. Accurate token counts for GPT-4, GPT-4o, GPT-3.5 with real-time cost calculations.",
  alternates: { canonical: "/gpt-token-counter" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GPT Token Counter - GPT-4, GPT-3.5 Token Calculator",
    description: "Count GPT tokens with OpenAI's official tokenizer. Accurate token counts for GPT-4, GPT-4o, GPT-3.5 with real-time cost calculations.",
    url: "/gpt-token-counter",
    type: "website",
  },
};

export default function GPTTokenCounterPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>GPT Token Counter</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Count tokens for all GPT models using OpenAI's official tokenizer. Get precise token counts for GPT-4, GPT-4o, GPT-3.5, 
            and all variants with accurate cost calculations based on verified pricing.
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