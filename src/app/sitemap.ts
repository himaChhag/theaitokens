import type { MetadataRoute } from "next";
import { activeModels } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://theaitokens.com";

  const modelPages = activeModels().map((m) => {
    const routeProvider = m.provider === 'anthropic' ? 'claude' : m.provider;
    return {
      url: `${baseUrl}/${routeProvider}/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    };
  });

  // Provider overview pages
  const providerPages = [
    { url: `${baseUrl}/openai`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/claude`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/google`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.95 },
  ];

  // keep any existing entries you already include here as well (home/tools/etc)
  return [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/tools/cost-calculator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools/token-counter`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    ...providerPages,
    ...modelPages,
  ];
}