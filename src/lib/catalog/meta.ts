import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const META_PRICING_URL = "https://llama.meta.com/";

export const META_MODELS: ModelEntry[] = [
  {
    provider: "meta",
    id: "llama-3.1-405b-instruct",
    name: "Llama 3.1 405B Instruct",
    slug: modelTokenCounterSlug("llama-3-1-405b-instruct"),
    pricingBands: [{ inputPer1M: 5.32, outputPer1M: 16.0 }],
    officialSourceUrl: META_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Largest Llama model via API providers like Together AI, Fireworks, etc.",
  },
  {
    provider: "meta",
    id: "llama-3.1-70b-instruct",
    name: "Llama 3.1 70B Instruct",
    slug: modelTokenCounterSlug("llama-3-1-70b-instruct"),
    pricingBands: [{ inputPer1M: 0.88, outputPer1M: 0.88 }],
    officialSourceUrl: META_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Popular mid-size Llama model via API providers.",
  },
  {
    provider: "meta",
    id: "llama-3.1-8b-instruct",
    name: "Llama 3.1 8B Instruct",
    slug: modelTokenCounterSlug("llama-3-1-8b-instruct"),
    pricingBands: [{ inputPer1M: 0.18, outputPer1M: 0.18 }],
    officialSourceUrl: META_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Efficient smaller Llama model via API providers.",
  },
  {
    provider: "meta",
    id: "llama-3.2-90b-vision-instruct",
    name: "Llama 3.2 90B Vision Instruct",
    slug: modelTokenCounterSlug("llama-3-2-90b-vision-instruct"),
    pricingBands: [{ inputPer1M: 1.2, outputPer1M: 1.2 }],
    officialSourceUrl: META_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Multimodal Llama model with vision capabilities.",
  },
];