export const metadata = { title: "Privacy Policy — Travel Lens" };

export default function Privacy() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: 2026-04-20</p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Photos you capture</strong>: sent to OpenAI (GPT-4o) for
          analysis. We do not store them on our servers. OpenAI may retain them
          briefly per their policy:
          {" "}
          <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">
            openai.com/policies/privacy-policy
          </a>.
        </li>
        <li>
          <strong>Daily usage counter</strong>: stored as a signed cookie in
          your browser. No server database, no account.
        </li>
        <li>
          <strong>Geo (country code)</strong>: derived from IP for currency
          selection only. Not stored.
        </li>
        <li>
          <strong>PayPal order data</strong>: handled directly by PayPal. We
          receive only order IDs and payment status.
        </li>
        <li>
          <strong>Scan history thumbnails</strong>: stored in your browser
          (localStorage), never sent anywhere.
        </li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>No tracking pixels, no third-party analytics, no ad networks.</li>
        <li>No accounts, no login, no email collection.</li>
        <li>We do not sell or share your data.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Clearing your browser data removes all stored quota / history. Email
        <strong> travellens.help@gmail.com</strong> for any privacy request.
      </p>

      <h2>Contact</h2>
      <p>travellens.help@gmail.com</p>
    </>
  );
}
