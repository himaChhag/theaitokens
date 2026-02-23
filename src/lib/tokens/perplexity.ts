import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Perplexity without calling Perplexity APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countPerplexityTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Perplexity billing tokens may vary based on search augmentation and tokenization method.",
  };
}