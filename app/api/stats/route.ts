import { NextRequest, NextResponse } from "next/server";
import { getStats } from "@/lib/track";

export const runtime = "nodejs";

/**
 * 간단한 키 인증 통계 엔드포인트.
 * 모듈 레벨 카운터 → cold start 마다 0으로 리셋.
 * (영구 통계는 Vercel Analytics dashboard 또는 Vercel Logs 사용)
 *
 * 사용법: GET /api/stats?key=<ADMIN_KEY>
 */
export async function GET(req: NextRequest) {
  const expected = process.env.ADMIN_KEY;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_KEY env var not set on server" },
      { status: 503 }
    );
  }
  const key = req.nextUrl.searchParams.get("key");
  if (key !== expected) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(getStats(), {
    headers: { "Cache-Control": "no-store" },
  });
}
