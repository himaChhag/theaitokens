import type { Provider } from "@/lib/catalog/types";

export type CountTokensArgs = {
  provider: Provider;
  modelId: string;
  prompt: string;
};

export type CountingMode = "exact" | "near-exact" | "estimate";

export type CountTokensResult = {
  inputTokens: number;
  countingMode: CountingMode;
  confidenceNote?: string;
};