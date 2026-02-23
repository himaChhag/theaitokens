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
    { url: `${baseUrl}/anthropic`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/google`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/cohere`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
    { url: `${baseUrl}/mistral`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
    { url: `${baseUrl}/xai`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
    { url: `${baseUrl}/meta`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
    { url: `${baseUrl}/perplexity`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
    { url: `${baseUrl}/together`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.90 },
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
    // Pricing calculators - General
    { url: `${baseUrl}/ai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-token-cost-estimator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/llm-pricing-comparison`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-api-cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    
    // Pricing calculators - Provider specific
    { url: `${baseUrl}/openai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-4-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-5-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/anthropic-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/cohere-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/mistral-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/xai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/grok-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/meta-ai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/llama-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/perplexity-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/together-ai-pricing-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Token counters - General
    { url: `${baseUrl}/ai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/llm-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    
    // Token counters - Provider specific
    { url: `${baseUrl}/openai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-5-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/anthropic-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/cohere-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/mistral-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/xai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/grok-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/meta-ai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/llama-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/perplexity-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/together-ai-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Model-specific token counters (high-value)
    { url: `${baseUrl}/gpt-4o-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-5-2-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-opus-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-sonnet-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-pro-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/o3-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/grok-4-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/llama-4-token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Cost comparison tools
    { url: `${baseUrl}/cheapest-ai-model`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-cost-comparison-tool`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/best-ai-model-for-budget`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-model-price-comparison`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/most-affordable-ai-model`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-pricing-comparison-2026`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    
    // Enterprise and business focused
    { url: `${baseUrl}/enterprise-ai-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/business-ai-cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-roi-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/enterprise-llm-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/corporate-ai-budget-planner`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Use case specific pricing
    { url: `${baseUrl}/chatbot-ai-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/content-generation-ai-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-translation-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-coding-assistant-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-writing-tool-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-customer-service-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/ai-research-assistant-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/ai-data-analysis-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/ai-document-processing-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/multimodal-ai-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Specific model comparisons (high commercial intent)
    { url: `${baseUrl}/gpt-4o-vs-claude-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gpt-5-vs-claude-opus-cost`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/openai-vs-anthropic-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/gemini-vs-gpt-cost-comparison`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/claude-vs-gpt-pricing-guide`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    
    // Budget and cost optimization
    { url: `${baseUrl}/ai-budget-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/reduce-ai-api-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-cost-optimization-guide`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/llm-cost-savings-tips`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/ai-spending-tracker`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // 2026 specific and trending
    { url: `${baseUrl}/ai-pricing-trends-2026`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/best-ai-models-2026`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/ai-model-comparison-2026`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/latest-ai-model-prices`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/new-ai-models-2026`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    
    // Technical and developer focused
    { url: `${baseUrl}/api-cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/token-usage-estimator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/context-window-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/input-output-token-costs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    { url: `${baseUrl}/cached-token-pricing`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.75 },
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