import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? null;
  return NextResponse.json({ clientId });
}
