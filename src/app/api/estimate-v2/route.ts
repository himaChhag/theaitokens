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
  const timestamp = new Date().toISOString();
  console.log("🚀 API /estimate-v2 POST called at:", timestamp);
  console.log("🔍 Request headers:", Object.fromEntries(request.headers.entries()));
  console.log("🔍 Request method:", request.method);
  console.log("🔍 Request URL:", request.url);
  
  try {
    console.log("📥 Starting request processing...");
    
    // Parse request body
    let body: RequestBody;
    try {
      console.log("📝 Attempting to parse JSON body...");
      const rawBody = await request.text();
      console.log("📝 Raw body length:", rawBody.length);
      
      body = JSON.parse(rawBody);
      console.log("✅ JSON parsed successfully:", { 
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
    console.log("🔍 Looking up model...");
    const model = findModelByProviderAndId(provider, modelId);
    console.log("✅ Model found:", { id: model.id, name: model.name, status: model.status });

    // Count tokens with fallback
    console.log("🔢 Starting token counting...");
    let inputTokens;
    let countingMode: "exact" | "near-exact" | "estimate" = "estimate";
    let confidenceNote: string | null = null;

    try {
      console.log("🔢 Attempting tiktoken...");
      const tokenResult = await countTokens({ provider, modelId, prompt });
      inputTokens = tokenResult.inputTokens;
      countingMode = tokenResult.countingMode;
      confidenceNote = tokenResult.confidenceNote ?? null;
      console.log("✅ Tiktoken success:", { inputTokens, mode: countingMode });
    } catch (tokenError) {
      console.error("⚠️ Tiktoken failed, using fallback:", tokenError);
      inputTokens = Math.max(1, Math.ceil(prompt.length / 4));
      countingMode = "estimate";
      confidenceNote = "Using fallback estimation due to tokenizer error";
      console.log("🔄 Fallback tokens:", { inputTokens });
    }

    // Calculate costs
    console.log("💰 Calculating costs...");
    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      try {
        band = pickBand(model.pricingBands, inputTokens);
        costs = costFor(band, inputTokens, expectedOutputTokens);
        console.log("✅ Costs calculated:", costs);
      } catch (pricingError) {
        console.error("❌ Pricing failed:", pricingError);
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

    console.log("✅ Success! Sending response");
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("💥 Critical error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("❌ GET method called on /api/estimate-v2");
  return NextResponse.json(
    { ok: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}