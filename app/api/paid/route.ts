import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { markPaid, writeQuota } from "@/lib/quota";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  const key = process.env.STRIPE_SECRET_KEY;

  if (!sessionId || !key) {
    return NextResponse.redirect(new URL("/?paid=missing", req.url));
  }

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(new URL("/?paid=unpaid", req.url));
    }

    // 결제 확인됨 → 쿠키에 24h unlock 스탬프
    const nextPayload = markPaid(req);
    const res = NextResponse.redirect(new URL("/?paid=success", req.url));
    writeQuota(res, nextPayload);
    return res;
  } catch (e) {
    console.error("[paid] verify failed", e);
    return NextResponse.redirect(new URL("/?paid=error", req.url));
  }
}
