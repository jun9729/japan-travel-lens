import Link from "next/link";

export const metadata = {
  title: "How to read a Japanese menu in 2026 (a 5-minute guide)",
  description:
    "Decode kanji and hiragana on Japanese restaurant menus. The 30 most common food kanji every traveler should know, organized by ramen, izakaya, sushi, and more.",
  alternates: {
    canonical: "https://japan-travel-lens.vercel.app/blog/japanese-menu-reading-guide-2026",
  },
  openGraph: {
    title: "How to read a Japanese menu in 2026 — Travel Lens",
    description: "30 essential kanji for travelers in Japan, by restaurant type.",
    type: "article",
    publishedTime: "2026-05-01T00:00:00Z",
  },
};

export default function Post() {
  return (
    <>
      <h1>How to read a Japanese menu in 2026 (a 5-minute guide)</h1>
      <p className="updated">Published 2026-05-01 · ~6 min read</p>

      <p>
        You sit down at a Tokyo izakaya. The menu is handwritten in mostly kanji.
        Your friend has a peanut allergy, you don&apos;t eat pork, and the waiter
        doesn&apos;t speak English. What now?
      </p>
      <p>
        This guide covers the 30 most common food kanji, organized by restaurant
        type, plus a strategy for the rest.
      </p>

      <h2>The shortcut: photograph it</h2>
      <p>
        Before we dive into kanji, the practical answer for non-readers is to
        snap a photo and let an AI translate the entire menu as a table. We
        built <Link href="/">Travel Lens</Link> exactly for this — but read on if
        you want to actually learn.
      </p>

      <h2>Ramen shop essentials (10 kanji)</h2>
      <ul>
        <li><strong>豚</strong> (buta) — pork. Almost every ramen broth uses it.</li>
        <li><strong>鶏</strong> (tori) — chicken.</li>
        <li><strong>味噌</strong> (miso) — fermented soybean paste base.</li>
        <li><strong>醤油</strong> (shōyu) — soy sauce base.</li>
        <li><strong>塩</strong> (shio) — salt-based broth.</li>
        <li><strong>豚骨</strong> (tonkotsu) — pork bone broth.</li>
        <li><strong>辛</strong> (kara) — spicy.</li>
        <li><strong>大盛</strong> (ōmori) — large portion.</li>
        <li><strong>替玉</strong> (kaedama) — extra noodle refill (common in Hakata-style).</li>
        <li><strong>叉焼</strong> (chāshū) — braised pork slice.</li>
      </ul>

      <h2>Izakaya / pub (10 kanji)</h2>
      <ul>
        <li><strong>刺身</strong> (sashimi) — raw sliced fish.</li>
        <li><strong>焼</strong> (yaki) — grilled.</li>
        <li><strong>揚</strong> (age) — fried.</li>
        <li><strong>蒸</strong> (mushi) — steamed.</li>
        <li><strong>串</strong> (kushi) — skewered.</li>
        <li><strong>鶏皮</strong> (torikawa) — chicken skin.</li>
        <li><strong>砂肝</strong> (sunagimo) — chicken gizzard.</li>
        <li><strong>レバー</strong> (rebā) — liver (often beef or chicken).</li>
        <li><strong>枝豆</strong> (edamame) — soybean snack.</li>
        <li><strong>お通し</strong> (otōshi) — automatic appetizer charge (200-500 yen).</li>
      </ul>

      <h2>Sushi (10 kanji)</h2>
      <ul>
        <li><strong>鮪</strong> (maguro) — tuna.</li>
        <li><strong>鮭</strong> (sake) — salmon.</li>
        <li><strong>海老</strong> (ebi) — shrimp.</li>
        <li><strong>蟹</strong> (kani) — crab.</li>
        <li><strong>烏賊</strong> (ika) — squid.</li>
        <li><strong>蛸</strong> (tako) — octopus.</li>
        <li><strong>玉子</strong> (tamago) — egg.</li>
        <li><strong>巻</strong> (maki) — roll.</li>
        <li><strong>軍艦</strong> (gunkan) — battleship-style with seaweed wrap.</li>
        <li><strong>握り</strong> (nigiri) — hand-pressed sushi (the classic shape).</li>
      </ul>

      <h2>The strategy for everything else</h2>
      <p>
        You won&apos;t memorize 2,000 kanji on a trip. The 80/20 approach:
      </p>
      <ol>
        <li>
          <strong>Recognize the protein kanji</strong> (豚 鶏 牛 魚 海老 蟹) so you
          know what kind of meat is in something.
        </li>
        <li>
          <strong>Recognize the cooking-method kanji</strong> (焼 揚 蒸 煮 生) so
          you know the texture/preparation.
        </li>
        <li>
          <strong>Photograph the rest.</strong> An AI can read katakana loanwords
          (which 90% of Western users skip), explain regional dishes, and tell
          you what&apos;s in a sauce.
        </li>
      </ol>

      <h2>Common allergen kanji (memorize these even if nothing else)</h2>
      <ul>
        <li><strong>卵 / 玉子</strong> — egg</li>
        <li><strong>牛乳 / 乳</strong> — milk / dairy</li>
        <li><strong>小麦</strong> — wheat (gluten)</li>
        <li><strong>蕎麦</strong> — buckwheat (separate allergen from wheat in Japan)</li>
        <li><strong>落花生 / 殻付き</strong> — peanut</li>
        <li><strong>えび / 海老</strong> — shrimp</li>
        <li><strong>かに / 蟹</strong> — crab</li>
      </ul>
      <p>
        If you have a serious allergy, photograph the ingredient list and
        cross-check with both the AI explanation and a phrase you can show the
        server: <code>「○○アレルギーがあります」</code> (&quot;I have a ___ allergy&quot;).
      </p>

      <h2>Useful phrases (in romaji)</h2>
      <ul>
        <li><em>kore wa nan desu ka?</em> — &quot;What is this?&quot;</li>
        <li><em>osusume wa?</em> — &quot;What do you recommend?&quot;</li>
        <li><em>buta-niku nashi de</em> — &quot;Without pork, please.&quot;</li>
        <li><em>okaikei onegaishimasu</em> — &quot;Bill, please.&quot;</li>
      </ul>

      <h2>Try it</h2>
      <p>
        Next time you see a Japanese menu you can&apos;t read, snap a photo with{" "}
        <Link href="/">Travel Lens</Link> — the menu mode returns every item as
        a table with translation, allergen notes, and recommendations. 10 free
        scans per day, no signup.
      </p>

      <hr />
      <p style={{ fontSize: 13, color: "#6a6a72" }}>
        Related: <Link href="/blog/menu-translation-apps-compared-2026">Menu translation apps compared (2026)</Link>
        {" · "}
        <Link href="/blog/ilbon-menupan-irl-bbeop">한국어 버전</Link>
      </p>
    </>
  );
}
