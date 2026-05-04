import Link from "next/link";

export const metadata = {
  title: "Korean menu translator — read Hangul menus, signs, and products (free)",
  description:
    "Travel Lens reads Korean Hangul from any photo. Korean BBQ menus, banchan labels, street food signs — all explained in English with allergen and spice-level notes. Built for Korea travelers. 10 free scans/day.",
  alternates: {
    canonical: "https://japan-travel-lens.vercel.app/korea",
  },
  openGraph: {
    title: "Korean menu translator — Travel Lens",
    description:
      "Read any Korean menu in seconds. Free 10 scans/day. No signup.",
    type: "article",
  },
  keywords: [
    "korean menu translator", "korean menu translator app",
    "translate korean menu", "seoul restaurant menu translator",
    "hangul menu reader", "korean bbq menu app",
    "kbbq menu translator", "korea travel app 2026",
    "what is on a korean menu", "korean food translator camera",
  ],
};

export default function KoreaLanding() {
  return (
    <>
      <h1>Korean menu translator for travelers</h1>
      <p className="updated">
        Point your camera at any Korean menu, sign, or product label.
        AI explains it instantly.
      </p>

      <p>
        Korean Hangul is one of the easiest scripts to learn (24 letters,
        phonetic), but you don&apos;t want to spend your dinner sounding out
        characters. Travel Lens reads it for you and tells you what each dish
        actually is.
      </p>

      <p style={{ textAlign: "center", margin: "24px 0" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "linear-gradient(135deg, #2b6cff 0%, #7a3cff 100%)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 12,
            fontWeight: 700,
          }}
        >
          Open Travel Lens →
        </Link>
      </p>

      <h2>What it reads</h2>
      <ul>
        <li>
          <strong>Korean BBQ menus</strong> — galbi, samgyeopsal, banchan side
          dishes, rice/stew add-ons (with English transliteration)
        </li>
        <li>
          <strong>Street food signs</strong> — Myeongdong night markets,
          Gwangjang Market, Hongdae alleyway carts
        </li>
        <li>
          <strong>Cafe / dessert menus</strong> — bingsu, hotteok, traditional
          tea descriptions
        </li>
        <li>
          <strong>Convenience store products</strong> — instant noodle spice
          levels, kimbap fillings, banana milk variants
        </li>
        <li>
          <strong>Subway exit signs</strong> — &quot;exit 6 toward Insadong&quot;
          stuff that&apos;s easy to miss
        </li>
      </ul>

      <h2>Korean-specific helps</h2>

      <h3>&quot;How spicy is this?&quot;</h3>
      <p>
        Korean food&apos;s spice levels vary wildly. Travel Lens reads cues
        like 매운 (spicy), 안 매운 (not spicy), 신라면 (Shin Ramyun, ~5/10
        spice), 불 (fire — very hot) and gives you a 1-5 scale.
      </p>

      <h3>&quot;Is this fermented?&quot;</h3>
      <p>
        Some Westerners are surprised by the strong taste of fermented foods.
        Travel Lens flags 청국장 (cheonggukjang, fermented soybean stew, very
        pungent), 홍어 (hongeo, fermented skate, extremely pungent), and 김치
        variants by aging.
      </p>

      <h3>&quot;What&apos;s the typical thing to order at this kind of place?&quot;</h3>
      <p>
        At Korean BBQ, typical 2-person order = 2 servings of meat + rice +
        soup + the unlimited banchan. Travel Lens spots the venue type and
        suggests proportional orders.
      </p>

      <h3>Banchan (free side dishes) — what are they?</h3>
      <p>
        Korean restaurants serve unlimited free side dishes (5-10 small bowls).
        Travel Lens explains each one when you scan the table — kimchi
        variants, japchae, namul vegetables, jeon pancakes.
      </p>

      <h2>Best for these Korea trip scenarios</h2>
      <ul>
        <li>🥩 Korean BBQ where the menu is just a list of cut names you don&apos;t recognize</li>
        <li>🍲 Stew restaurants (jjigae, jeongol) — knowing if it has seafood or pork</li>
        <li>🌶️ Tteokbokki street stalls — gauging spice level before committing</li>
        <li>🥢 Banchan tables when you want to know which side dishes contain shellfish</li>
        <li>🚇 Subway exits and bus stop kiosks</li>
        <li>🛒 Olive Young / convenience stores for skincare and snack reading</li>
      </ul>

      <h2>Pricing</h2>
      <p>
        Free 10 scans per day. $1 USD unlocks 24 hours of unlimited scans
        (one-time, no subscription). Plenty for a typical Seoul food day; a
        food tour might need the day pass.
      </p>

      <h2>FAQ</h2>

      <h3>Does it explain banchan dishes one by one?</h3>
      <p>
        Yes. Frame the whole banchan tray in one shot, and Travel Lens lists
        each side dish with name + main ingredient + spice level.
      </p>

      <h3>Will it read Hangul on a screen / digital menu?</h3>
      <p>
        Yes. Tablet menus at modern restaurants work fine — just photograph the
        screen.
      </p>

      <h3>Does it work for K-beauty product labels?</h3>
      <p>
        Yes — choose &quot;Product&quot; mode for ingredients, instructions,
        skin type info on Olive Young products.
      </p>

      <p style={{ textAlign: "center", margin: "32px 0" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            background: "linear-gradient(135deg, #2b6cff 0%, #7a3cff 100%)",
            color: "#fff",
            textDecoration: "none",
            borderRadius: 12,
            fontWeight: 700,
          }}
        >
          Open Travel Lens →
        </Link>
      </p>

      <hr />
      <p style={{ fontSize: 13, color: "#6a6a72" }}>
        Related:{" "}
        <Link href="/japan">Japan menu translator</Link>
        {" · "}
        <Link href="/blog/best-menu-translator-app-2026">
          Best menu translator apps
        </Link>
        {" · "}
        <Link href="/demo">See it in action</Link>
      </p>
    </>
  );
}
