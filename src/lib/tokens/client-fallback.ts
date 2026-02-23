// Client-side fallback for token estimation when server-side tokenizers fail
import type { Provider } from "@/lib/catalog/types";

export function estimateTokensClientSide(text: string, provider: Provider): number {
  if (!text || text.length === 0) return 0;
  
  // Basic estimation based on provider patterns
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  // Provider-specific estimation patterns
  switch (provider) {
    case "openai":
      // OpenAI tiktoken typically ~4 chars per token
      for (const word of words) {
        if (word.length <= 3) tokenCount += 1;
        else if (word.length <= 8) tokenCount += Math.ceil(word.length / 4);
        else tokenCount += Math.ceil(word.length / 3.8);
      }
      break;
      
    case "anthropic":
      // Claude tokenizer similar efficiency
      for (const word of words) {
        if (word.length <= 3) tokenCount += 1;
        else if (word.length <= 8) tokenCount += Math.ceil(word.length / 4.1);
        else tokenCount += Math.ceil(word.length / 3.9);
      }
      break;
      
    case "google":
      // Gemini SentencePiece ~3.5-4 chars per token
      for (const word of words) {
        if (word.length <= 3) tokenCount += 1;
        else if (word.length <= 8) tokenCount += Math.ceil(word.length / 3.8);
        else tokenCount += Math.ceil(word.length / 3.5);
      }
      break;
      
    default:
      // General estimation for other providers
      for (const word of words) {
        if (word.length <= 3) tokenCount += 1;
        else if (word.length <= 8) tokenCount += Math.ceil(word.length / 4);
        else tokenCount += Math.ceil(word.length / 3.7);
      }
  }
  
  // Add tokens for punctuation
  const punctuationCount = (text.match(/[.,!?;:()[\]{}"'-]/g) || []).length;
  tokenCount += Math.ceil(punctuationCount * 0.8);
  
  return Math.max(1, Math.round(tokenCount));
}

export function getBasicPricing(provider: Provider, modelId: string) {
  // Basic pricing fallback - these are approximate
  const basicPricing: Record<string, { input: number; output: number }> = {
    "gpt-4o": { input: 2.5, output: 10.0 },
    "gpt-5": { input: 1.25, output: 10.0 },
    "gpt-5.1": { input: 1.25, output: 10.0 },
    "gpt-5.2": { input: 1.75, output: 14.0 },
    "claude-sonnet-4-6": { input: 3.0, output: 15.0 },
    "claude-opus-4-6": { input: 5.0, output: 25.0 },
    "gemini-2.5-pro": { input: 1.25, output: 10.0 },
  };
  
  return basicPricing[modelId] || { input: 2.0, output: 8.0 };
}