import { NextRequest, NextResponse } from "next/server";
import { getPriceForCountry } from "@/lib/pricing";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");
  const price = getPriceForCountry(country);
  return NextResponse.json({ price, country });
}
