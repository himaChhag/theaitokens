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
    const tokenResult = await countTokens({ provider, modelId, prompt });
    const inputTokens = tokenResult.inputTokens;

    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      band = pickBand(model.pricingBands, inputTokens);
      costs = costFor(band, inputTokens, expectedOutputTokens);
    }

    return NextResponse.json({
      ok: true,
      provider,
      modelId: model.id,
      modelName: model.name,
      slug: model.slug,
      inputTokens,
      expectedOutputTokens,
      countingMode: tokenResult.countingMode,
      confidenceNote: tokenResult.confidenceNote ?? null,
      pricingReady,
      pricingBand: band,
      costs,
      pricing: {
        officialSourceUrl: model.officialSourceUrl,
        lastVerified: model.lastVerified,
      },
    });

  } catch (error: any) {
    console.error("💥 ERROR:", error);
    return NextResponse.json({ ok: false, error: error?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST method" }, { status: 405 });
}