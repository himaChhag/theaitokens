import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Gemini Token Counter - Google AI Token Calculator | The AI Tokens",
  description: "Count tokens for Google Gemini models with official tokenizer. Accurate counts for Pro, Flash, and all variants with cost estimates.",
  alternates: { canonical: "/gemini-token-counter" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gemini Token Counter - Google AI Token Calculator",
    description: "Count tokens for Google Gemini models with official tokenizer. Accurate counts for Pro, Flash, and all variants with cost estimates.",
    url: "/gemini-token-counter",
    type: "website",
  },
};

export default function GeminiTokenCounterPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Gemini Token Counter</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Count tokens for all Google Gemini models using the official tokenizer. Get precise token counts for Pro, Flash, 
            and all variants with real-time cost calculations based on verified Google AI pricing.
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