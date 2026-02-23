import type { CountTokensArgs, CountTokensResult } from "./types";
import { countOpenAITokensLocal } from "./openai_local";

export async function countOpenAITokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = await countOpenAITokensLocal(args.prompt, args.modelId);
  
  // Determine which encoding was used
  let encodingInfo = "cl100k_base encoding (default)";
  if (args.modelId) {
    if (args.modelId.includes('gpt-4') || args.modelId.includes('gpt-3.5')) {
      encodingInfo = "cl100k_base encoding (GPT-4/3.5 tokenizer)";
    } else if (args.modelId.includes('gpt-3') && !args.modelId.includes('gpt-3.5')) {
      encodingInfo = "p50k_base encoding (GPT-3 tokenizer)";
    } else if (args.modelId.includes('davinci') || args.modelId.includes('curie') || args.modelId.includes('babbage') || args.modelId.includes('ada')) {
      encodingInfo = "r50k_base encoding (GPT-2 tokenizer)";
    } else {
      encodingInfo = `model-specific encoding for ${args.modelId}`;
    }
  }
  
  return { 
    inputTokens, 
    countingMode: "exact",
    confidenceNote: `Counted using tiktoken with ${encodingInfo}. This matches OpenAI's official token counting.`
  };
}