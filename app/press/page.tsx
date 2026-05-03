export const metadata = {
  title: "Press Kit — Travel Lens",
  description:
    "Press resources for Travel Lens — boilerplate copy, screenshots, contact, and quick facts for journalists and bloggers.",
};

export default function Press() {
  return (
    <>
      <h1>Press Kit</h1>
      <p className="updated">Last updated: 2026-05-04</p>

      <h2>One-liner</h2>
      <p>
        <em>Travel Lens turns your phone camera into a real-time AI translator for foreign menus, signs, and product labels.</em>
      </p>

      <h2>Boilerplate (50 words)</h2>
      <p>
        Travel Lens is a no-signup web app that uses GPT-4o Vision to translate
        and explain foreign-language menus, signs, and product labels from a
        photo. Menus are returned as full tables; users can ask follow-up
        questions. 10 scans/day are free; $1 unlocks 24 hours of unlimited use.
      </p>

      <h2>Boilerplate (140 chars / Twitter-ready)</h2>
      <p>
        <code>
          Travel Lens — point your phone at any foreign menu, sign, or product
          label. AI explains it in your language. 10 free scans/day, no signup.
        </code>
      </p>

      <h2>Quick facts</h2>
      <ul>
        <li><strong>Launched:</strong> April 2026</li>
        <li><strong>Founder:</strong> Jun Lee (Seoul-based)</li>
        <li><strong>URL:</strong> japan-travel-lens.vercel.app</li>
        <li><strong>Platform:</strong> Web app (PWA — installable on iOS &amp; Android)</li>
        <li><strong>Tech:</strong> Next.js 16 · GPT-4o Vision · PayPal · Vercel</li>
        <li><strong>UI languages:</strong> Korean · English · Japanese · Chinese</li>
        <li><strong>Source language coverage:</strong> 50+ foreign languages auto-detected</li>
        <li><strong>Pricing:</strong> 10 free scans/day. $1 (₩1,500 / ¥150 / €1) for 24-hour unlimited. No subscription.</li>
        <li><strong>Privacy:</strong> No accounts. No tracking. Photos sent to OpenAI for analysis only.</li>
      </ul>

      <h2>Best use cases to demo</h2>
      <ul>
        <li>Japanese izakaya/ramen menu — full table mode</li>
        <li>Korean street-food sign — what kind of shop, hours</li>
        <li>Thai/Vietnamese product label — ingredients, allergens</li>
        <li>Spanish/French restaurant menu — recommendations</li>
        <li>Asking follow-ups: &quot;What&apos;s vegetarian here?&quot; / &quot;Anything spicy?&quot;</li>
      </ul>

      <h2>Sample headlines you&apos;re welcome to use</h2>
      <ul>
        <li>&quot;The travel translator that finally understands menus&quot;</li>
        <li>&quot;A $1 day pass replaces a phrasebook&quot;</li>
        <li>&quot;A solo dev built the menu translator I wish I had on my last trip&quot;</li>
        <li>&quot;여행 메뉴판 30분 째 못 읽어 본 분들에게&quot; (KO)</li>
        <li>&quot;海外メニューを撮るとAIが解説するウェブアプリ&quot; (JA)</li>
        <li>&quot;一张外语菜单照片，AI 全部翻译成表格&quot; (ZH)</li>
      </ul>

      <h2>Brand assets</h2>
      <p>
        Open Graph image (1200×630): <a href="/opengraph-image">/opengraph-image</a>
        <br />
        App icon (192×192): <a href="/icon">/icon</a>
        <br />
        Apple touch icon (180×180): <a href="/apple-icon">/apple-icon</a>
      </p>
      <p>
        Brand colors: <code>#2b6cff → #7a3cff → #ff5ab2</code> (gradient).
        Background: <code>#0b0b0f</code>. Text on dark: <code>#f0f0f5</code>.
      </p>

      <h2>Founder availability</h2>
      <p>
        Available for written Q&amp;A and short async video for blogs/podcasts.
        Korean and English. 24-48h response time.
      </p>

      <h2>Contact</h2>
      <p>
        Press inquiries:<br />
        <strong>travellens.help@gmail.com</strong><br />
        Subject prefix: <code>[PRESS]</code>
      </p>
    </>
  );
}
