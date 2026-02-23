import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const XAI_PRICING_URL = "https://x.ai/api";

export const XAI_MODELS: ModelEntry[] = [
  {
    provider: "xai",
    id: "grok-beta",
    name: "Grok Beta",
    slug: modelTokenCounterSlug("grok-beta"),
    pricingBands: [{ inputPer1M: 5.0, outputPer1M: 15.0 }],
    officialSourceUrl: XAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Real-time access to X (Twitter) data and web search capabilities.",
  },
  {
    provider: "xai",
    id: "grok-vision-beta",
    name: "Grok Vision Beta",
    slug: modelTokenCounterSlug("grok-vision-beta"),
    pricingBands: [{ inputPer1M: 5.0, outputPer1M: 15.0 }],
    officialSourceUrl: XAI_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "131,072",
    notes: "Multimodal model with vision capabilities and real-time data access.",
  },
];