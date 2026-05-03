import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Lens — Legal",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/">← 여행 렌즈</Link>
      </header>
      <article className="legal-body">{children}</article>
      <footer className="legal-footer">
        <Link href="/legal/privacy">Privacy</Link>
        <span>·</span>
        <Link href="/legal/terms">Terms</Link>
        <span>·</span>
        <Link href="/legal/refund">Refunds</Link>
      </footer>
    </div>
  );
}
