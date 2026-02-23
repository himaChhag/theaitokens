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
  console.log("� API /esthimate POST called at:", timestamp);
  console.log("🔍 Request headers:", Object.fromEntries(request.headers.entries()));
  console.log("🔍 Request method:", request.method);
  console.log("🔍 Request URL:", request.url);
  console.log("🔍 User-Agent:", request.headers.get('user-agent'));
  console.log("🔍 Content-Type:", request.headers.get('content-type'));
  
  try {
    console.log("📥 Starting request processing...");
    
    // Parse request body
    let body: RequestBody;
    try {
      console.log("📝 Attempting to parse JSON body...");
      const rawBody = await request.text();
      console.log("📝 Raw body length:", rawBody.length);
      console.log("📝 Raw body preview:", rawBody.substring(0, 200));
      
      body = JSON.parse(rawBody);
      console.log("✅ JSON parsed successfully:", { 
        provider: body.provider, 
        modelId: body.modelId, 
        promptLength: body.prompt?.length,
        expectedOutputTokens: body.expectedOutputTokens
      });
    } catch (error) {
      console.error("❌ JSON parse error:", error);
      console.error("❌ Error type:", typeof error);
      console.error("❌ Error message:", error instanceof Error ? error.message : 'Unknown error');
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body", details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 400 }
      );
    }

    console.log("🔍 Validating required fields...");
    const { provider, modelId, prompt = "", expectedOutputTokens = 250 } = body;

    if (!provider || !modelId) {
      console.log("❌ Missing required fields:", { provider, modelId });
      return NextResponse.json(
        { ok: false, error: "Missing provider or modelId" },
        { status: 400 }
      );
    }

    console.log("✅ Required fields validated");

    // Find model
    console.log("🔍 Looking up model...");
    let model;
    try {
      model = findModelByProviderAndId(provider, modelId);
      console.log("✅ Model found:", { id: model.id, name: model.name, status: model.status });
    } catch (modelError) {
      console.error("❌ Model lookup failed:", modelError);
      return NextResponse.json(
        { ok: false, error: "Model not found", details: modelError instanceof Error ? modelError.message : 'Unknown error' },
        { status: 404 }
      );
    }

    // Count tokens with fallback
    console.log("🔢 Starting token counting process...");
    let tokenResult;
    let inputTokens;
    let countingMode: "exact" | "near-exact" | "estimate" = "estimate";
    let confidenceNote: string | null = null;

    try {
      console.log("🔢 Attempting to count tokens with external libraries...");
      console.log("🔢 Token counting params:", { provider, modelId, promptLength: prompt.length });
      
      tokenResult = await countTokens({ provider, modelId, prompt });
      inputTokens = tokenResult.inputTokens;
      countingMode = tokenResult.countingMode;
      confidenceNote = tokenResult.confidenceNote ?? null;
      
      console.log("✅ Tokens counted successfully with external libraries:", { 
        inputTokens, 
        mode: countingMode,
        confidenceNote: confidenceNote?.substring(0, 50) + (confidenceNote && confidenceNote.length > 50 ? '...' : '')
      });
    } catch (tokenError) {
      console.error("⚠️ Token counting failed, using fallback:", tokenError);
      console.error("⚠️ Token error type:", typeof tokenError);
      console.error("⚠️ Token error message:", tokenError instanceof Error ? tokenError.message : 'Unknown error');
      console.error("⚠️ Token error stack:", tokenError instanceof Error ? tokenError.stack : 'No stack trace');
      
      // Fallback token estimation
      inputTokens = Math.max(1, Math.ceil(prompt.length / 4));
      countingMode = "estimate";
      confidenceNote = "Using fallback estimation due to tokenizer error";
      console.log("🔄 Using fallback tokens:", { inputTokens, reason: "tokenizer_failed" });
    }

    console.log("💰 Starting pricing calculation...");
    // Calculate costs if model is active
    const pricingReady = model.status === "active" && 
                        Array.isArray(model.pricingBands) && 
                        model.pricingBands.length > 0;
    
    console.log("💰 Pricing readiness check:", { 
      modelStatus: model.status, 
      hasPricingBands: Array.isArray(model.pricingBands),
      pricingBandsLength: Array.isArray(model.pricingBands) ? model.pricingBands.length : 0,
      pricingReady 
    });

    let band: PricingBand | null = null;
    let costs: { inputCost: number; outputCost: number; totalCost: number } | null = null;

    if (pricingReady) {
      try {
        console.log("💰 Calculating pricing band and costs...");
        band = pickBand(model.pricingBands, inputTokens);
        costs = costFor(band, inputTokens, expectedOutputTokens);
        console.log("✅ Costs calculated successfully:", costs);
        console.log("✅ Pricing band used:", { 
          inputPer1M: band.inputPer1M, 
          outputPer1M: band.outputPer1M,
          cachedInputPer1M: band.cachedInputPer1M 
        });
      } catch (pricingError) {
        console.error("❌ Pricing calculation failed:", pricingError);
        console.error("❌ Pricing error type:", typeof pricingError);
        console.error("❌ Pricing error message:", pricingError instanceof Error ? pricingError.message : 'Unknown error');
      }
    } else {
      console.log("⚠️ Pricing not available for this model");
    }

    console.log("📦 Building response object...");
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

    console.log("✅ Response object built successfully");
    console.log("✅ Final response summary:", {
      ok: response.ok,
      provider: response.provider,
      modelId: response.modelId,
      inputTokens: response.inputTokens,
      countingMode: response.countingMode,
      hasCosts: !!response.costs,
      processingTime: Date.now() - new Date(timestamp).getTime() + 'ms'
    });
    
    console.log("📤 Sending successful response...");
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("💥 CRITICAL API ERROR occurred:", error);
    console.error("💥 Error type:", typeof error);
    console.error("💥 Error name:", error?.name);
    console.error("💥 Error message:", error?.message);
    console.error("💥 Error stack:", error?.stack);
    console.error("💥 Error constructor:", error?.constructor?.name);
    console.error("💥 Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    const errorResponse = {
      ok: false, 
      error: error?.message ?? "Unknown error",
      errorType: error?.name ?? "UnknownError",
      timestamp: new Date().toISOString()
    };
    
    console.error("📤 Sending error response:", errorResponse);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Explicitly handle other methods
