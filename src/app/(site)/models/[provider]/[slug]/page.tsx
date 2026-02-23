import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import Estimator from "@/components/estimator/Estimator";
import { CATALOG, findModelByProviderAndSlug } from "@/lib/catalog";
import type { Provider } from "@/lib/catalog/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ModelSeoBody from "@/components/seo/ModelSeoBody";

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
          <Sidebar />
        </div>

        <ModelSeoBody model={model} />
      </Container>
    </main>
  );
}