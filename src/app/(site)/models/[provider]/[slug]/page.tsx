import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";
import { CATALOG, findModelByProviderAndSlug } from "@/lib/catalog";
import type { Provider } from "@/lib/catalog/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModelSeoBody from "@/components/seo/ModelSeoBody";
import { getComparisonsForModel } from "@/lib/comparisons";
import Link from "next/link";

export function generateStaticParams(): { provider: string; slug: string }[] {
  return CATALOG.filter((m) => m.status === "active").map((m) => ({
    provider: m.provider === 'anthropic' ? 'claude' : m.provider,
    slug: m.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ provider: string; slug: string }> }
): Promise<Metadata> {
  const { provider, slug } = await props.params;
  
  // Map user-friendly route to internal provider
  const internalProvider = provider === 'claude' ? 'anthropic' : provider;

  try {
    const model = findModelByProviderAndSlug(internalProvider as Provider, slug);

    const title = `${model.name} Token Counter & Cost Calculator | The AI Tokens`;
    const description = `Estimate ${model.name} token usage and API cost using verified pricing. Calculate input/output tokens and total cost instantly.`;
    const canonical = `/${provider}/${model.slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      robots: { index: false, follow: true },
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
  } catch {
    return { title: "Model not found | The AI Tokens" };
  }
}

export default async function ModelPage(
  props: { params: Promise<{ provider: string; slug: string }> }
) {
  const { provider, slug } = await props.params;
  
  // Map user-friendly route to internal provider
  const internalProvider = provider === 'claude' ? 'anthropic' : provider;

  let model;
  try {
    model = findModelByProviderAndSlug(internalProvider as Provider, slug);
  } catch {
    notFound();
  }

  // Get relevant comparisons for this model
  const relevantComparisons = getComparisonsForModel(model.id);

  // 🔹 Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://theaitokens.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: provider === 'claude' ? 'Claude' : provider.charAt(0).toUpperCase() + provider.slice(1),
        item: `https://theaitokens.com/${provider}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: model.name,
        item: `https://theaitokens.com/${provider}/${model.slug}`,
      },
    ],
  };

  return (
    <main style={{ 
      minHeight: "calc(100vh - 140px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      {/* 🔹 Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

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
            {model.name} Token Counter & Cost Calculator
          </h1>
          <div style={{ 
            marginTop: 12, 
            padding: "12px 20px",
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "inline-block",
            boxShadow: "0 2px 4px rgba(30, 58, 138, 0.1)"
          }}>
            <p style={{ 
              margin: 0,
              color: "#64748b", 
              fontSize: 15,
              fontWeight: 500
            }}>
              Official pricing source:{" "}
              <a 
                href={model.officialSourceUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  color: "#1E3A8A",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textDecorationColor: "#38BDF8"
                }}
              >
                verified
              </a>
              {" • "}
              <span style={{ color: "#0F172A", fontWeight: 600 }}>
                Verified on {model.lastVerified}
              </span>
            </p>
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <Estimator
            defaultProvider={model.provider}
            defaultModelId={model.id}
          />
          
          {/* Related Comparisons */}
          {relevantComparisons.length > 0 && (
            <div style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
            }}>
              <h2 style={{ 
                marginTop: 0, 
                marginBottom: 16,
                color: "#0F172A", 
                fontSize: 24, 
                fontWeight: 700 
              }}>
                Compare {model.name}
              </h2>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: 16 
              }}>
                {relevantComparisons.map((comparison) => (
                  <Link
                    key={comparison.slug}
                    href={`/compare/${comparison.slug}`}
                    style={{
                      textDecoration: "none",
                      padding: 16,
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
                      fontSize: 16, 
                      fontWeight: 600,
                      lineHeight: 1.3
                    }}>
                      {comparison.title}
                    </h3>
                    <p style={{ 
                      color: "#64748b", 
                      fontSize: 14, 
                      lineHeight: 1.4, 
                      margin: 0 
                    }}>
                      {comparison.description}
                    </p>
                    {comparison.winner && (
                      <div style={{
                        marginTop: 8,
                        padding: "4px 8px",
                        background: comparison.winner === "A" ? "rgba(34, 197, 94, 0.1)" : 
                                   comparison.winner === "B" ? "rgba(59, 130, 246, 0.1)" : 
                                   "rgba(156, 163, 175, 0.1)",
                        borderRadius: 4,
                        fontSize: 11,
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
            </div>
          )}
          
          <Sidebar />
        </div>

        <ModelSeoBody model={model} />
      </Container>
    </main>
  );
}