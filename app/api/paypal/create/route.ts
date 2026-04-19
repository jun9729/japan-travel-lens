import { NextRequest, NextResponse } from "next/server";
import { getPriceForCountry } from "@/lib/pricing";

export const runtime = "nodejs";

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const creds = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("PayPal auth failed");
  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
  }

  try {
    const country = req.headers.get("x-vercel-ip-country");
    const price = getPriceForCountry(country);
    const token = await getAccessToken();

    // PayPal은 KRW/JPY 일부 미지원 → USD fallback
    const ppCurrency = ["krw", "twd", "thb"].includes(price.currency)
      ? "USD"
      : price.currency.toUpperCase();
    const ppAmount = ppCurrency === "USD" ? "1.00" : price.paypalAmount;

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: ppCurrency, value: ppAmount },
            description: "Travel Lens — 24h Unlimited",
          },
        ],
      }),
    });

    const order = await res.json();
    if (!order.id) throw new Error(JSON.stringify(order));
    return NextResponse.json({ orderID: order.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
