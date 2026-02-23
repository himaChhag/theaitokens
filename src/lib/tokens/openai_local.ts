// src/lib/tokens/openai_local.ts
import "server-only";
import { encoding_for_model, get_encoding, type TiktokenModel } from "tiktoken";

/**
 * Exact token counting using tiktoken (Node runtime only).
 * Matches your usage:
 *   await countOpenAITokensLocal(args.prompt, args.modelId)
 */
export async function countOpenAITokensLocal(
  prompt: string,
  modelId?: string
): Promise<number> {
  let enc: ReturnType<typeof get_encoding> | undefined;

  try {
    if (modelId) {
      try {
        enc = encoding_for_model(modelId as TiktokenModel);
      } catch {
        enc = get_encoding("cl100k_base");
      }
    } else {
      enc = get_encoding("cl100k_base");
    }

    return enc.encode(prompt).length;
  } finally {
    enc?.free();
  }
}