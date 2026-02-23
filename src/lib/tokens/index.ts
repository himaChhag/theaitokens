import type { CountTokensArgs, CountTokensResult } from "./types";
import { countOpenAITokens } from "./openai";
import { countAnthropicTokens } from "./anthropic";
import { countGeminiTokens } from "./gemini";

export async function countTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  switch (args.provider) {
    case "openai":
      return countOpenAITokens(args);
    case "anthropic":
      return countAnthropicTokens(args);
    case "google":
      return countGeminiTokens(args);
    default:
      return {
        inputTokens: 0,
        countingMode: "estimate",
        confidenceNote: "Unknown provider.",
      };
  }
}