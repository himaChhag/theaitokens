import { NextResponse } from "next/server";
import type { Provider, PricingBand } from "@/lib/catalog/types";
import { findModelByProviderAndId } from "@/lib/catalog";
import { pickBand } from "@/lib/pricing/band";
import { costFor } from "@/lib/pricing/math";
import { countTokens } from "@/lib/tokens";

export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

interface RequestBody {
  provider: Provider;
  modelId: string;
  prompt: string;
  expectedOutputTokens?: number;
}

export async function POST(request: Request) {
  console.log("🚀 ESTIMATE API CALLED:", new Date().toISOString());
  
  try {
    const body: RequestBody = await request.json();
    console.log("📝 BODY:", { provider: body.provider, modelId: body.modelId });

    const { provider, modelId, prompt = "", expectedOutputTokens = 250 } = body;

    if (!provider || !modelId) {
      return NextResponse.json({ ok: false, error: "Missing provider or modelId" }, { status: 400 });
    }

    const model = findModelByProviderAndId(provider, modelId);
    console.log("🔍 MODEL FOUND:", { id: model.id, status: model.status });

    // Try to count tokens with fallback
    let tokenResult;
    let inputTokens;
    let countingMode: "exact" | "near-exact" | "estimate" = "estimate";
    let confidenceNote: string | null = null;

    try {
      tokenResult = await countTokens({ provider, modelId, prompt });
      inputTokens = tokenResult.inputTokens;
      countingMode = tokenResult.countingMode;
      confidenceNote = tokenResult.confidenceNote;
      console.log("✅ TOKENS COUNTED:", { inputTokens, mode: countingMode });
    } catch (tokenError) {
      console.log("⚠️ TOKENIZER FAILED, using fallback:", tokenError);
      // Fallback token estimation
      const words = prompt.split(/\s+/).filter(word => word.length > 0);
      inputTokens = Math.max(1, Math.ceil(prompt.length / 4)); // Basic char/4 estimation
      countingMode = "estimate";
      confidenceNote = "Using fallback estimation due to tokenizer error";
    }

    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      try {
        band = pickBand(model.pricingBands, inputTokens);
        costs = costFor(band, inputTokens, expectedOutputTokens);
        console.log("💰 COSTS:", costs);
      } catch (pricingError) {
        console.log("⚠️ PRICING FAILED:", pricingError);
        // Continue without pricing
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
      countingMode,
      confidenceNote,
      pricingReady,
      pricingBand: band,
      costs,
      pricing: {
        officialSourceUrl: model.officialSourceUrl,
        lastVerified: model.lastVerified,
      },
    };

    console.log("✅ SUCCESS RESPONSE");
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("💥 CRITICAL ERROR:", error);
    return NextResponse.json({ ok: false, error: error?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST method" }, { status: 405 });
}