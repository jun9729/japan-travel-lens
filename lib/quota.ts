import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

/** 하루 무료 호출 한도 */
export const FREE_PER_DAY = 10;

/** 결제 시 unlock 유지 시간 (ms) */
export const PAID_DURATION_MS = 24 * 60 * 60 * 1000;

const COOKIE_NAME = "tl_q";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 40; // 40일

type Payload = {
  /** YYYY-MM-DD (Asia/Seoul 기준) — 날짜 바뀌면 count 리셋 */
  date: string;
  /** 오늘 호출 수 */
  count: number;
  /** 결제된 경우 24시간 unlock 종료 시각 (unix ms) */
  paidUntil?: number;
};

export type QuotaInfo = {
  count: number;
  limit: number;
  remaining: number;
  isPaid: boolean;
  paidUntil?: number;
};

/** 한국 시간 기준 YYYY-MM-DD */
function todayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function getSecret(): string {
  const s = process.env.QUOTA_SECRET;
  if (!s || s.length < 16) {
    return "dev-insecure-quota-secret-please-set-QUOTA_SECRET";
  }
  return s;
}

/** 이전 시크릿 (콤마 구분 가능) — 로테이션 시 둘 다 인정 */
function getOldSecrets(): string[] {
  const raw = process.env.QUOTA_SECRET_OLD;
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter((s) => s.length >= 16);
}

function signWith(secret: string, payloadB64: string): string {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function sign(payloadB64: string): string {
  return signWith(getSecret(), payloadB64);
}

/** 현재 시크릿 또는 이전 시크릿 중 하나라도 매치하면 OK */
function verify(payloadB64: string, sig: string): boolean {
  if (signWith(getSecret(), payloadB64) === sig) return true;
  for (const old of getOldSecrets()) {
    if (signWith(old, payloadB64) === sig) return true;
  }
  return false;
}

function encode(payload: Payload): string {
  const b64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${b64}.${sign(b64)}`;
}

function decode(cookieValue: string | undefined): Payload | null {
  if (!cookieValue) return null;
  const [b64, sig] = cookieValue.split(".");
  if (!b64 || !sig) return null;
  if (!verify(b64, sig)) return null;
  try {
    return JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as Payload;
  } catch {
    return null;
  }
}

/** 쿠키에서 현재 쿼터 읽기. 날짜 바뀌었으면 자동 리셋. */
export function readQuota(req: NextRequest): Payload {
  const raw = req.cookies.get(COOKIE_NAME)?.value;
  const parsed = decode(raw);
  const today = todayKST();
  if (!parsed) return { date: today, count: 0 };
  // 결제 만료됐으면 paidUntil 제거
  const paidUntil =
    parsed.paidUntil && parsed.paidUntil > Date.now()
      ? parsed.paidUntil
      : undefined;
  // 날짜 바뀌었으면 count 리셋, paidUntil 은 유지
  if (parsed.date !== today) {
    return { date: today, count: 0, paidUntil };
  }
  return { ...parsed, paidUntil };
}

export function summarize(p: Payload): QuotaInfo {
  const isPaid = !!(p.paidUntil && p.paidUntil > Date.now());
  const remaining = isPaid
    ? Number.POSITIVE_INFINITY
    : Math.max(0, FREE_PER_DAY - p.count);
  return {
    count: p.count,
    limit: FREE_PER_DAY,
    remaining: isPaid ? -1 : remaining,
    isPaid,
    paidUntil: p.paidUntil,
  };
}

/** 응답 쿠키에 새 페이로드 심기 */
export function writeQuota(res: NextResponse, payload: Payload) {
  res.cookies.set(COOKIE_NAME, encode(payload), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

/** 1회 사용 시도: 쿼터 체크 + (성공 시) count 증가 페이로드 반환. 쓰기는 호출자가 writeQuota 로 */
export function tryConsume(req: NextRequest): {
  ok: boolean;
  current: Payload;
  next: Payload;
  info: QuotaInfo;
} {
  const current = readQuota(req);
  const isPaid = !!(current.paidUntil && current.paidUntil > Date.now());

  if (!isPaid && current.count >= FREE_PER_DAY) {
    return {
      ok: false,
      current,
      next: current,
      info: summarize(current),
    };
  }

  const next: Payload = isPaid
    ? current
    : { ...current, count: current.count + 1 };
  return { ok: true, current, next, info: summarize(next) };
}

/** 결제 완료 — 24시간 무제한 플래그 세팅 */
export function markPaid(req: NextRequest): Payload {
  const current = readQuota(req);
  return {
    ...current,
    paidUntil: Date.now() + PAID_DURATION_MS,
  };
}
