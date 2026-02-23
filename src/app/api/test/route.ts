import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "API deployment working",
    timestamp: new Date().toISOString(),
    version: "2026-02-23-v2"
  });
}

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "POST method working",
    timestamp: new Date().toISOString(),
    version: "2026-02-23-v2"
  });
}