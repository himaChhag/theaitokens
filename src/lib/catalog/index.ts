import type { ModelEntry, Provider } from "./types";
import { OPENAI_MODELS } from "./openai";
import { ANTHROPIC_MODELS } from "./anthropic";
import { GEMINI_MODELS } from "./gemini";

export const CATALOG: ModelEntry[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GEMINI_MODELS,
];

export function activeModels() {
  return CATALOG.filter(m => m.status === "active");
}

export function modelsByProvider(provider: Provider) {
  return activeModels().filter(m => m.provider === provider);
}

export function findModelByProviderAndId(provider: Provider, id: string) {
  const m = CATALOG.find(x => x.provider === provider && x.id === id);
  if (!m) throw new Error(`Unknown model: ${provider}:${id}`);
  return m;
}

export function findModelByProviderAndSlug(provider: Provider, slug: string) {
  const m = CATALOG.find(x => x.provider === provider && x.slug === slug);
  if (!m) throw new Error(`Unknown model page: ${provider}/${slug}`);
  return m;
}

export function findModelById(id: string) {
  const m = CATALOG.find(x => x.id === id);
  if (!m) throw new Error(`Unknown model: ${id}`);
  return m;
}