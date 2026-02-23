import { CATALOG } from "@/lib/catalog";
import type { Provider } from "@/lib/catalog/types";

/**
 * Utility: slugify string
 */
export function toSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * SEO rule:
 * <modelName>-token-counter
 */
export function modelTokenCounterSlug(modelName: string) {
  return `${toSlug(modelName)}-token-counter`;
}

/**
 * Generates model pages directly from catalog.
 * Only active models.
 */
export function getModelTokenCounterPages(): {
  provider: Provider;
  slug: string;
}[] {
  return CATALOG
    .filter((m) => m.status === "active")
    .map((m) => ({
      provider: m.provider,
      slug: m.slug,
    }));
}