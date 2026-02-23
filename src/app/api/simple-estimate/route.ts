import { NextResponse } from "next/server";
import type { Provider } from "@/lib/catalog/types";
import { findModelByProviderAndId } from "@/lib/catalog";
import { pickBand } from "@/lib/pricing/band";
import { costFor } from "@/lib/pricing/math";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

interface RequestBody {
  provider: Provider;
  modelId: string;
  prompt: string;
  expectedOutputTokens?: number;
}

// Simple token estimation without external libraries
function estimateTokensSimple(text: string, provider: Provider): number {
  if (!text || text.length === 0) return 0;
  
  // Basic word-based estimation
  const words = text.split(/\s+/).filter(word => word.length > 0);
  let tokenCount = 0;
  
  // Provider-specific patterns
  const charPerToken = {
    openai: 4.0,
    anthropic: 4.1,
    google: 3.8,
    meta: 4.2,
    mistral: 4.0,
    cohere: 4.0,
    xai: 4.0,
    perplexity: 4.0,
    together: 4.0,
  }[provider] || 4.0;
  
  for (const word of words) {
    if (word.length <= 3) {
      tokenCount += 1;
    } else {
      tokenCount += Math.ceil(word.length / charPerToken);
    }
  }
  
  // Add tokens for punctuation
  const punctuationCount = (text.match(/[.,!?;:()[\]{}\"'-]/g) || []).length;
  tokenCount += Math.ceil(punctuationCount * 0.8);
  
  return Math.max(1, Math.round(tokenCount));
}

export async function POST(request: Request) {
  console.log("🔧 SIMPLE ESTIMATE API CALLED:", new Date().toISOString());
  
  try {
    const body: RequestBody = await request.json();
    console.log("📝 SIMPLE BODY:", { provider: body.provider, modelId: body.modelId });

    const { provider, modelId, prompt = "", expectedOutputTokens = 250 } = body;

    if (!provider || !modelId) {
      return NextResponse.json({ ok: false, error: "Missing provider or modelId" }, { status: 400 });
    }

    const model = findModelByProviderAndId(provider, modelId);
    console.log("🔍 SIMPLE MODEL FOUND:", { id: model.id, status: model.status });

    // Simple token estimation
    const inputTokens = estimateTokensSimple(prompt, provider);
    console.log("🔢 SIMPLE TOKENS:", { inputTokens });

    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;

    let band = null;
    let costs = null;

    if (pricingReady) {
      try {
        band = pickBand(model.pricingBands, inputTokens);
        costs = costFor(band, inputTokens, expectedOutputTokens);
        console.log("💰 SIMPLE COSTS:", costs);
      } catch (pricingError) {
        console.log("⚠️ SIMPLE PRICING FAILED:", pricingError);
      }
    }

    const response = {
      ok: true,
      provider,
      modelId: model.id,
      modelName: model.name,
      slug: model.slug,
      inputTokens,
      expectedOutputTokens,
      countingMode: "estimate" as const,
      confidenceNote: "Simple estimation without external tokenizer libraries",
      pricingReady,
      pricingBand: band,
      costs,
      pricing: {
        officialSourceUrl: model.officialSourceUrl,
        lastVerified: model.lastVerified,
      },
    };

    console.log("✅ SIMPLE SUCCESS");
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("💥 SIMPLE ERROR:", error);
    return NextResponse.json({ ok: false, error: error?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST method" }, { status: 405 });
}