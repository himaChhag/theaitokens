import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Cohere without calling Cohere APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countCohereTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Cohere billing tokens may vary based on model and tokenization method.",
  };
}