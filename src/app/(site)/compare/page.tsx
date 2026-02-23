import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import { getAllComparisons } from "@/lib/comparisons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Model Comparisons | The AI Tokens",
  description: "Compare popular AI models side-by-side. Detailed analysis of pricing, performance, and capabilities for GPT-4o, Claude, Gemini, and more.",
  alternates: { canonical: "/compare" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Model Comparisons | The AI Tokens",
    description: "Compare popular AI models side-by-side. Detailed analysis of pricing, performance, and capabilities for GPT-4o, Claude, Gemini, and more.",
    url: "/compare",
    type: "website",
    images: [
      {
        url: "/og-model.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ComparePage() {
  const comparisons = getAllComparisons();

  return (
    <main style={{ 
      minHeight: "calc(100vh - 140px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Container>
        {/* Header */}
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
            AI Model Comparisons
          </h1>
          <p style={{ 
            marginTop: 12, 
            color: "#64748b", 
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "12px auto 0"
          }}>
            Compare popular AI models side-by-side. Get detailed analysis of pricing, performance, and capabilities to choose the right model for your needs.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Comparison Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20
          }}>
            {comparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/compare/${comparison.slug}`}
                style={{
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)",
                  transition: "all 0.2s ease",
                  display: "block"
                }}
              >
                <h2 style={{ 
                  margin: "0 0 12px 0", 
                  color: "#0F172A", 
                  fontSize: 20, 
                  fontWeight: 700,
                  lineHeight: 1.3
                }}>
                  {comparison.title}
                </h2>
                <p style={{ 
                  color: "#64748b", 
                  fontSize: 14, 
                  lineHeight: 1.5, 
                  margin: "0 0 16px 0" 
                }}>
                  {comparison.description}
                </p>
                
                {/* Models */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16
                }}>
                  <div style={{
                    padding: "6px 12px",
                    background: "rgba(56, 189, 248, 0.1)",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#1E3A8A"
                  }}>
                    {comparison.modelA.label}
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>vs</span>
                  <div style={{
                    padding: "6px 12px",
                    background: "rgba(34, 197, 94, 0.1)",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#059669"
                  }}>
                    {comparison.modelB.label}
                  </div>
                </div>

                {/* Winner Badge */}
                {comparison.winner && (
                  <div style={{
                    padding: "8px 12px",
                    background: comparison.winner === "A" ? "rgba(34, 197, 94, 0.1)" : 
                               comparison.winner === "B" ? "rgba(59, 130, 246, 0.1)" : 
                               "rgba(156, 163, 175, 0.1)",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: comparison.winner === "A" ? "#059669" : 
                           comparison.winner === "B" ? "#2563eb" : "#6b7280",
                    display: "inline-block"
                  }}>
                    {comparison.winner === "tie" ? "It's a tie!" : 
                     comparison.winner === "A" ? `Winner: ${comparison.modelA.label}` :
                     `Winner: ${comparison.modelB.label}`}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <Sidebar />
        </div>
      </Container>
    </main>
  );
}