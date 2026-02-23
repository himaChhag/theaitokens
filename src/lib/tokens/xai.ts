import "server-only";
import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Improved estimation for xAI Grok models
 * Grok likely uses modern tokenization similar to other LLMs
 */
function estimateGrokTokens(text: string): number {
  if (!text || text.length === 0) return 0;
  
  // Grok tokenization is likely similar to other modern models
  // Using a more sophisticated estimation than simple char/4
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  for (const word of words) {
    if (word.length <= 3) {
      tokenCount += 1;
    } else if (word.length <= 8) {
      tokenCount += Math.ceil(word.length / 4.2);
    } else {
      tokenCount += Math.ceil(word.length / 3.8);
    }
  }
  
  // Add tokens for punctuation and numbers
  const punctuationCount = (text.match(/[.,!?;:()[\]{}"'-]/g) || []).length;
  tokenCount += Math.ceil(punctuationCount * 0.8);
  
  const numberCount = (text.match(/\d+/g) || []).length;
  tokenCount += numberCount;
  
  return Math.max(1, Math.round(tokenCount));
}

export async function countXaiTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateGrokTokens(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote:
      "Estimated locally using character-based approximation. xAI Grok uses proprietary tokenization - actual token counts may vary significantly.",
  };
}