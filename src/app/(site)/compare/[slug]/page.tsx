import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import { getComparisonBySlug, getAllComparisons, getRelatedComparisons } from "@/lib/comparisons";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams(): { slug: string }[] {
  return getAllComparisons().map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const data = getComparisonBySlug(slug);

  if (!data) {
    return { title: "Comparison not found | The AI Tokens" };
  }

  const { comparison } = data;
  const title = `${comparison.title} Comparison | The AI Tokens`;
  const description = comparison.description;
  const canonical = `/compare/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
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
}

export default async function ComparisonPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const data = getComparisonBySlug(slug);

  if (!data) {
    notFound();
  }

  const { comparison, modelA, modelB } = data;
  const relatedComparisons = getRelatedComparisons(slug);

  // Get pricing for comparison
  const modelAPricing = modelA.pricingBands[0];
  const modelBPricing = modelB.pricingBands[0];

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
            {comparison.title} Comparison
          </h1>
          <p style={{ 
            marginTop: 12, 
            color: "#64748b", 
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "12px auto 0"
          }}>
            {comparison.description}
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Quick Summary */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <h2 style={{ marginTop: 0, color: "#0F172A", fontSize: 24, fontWeight: 700 }}>
              Quick Summary
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.6, margin: 0 }}>
              {comparison.summary}
            </p>
            {comparison.winner && (
              <div style={{ 
                marginTop: 16, 
                padding: "12px 16px",
                background: comparison.winner === "A" ? "rgba(34, 197, 94, 0.1)" : 
                           comparison.winner === "B" ? "rgba(59, 130, 246, 0.1)" : 
                           "rgba(156, 163, 175, 0.1)",
                borderRadius: 8,
                border: `1px solid ${comparison.winner === "A" ? "rgba(34, 197, 94, 0.2)" : 
                                   comparison.winner === "B" ? "rgba(59, 130, 246, 0.2)" : 
                                   "rgba(156, 163, 175, 0.2)"}`
              }}>
                <strong style={{ 
                  color: comparison.winner === "A" ? "#059669" : 
                         comparison.winner === "B" ? "#2563eb" : "#6b7280"
                }}>
                  {comparison.winner === "tie" ? "It's a tie!" : 
                   comparison.winner === "A" ? `Winner: ${comparison.modelA.label}` :
                   `Winner: ${comparison.modelB.label}`}
                </strong>
              </div>
            )}
          </div>

          {/* Pricing Comparison */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <h2 style={{ marginTop: 0, color: "#0F172A", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
              Pricing Comparison
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{
                padding: 20,
                background: "rgba(56, 189, 248, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(56, 189, 248, 0.1)"
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#1E3A8A", fontSize: 18, fontWeight: 600 }}>
                  {comparison.modelA.label}
                </h3>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Input</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>
                  ${modelAPricing.inputPer1M}/1M tokens
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginTop: 12, marginBottom: 8 }}>Output</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>
                  ${modelAPricing.outputPer1M}/1M tokens
                </div>
              </div>
              
              <div style={{
                padding: 20,
                background: "rgba(34, 197, 94, 0.05)",
                borderRadius: 12,
                border: "1px solid rgba(34, 197, 94, 0.1)"
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#059669", fontSize: 18, fontWeight: 600 }}>
                  {comparison.modelB.label}
                </h3>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Input</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>
                  ${modelBPricing.inputPer1M}/1M tokens
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginTop: 12, marginBottom: 8 }}>Output</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", fontFamily: "monospace" }}>
                  ${modelBPricing.outputPer1M}/1M tokens
                </div>
              </div>
            </div>
          </div>

          {/* Key Differences */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <h2 style={{ marginTop: 0, color: "#0F172A", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
              Key Differences
            </h2>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {comparison.keyDifferences.map((diff, index) => (
                <li key={index} style={{ 
                  color: "#64748b", 
                  fontSize: 16, 
                  lineHeight: 1.6, 
                  marginBottom: 8 
                }}>
                  {diff}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <h2 style={{ marginTop: 0, color: "#0F172A", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
              Best Use Cases
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <h3 style={{ margin: "0 0 12px 0", color: "#1E3A8A", fontSize: 18, fontWeight: 600 }}>
                  {comparison.modelA.label}
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {comparison.useCases.modelA.map((useCase, index) => (
                    <li key={index} style={{ 
                      color: "#64748b", 
                      fontSize: 14, 
                      lineHeight: 1.5, 
                      marginBottom: 6 
                    }}>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 style={{ margin: "0 0 12px 0", color: "#059669", fontSize: 18, fontWeight: 600 }}>
                  {comparison.modelB.label}
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {comparison.useCases.modelB.map((useCase, index) => (
                    <li key={index} style={{ 
                      color: "#64748b", 
                      fontSize: 14, 
                      lineHeight: 1.5, 
                      marginBottom: 6 
                    }}>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Comparisons */}
          {relatedComparisons.length > 0 && (
            <div style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
            }}>
              <h2 style={{ marginTop: 0, color: "#0F172A", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
                Related Comparisons
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {relatedComparisons.map((related) => (
                  <Link 
                    key={related.slug}
                    href={`/compare/${related.slug}`}
                    style={{
                      padding: "8px 16px",
                      background: "rgba(56, 189, 248, 0.1)",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1E3A8A",
                      textDecoration: "none",
                      border: "1px solid rgba(56, 189, 248, 0.2)"
                    }}
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Sidebar />
        </div>
      </Container>
    </main>
  );
}