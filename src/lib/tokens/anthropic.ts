import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Local-only fallback for Claude without calling Anthropic APIs.
 * This is an approximation. Claude billing tokens can vary with message formatting.
 */
function estimateTokensByChars(text: string) {
  return Math.max(0, Math.ceil((text ?? "").length / 4));
}

export async function countAnthropicTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateTokensByChars(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally. Claude billing tokens may vary based on message formatting and system/tool content.",
  };
}