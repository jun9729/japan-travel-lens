import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  if (!clientId) return NextResponse.json({ clientId: null }, { status: 404 });
  return NextResponse.json({ clientId });
}
