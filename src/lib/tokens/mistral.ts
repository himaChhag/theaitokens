import "server-only";
import type { CountTokensArgs, CountTokensResult } from "./types";
import { AutoTokenizer } from "@xenova/transformers";

// Cache tokenizers to avoid reloading
const tokenizerCache = new Map<string, any>();

/**
 * Get or create a tokenizer for Mistral models
 */
async function getMistralTokenizer() {
  const cacheKey = 'mistral';
  if (tokenizerCache.has(cacheKey)) {
    return tokenizerCache.get(cacheKey);
  }

  try {
    // Use Mistral 7B tokenizer as the standard for all Mistral models
    const tokenizer = await AutoTokenizer.from_pretrained('mistralai/Mistral-7B-v0.1');
    tokenizerCache.set(cacheKey, tokenizer);
    return tokenizer;
  } catch (error) {
    throw new Error(`Failed to load Mistral tokenizer: ${error}`);
  }
}

/**
 * Fallback estimation for Mistral models
 */
function estimateMistralTokens(text: string): number {
  if (!text || text.length === 0) return 0;
  
  // Mistral uses SentencePiece optimized for byte-level processing
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  for (const word of words) {
    if (word.length <= 3) {
      tokenCount += 1;
    } else if (word.length <= 8) {
      tokenCount += Math.ceil(word.length / 4);
    } else {
      tokenCount += Math.ceil(word.length / 3.5);
    }
  }
  
  // Add tokens for punctuation and numbers
  const punctuationCount = (text.match(/[.,!?;:()[\]{}"'-]/g) || []).length;
  tokenCount += Math.ceil(punctuationCount * 0.8);
  
  const numberCount = (text.match(/\d+/g) || []).length;
  tokenCount += numberCount;
  
  return Math.max(1, Math.round(tokenCount * 0.93)); // Mistral is slightly more efficient
}

export async function countMistralTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  try {
    const tokenizer = await getMistralTokenizer();
    const tokens = await tokenizer.encode(args.prompt);
    
    return {
      inputTokens: tokens.length,
      countingMode: "exact",
      confidenceNote: "Counted using SentencePiece tokenizer (Mistral models use SentencePiece-based tokenization)",
    };
  } catch (error) {
    // Fallback to estimation if tokenizer fails
    const inputTokens = estimateMistralTokens(args.prompt);
    
    return {
      inputTokens,
      countingMode: "estimate",
      confidenceNote: "Estimated using SentencePiece-like logic. Actual Mistral tokenization may vary slightly.",
    };
  }
}