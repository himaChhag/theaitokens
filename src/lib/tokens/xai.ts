import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for xAI Grok without calling xAI APIs.
 * This is an approximation based on typical tokenization patterns.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countXaiTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. xAI Grok billing tokens may vary based on model and tokenization method.",
  };
}