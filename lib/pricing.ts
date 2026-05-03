export type PriceConfig = {
  currency: string;
  /** PayPal/Stripe smallest unit (USD = cents) */
  unitAmount: number;
  /** Human-readable display */
  display: string;
  /** PayPal uses decimal strings */
  paypalAmount: string;
};

/** Single global price: $1 USD for everyone, regardless of region. */
const PRICE_USD_1: PriceConfig = {
  currency: "usd",
  unitAmount: 100,
  display: "$1",
  paypalAmount: "1.00",
};

// 함수 시그니처는 유지하되 항상 $1 USD 반환
export function getPriceForCountry(_countryCode?: string | null): PriceConfig {
  return PRICE_USD_1;
}
