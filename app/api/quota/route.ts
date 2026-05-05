import { NextRequest, NextResponse } from "next/server";
import { readQuota, summarize, writeQuota } from "@/lib/quota";
import { track } from "@/lib/track";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const current = readQuota(req);
  const info = summarize(current);
  // 클라이언트가 page mount 시 호출 = 사실상 page_view 신호
  track("page_view", req, { paid: info.isPaid, count: info.count });
  const res = NextResponse.json({ quota: info });
  // 날짜가 바뀌었을 수도 있으니 갱신된 payload 를 재서명
  writeQuota(res, current);
  return res;
}
