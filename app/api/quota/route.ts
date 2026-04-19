import { NextRequest, NextResponse } from "next/server";
import { readQuota, summarize, writeQuota } from "@/lib/quota";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const current = readQuota(req);
  const info = summarize(current);
  const res = NextResponse.json({ quota: info });
  // 날짜가 바뀌었을 수도 있으니 갱신된 payload 를 재서명
  writeQuota(res, current);
  return res;
}
