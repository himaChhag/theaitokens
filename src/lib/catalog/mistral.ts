import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const MISTRAL_PRICING_URL = "https://mistral.ai/technology/#pricing";

export const MISTRAL_MODELS: ModelEntry[] = [
  {
    provider: "mistral",
    id: "mistral-large-latest",
    name: "Mistral Large",
    slug: modelTokenCounterSlug("mistral-large"),
    pricingBands: [{ inputPer1M: 4.0, outputPer1M: 12.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
    notes: "Most capable model for complex reasoning and multilingual tasks.",
  },
  {
    provider: "mistral",
    id: "mistral-medium-latest",
    name: "Mistral Medium",
    slug: modelTokenCounterSlug("mistral-medium"),
    pricingBands: [{ inputPer1M: 2.7, outputPer1M: 8.1 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,000",
    notes: "Balanced performance for most applications.",
  },
  {
    provider: "mistral",
    id: "mistral-small-latest",
    name: "Mistral Small",
    slug: modelTokenCounterSlug("mistral-small"),
    pricingBands: [{ inputPer1M: 1.0, outputPer1M: 3.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,000",
    notes: "Cost-effective option for simpler tasks.",
  },
  {
    provider: "mistral",
    id: "codestral-latest",
    name: "Codestral",
    slug: modelTokenCounterSlug("codestral"),
    pricingBands: [{ inputPer1M: 1.0, outputPer1M: 3.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,000",
    notes: "Specialized for code generation and programming tasks.",
  },
];