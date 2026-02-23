import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const PERPLEXITY_PRICING_URL = "https://docs.perplexity.ai/docs/pricing";

export const PERPLEXITY_MODELS: ModelEntry[] = [
  {
    provider: "perplexity",
    id: "llama-3.1-sonar-large-128k-online",
    name: "Llama 3.1 Sonar Large 128K Online",
    slug: modelTokenCounterSlug("llama-3-1-sonar-large-128k-online"),
    pricingBands: [{ inputPer1M: 1.0, outputPer1M: 1.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "127,072",
    notes: "Search-augmented model with real-time web access and citations.",
  },
  {
    provider: "perplexity",
    id: "llama-3.1-sonar-small-128k-online",
    name: "Llama 3.1 Sonar Small 128K Online",
    slug: modelTokenCounterSlug("llama-3-1-sonar-small-128k-online"),
    pricingBands: [{ inputPer1M: 0.2, outputPer1M: 0.2 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "127,072",
    notes: "Efficient search-augmented model with web access.",
  },
  {
    provider: "perplexity",
    id: "llama-3.1-sonar-huge-128k-online",
    name: "Llama 3.1 Sonar Huge 128K Online",
    slug: modelTokenCounterSlug("llama-3-1-sonar-huge-128k-online"),
    pricingBands: [{ inputPer1M: 5.0, outputPer1M: 5.0 }],
    officialSourceUrl: PERPLEXITY_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "127,072",
    notes: "Most capable search-augmented model with comprehensive web access.",
  },
];