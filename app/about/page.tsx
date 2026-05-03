export const metadata = {
  title: "About — Travel Lens",
  description:
    "Why Travel Lens exists: a tool for travelers stuck reading foreign menus and signs. Built by Jun Lee using GPT-4o Vision.",
};

export default function About() {
  return (
    <>
      <h1>About Travel Lens</h1>
      <p className="updated">A tool for travelers, by a traveler.</p>

      <h2>Why this exists</h2>
      <p>
        I spent 30 minutes staring at an izakaya menu in Fukuoka last year,
        unable to tell which dishes had pork (my friend was vegetarian) or what
        was raw versus cooked. Google Lens translated the kanji into English words
        but couldn&apos;t answer the questions I actually had.
      </p>
      <p>
        Travel Lens does what I wished existed that night — a camera tool that
        understands the <em>context</em> of what you photograph, not just the
        literal characters. Menu in Japanese? Get a full table with allergen
        notes. Sign in Thai? Find out what kind of place it is. Product label in
        Vietnamese? See ingredients and prep instructions.
      </p>

      <h2>How it works</h2>
      <p>Three steps, no signup, no app store:</p>
      <ol>
        <li>Open <a href="/">japan-travel-lens.vercel.app</a> on your phone</li>
        <li>Point camera at any foreign-language sign, menu, or product</li>
        <li>AI explains it in your language, and you can ask follow-up questions</li>
      </ol>

      <h2>What&apos;s under the hood</h2>
      <ul>
        <li><strong>OpenAI GPT-4o Vision</strong> — the AI that reads and explains</li>
        <li><strong>Next.js 16</strong> — the web framework</li>
        <li><strong>Vercel</strong> — hosting</li>
        <li><strong>PayPal</strong> — payments (no card storage)</li>
        <li><strong>Signed cookies</strong> — daily quota tracking, no database, no account</li>
      </ul>

      <h2>Pricing philosophy</h2>
      <p>
        I dislike subscription dark patterns more than anyone. So:
      </p>
      <ul>
        <li>10 scans every day, free, forever</li>
        <li>If you need more on a heavy travel day: $1 for 24 hours unlimited</li>
        <li><strong>Never</strong> auto-renews. <strong>Never</strong> stores your card. <strong>Never</strong> charges again unless you tap the button again.</li>
      </ul>
      <p>
        Single global price: <strong>$1 USD</strong> (charged via PayPal).
        Refund within 24h if you didn&apos;t use it — just email with your order ID.
      </p>

      <h2>Honest limitations</h2>
      <ul>
        <li>Requires internet. AI processing happens on OpenAI servers.</li>
        <li>Sometimes wrong. Cross-check critical info (allergies, medication, legal notices) with a native speaker.</li>
        <li>Photos are sent to OpenAI for analysis. We don&apos;t store them on our servers — see <a href="/legal/privacy">Privacy Policy</a>.</li>
        <li>Currently only works as a web app (PWA). No native iOS/Android app yet.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Bug reports, feature requests, partnership ideas:<br />
        <strong>travellens.help@gmail.com</strong>
      </p>
      <p>
        For press: see <a href="/press">press kit</a>.
      </p>
    </>
  );
}
