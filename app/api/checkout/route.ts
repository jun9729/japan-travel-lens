import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "결제가 아직 활성화되지 않았어요. (서버에 STRIPE_SECRET_KEY 설정 필요)",
      },
      { status: 503 }
    );
  }

  try {
    const stripe = new Stripe(key);
    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 100, // $1.00
            product_data: {
              name: "여행 렌즈 — 하루 무제한 이용권",
              description:
                "결제 시각부터 24시간 동안 무제한으로 이용할 수 있어요.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/api/paid?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=cancelled`,
      metadata: { product: "travel-lens-24h" },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `결제 세션 생성 실패: ${msg}` },
      { status: 500 }
    );
  }
}
