import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Chatbot AI Pricing - Calculate Conversational AI Costs | The AI Tokens",
  description: "Calculate AI costs for chatbots and conversational applications. Estimate pricing for customer service, support bots using GPT, Claude, Gemini.",
  alternates: { canonical: "/chatbot-ai-pricing" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Chatbot AI Pricing - Calculate Conversational AI Costs",
    description: "Calculate AI costs for chatbots and conversational applications. Estimate pricing for customer service, support bots using GPT, Claude, Gemini.",
    url: "/chatbot-ai-pricing",
    type: "website",
  },
};

export default function ChatbotAIPricingPage() {
  return (
    <main>
      <Container>
        <div style={{ padding: "22px 0 10px" }}>
          <h1 style={{ fontSize: 30, margin: 0 }}>Chatbot AI Pricing</h1>
          <p style={{ marginTop: 8, opacity: 0.8, maxWidth: 860 }}>
            Calculate AI costs for chatbot and conversational applications. Estimate pricing for customer service bots, 
            support assistants, and interactive AI using models from OpenAI, Anthropic, and Google.
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