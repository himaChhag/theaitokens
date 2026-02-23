import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Meta Llama without calling Meta APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countMetaTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Meta Llama billing tokens may vary based on API provider and tokenization method.",
  };
}