import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    message: "Debug GET works",
    timestamp: new Date().toISOString(),
    method: "GET"
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      message: "Debug POST works",
      timestamp: new Date().toISOString(),
      method: "POST",
      receivedBody: body
    });
  } catch (error) {
    return NextResponse.json({
      message: "Debug POST works but JSON parse failed",
      timestamp: new Date().toISOString(),
      method: "POST",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}