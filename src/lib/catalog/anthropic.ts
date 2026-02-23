import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const ANTHROPIC_PRICING_URL = "https://platform.claude.com/docs/en/about-claude/pricing";

export const ANTHROPIC_MODELS: ModelEntry[] = [
  {
    provider: "anthropic",
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    slug: modelTokenCounterSlug("claude-opus-4-6"),
    pricingBands: [{ inputPer1M: 5.0, cachedInputPer1M: 0.50, outputPer1M: 25.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "200,000",
    notes: "Latest flagship Claude model with advanced reasoning capabilities. Cache pricing: $6.25/MTok (5m writes), $10/MTok (1h writes).",
  },
  {
    provider: "anthropic",
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    slug: modelTokenCounterSlug("claude-sonnet-4-6"),
    pricingBands: [{ inputPer1M: 3.0, cachedInputPer1M: 0.30, outputPer1M: 15.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "200,000",
    notes: "Balanced performance model. Cache pricing: $3.75/MTok (5m writes), $6/MTok (1h writes).",
  },
  {
    provider: "anthropic",
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    slug: modelTokenCounterSlug("claude-haiku-4-5"),
    pricingBands: [{ inputPer1M: 1.0, cachedInputPer1M: 0.10, outputPer1M: 5.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "200,000",
    notes: "Fast and cost-effective model. Cache pricing: $1.25/MTok (5m writes), $2/MTok (1h writes).",
  },
  {
    provider: "anthropic",
    id: "claude-haiku-3-5",
    name: "Claude Haiku 3.5",
    slug: modelTokenCounterSlug("claude-haiku-3-5"),
    pricingBands: [{ inputPer1M: 0.80, cachedInputPer1M: 0.08, outputPer1M: 4.0 }],
    officialSourceUrl: ANTHROPIC_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "200,000",
    notes: "Previous generation efficient model. Cache pricing: $1/MTok (5m writes), $1.6/MTok (1h writes).",
  },
];