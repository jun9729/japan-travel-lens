import { NextRequest, NextResponse } from "next/server";
import { markPaid, writeQuota } from "@/lib/quota";

export const runtime = "nodejs";

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const creds = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const r = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const d = await r.json();
  if (!d.access_token) throw new Error("PayPal auth failed");
  return d.access_token as string;
}

export async function POST(req: NextRequest) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
  }

  try {
    const { orderID } = await req.json() as { orderID?: string };
    if (!orderID) return NextResponse.json({ error: "Missing orderID" }, { status: 400 });

    const token = await getAccessToken();
    const r = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const order = await r.json();
    const status = order?.status;
    if (status !== "COMPLETED") {
      return NextResponse.json({ error: `PayPal status: ${status}` }, { status: 400 });
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
