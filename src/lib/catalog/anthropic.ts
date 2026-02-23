import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const ANTHROPIC_PRICING_URL = "https://platform.claude.com/docs/en/about-claude/pricing";

export const ANTHROPIC_MODELS: ModelEntry[] = [
  {
    provider: "anthropic",
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    slug: modelTokenCounterSlug("claude-opus-4-6"),
    pricingBands: [
      { maxInputTokens: 200_000, inputPer1M: 5.0, cachedInputPer1M: 0.50, outputPer1M: 25.0 },
      { inputPer1M: 10.0, cachedInputPer1M: 0.50, outputPer1M: 37.5 },
    ],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'. Cache writes have separate pricing on Anthropic.",
  },
  {
    provider: "anthropic",
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    slug: modelTokenCounterSlug("claude-sonnet-4-6"),
    pricingBands: [
      { maxInputTokens: 200_000, inputPer1M: 3.0, cachedInputPer1M: 0.30, outputPer1M: 15.0 },
      { inputPer1M: 6.0, cachedInputPer1M: 0.30, outputPer1M: 22.5 },
    ],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'. Cache writes have separate pricing on Anthropic.",
  },
  {
    provider: "anthropic",
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    slug: modelTokenCounterSlug("claude-haiku-4-5"),
    pricingBands: [{ inputPer1M: 1.0, cachedInputPer1M: 0.10, outputPer1M: 5.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "200,000",
    notes: "cachedInputPer1M maps to 'cache hits & refreshes'.",
  },
];