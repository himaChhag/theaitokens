import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import { getAllArticles, getArticlesByCategory } from "@/lib/learn";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn AI Tokens, Pricing & Models | The AI Tokens",
  description: "Comprehensive guides and tutorials about AI tokens, pricing models, cost optimization, and choosing the right AI model for your needs.",
  alternates: { canonical: "/learn" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Learn AI Tokens, Pricing & Models | The AI Tokens",
    description: "Comprehensive guides and tutorials about AI tokens, pricing models, cost optimization, and choosing the right AI model for your needs.",
    url: "/learn",
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

export default function LearnPage() {
  const allArticles = getAllArticles();
  const basicArticles = getArticlesByCategory("basics");
  const pricingArticles = getArticlesByCategory("pricing");
  const modelArticles = getArticlesByCategory("models");
  const advancedArticles = getArticlesByCategory("advanced");

  const categoryInfo = {
    basics: {
      title: "Basics",
      description: "Fundamental concepts about AI tokens and how they work",
      icon: "📚"
    },
    pricing: {
      title: "Pricing & Costs",
      description: "Understanding AI pricing models and cost optimization",
      icon: "💰"
    },
    models: {
      title: "Model Selection",
      description: "Choosing the right AI model for your use case",
      icon: "🤖"
    },
    advanced: {
      title: "Advanced Topics",
      description: "In-depth guides for experienced developers",
      icon: "⚡"
    }
  };

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
            Learn AI Tokens & Pricing
          </h1>
          <p style={{ 
            marginTop: 12, 
            color: "#64748b", 
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "12px auto 0"
          }}>
            Comprehensive guides and tutorials to help you understand AI tokens, optimize costs, and choose the right models for your projects.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Featured Articles */}
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
              Featured Articles
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16
            }}>
              {allArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/learn/${article.slug}`}
                  style={{
                    textDecoration: "none",
                    background: "rgba(56, 189, 248, 0.05)",
                    border: "1px solid rgba(56, 189, 248, 0.1)",
                    borderRadius: 12,
                    padding: 20,
                    display: "block",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12
                  }}>
                    <span style={{
                      padding: "4px 8px",
                      background: "rgba(56, 189, 248, 0.1)",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1E3A8A"
                    }}>
                      {categoryInfo[article.category].title}
                    </span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 style={{ 
                    margin: "0 0 8px 0", 
                    color: "#1E3A8A", 
                    fontSize: 18, 
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ 
                    color: "#64748b", 
                    fontSize: 14, 
                    lineHeight: 1.5, 
                    margin: 0 
                  }}>
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          {Object.entries(categoryInfo).map(([categoryKey, info]) => {
            const articles = getArticlesByCategory(categoryKey as any);
            if (articles.length === 0) return null;

            return (
              <div key={categoryKey} style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
              }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 12, 
                  marginBottom: 16 
                }}>
                  <span style={{ fontSize: 24 }}>{info.icon}</span>
                  <div>
                    <h2 style={{ 
                      margin: 0, 
                      color: "#0F172A", 
                      fontSize: 20, 
                      fontWeight: 700 
                    }}>
                      {info.title}
                    </h2>
                    <p style={{ 
                      margin: 0, 
                      color: "#64748b", 
                      fontSize: 14 
                    }}>
                      {info.description}
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 12
                }}>
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/learn/${article.slug}`}
                      style={{
                        textDecoration: "none",
                        padding: 16,
                        background: "rgba(156, 163, 175, 0.05)",
                        border: "1px solid rgba(156, 163, 175, 0.1)",
                        borderRadius: 8,
                        display: "block",
                        transition: "all 0.2s ease"
                      }}
                    >
                      <h3 style={{ 
                        margin: "0 0 6px 0", 
                        color: "#1E3A8A", 
                        fontSize: 15, 
                        fontWeight: 600,
                        lineHeight: 1.3
                      }}>
                        {article.title}
                      </h3>
                      <p style={{ 
                        color: "#64748b", 
                        fontSize: 13, 
                        lineHeight: 1.4, 
                        margin: "0 0 8px 0" 
                      }}>
                        {article.description}
                      </p>
                      <div style={{ 
                        fontSize: 11, 
                        color: "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      }}>
                        <span>⏱️ {article.readTime} min</span>
                        <span>•</span>
                        <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <Sidebar />
        </div>
      </Container>
    </main>
  );
}