import { modelTokenCounterSlug } from "@/lib/seo/slugs";
import type { ModelEntry } from "./types";

const TOGETHER_PRICING_URL = "https://www.together.ai/pricing";

export const TOGETHER_MODELS: ModelEntry[] = [
  {
    provider: "together",
    id: "meta-llama/Llama-3-70b-chat-hf",
    name: "Llama 3 70B Chat",
    slug: modelTokenCounterSlug("llama-3-70b-chat"),
    pricingBands: [{ inputPer1M: 0.9, outputPer1M: 0.9 }],
    officialSourceUrl: TOGETHER_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "8,192",
    notes: "Open-source Llama model hosted on Together AI infrastructure.",
  },
  {
    provider: "together",
    id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    name: "Mixtral 8x7B Instruct",
    slug: modelTokenCounterSlug("mixtral-8x7b-instruct"),
    pricingBands: [{ inputPer1M: 0.6, outputPer1M: 0.6 }],
    officialSourceUrl: TOGETHER_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,768",
    notes: "Mixture of experts model with strong performance and efficiency.",
  },
  {
    provider: "together",
    id: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    name: "Nous Hermes 2 Mixtral 8x7B",
    slug: modelTokenCounterSlug("nous-hermes-2-mixtral-8x7b"),
    pricingBands: [{ inputPer1M: 0.6, outputPer1M: 0.6 }],
    officialSourceUrl: TOGETHER_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "32,768",
    notes: "Fine-tuned Mixtral model optimized for instruction following.",
  },
  {
    provider: "together",
    id: "togethercomputer/RedPajama-INCITE-7B-Chat",
    name: "RedPajama INCITE 7B Chat",
    slug: modelTokenCounterSlug("redpajama-incite-7b-chat"),
    pricingBands: [{ inputPer1M: 0.2, outputPer1M: 0.2 }],
    officialSourceUrl: TOGETHER_PRICING_URL,
    lastVerified: "2024-12-15",
    status: "active",
    contextWindow: "2,048",
    notes: "Cost-effective open-source model for basic chat applications.",
  },
];