import type { CountTokensArgs, CountTokensResult } from "./types";
import { countOpenAITokensLocal } from "./openai_local";

export async function countOpenAITokens(args: CountTokensArgs): Promise<CountTokensResult> {
  const inputTokens = await countOpenAITokensLocal(args.prompt, args.modelId);
  return { inputTokens, countingMode: "exact" };
}