import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const PERPLEXITY_PRICING_URL = "https://docs.perplexity.ai/docs/pricing";

export const PERPLEXITY_MODELS: ModelEntry[] = [
  {
    provider: "perplexity",
    id: "sonar-pro",
    name: "Sonar Pro",
    slug: modelTokenCounterSlug("sonar-pro"),
    pricingBands: [{ inputPer1M: 3.0, outputPer1M: 15.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "127,072",
    notes: "Premium search-augmented model with enhanced capabilities and real-time web access with citations.",
  },
  {
    provider: "perplexity",
    id: "sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    slug: modelTokenCounterSlug("sonar-reasoning-pro"),
    pricingBands: [{ inputPer1M: 2.0, outputPer1M: 8.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "127,072",
    notes: "Advanced reasoning model with search-augmented capabilities for complex problem-solving tasks.",
  },
  {
    provider: "perplexity",
    id: "sonar-deep-research",
    name: "Sonar Deep Research",
    slug: modelTokenCounterSlug("sonar-deep-research"),
    pricingBands: [{ inputPer1M: 2.0, outputPer1M: 8.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "127,072",
    notes: "Specialized model for comprehensive research tasks with deep web search and analysis capabilities.",
  },
  {
    provider: "perplexity",
    id: "sonar",
    name: "Sonar",
    slug: modelTokenCounterSlug("sonar"),
    pricingBands: [{ inputPer1M: 1.0, outputPer1M: 1.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "127,072",
    notes: "Standard search-augmented model with real-time web access and citations at an affordable price point.",
  },
];