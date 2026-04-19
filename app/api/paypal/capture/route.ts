import { NextRequest, NextResponse } from "next/server";
import { markPaid, writeQuota } from "@/lib/quota";
import { PAYPAL_BASE, getPayPalAccessToken, paypalConfigured } from "@/lib/paypal";

export const runtime = "nodejs"; // quota HMAC 서명이 Node crypto 사용

export async function POST(req: NextRequest) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
  }

  try {
    const { orderID } = (await req.json()) as { orderID?: string };
    if (!orderID) return NextResponse.json({ error: "Missing orderID" }, { status: 400 });

    const token = await getPayPalAccessToken();
    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const order = (await r.json()) as { status?: string };

    if (order.status !== "COMPLETED") {
      return NextResponse.json(
        { error: `PayPal status: ${order.status ?? "unknown"}` },
        { status: 400 }
      );
    }

    const nextPayload = markPaid(req);
    const res = NextResponse.json({ ok: true });
    writeQuota(res, nextPayload);
    return res;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
