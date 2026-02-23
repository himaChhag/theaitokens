import type { MetadataRoute } from "next";
import { activeModels } from "@/lib/catalog";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllArticles } from "@/lib/learn";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://theaitokens.com";

  const modelPages = activeModels().map((m) => {
    const routeProvider = m.provider === 'anthropic' ? 'claude' : m.provider;
    return {
      url: `${baseUrl}/${routeProvider}/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    };
  });

  // Comparison pages
  const comparisonPages = getAllComparisons().map((c) => ({
    url: `${baseUrl}/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Provider overview pages
  const providerPages = [
    { url: `${baseUrl}/openai`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/claude`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/google`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
  ];

  // Learn articles
  const learnPages = getAllArticles().map((article) => ({
    url: `${baseUrl}/learn/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Long tail money pages
  const longTailPages = [
    // Pricing calculators
    { url: `${baseUrl}/ai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/openai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-4-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-token-cost-estimator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/llm-pricing-comparison`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-api-cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    // Token counters
    { url: `${baseUrl}/openai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    // Cost comparison tools
    { url: `${baseUrl}/cheapest-ai-model`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-cost-comparison-tool`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/enterprise-ai-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    // Use case specific
    { url: `${baseUrl}/chatbot-ai-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/content-generation-ai-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-translation-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
  ];

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...providerPages,
    ...modelPages,
    ...comparisonPages,
    ...learnPages,
    ...longTailPages,
  ];
}