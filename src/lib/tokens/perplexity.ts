import "server-only";
import type { CountTokensArgs, CountTokensResult } from "./types";

/**
 * Estimation for Perplexity Sonar models
 * Since Perplexity hasn't documented their specific tokenizer implementation,
 * we use a general estimation approach based on typical modern tokenization patterns.
 */
function estimateSonarTokens(text: string): number {
  if (!text || text.length === 0) return 0;
  
  // General estimation approach for modern AI models
  // Most models use subword tokenization with ~3.5-4.5 characters per token
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  for (const word of words) {
    if (word.length <= 3) {
      tokenCount += 1;
    } else if (word.length <= 8) {
      tokenCount += Math.ceil(word.length / 4);
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

export async function countPerplexityTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = estimateSonarTokens(args.prompt);

  return {
    inputTokens,
    countingMode: "estimate",
    confidenceNote: "Estimated locally using character-based approximation. Perplexity uses proprietary tokenization for Sonar models - for accurate counts, use Perplexity's official token counter.",
  };
}