import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const COHERE_PRICING_URL = "https://cohere.com/pricing";

export const COHERE_MODELS: ModelEntry[] = [
  {
    provider: "cohere",
    id: "command-a",
    name: "Command A",
    slug: modelTokenCounterSlug("command-a"),
    pricingBands: [{ inputPer1M: 2.50, outputPer1M: 10.0 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "256,000",
    notes: "Largest, most performant model, ideal for building enterprise agents with a low compute footprint. 8K maximum output tokens.",
  },
  {
    provider: "cohere",
    id: "command-r",
    name: "Command R",
    slug: modelTokenCounterSlug("command-r"),
    pricingBands: [{ inputPer1M: 0.15, outputPer1M: 0.60 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "128,000",
    notes: "Midsized model providing the best combination of efficiency and performance. 4K maximum output tokens.",
  },
  {
    provider: "cohere",
    id: "command-r7b",
    name: "Command R7B",
    slug: modelTokenCounterSlug("command-r7b"),
    pricingBands: [{ inputPer1M: 0.0375, outputPer1M: 0.15 }],
    officialSourceUrl: COHERE_PRICING_URL,
    lastVerified: "2026-02-22",
    status: "active",
    contextWindow: "128,000",
    notes: "Smallest model, made for building powerful applications on commodity GPUs and edge devices. 4K maximum output tokens.",
  },
];