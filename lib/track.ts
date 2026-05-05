/**
 * 단순 이벤트 트래커 — 콘솔에 구조화된 JSON 로그 출력.
 * Vercel Logs / `vercel logs --query "evt:"` 로 검색 가능.
 *
 * 동시에 모듈 레벨 메모리 카운터에도 누적 — /api/stats 로 실시간 조회.
 * (cold start 시 리셋되지만 worm instance 동안의 빠른 모니터링 용도)
 */

import type { NextRequest } from "next/server";

type EventName =
  | "page_view"          // 메인 페이지 진입
  | "scan_attempt"       // /api/analyze 호출 (성공/실패 무관)
  | "scan_success"       // 정상 응답 (BLURRY 제외)
  | "scan_blurry"        // BLURRY_RETAKE 환불
  | "scan_quota_block"   // 무료 한도 초과
  | "scan_aborted"       // 사용자 취소
  | "pay_create"         // PayPal 주문 생성
  | "pay_capture"        // PayPal 캡처 성공
  | "pay_failed"         // PayPal 실패
  | "quota_check";       // /api/quota 조회

type Counters = Record<EventName, number>;

const counters: Counters = {
  page_view: 0,
  scan_attempt: 0,
  scan_success: 0,
  scan_blurry: 0,
  scan_quota_block: 0,
  scan_aborted: 0,
  pay_create: 0,
  pay_capture: 0,
  pay_failed: 0,
  quota_check: 0,
};

let bootedAt = Date.now();

export function track(
  evt: EventName,
  req?: NextRequest | null,
  meta: Record<string, unknown> = {}
) {
  counters[evt] = (counters[evt] ?? 0) + 1;

  const country = req?.headers?.get?.("x-vercel-ip-country") ?? null;
  const ua = req?.headers?.get?.("user-agent") ?? null;
  const ref = req?.headers?.get?.("referer") ?? null;

  // 구조화된 한 줄 로그 — vercel logs 에서 검색하기 좋음
  console.log(
    JSON.stringify({
      evt,
      ts: new Date().toISOString(),
      country,
      ref: ref ? new URL(ref).host : null,
      // user agent 는 줄여서 (mobile 여부만)
      mob: ua ? /mobile|iphone|android/i.test(ua) : null,
      ...meta,
    })
  );
}

export function getStats() {
  return {
    bootedAt: new Date(bootedAt).toISOString(),
    uptimeSec: Math.round((Date.now() - bootedAt) / 1000),
    counters: { ...counters },
  };
}
