import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const ANTHROPIC_PRICING_URL = "https://platform.claude.com/docs/en/about-claude/pricing";

export const ANTHROPIC_MODELS: ModelEntry[] = [
  {
    provider: "anthropic",
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    slug: modelTokenCounterSlug("claude-3-5-sonnet"),
    pricingBands: [{ inputPer1M: 3.0, cachedInputPer1M: 0.30, outputPer1M: 15.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'. Cache writes have separate pricing on Anthropic.",
  },
  {
    provider: "anthropic",
    id: "claude-3-opus-20240229",
    name: "Claude 3 Opus",
    slug: modelTokenCounterSlug("claude-3-opus"),
    pricingBands: [{ inputPer1M: 15.0, cachedInputPer1M: 1.50, outputPer1M: 75.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'. Cache writes have separate pricing on Anthropic.",
  },
  {
    provider: "anthropic",
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    slug: modelTokenCounterSlug("claude-3-5-haiku"),
    pricingBands: [{ inputPer1M: 1.0, cachedInputPer1M: 0.10, outputPer1M: 5.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'.",
  },
  {
    provider: "anthropic",
    id: "claude-3-haiku-20240307",
    name: "Claude 3 Haiku",
    slug: modelTokenCounterSlug("claude-3-haiku"),
    pricingBands: [{ inputPer1M: 0.25, cachedInputPer1M: 0.025, outputPer1M: 1.25 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'.",
  },
];