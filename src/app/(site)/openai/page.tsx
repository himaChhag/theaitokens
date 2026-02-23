import Link from "next/link";
import { modelsByProvider } from "@/lib/catalog";
import ModelCard from "@/components/provider/ModelCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenAI Models Pricing & Token Costs | AI Tokens",
  description: "Complete pricing guide for all OpenAI models including GPT-4, GPT-3.5, and more. Compare costs, token limits, and find the best model for your needs.",
  openGraph: {
    title: "OpenAI Models Pricing & Token Costs",
    description: "Complete pricing guide for all OpenAI models including GPT-4, GPT-3.5, and more. Compare costs, token limits, and find the best model for your needs.",
    url: "https://theaitokens.com/openai",
  },
};

const card = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
};

export default function OpenAIPage() {
  const models = modelsByProvider("openai");

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
          OpenAI Models
        </h1>
        <p style={{
          fontSize: 20,
          color: "#64748b",
          lineHeight: 1.6,
          maxWidth: 600,
          margin: "0 auto"
        }}>
          Complete pricing guide and token costs for all OpenAI models including GPT-4, GPT-3.5, and specialized variants.
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
          About OpenAI Models
        </h2>
        <p style={{
          color: "#64748b",
          fontSize: 16,
          lineHeight: 1.6,
          marginBottom: 16
        }}>
          OpenAI offers some of the most advanced language models available today, from the powerful GPT-4 series to the cost-effective GPT-3.5 models. 
          These models excel at reasoning, code generation, creative writing, and complex problem-solving tasks.
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
              🧠 Advanced Reasoning
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              GPT-4 models provide exceptional reasoning capabilities for complex problem-solving
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
              💻 Code Generation
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Excellent at writing, debugging, and explaining code across multiple languages
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
              ⚡ Multiple Variants
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              From cost-effective GPT-3.5 to premium GPT-4 models for different use cases
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
          All OpenAI Models
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24
        }}>
          {models.map((model) => (
            <ModelCard key={model.slug} model={model} provider="openai" />
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