export async function GET(request: Request) {
  console.log("❌ GET method called on /api/estimate at:", new Date().toISOString());
  console.log("❌ GET request URL:", request.url);
  console.log("❌ GET request headers:", Object.fromEntries(request.headers.entries()));
  
  const errorResponse = {
    ok: false, 
    error: "Method not allowed. Use POST.",
    method: "GET",
    allowedMethods: ["POST", "OPTIONS"],
    timestamp: new Date().toISOString()
  };
  
  console.log("❌ Sending 405 response for GET:", errorResponse);
  return NextResponse.json(errorResponse, { status: 405 });
}

export async function OPTIONS(request: Request) {
  console.log("🔧 OPTIONS method called on /api/estimate at:", new Date().toISOString());
  console.log("🔧 OPTIONS request URL:", request.url);
  console.log("🔧 OPTIONS request headers:", Object.fromEntries(request.headers.entries()));
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
  
  console.log("🔧 Sending OPTIONS response with headers:", headers);
  return new NextResponse(null, { status: 200, headers });
}

// Handle any other HTTP methods
export async function PUT(request: Request) {
  console.log("❌ PUT method called on /api/estimate at:", new Date().toISOString());
  return NextResponse.json({ ok: false, error: "Method not allowed. Use POST." }, { status: 405 });
}

export async function DELETE(request: Request) {
  console.log("❌ DELETE method called on /api/estimate at:", new Date().toISOString());
  return NextResponse.json({ ok: false, error: "Method not allowed. Use POST." }, { status: 405 });
}

export async function PATCH(request: Request) {
  console.log("❌ PATCH method called on /api/estimate at:", new Date().toISOString());
  return NextResponse.json({ ok: false, error: "Method not allowed. Use POST." }, { status: 405 });
}