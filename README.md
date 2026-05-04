# 🌏 Travel Lens

**Live: https://japan-travel-lens.vercel.app**

A no-signup mobile web app (PWA) that uses **GPT-4o Vision** to translate and
explain foreign-language menus, signs, and product labels. Built for
travelers — point your phone at any foreign text, get a structured table back
plus follow-up Q&A on the same photo.

- 🍜 **Menus → tables.** Every item, original + translation + price, with
  allergen flags and recommendations.
- 💬 **Follow-up questions.** "Is this spicy?" "What's vegetarian?"
  "Recommend something for two people."
- 🌐 **Reads 50+ foreign languages.** Japanese, Korean, Thai, Vietnamese,
  Spanish, French, Arabic — anything GPT-4o can read.
- 🌍 **UI in 4 languages.** Auto-detects Korean, English, Japanese, Chinese.
- 💸 **10 free scans/day, $1 for 24h unlimited.** No subscription, no card stored.
- 📱 **PWA — no app store needed.** Add to Home Screen for app-like experience.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- OpenAI GPT-4o Vision (`detail: "high"`)
- PayPal Live (single-payment, no recurring)
- Vercel (hosting, edge + nodejs runtimes split)
- Signed-cookie quota tracking — no database, no auth

## Run locally

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local — set OPENAI_API_KEY (required)
# Optional: PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_ENV (sandbox|live), QUOTA_SECRET

# 3. Dev server
npm run dev
```

Open `http://localhost:3000`.

## Mobile testing

Camera APIs require HTTPS (or `localhost`). To test on your phone:

```bash
# Use ngrok to create an HTTPS tunnel
ngrok http 3000
# Then open the https URL on your phone
```

## Project structure

- `app/page.tsx` — main client UI (camera, chat, payment integration)
- `app/api/analyze/route.ts` — image → GPT-4o Vision call
- `app/api/paypal/{create,capture,clientid}/` — payment endpoints
- `app/api/quota/route.ts` — daily quota status
- `lib/quota.ts` — HMAC-signed cookie quota
- `lib/paypal.ts` — PayPal SDK helper with token cache
- `lib/locale.ts` — UI translations (KO/EN/JA/ZH)

## Pricing

Single global price: **$1 USD for 24h unlimited** (PayPal). 10 free scans
per day. No auto-renewal. Refund within 24h if unused.

## Author

Built by Jun Lee. Contact: travellens.help@gmail.com
