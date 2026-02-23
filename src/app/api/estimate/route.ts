import { NextResponse } from "next/server";
import type { Provider, PricingBand } from "@/lib/catalog/types";
import { findModelByProviderAndId } from "@/lib/catalog";
import { pickBand } from "@/lib/pricing/band";
import { costFor } from "@/lib/pricing/math";
import { countTokens } from "@/lib/tokens";

export const runtime = "nodejs";

type Body = {
  provider: Provider;
  modelId: string;
  prompt: string;
  expectedOutputTokens?: number;
};

export async function POST(req: Request) {
  // Add debugging for production
  console.log("API /estimate POST called at:", new Date().toISOString());
  
  // Ensure we always return JSON (prevents client JSON.parse failures)
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    console.log("Invalid content-type:", ct);
    return NextResponse.json(
      { ok: false as const, error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  let b: Body;
  try {
    b = (await req.json()) as Body;
    console.log("Request body parsed:", { provider: b.provider, modelId: b.modelId, promptLength: b.prompt?.length });
  } catch (error) {
    console.log("JSON parse error:", error);
    return NextResponse.json(
      { ok: false as const, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  try {
    const provider = b.provider;
    const modelId = b.modelId;
    const prompt = (b.prompt ?? "").toString();
    const expectedOutputTokens = Number.isFinite(b.expectedOutputTokens)
      ? Math.max(0, Number(b.expectedOutputTokens))
      : 250;

    if (!provider || !modelId) {
      return NextResponse.json(
        { ok: false as const, error: "Missing provider or modelId" },
        { status: 400 }
      );
    }

    const model = findModelByProviderAndId(provider, modelId);

    // Always compute tokens (Option B friendly)
    const tokenResult = await countTokens({ provider, modelId, prompt });
    const inputTokens = tokenResult.inputTokens;

    // Only compute costs if pricing is enabled AND model is active
    const pricingReady =
      model.status === "active" &&
      Array.isArray(model.pricingBands) &&
      model.pricingBands.length > 0;

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      band = pickBand(model.pricingBands, inputTokens);
      costs = costFor(band, inputTokens, expectedOutputTokens);
    }

    return NextResponse.json({
      ok: true as const,
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
  } catch (e: any) {
    return NextResponse.json(
      { ok: false as const, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}