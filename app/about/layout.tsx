import Link from "next/link";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/">← Travel Lens</Link>
      </header>
      <article className="legal-body">{children}</article>
      <footer className="legal-footer">
        <Link href="/about">About</Link>
        <span>·</span>
        <Link href="/legal/privacy">Privacy</Link>
        <span>·</span>
        <Link href="/legal/terms">Terms</Link>
        <span>·</span>
        <Link href="/legal/refund">Refunds</Link>
        <span>·</span>
        <Link href="/press">Press</Link>
      </footer>
    </div>
  );
}
