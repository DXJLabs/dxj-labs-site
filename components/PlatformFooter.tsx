import Link from "next/link";

export default function PlatformFooter() {
  return (
    <footer className="platform-footer">
      <div className="layout platform-footer-inner">
        <div><strong>DXJ LABS <span>✳</span></strong><p>Independent multi-chain product ecosystem.<br />East Kalimantan, Indonesia.</p></div>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link><Link href="/ecosystem">Ecosystem</Link><Link href="/activities">Activities</Link><Link href="/blog">Blog</Link><Link href="/analytics">Analytics</Link><Link href="/investors">Investors</Link>
        </nav>
        <div className="platform-footer-end"><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GitHub ↗</a><small>© 2026 DXJ Labs</small></div>
      </div>
    </footer>
  );
}
