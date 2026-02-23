import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const GEMINI_PRICING_URL = "https://ai.google.dev/gemini-api/docs/pricing";

export const GEMINI_MODELS: ModelEntry[] = [
  {
    provider: "google",
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    slug: modelTokenCounterSlug("gemini-1-5-pro"),
    pricingBands: [
      { maxInputTokens: 128_000, inputPer1M: 1.25, cachedInputPer1M: 0.3125, outputPer1M: 5.0 },
      { inputPer1M: 2.50, cachedInputPer1M: 0.625, outputPer1M: 10.0 },
    ],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "2,097,152",
    notes: "Cached input pricing applies to context caching feature.",
  },
  {
    provider: "google",
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    slug: modelTokenCounterSlug("gemini-1-5-flash"),
    pricingBands: [
      { maxInputTokens: 128_000, inputPer1M: 0.075, cachedInputPer1M: 0.01875, outputPer1M: 0.30 },
      { inputPer1M: 0.15, cachedInputPer1M: 0.0375, outputPer1M: 0.60 },
    ],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "1,048,576",
    notes: "Text/image/video pricing shown; audio differs. Cached input pricing applies to context caching feature.",
  },
  {
    provider: "google",
    id: "gemini-1.5-flash-8b",
    name: "Gemini 1.5 Flash-8B",
    slug: modelTokenCounterSlug("gemini-1-5-flash-8b"),
    pricingBands: [
      { maxInputTokens: 128_000, inputPer1M: 0.0375, cachedInputPer1M: 0.01, outputPer1M: 0.15 },
      { inputPer1M: 0.075, cachedInputPer1M: 0.02, outputPer1M: 0.30 },
    ],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "1,048,576",
    notes: "Text/image/video pricing shown; audio differs. Cached input pricing applies to context caching feature.",
  },
  {
    provider: "google",
    id: "gemini-1.0-pro",
    name: "Gemini 1.0 Pro",
    slug: modelTokenCounterSlug("gemini-1-0-pro"),
    pricingBands: [{ inputPer1M: 0.50, outputPer1M: 1.50 }],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,768",
    notes: "Legacy model, consider upgrading to Gemini 1.5 models.",
  },
];