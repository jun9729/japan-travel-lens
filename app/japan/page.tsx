import Link from "next/link";

export const metadata = {
  title: "Japan menu translator — read any Japanese menu, sign, or product (free)",
  description:
    "Travel Lens reads Japanese kanji, katakana, and hiragana from any photo. Menus become a clean table with allergens flagged. Built for travelers who don't read Japanese. 10 free scans/day.",
  alternates: {
    canonical: "https://japan-travel-lens.vercel.app/japan",
  },
  openGraph: {
    title: "Japan menu translator — Travel Lens",
    description:
      "Read any Japanese menu in seconds. Free 10 scans/day. No signup.",
    type: "article",
  },
  keywords: [
    "japan menu translator", "japanese menu translator app",
    "translate japanese menu", "tokyo restaurant menu translator",
    "kanji menu reader", "izakaya menu app",
    "ramen menu translator", "japan travel app 2026",
    "what is on a japanese menu", "japanese food translator camera",
  ],
};

export default function JapanLanding() {
  return (
    <>
      <h1>Japanese menu translator for travelers</h1>
      <p className="updated">
        Point your camera at any Japanese menu, sign, or product label.
        AI explains it in seconds.
      </p>

      <p>
        If you&apos;ve ever sat at a Tokyo izakaya staring at handwritten kanji,
        unable to figure out which dishes contain pork — Travel Lens was built
        for exactly that moment.
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
          <strong>Restaurant menus</strong> — ramen shops, izakaya, sushi
          counters, tonkatsu joints, family restaurants, kissaten cafes
        </li>
        <li>
          <strong>Convenience store products</strong> — onigiri labels, bento
          ingredient lists, drink labels, snack packaging
        </li>
        <li>
          <strong>Signs &amp; notices</strong> — train station info, store hours,
          temple etiquette, hot spring rules
        </li>
        <li>
          <strong>Anything else with Japanese text</strong> — handwritten or
          printed, kanji + hiragana + katakana mixed
        </li>
      </ul>

      <h2>How it differs from Google Translate / Lens for Japanese</h2>
      <p>
        Google Lens translates words. Travel Lens translates <em>meaning</em>.
        On a Tokyo izakaya menu:
      </p>
      <ul>
        <li>
          <strong>Lens output:</strong> &quot;Pork bone ramen ¥980&quot; (literal)
        </li>
        <li>
          <strong>Travel Lens output:</strong> Full table of every dish, with
          notes like &quot;contains pork&quot;, &quot;mild spice&quot;,
          &quot;Hakata-style — try adding 替玉 (extra noodles) for ¥150&quot;
        </li>
      </ul>
      <p>
        Plus you can ask follow-ups on the same photo:
        &quot;What&apos;s vegetarian?&quot;, &quot;Recommend something for two
        people&quot;, &quot;Anything spicy?&quot;
      </p>

      <h2>Specific things travelers in Japan ask</h2>

      <h3>&quot;Will this dish have pork?&quot;</h3>
      <p>
        Common at izakaya, ramen shops, and ekiben (train station bento). Travel
        Lens flags 豚 (pork), 豚骨 (pork bone broth), チャーシュー (braised pork
        slices), and ハム (ham) automatically.
      </p>

      <h3>&quot;Is this raw or cooked?&quot;</h3>
      <p>
        Important if you&apos;re cautious about raw fish. Look for 焼 (grilled),
        揚 (fried), 蒸 (steamed) vs 刺身 (sashimi) and 生 (raw).
      </p>

      <h3>&quot;What&apos;s a typical thing to order here?&quot;</h3>
      <p>
        Travel Lens recognizes restaurant types (ramen shop vs izakaya vs
        family restaurant) and suggests order combinations appropriate to the
        venue.
      </p>

      <h3>&quot;Is there a service charge / cover?&quot;</h3>
      <p>
        Many izakaya charge お通し (otoshi, ¥200-500) automatically — Travel
        Lens flags this when it spots the kanji on the menu.
      </p>

      <h2>Best for these Japan trip scenarios</h2>
      <ul>
        <li>🍜 Ramen counters with handwritten menus and language barriers</li>
        <li>🍶 Izakayas where most of the menu is in Japanese</li>
        <li>🍣 Conveyor-belt sushi where you point at fish names you don&apos;t know</li>
        <li>🍱 Convenience store bento — checking what&apos;s inside before microwaving</li>
        <li>🚉 Train station signs when you&apos;re lost in Shinjuku</li>
        <li>🛐 Temple/shrine etiquette signs you don&apos;t want to break</li>
        <li>♨️ Onsen rules (especially tattoo policies)</li>
      </ul>

      <h2>Pricing</h2>
      <p>
        <strong>Free:</strong> 10 scans per day. Enough for a typical day with
        2-3 meals + a few signs.
      </p>
      <p>
        <strong>Heavy day ($1):</strong> Some days you&apos;ll do a food tour,
        scan 5+ izakaya menus in one evening, photograph every aisle of Don
        Quijote. $1 unlocks 24 hours of unlimited scans. One-time payment via
        PayPal, no subscription, no card stored.
      </p>

      <h2>FAQ</h2>

      <h3>Does it work offline?</h3>
      <p>
        No — AI processing happens on OpenAI servers, so internet required. If
        you&apos;re going somewhere with patchy coverage, install Apple
        Translate with Japanese pack as offline backup.
      </p>

      <h3>Do I need to install an app?</h3>
      <p>
        No. It&apos;s a web app — open the link in Safari (iPhone) or Chrome
        (Android). Add to Home Screen and it acts like a native app, but no App
        Store download needed.
      </p>

      <h3>Will it handle handwritten menus?</h3>
      <p>
        Yes — GPT-4o Vision reads cursive and handwritten kanji at high
        accuracy. Tested on Hakata izakaya menus that confused Google Lens.
      </p>

      <h3>What about non-food signs?</h3>
      <p>
        Anything with Japanese text — temple etiquette, train stations, store
        signs, onsen rules, even product packaging. Pick &quot;Sign&quot; or
        &quot;Product&quot; mode for best results.
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
        <Link href="/blog/japanese-menu-reading-guide-2026">
          Japanese kanji cheatsheet
        </Link>
        {" · "}
        <Link href="/blog/translate-japanese-menu-iphone-2026">
          iPhone translation methods
        </Link>
        {" · "}
        <Link href="/demo">See it in action</Link>
      </p>
    </>
  );
}
