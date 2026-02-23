import "server-only";
import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Cohere doesn't provide an official tokenizer package.
 * Using improved estimation based on Cohere's tokenization patterns.
 */
function estimateCohereTokens(text: string): number {
  if (!text || text.length === 0) return 0;
  
  // Cohere tokenization is similar to other modern models
  // but tends to be slightly more efficient than basic char/4
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  for (const word of words) {
    if (word.length <= 4) {
      tokenCount += 1;
    } else if (word.length <= 10) {
      tokenCount += Math.ceil(word.length / 4.5);
    } else {
      tokenCount += Math.ceil(word.length / 4);
    }
  }
  
  // Add tokens for punctuation
  const punctuationCount = (text.match(/[.,!?;:()[\]{}"'-]/g) || []).length;
  tokenCount += Math.ceil(punctuationCount * 0.7);
  
  return Math.max(1, Math.round(tokenCount));
}

export async function countCohereTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateCohereTokens(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally using character-based approximation. Cohere uses proprietary tokenization - actual token counts may vary significantly.",
  };
}