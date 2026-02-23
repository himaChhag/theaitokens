import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const COHERE_PRICING_URL = "https://cohere.com/pricing";

export const COHERE_MODELS: ModelEntry[] = [
  {
    provider: "cohere",
    id: "command-r-plus",
    name: "Command R+",
    slug: modelTokenCounterSlug("command-r-plus"),
    pricingBands: [{ inputPer1M: 3.0, outputPer1M: 15.0 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
    notes: "Enterprise-grade model with advanced reasoning capabilities.",
  },
  {
    provider: "cohere",
    id: "command-r",
    name: "Command R",
    slug: modelTokenCounterSlug("command-r"),
    pricingBands: [{ inputPer1M: 0.5, outputPer1M: 1.5 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "128,000",
    notes: "Balanced performance and cost for most use cases.",
  },
  {
    provider: "cohere",
    id: "command-light",
    name: "Command Light",
    slug: modelTokenCounterSlug("command-light"),
    pricingBands: [{ inputPer1M: 0.3, outputPer1M: 0.6 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "4,096",
    notes: "Lightweight model for simple tasks and high-volume applications.",
  },
];