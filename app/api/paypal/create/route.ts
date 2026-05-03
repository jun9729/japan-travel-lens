import { NextRequest, NextResponse } from "next/server";
import { PAYPAL_BASE, getPayPalAccessToken, paypalConfigured } from "@/lib/paypal";
import { getPriceForCountry } from "@/lib/pricing";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json(
      { error: "PayPal not configured" },
      { status: 503 }
    );
  }

  try {
    const country = req.headers.get("x-vercel-ip-country");
    const price = getPriceForCountry(country); // 항상 $1 USD
    const ppCurrency = price.currency.toUpperCase(); // "USD"
    const ppAmount = price.paypalAmount; // "1.00"

    const token = await getPayPalAccessToken();

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

    // PayPal 이 HTML 에러 페이지를 보낼 수 있어서 content-type 체크
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
      const body = await res.text();
      console.error("[paypal/create] non-JSON response", {
        status: res.status,
        ct,
        body: body.slice(0, 500),
        base: PAYPAL_BASE,
      });
      return NextResponse.json(
        {
          error: `PayPal returned non-JSON (status ${res.status})`,
          detail: body.slice(0, 200),
        },
        { status: 502 }
      );
    }

    const order = (await res.json()) as { id?: string; details?: unknown[]; message?: string };
    if (!order.id) {
      console.error("[paypal/create] no order id", order);
      return NextResponse.json(
        { error: order.message ?? "PayPal order creation failed", detail: order },
        { status: 500 }
      );
    }
    return NextResponse.json({ orderID: order.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[paypal/create] threw", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
