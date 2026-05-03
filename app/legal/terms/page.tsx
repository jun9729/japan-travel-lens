export const metadata = { title: "Terms of Service — Travel Lens" };

export default function Terms() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="updated">Last updated: 2026-04-20</p>

      <h2>Service</h2>
      <p>
        Travel Lens is a web app that uses AI (OpenAI GPT-4o) to explain
        foreign-language signs, menus, and product labels in your chosen
        language. Provided as-is, without warranty.
      </p>

      <h2>Free tier</h2>
      <p>10 AI scans per day at no charge. The counter resets at midnight KST.</p>

      <h2>Paid plan</h2>
      <ul>
        <li>One-time payment: <strong>24 hours of unlimited scans</strong>.</li>
        <li>No auto-renewal. No card stored. Local pricing in your region.</li>
        <li>
          The 24-hour window starts the moment your payment clears at PayPal.
        </li>
      </ul>

      <h2>Acceptable use</h2>
      <ul>
        <li>Personal travel and translation use only.</li>
        <li>Don&apos;t upload illegal content, copyrighted material you do not own, or other people&apos;s personal documents.</li>
        <li>We may rate-limit or block abusive usage patterns.</li>
      </ul>

      <h2>Accuracy disclaimer</h2>
      <p>
        AI explanations may be wrong. Always verify critical information
        (allergens, medication labels, legal notices) with a native speaker or
        official source. We are not responsible for decisions made based on
        the AI&apos;s output.
      </p>

      <h2>Liability</h2>
      <p>
        Liability is limited to the amount paid in the past 30 days (max $5).
      </p>

      <h2>Contact</h2>
      <p>travellens.help@gmail.com</p>
    </>
  );
}
