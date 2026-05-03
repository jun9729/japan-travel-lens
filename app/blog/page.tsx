import Link from "next/link";

export const metadata = {
  title: "Blog — Travel Lens",
  description:
    "Articles about translating foreign menus, signs, and travel-language tools. Tips for Japanese, Korean, Chinese, Thai travel.",
};

const POSTS = [
  {
    slug: "japanese-menu-reading-guide-2026",
    title: "How to read a Japanese menu in 2026 (a 5-minute guide)",
    excerpt:
      "Decode kanji + hiragana on izakaya, ramen, and sushi menus. The 30 most common food kanji every traveler should know — plus how AI handles the rest.",
    date: "2026-05-01",
    lang: "EN",
  },
  {
    slug: "ilbon-menupan-irl-bbeop",
    title: "일본 메뉴판 30초 만에 읽는 법 (한자 전혀 모를 때)",
    excerpt:
      "도쿄·오사카 라멘집·이자카야 메뉴 한자 5개만 알면 절반은 됩니다. 나머지는 AI가 카메라로 풀어줘요. 일본 여행 가시기 전에 한 번 보세요.",
    date: "2026-05-02",
    lang: "KO",
  },
  {
    slug: "menu-translation-apps-compared-2026",
    title: "Menu translation apps compared: Google Lens vs Papago vs Travel Lens (2026)",
    excerpt:
      "Honest comparison of the three popular tools for translating restaurant menus while traveling. Strengths, weaknesses, and which to use when.",
    date: "2026-05-03",
    lang: "EN",
  },
];

export default function BlogIndex() {
  return (
    <>
      <h1>Travel Lens Blog</h1>
      <p className="updated">Notes on travel translation, AI, and decoding foreign food.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {POSTS.map((p) => (
          <li
            key={p.slug}
            style={{
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ fontSize: 12, color: "#6a6a72", marginBottom: 6 }}>
              {p.date} · {p.lang}
            </div>
            <h3 style={{ marginBottom: 4 }}>
              <Link
                href={`/blog/${p.slug}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {p.title}
              </Link>
            </h3>
            <p style={{ fontSize: 14, color: "#a0a0aa", margin: 0 }}>
              {p.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
