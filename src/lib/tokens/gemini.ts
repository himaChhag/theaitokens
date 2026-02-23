import type { CountTokensArgs, CountTokensResult } from "./types";

function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countGeminiTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Gemini tokenization differs; ~4 characters per token is a rough approximation.",
  };
}