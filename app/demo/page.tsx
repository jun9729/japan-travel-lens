import Link from "next/link";

export const metadata = {
  title: "See what Travel Lens does (no signup, no camera needed)",
  description:
    "A walk-through of what Travel Lens returns when you snap a real Tokyo izakaya menu. See the actual table format, follow-up Q&A, and allergen flagging — before granting camera permission.",
  alternates: {
    canonical: "https://japan-travel-lens.vercel.app/demo",
  },
  openGraph: {
    title: "Travel Lens — See it in action",
    description:
      "What you actually get when you snap a foreign menu. Real example.",
    type: "article",
  },
};

export default function Demo() {
  return (
    <>
      <h1>What Travel Lens looks like</h1>
      <p className="updated">
        A real example before you grant camera permission.
      </p>

      <p>
        Most translation apps just translate words. Travel Lens reads the whole
        menu, organizes it, and answers questions like a friend who speaks the
        language. Here&apos;s what that actually looks like.
      </p>

      <h2>Step 1 — You photograph this</h2>
      <div
        style={{
          background: "#1a1a24",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: 18,
          margin: "16px 0",
          fontFamily: "monospace",
          fontSize: 14,
          lineHeight: 1.8,
          color: "#d0d0dd",
        }}
      >
        <div style={{ color: "#888", marginBottom: 8 }}>
          📸 Tokyo izakaya menu (handwritten)
        </div>
        豚骨ラーメン  ¥980
        <br />
        味噌ラーメン  ¥920
        <br />
        辛味噌ラーメン  ¥1050
        <br />
        鶏白湯ラーメン  ¥980
        <br />
        替玉  ¥150
        <br />
        味玉  ¥120
        <br />
        チャーシュー丼  ¥480
        <br />
        ビール  ¥600
        <br />
        枝豆  ¥380
      </div>

      <h2>Step 2 — Travel Lens returns this (in your language)</h2>
      <div
        style={{
          background: "#16161e",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 18,
          padding: 16,
          margin: "12px 0",
        }}
      >
        <p style={{ marginTop: 0 }}>
          🍜 <strong>Japanese ramen shop menu</strong>
        </p>
        <p>The text is mostly Japanese kanji + katakana. Here&apos;s every item:</p>
        <table>
          <thead>
            <tr>
              <th>Original</th>
              <th>English</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>豚骨ラーメン</td><td>Tonkotsu (pork bone) ramen</td><td>¥980</td></tr>
            <tr><td>味噌ラーメン</td><td>Miso ramen</td><td>¥920</td></tr>
            <tr><td>辛味噌ラーメン</td><td>Spicy miso ramen 🌶</td><td>¥1050</td></tr>
            <tr><td>鶏白湯ラーメン</td><td>Chicken paitan ramen</td><td>¥980</td></tr>
            <tr><td>替玉</td><td>Extra noodles (refill)</td><td>¥150</td></tr>
            <tr><td>味玉</td><td>Marinated soft-boiled egg</td><td>¥120</td></tr>
            <tr><td>チャーシュー丼</td><td>Chashu rice bowl (pork)</td><td>¥480</td></tr>
            <tr><td>ビール</td><td>Beer</td><td>¥600</td></tr>
            <tr><td>枝豆</td><td>Edamame (boiled soybeans)</td><td>¥380</td></tr>
          </tbody>
        </table>
        <p>
          <strong>Notes for travelers:</strong> Most items contain pork (豚骨, チャーシュー).
          Vegetarian-friendly: 枝豆 only. The 辛味噌 is mild-medium spice. Try
          adding 替玉 for ¥150 — extra noodles in your remaining broth, a Hakata
          tradition.
        </p>
        <p>
          💬 <em>kore wo kudasai</em> — &quot;I&apos;ll have this, please&quot;
        </p>
      </div>

      <h2>Step 3 — You can ask follow-ups on the same photo</h2>
      <div
        style={{
          margin: "12px 0",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
            background: "#2b6cff",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "18px 18px 6px 18px",
            maxWidth: "80%",
            fontSize: 14,
          }}
        >
          What&apos;s the safest pick for someone who doesn&apos;t eat pork?
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            background: "#16161e",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "10px 14px",
            borderRadius: "18px 18px 18px 6px",
            maxWidth: "85%",
            fontSize: 14,
          }}
        >
          The <strong>鶏白湯ラーメン (chicken paitan)</strong> is your best bet — it&apos;s a
          chicken-bone-based broth, no pork. Avoid 豚骨, チャーシュー丼, and 味噌
          (miso ramen typically uses pork stock at this kind of izakaya). Pair
          with 枝豆 for a side. <br />
          💬 <em>buta-niku nashi de onegaishimasu</em> — &quot;without pork, please&quot;
        </div>
      </div>

      <h2>That&apos;s the actual experience</h2>
      <p>
        Tap the photo button on the homepage and try it on any foreign menu —
        Japanese, Korean, Thai, Vietnamese, Spanish, French. 10 free scans per
        day. No signup, no email, no app store.
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
          Try Travel Lens →
        </Link>
      </p>

      <hr />
      <p style={{ fontSize: 13, color: "#6a6a72" }}>
        See more:{" "}
        <Link href="/blog/best-menu-translator-app-2026">
          Best menu translator apps tested
        </Link>
        {" · "}
        <Link href="/blog/japanese-menu-reading-guide-2026">
          Japanese kanji guide
        </Link>
      </p>
    </>
  );
}
