import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import { modelsByProvider } from "@/lib/catalog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Together AI Models - Token Counter & Cost Calculator | The AI Tokens",
  description: "Calculate token usage and API costs for Together AI's open-source models including Llama 3, Mixtral, Nous Hermes, and RedPajama. Get accurate pricing estimates.",
  alternates: { canonical: "/together" },
  openGraph: {
    title: "Together AI Models - Token Counter & Cost Calculator",
    description: "Calculate token usage and API costs for Together AI's open-source models including Llama 3, Mixtral, Nous Hermes, and RedPajama. Get accurate pricing estimates.",
    url: "/together",
    type: "website",
  },
};

export default function TogetherPage() {
  const togetherModels = modelsByProvider("together");

  return (
    <main style={{ 
      minHeight: "calc(100vh - 140px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Container>
        <div style={{ 
          padding: "32px 0 20px",
          textAlign: "center",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <h1 style={{ 
            fontSize: 36, 
            margin: 0,
            background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -0.5
          }}>
            Together AI Models - Token Counter & Cost Calculator
          </h1>
          <p style={{ 
            marginTop: 16, 
            color: "#64748b", 
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "16px auto 0"
          }}>
            Calculate token usage and API costs for Together AI's open-source model hosting platform. 
            Get accurate pricing estimates for Llama, Mixtral, and other popular open-source models.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <h2 style={{ 
              marginTop: 0, 
              marginBottom: 20,
              color: "#0F172A", 
              fontSize: 24, 
              fontWeight: 700 
            }}>
              Available Together AI Models
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: 16 
            }}>
              {togetherModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/together/${model.slug}`}
                  style={{
                    textDecoration: "none",
                    padding: 20,
                    background: "rgba(56, 189, 248, 0.05)",
                    border: "1px solid rgba(56, 189, 248, 0.1)",
                    borderRadius: 12,
                    display: "block",
                    transition: "all 0.2s ease"
                  }}
                >
                  <h3 style={{ 
                    margin: "0 0 8px 0", 
                    color: "#1E3A8A", 
                    fontSize: 18, 
                    fontWeight: 600 
                  }}>
                    {model.name}
                  </h3>
                  <p style={{ 
                    color: "#64748b", 
                    fontSize: 14, 
                    lineHeight: 1.4, 
                    margin: "0 0 12px 0" 
                  }}>
                    Context: {model.contextWindow} tokens
                  </p>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    <span style={{ color: "#059669" }}>
                      Input: ${model.pricingBands[0].inputPer1M}/1M
                    </span>
                    <span style={{ color: "#dc2626" }}>
                      Output: ${model.pricingBands[0].outputPer1M}/1M
                    </span>
                  </div>
                  {model.notes && (
                    <p style={{ 
                      color: "#6b7280", 
                      fontSize: 12, 
                      margin: "8px 0 0 0",
                      fontStyle: "italic"
                    }}>
                      {model.notes}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <Sidebar />
        </div>
      </Container>
    </main>
  );
}