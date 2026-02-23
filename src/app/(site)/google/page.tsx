import Link from "next/link";
import { modelsByProvider } from "@/lib/catalog";
import ModelCard from "@/components/provider/ModelCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Gemini Models Pricing & Token Costs | AI Tokens",
  description: "Complete pricing guide for all Google Gemini models including Gemini Pro, Flash, and specialized variants. Compare costs, token limits, and multimodal capabilities.",
  openGraph: {
    title: "Google Gemini Models Pricing & Token Costs",
    description: "Complete pricing guide for all Google Gemini models including Gemini Pro, Flash, and specialized variants. Compare costs, token limits, and multimodal capabilities.",
    url: "https://theaitokens.com/google",
  },
};

const card = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
};

export default function GooglePage() {
  const models = modelsByProvider("google");

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
          Google Gemini Models
        </h1>
        <p style={{
          fontSize: 20,
          color: "#64748b",
          lineHeight: 1.6,
          maxWidth: 600,
          margin: "0 auto"
        }}>
          Complete pricing guide and token costs for all Google Gemini models including Pro, Flash, and multimodal variants.
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
          About Google Gemini Models
        </h2>
        <p style={{
          color: "#64748b",
          fontSize: 16,
          lineHeight: 1.6,
          marginBottom: 16
        }}>
          Google's Gemini models represent the next generation of multimodal AI, capable of understanding and generating text, images, 
          audio, and code. From the powerful Gemini Pro to the lightning-fast Gemini Flash, these models offer versatile solutions 
          for a wide range of applications.
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
              🎨 Multimodal Capabilities
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Process text, images, audio, and video in a single unified model
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
              ⚡ High Performance
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              Optimized for speed and efficiency with Google's advanced infrastructure
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
              🔧 Flexible Options
            </h3>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "#64748b",
              lineHeight: 1.4
            }}>
              From Pro models for complex tasks to Flash variants for rapid responses
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
          All Google Gemini Models
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24
        }}>
          {models.map((model) => (
            <ModelCard key={model.slug} model={model} provider="google" />
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
          <Link href="/compare/gpt-4o-vs-gemini-pro" style={{
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