import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import ContentRenderer from "@/components/learn/ContentRenderer";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/learn";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams(): { slug: string }[] {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found | The AI Tokens" };
  }

  const title = `${article.title} | The AI Tokens`;
  const description = article.description;
  const canonical = `/learn/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
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

export default async function LearnArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug);

  // Category display names
  const categoryNames = {
    basics: "Basics",
    pricing: "Pricing",
    models: "Models", 
    advanced: "Advanced"
  };

  return (
    <main style={{ 
      minHeight: "calc(100vh - 140px)",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
    }}>
      <Container>
        {/* Breadcrumb */}
        <div style={{ 
          padding: "20px 0 0",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <nav style={{ fontSize: 14, color: "#64748b" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link href="/learn" style={{ color: "#64748b", textDecoration: "none" }}>Learn</Link>
            {" / "}
            <span style={{ color: "#0F172A", fontWeight: 500 }}>{article.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div style={{ 
          padding: "20px 0 32px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "inline-block",
            padding: "4px 12px",
            background: "rgba(56, 189, 248, 0.1)",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#1E3A8A",
            marginBottom: 16
          }}>
            {categoryNames[article.category]}
          </div>
          
          <h1 style={{ 
            fontSize: 36, 
            margin: "0 0 16px 0",
            background: "linear-gradient(135deg, #1E3A8A 0%, #38BDF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -0.5
          }}>
            {article.title}
          </h1>
          
          <p style={{ 
            marginTop: 0, 
            color: "#64748b", 
            fontSize: 18,
            lineHeight: 1.6,
            marginBottom: 20
          }}>
            {article.description}
          </p>

          {/* Article Meta */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            fontSize: 14,
            color: "#64748b"
          }}>
            <span>📅 {new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>⏱️ {article.readTime} min read</span>
            <div style={{ display: "flex", gap: 8 }}>
              {article.tags.slice(0, 3).map(tag => (
                <span key={tag} style={{
                  padding: "2px 8px",
                  background: "rgba(156, 163, 175, 0.1)",
                  borderRadius: 4,
                  fontSize: 12
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gap: 20,
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Article Content */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 32,
            boxShadow: "0 1px 3px rgba(30, 58, 138, 0.1)"
          }}>
            <ContentRenderer content={article.content} />
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
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
                Related Articles
              </h2>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: 16 
              }}>
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/learn/${related.slug}`}
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
                      {related.title}
                    </h3>
                    <p style={{ 
                      color: "#64748b", 
                      fontSize: 14, 
                      lineHeight: 1.4, 
                      margin: "0 0 8px 0" 
                    }}>
                      {related.description}
                    </p>
                    <div style={{ 
                      fontSize: 12, 
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}>
                      <span>{categoryNames[related.category]}</span>
                      <span>•</span>
                      <span>{related.readTime} min</span>
                    </div>
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