export type PriceConfig = {
  currency: string;
  /** Stripe/PayPal smallest unit (KRW/JPY = 원 단위, USD/EUR = 센트) */
  unitAmount: number;
  /** Human-readable display */
  display: string;
  /** PayPal uses decimal strings */
  paypalAmount: string;
};

/** ISO 3166-1 alpha-2 → price */
const BY_COUNTRY: Record<string, PriceConfig> = {
  KR: { currency: "krw", unitAmount: 1500, display: "₩1,500", paypalAmount: "1.50" },
  JP: { currency: "jpy", unitAmount: 150,  display: "¥150",   paypalAmount: "1.50" },
  GB: { currency: "gbp", unitAmount: 99,   display: "£0.99",  paypalAmount: "0.99" },
  AU: { currency: "aud", unitAmount: 160,  display: "A$1.60", paypalAmount: "1.60" },
  CA: { currency: "cad", unitAmount: 140,  display: "C$1.40", paypalAmount: "1.40" },
  SG: { currency: "sgd", unitAmount: 140,  display: "S$1.40", paypalAmount: "1.40" },
  HK: { currency: "hkd", unitAmount: 800,  display: "HK$8",   paypalAmount: "8.00" },
  TW: { currency: "twd", unitAmount: 32,   display: "NT$32",  paypalAmount: "32.00" },
  TH: { currency: "thb", unitAmount: 36,   display: "฿36",    paypalAmount: "36.00" },
  CN: { currency: "cny", unitAmount: 7,    display: "¥7",     paypalAmount: "7.00" },
};

const EU = new Set([
  "DE","FR","IT","ES","NL","BE","AT","FI","IE","PT","GR","LU","SE","DK",
  "PL","CZ","HU","RO","SK","BG","HR","SI","EE","LV","LT","CY","MT",
]);

const DEFAULT: PriceConfig = {
  currency: "usd", unitAmount: 100, display: "$1", paypalAmount: "1.00",
};

export function getPriceForCountry(countryCode?: string | null): PriceConfig {
  if (!countryCode) return DEFAULT;
  const upper = countryCode.toUpperCase();
  if (BY_COUNTRY[upper]) return BY_COUNTRY[upper];
  if (EU.has(upper)) return { currency: "eur", unitAmount: 100, display: "€1", paypalAmount: "1.00" };
  return DEFAULT;
}
