import Link from "next/link";

export default function JapanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/">← Travel Lens</Link>
      </header>
      <article className="legal-body">{children}</article>
      <footer className="legal-footer">
        <Link href="/japan">Japan</Link>
        <span>·</span>
        <Link href="/korea">Korea</Link>
        <span>·</span>
        <Link href="/blog">Blog</Link>
        <span>·</span>
        <Link href="/about">About</Link>
      </footer>
    </div>
  );
}
