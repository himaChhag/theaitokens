import type { ModelEntry } from "@/lib/catalog/types";

export type ComparisonEntry = {
  slug: string;
  title: string;
  description: string;
  modelA: {
    id: string;
    label?: string; // Optional custom label like "GPT-4o"
  };
  modelB: {
    id: string;
    label?: string;
  };
  winner?: "A" | "B" | "tie";
  summary: string;
  keyDifferences: string[];
  useCases: {
    modelA: string[];
    modelB: string[];
  };
};

export type ComparisonData = {
  comparison: ComparisonEntry;
  modelA: ModelEntry;
  modelB: ModelEntry;
};