import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const GEMINI_PRICING_URL = "https://ai.google.dev/gemini-api/docs/pricing";

export const GEMINI_MODELS: ModelEntry[] = [
  {
    provider: "google",
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    slug: modelTokenCounterSlug("gemini-2.5-pro"),
    pricingBands: [
      { maxInputTokens: 200_000, inputPer1M: 1.25, cachedInputPer1M: 0.125, outputPer1M: 10.0 },
      { inputPer1M: 2.50, cachedInputPer1M: 0.25, outputPer1M: 15.0 },
    ],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "2,000,000",
    notes: "Output price includes thinking tokens (per Google).",
  },
  {
    provider: "google",
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    slug: modelTokenCounterSlug("gemini-2.5-flash"),
    pricingBands: [{ inputPer1M: 0.30, cachedInputPer1M: 0.03, outputPer1M: 2.50 }],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "1,000,000",
    notes: "Text/image/video pricing shown; audio differs.",
  },
  {
    provider: "google",
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash-Lite",
    slug: modelTokenCounterSlug("gemini-2.5-flash-lite"),
    pricingBands: [{ inputPer1M: 0.10, cachedInputPer1M: 0.01, outputPer1M: 0.40 }],
    officialSourceUrl: GEMINI_PRICING_URL,
    lastVerified: "2026-02-21",
    status: "active",
    contextWindow: "1,000,000",
    notes: "Text/image/video pricing shown; audio differs.",
  },
];