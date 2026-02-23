import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "fix-405-v3",
    message: "API working - moved from /api/estimate to /estimate"
  });
}