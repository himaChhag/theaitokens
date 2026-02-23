export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  category: "basics" | "pricing" | "models" | "advanced";
  readTime: number; // minutes
  publishedAt: string;
  updatedAt?: string;
  content: LearnContent[];
  relatedArticles?: string[]; // slugs of related articles
  tags: string[];
};

export type LearnContent = 
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language?: string; code: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "link"; text: string; href: string; external?: boolean };