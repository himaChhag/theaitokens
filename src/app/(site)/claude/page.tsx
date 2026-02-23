import Link from "next/link";
import { modelsByProvider } from "@/lib/catalog";
import ModelCard from "@/components/provider/ModelCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthropic Claude Models Pricing & Token Costs | AI Tokens",
  description: "Complete pricing guide for all Anthropic Claude models including Claude 3.5 Sonnet, Claude 3 Opus, and Haiku. Compare costs, token limits, and capabilities.",
  openGraph: {
    title: "Anthropic Claude Models Pricing & Token Costs",
    description: "Complete pricing guide for all Anthropic Claude models including Claude 3.5 Sonnet, Claude 3 Opus, and Haiku. Compare costs, token limits, and capabilities.",
    url: "https://theaitokens.com/claude",
  },
};

const card = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
};

export default function ClaudePage() {
  const models = modelsByProvider("anthropic");

  return (
    <div style={{
      maxWidth: 980,
      margin: "0 auto",
      padding: "40px 20px"
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        marginBottom: 48
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 800,
          background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 16,
          lineHeight: 1.1
        }}>
          Anthropic Claude Models
        </h1>
        <p style={{
          fontSize: 20,
          color: "#64748b",
          lineHeight: 1.6,
          maxWidth: 600,
          margin: "0 auto"
        }}>
          Complete pricing guide and token costs for all Anthropic Claude models including Claude 3.5 Sonnet, Opus, and Haiku variants.
        </p>
      </div>

      {/* Provider Overview */}
      <div style={card}>
        <h2 style={{
          marginTop: 0,
          color: "#0F172A",
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 16
        }}>
          About Anthropic Claude Models
        </h2>
        <p style={{
          color: "#64748b",
          fontSize: 16,
          lineHeight: 1.6,
          marginBottom: 16
        }}>
          Anthropic's Claude models are designed with a focus on safety, helpfulness, and harmlessness. The Claude 3 family offers 
          three distinct models - Opus for maximum intelligence, Sonnet for balanced performance, and Haiku for speed and efficiency.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 16,
          marginTop: 20
        }}>
          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.05)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.1)"
          }}>
            <h3 style={{
              margin: "0 0 8px 0",
              fontSize: 16,
              fontWeight: 600,
              color: "#1E3A8A"
            }}>
              🛡️ Safety First
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Built with Constitutional AI for helpful, harmless, and honest responses
            </p>
          </div>
          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.03)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.08)"
          }}>
            <h3 style={{
              margin: "0 0 8px 0",
              fontSize: 16,
              fontWeight: 600,
              color: "#0F172A"
            }}>
              📚 Long Context
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Handle large documents and complex conversations with extended context windows
            </p>
          </div>
          <div style={{
            padding: 16,
            background: "rgba(56, 189, 248, 0.02)",
            borderRadius: 8,
            border: "1px solid rgba(56, 189, 248, 0.06)"
          }}>
            <h3 style={{
              margin: "0 0 8px 0",
              fontSize: 16,
              fontWeight: 600,
              color: "#64748b"
            }}>
              ⚡ Three Tiers
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Opus for intelligence, Sonnet for balance, Haiku for speed and efficiency
            </p>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div style={{ marginTop: 48 }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#0F172A",
          marginBottom: 24,
          textAlign: "center"
        }}>
          All Anthropic Claude Models
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24
        }}>
          {models.map((model) => (
            <ModelCard key={model.slug} model={model} provider="anthropic" />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div style={{
        ...card,
        marginTop: 48,
        textAlign: "center"
      }}>
        <h2 style={{
          marginTop: 0,
          color: "#0F172A",
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 16
        }}>
          Helpful Resources
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          <Link href="/tools/cost-calculator" style={{
            padding: "8px 16px",
            background: "rgba(56, 189, 248, 0.1)",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: "#1E3A8A",
            textDecoration: "none",
            border: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            AI Cost Calculator
          </Link>
          <Link href="/tools/token-counter" style={{
            padding: "8px 16px",
            background: "rgba(56, 189, 248, 0.1)",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: "#1E3A8A",
            textDecoration: "none",
            border: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            Token Counter
          </Link>
          <Link href="/compare/gpt-4o-vs-claude-sonnet" style={{
            padding: "8px 16px",
            background: "rgba(56, 189, 248, 0.1)",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            color: "#1E3A8A",
            textDecoration: "none",
            border: "1px solid rgba(56, 189, 248, 0.2)"
          }}>
            Compare Models
          </Link>
        </div>
      </div>
    </div>
  );
}