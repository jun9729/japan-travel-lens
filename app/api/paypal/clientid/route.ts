import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? null;
  return NextResponse.json(
    { clientId },
    {
      headers: {
        // env 변경 후 CDN 이 stale clientId 를 서빙하지 않도록
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
