export const metadata = { title: "Refund Policy — Travel Lens" };

export default function Refund() {
  return (
    <>
      <h1>Refund Policy</h1>
      <p className="updated">Last updated: 2026-04-20</p>

      <h2>Eligibility</h2>
      <p>
        Full refund within 24 hours of payment, provided no scans were used
        during your unlimited window. Partial refunds at our discretion if
        the service was unavailable.
      </p>

      <h2>How to request</h2>
      <ol>
        <li>Email <strong>travellens.help@gmail.com</strong></li>
        <li>
          Include your <strong>PayPal order ID</strong> (shown on your PayPal
          receipt or after-payment toast).
        </li>
        <li>Brief reason (optional).</li>
      </ol>

      <h2>Processing time</h2>
      <p>
        Refunds are typically issued within 3 business days via PayPal. Money
        returns to your original payment method.
      </p>

      <h2>Edge cases</h2>
      <ul>
        <li>
          <strong>You paid but didn&apos;t see Unlimited activate.</strong>{" "}
          Email us with the order ID — we will activate it manually or refund
          fully.
        </li>
        <li>
          <strong>The AI returned wrong information.</strong> AI mistakes are
          not grounds for refund (see Terms accuracy disclaimer), but feedback
          is welcome.
        </li>
      </ul>
    </>
  );
}
