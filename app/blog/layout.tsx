import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/">← Travel Lens</Link>
        {" · "}
        <Link href="/blog">Blog</Link>
      </header>
      <article className="legal-body blog-body">{children}</article>
      <footer className="legal-footer">
        <Link href="/about">About</Link>
        <span>·</span>
        <Link href="/blog">Blog</Link>
        <span>·</span>
        <Link href="/legal/privacy">Privacy</Link>
        <span>·</span>
        <Link href="/press">Press</Link>
      </footer>
    </div>
  );
}
