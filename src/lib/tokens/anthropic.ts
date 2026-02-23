import "server-only";
import type { CountTokensArgs, CountTokensResult } from "./types";
import { countTokens } from "@anthropic-ai/tokenizer";

export async function countAnthropicTokens(args: CountTokensArgs): Promise<CountTokensResult> {
  try {
    const inputTokens = countTokens(args.prompt);
    
    return {
      inputTokens,
      countingMode: "exact",
      confidenceNote: "Counted using Anthropic's official tokenizer. Billing tokens may vary based on message formatting and system/tool content.",
    };
  } catch (error) {
    // Fallback to estimation if tokenizer fails
    const inputTokens = Math.max(0, Math.ceil((args.prompt ?? "").length / 4));
    
    return {
      inputTokens,
      countingMode: "estimate",
      confidenceNote: "Fallback estimation used due to tokenizer error. Claude billing tokens may vary based on message formatting and system/tool content.",
    };
  }
}