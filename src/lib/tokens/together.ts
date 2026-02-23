import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Together AI without calling Together APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countTogetherTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Together AI billing tokens may vary based on model and tokenization method.",
  };
}