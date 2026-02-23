export type Provider = "openai" | "anthropic" | "google";
export type ModelStatus = "active" | "disabled";

export type PricingBand = {
  /** If set: applies when inputTokens <= maxInputTokens */
  maxInputTokens?: number;
  /** USD per 1,000,000 input tokens */
  inputPer1M: number;
  /** USD per 1,000,000 output tokens */
  outputPer1M: number;
  /** Optional cached input price */
  cachedInputPer1M?: number;
};

export type ModelEntry = {
  provider: Provider;
  /** Exact provider model id */
  id: string;
  /** Display name */
  name: string;
  /** Explicit SEO slug e.g. gpt-4o-token-counter */
  slug: string;

  encoding?: TokenizerEncoding;

  /** Pricing must be verified before enabling */
  pricingBands: PricingBand[];

  /** Official pricing page used to verify this entry */
  officialSourceUrl: string;
  /** YYYY-MM-DD */
  lastVerified: string;

  status: ModelStatus;

  /** Optional notes shown to users */
  notes?: string;

  contextWindow?: number | string;
};

export type TokenizerEncoding = "o200k_base" | "cl100k_base";