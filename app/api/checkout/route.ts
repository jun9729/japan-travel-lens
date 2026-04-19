import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPriceForCountry } from "@/lib/pricing";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY not configured" },
      { status: 503 }
    );
  }

  try {
    const stripe = new Stripe(key);
    const origin = req.nextUrl.origin;
    const country = req.headers.get("x-vercel-ip-country");
    const price = getPriceForCountry(country);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: price.currency,
            unit_amount: price.unitAmount,
            product_data: {
              name: "Travel Lens — 24h Unlimited",
              description: "Unlimited AI scans for 24 hours from purchase.",
              images: [`${origin}/icon`],
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/api/paid?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=cancelled`,
      metadata: { product: "travel-lens-24h", country: country ?? "unknown" },
      // 각 언어별 Stripe 페이지 현지화
      locale: "auto",
    });

    return NextResponse.json({ url: session.url, price });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
