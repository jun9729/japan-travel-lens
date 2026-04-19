import { NextRequest, NextResponse } from "next/server";
import { PAYPAL_BASE, getPayPalAccessToken, paypalConfigured } from "@/lib/paypal";
import { getPriceForCountry } from "@/lib/pricing";

export const runtime = "edge"; // 콜드 스타트 최소화

export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
  }

  try {
    const country = req.headers.get("x-vercel-ip-country");
    const price = getPriceForCountry(country);

    // PayPal 이 커버하지 않는 통화는 USD fallback
    const ppCurrency = ["krw", "twd", "thb"].includes(price.currency)
      ? "USD"
      : price.currency.toUpperCase();
    const ppAmount = ppCurrency === "USD" ? "1.00" : price.paypalAmount;

    const token = await getPayPalAccessToken();

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

    const order = (await res.json()) as { id?: string };
    if (!order.id) throw new Error(JSON.stringify(order));
    return NextResponse.json({ orderID: order.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
