import { COMPARISONS } from "./config";
import { findModelById } from "@/lib/catalog";
import type { ComparisonData, ComparisonEntry } from "./types";

export function getAllComparisons(): ComparisonEntry[] {
  return COMPARISONS;
}

export function getComparisonBySlug(slug: string): ComparisonData | null {
  const comparison = COMPARISONS.find(c => c.slug === slug);
  if (!comparison) return null;

  try {
    const modelA = findModelById(comparison.modelA.id);
    const modelB = findModelById(comparison.modelB.id);

    return {
      comparison,
      modelA,
      modelB
    };
  } catch {
    return null;
  }
}

export function getRelatedComparisons(currentSlug: string, limit = 3): ComparisonEntry[] {
  return COMPARISONS
    .filter(c => c.slug !== currentSlug)
    .slice(0, limit);
}

export function getComparisonsForModel(modelId: string, limit = 3): ComparisonEntry[] {
  return COMPARISONS
    .filter(c => c.modelA.id === modelId || c.modelB.id === modelId)
    .slice(0, limit);
}

export { COMPARISONS };