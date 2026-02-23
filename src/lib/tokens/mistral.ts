import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Mistral without calling Mistral APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countMistralTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Mistral billing tokens may vary based on model and tokenization method.",
  };
}