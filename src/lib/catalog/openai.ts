import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const OPENAI_PRICING_URL = "https://developers.openai.com/api/docs/pricing/";

export const OPENAI_MODELS: ModelEntry[] = [
  {
    provider: "openai",
    id: "gpt-4o",
    name: "GPT-4o",
    slug: modelTokenCounterSlug("gpt-4o"),
    pricingBands: [{ inputPer1M: 2.5, cachedInputPer1M: 1.25, outputPer1M: 10.0 }],
    officialSourceUrl: OPENAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
  },
  {
    provider: "openai",
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    slug: modelTokenCounterSlug("gpt-4o-mini"),
    pricingBands: [{ inputPer1M: 0.15, cachedInputPer1M: 0.075, outputPer1M: 0.60 }],
    officialSourceUrl: OPENAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
  },
  {
    provider: "openai",
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    slug: modelTokenCounterSlug("gpt-4-turbo"),
    pricingBands: [{ inputPer1M: 10.0, outputPer1M: 30.0 }],
    officialSourceUrl: OPENAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
  },
  {
    provider: "openai",
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    slug: modelTokenCounterSlug("gpt-3.5-turbo"),
    pricingBands: [{ inputPer1M: 0.5, outputPer1M: 1.5 }],
    officialSourceUrl: OPENAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "16,385",
  },
];