import Link from "next/link";

export const metadata = {
  title: "How to translate a Japanese menu on iPhone (the fast way, 2026)",
  description:
    "Three methods to translate a Japanese restaurant menu using your iPhone in 2026 — Apple's built-in Translate, Google Lens via Camera, and an AI camera approach. With pros, cons, and which one to use when.",
  alternates: {
    canonical:
      "https://japan-travel-lens.vercel.app/blog/translate-japanese-menu-iphone-2026",
  },
  openGraph: {
    title: "How to translate a Japanese menu on iPhone (2026)",
    description:
      "Three methods compared. The fastest one might surprise you.",
    type: "article",
    publishedTime: "2026-05-05T00:00:00Z",
  },
};

export default function Post() {
  return (
    <>
      <h1>How to translate a Japanese menu on iPhone (the fast way, 2026)</h1>
      <p className="updated">Published 2026-05-05 · ~6 min read</p>

      <p>
        You&apos;re sitting at a Tokyo izakaya. The menu is in kanji. Your
        iPhone is in your hand. What&apos;s the fastest way to read this menu?
      </p>
      <p>
        Three methods work in 2026, and they&apos;re ranked very differently
        from how they were two years ago. Here&apos;s the current honest take.
      </p>

      <h2>Method 1: Apple&apos;s built-in Translate (Camera tab)</h2>
      <p>
        <strong>How:</strong> Open the Translate app → Camera → point at menu →
        tap shutter or live mode.
      </p>
      <p>
        <strong>Verdict:</strong> Surprisingly weak for menus. Apple&apos;s
        translation engine has improved on common phrases, but Japanese food
        names are <em>specifically</em> where it stumbles — regional dish names
        get rendered word-by-word (&quot;tsukune&quot; becomes &quot;rolled
        thing&quot;) and ingredient nuance is lost. The overlay UI is clean but
        you still have to read every line individually.
      </p>
      <p>
        <strong>Use it when:</strong> You have no internet and need any
        translation. Or for non-food signs.
      </p>

      <h2>Method 2: Google Lens via the iPhone Camera or Google app</h2>
      <p>
        <strong>How:</strong> Open the Google app → tap Lens icon → camera mode
        → point at menu. (Or via the standalone Google Lens app.)
      </p>
      <p>
        <strong>Verdict:</strong> Best raw OCR on the iPhone for Japanese kanji.
        Recognizes cursive and handwritten characters at 90%+ accuracy. The
        translation is decent — better than Apple Translate, slightly worse
        than DeepL. The killer weakness is the same as everywhere: you get a
        wall of translated text. To answer &quot;which dishes contain pork?&quot;
        you have to manually scan all 30 items.
      </p>
      <p>
        <strong>Use it when:</strong> You need to recognize one or two specific
        items quickly. Walking past a sign. Confirming a known dish name.
      </p>

      <h2>Method 3: AI camera with menu-specific reasoning</h2>
      <p>
        <strong>How:</strong> Open <Link href="/">Travel Lens</Link> in Safari →
        camera permission → snap menu → AI returns a structured table.
      </p>
      <p>
        <strong>Verdict:</strong> Wins on full restaurant menus. Instead of
        translating words, the AI <em>understands</em> the menu — groups items
        by section, flags allergens, suggests orders. Then you can ask
        follow-up questions on the same photo: &quot;is anything spicy?&quot;,
        &quot;which is vegetarian?&quot;, &quot;recommend something to share&quot;.
      </p>
      <p>
        It&apos;s the same GPT-4o vision model that ChatGPT uses, wrapped in a
        purpose-built UI. 10 scans/day are free. $1 unlocks 24h unlimited (one
        time, no subscription).
      </p>
      <p>
        <strong>Use it when:</strong> You&apos;re sitting down at a restaurant
        with a full multi-section menu. You have allergies or dietary
        restrictions. You want recommendations.
      </p>

      <h2>Concrete iPhone setup recommendation for a Japan trip</h2>
      <p>Before your flight, install these:</p>
      <ol>
        <li><strong>Apple Translate</strong> with Japanese language pack downloaded for offline. (Free, built-in.)</li>
        <li><strong>Google app</strong> for quick Lens lookups. (Free.)</li>
        <li>
          Bookmark <Link href="/">japan-travel-lens.vercel.app</Link> to your
          home screen — Safari → Share → Add to Home Screen. It then acts like
          a native app, no App Store download. (Free for 10 scans/day.)
        </li>
      </ol>
      <p>
        That&apos;s it. Three taps, three tools, all of them free for the
        amount most travelers actually use.
      </p>

      <h2>Why I don&apos;t recommend Papago for English-speakers in Japan</h2>
      <p>
        Papago is excellent for Korean ↔ Japanese (Korea&apos;s Naver built it
        specifically for that pair), but the English experience is rough — UI
        is largely Korean-first, and the EN translation quality is below Google
        Lens on Japanese food vocabulary.
      </p>
      <p>
        If you&apos;re a Korean traveler, Papago + Travel Lens is a great combo.
        If you&apos;re English-speaking, skip Papago.
      </p>

      <h2>What about DeepL?</h2>
      <p>
        DeepL is the gold standard for text translation quality, but it has no
        camera mode. You&apos;d have to OCR the menu somewhere else (Google
        Lens), copy text, paste into DeepL. Three apps for one menu = not
        worth it for most travelers.
      </p>

      <h2>The fastest workflow, end-to-end</h2>
      <ol>
        <li>Sit down. Get the menu.</li>
        <li>Open Travel Lens (saved on home screen).</li>
        <li>Snap the menu.</li>
        <li>Read the table. Ask &quot;which is vegetarian?&quot; if needed.</li>
        <li>Order.</li>
      </ol>
      <p>
        From sitting down to ordering: about 30 seconds, not 10 minutes of
        squinting at kanji.
      </p>

      <p>
        Try it now: <Link href="/">japan-travel-lens.vercel.app</Link>
      </p>

      <hr />
      <p style={{ fontSize: 13, color: "#6a6a72" }}>
        Related:{" "}
        <Link href="/blog/best-menu-translator-app-2026">
          Best menu translator apps tested (2026)
        </Link>
        {" · "}
        <Link href="/blog/japanese-menu-reading-guide-2026">
          Japanese menu kanji cheatsheet
        </Link>
      </p>
    </>
  );
}
