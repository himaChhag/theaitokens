import { NextResponse } from "next/server";
import type { Provider, PricingBand } from "@/lib/catalog/types";
import { findModelByProviderAndId } from "@/lib/catalog";
import { pickBand } from "@/lib/pricing/band";
import { costFor } from "@/lib/pricing/math";
import { countTokens } from "@/lib/tokens";

// Force this to be a dynamic route
export const dynamic = 'force-dynamic';
export const runtime = "nodejs";

interface RequestBody {
  provider: Provider;
  modelId: string;
  prompt: string;
  expectedOutputTokens?: number;
}

export async function POST(request: Request) {
  console.log("🚀 API /estimate POST called at:", new Date().toISOString());
  console.log("🔍 Request headers:", Object.fromEntries(request.headers.entries()));
  console.log("🔍 Request method:", request.method);
  console.log("🔍 Request URL:", request.url);
  
  try {
    // Parse request body
    let body: RequestBody;
    try {
      body = await request.json();
      console.log("📝 Request parsed:", { 
        provider: body.provider, 
        modelId: body.modelId, 
        promptLength: body.prompt?.length 
      });
    } catch (error) {
      console.error("❌ JSON parse error:", error);
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { provider, modelId, prompt = "", expectedOutputTokens = 250 } = body;

    if (!provider || !modelId) {
      console.log("❌ Missing required fields:", { provider, modelId });
      return NextResponse.json(
        { ok: false, error: "Missing provider or modelId" },
        { status: 400 }
      );
    }

    // Find model
    const model = findModelByProviderAndId(provider, modelId);
    console.log("🔍 Model found:", { id: model.id, name: model.name, status: model.status });

    // Count tokens
    const tokenResult = await countTokens({ provider, modelId, prompt });
    const inputTokens = tokenResult.inputTokens;
    console.log("🔢 Tokens counted:", { inputTokens, mode: tokenResult.countingMode });

    // Calculate costs if model is active
    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      band = pickBand(model.pricingBands, inputTokens);
      costs = costFor(band, inputTokens, expectedOutputTokens);
      console.log("💰 Costs calculated:", costs);
    }

    const response = {
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
    };

    console.log("✅ Success response prepared");
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("💥 API Error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

// Explicitly handle other methods
export async function GET() {
  console.log("❌ GET method called on /api/estimate");
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}

export async function OPTIONS(request: Request) {
  console.log("🔧 OPTIONS method called on /api/estimate");
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}