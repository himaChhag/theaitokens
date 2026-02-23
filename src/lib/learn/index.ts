import { LEARN_ARTICLES } from "./config";
import type { LearnArticle } from "./types";

export function getAllArticles(): LearnArticle[] {
  return LEARN_ARTICLES;
}

export function getArticleBySlug(slug: string): LearnArticle | null {
  return LEARN_ARTICLES.find(article => article.slug === slug) || null;
}

export function getArticlesByCategory(category: LearnArticle["category"]): LearnArticle[] {
  return LEARN_ARTICLES.filter(article => article.category === category);
}

export function getRelatedArticles(currentSlug: string, limit = 3): LearnArticle[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  // First try to get explicitly related articles
  const explicitlyRelated = currentArticle.relatedArticles
    ? LEARN_ARTICLES.filter(article => 
        currentArticle.relatedArticles!.includes(article.slug)
      ).slice(0, limit)
    : [];

  // If we need more, get articles from the same category
  if (explicitlyRelated.length < limit) {
    const sameCategory = LEARN_ARTICLES
      .filter(article => 
        article.category === currentArticle.category && 
        article.slug !== currentSlug &&
        !explicitlyRelated.some(related => related.slug === article.slug)
      )
      .slice(0, limit - explicitlyRelated.length);
    
    return [...explicitlyRelated, ...sameCategory];
  }

  return explicitlyRelated;
}

export function getArticlesByTag(tag: string): LearnArticle[] {
  return LEARN_ARTICLES.filter(article => article.tags.includes(tag));
}

export { LEARN_ARTICLES };
export type { LearnArticle, LearnContent } from "./types";