import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const MISTRAL_PRICING_URL = "https://mistral.ai/technology/#pricing";

export const MISTRAL_MODELS: ModelEntry[] = [
  {
    provider: "mistral",
    id: "mistral-large-2",
    name: "Mistral Large 2",
    slug: modelTokenCounterSlug("mistral-large-2"),
    pricingBands: [{ inputPer1M: 2.0, outputPer1M: 6.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "128,000",
    notes: "Optimized for high reasoning and coding capabilities, competitive with GPT-4o but more cost-effective.",
  },
  {
    provider: "mistral",
    id: "mistral-medium",
    name: "Mistral Medium",
    slug: modelTokenCounterSlug("mistral-medium"),
    pricingBands: [{ inputPer1M: 0.40, outputPer1M: 2.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "131,072",
    notes: "High-performance, cost-effective model designed for efficient, high-accuracy, and fast inference. Max output: 8,191 tokens.",
  },
  {
    provider: "mistral",
    id: "codestral-2",
    name: "Codestral 2",
    slug: modelTokenCounterSlug("codestral-2"),
    pricingBands: [{ inputPer1M: 0.30, outputPer1M: 0.90 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "128,000",
    notes: "Optimized for coding, debugging, and software development, supporting large codebases.",
  },
  {
    provider: "mistral",
    id: "devstral-2",
    name: "Devstral 2",
    slug: modelTokenCounterSlug("devstral-2"),
    pricingBands: [{ inputPer1M: 0.40, outputPer1M: 2.0 }],
    officialSourceUrl: MISTRAL_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "128,000",
    notes: "Released December 2025, specialized development model with enhanced coding capabilities.",
  },
];