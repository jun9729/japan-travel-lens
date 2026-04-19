/**
 * PayPal API 공용 헬퍼 — edge & node 둘 다 동작.
 * OAuth 토큰을 모듈 레벨 캐시로 재사용 (warm 인스턴스 동안).
 */

export const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

// 같은 람다 인스턴스가 살아있는 동안(~수 분) 캐시
let tokenCache: { token: string; expiresAt: number } | null = null;

export async function getPayPalAccessToken(): Promise<string> {
  // 만료까지 30초 이상 남았으면 캐시 사용
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.token;
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) throw new Error("PayPal credentials missing");

  // btoa 는 edge/node 양쪽 글로벌 (Node 16+)
  const creds = btoa(`${clientId}:${secret}`);

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error_description?: string;
  };
  if (!data.access_token) {
    throw new Error(`PayPal auth failed: ${data.error_description ?? "unknown"}`);
  }

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 32000) * 1000,
  };
  return data.access_token;
}

export function paypalConfigured(): boolean {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET);
}
