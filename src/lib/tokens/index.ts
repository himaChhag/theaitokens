import type { CountTokensArgs, CountTokensResult } from "./types";
import { countOpenAITokens } from "./openai";
import { countAnthropicTokens } from "./anthropic";
import { countGeminiTokens } from "./gemini";
import { countCohereTokens } from "./cohere";
import { countMistralTokens } from "./mistral";
import { countXaiTokens } from "./xai";
import { countMetaTokens } from "./meta";
import { countPerplexityTokens } from "./perplexity";
import { countTogetherTokens } from "./together";

export async function countTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  switch (args.provider) {
    case "openai":
      return countOpenAITokens(args);
    case "anthropic":
      return countAnthropicTokens(args);
    case "google":
      return countGeminiTokens(args);
    case "cohere":
      return countCohereTokens(args);
    case "mistral":
      return countMistralTokens(args);
    case "xai":
      return countXaiTokens(args);
    case "meta":
      return countMetaTokens(args);
    case "perplexity":
      return countPerplexityTokens(args);
    case "together":
      return countTogetherTokens(args);
    default:
      return {
        inputTokens: 0,
        countingMode: "estimate",
        confidenceNote: "Unknown provider.",
      };
  }
}