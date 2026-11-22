import Link from "next/link";
import type { ReactNode } from "react";

type Section = "overview" | "projects" | "activity" | "networks" | "sources";
const sections: { key: Section; label: string; symbol: string; href: string }[] = [
  { key: "overview", label: "Overview", symbol: "◈", href: "/console" },
  { key: "projects", label: "Repositories", symbol: "▦", href: "/console/projects" },
  { key: "activity", label: "Development feed", symbol: "≋", href: "/console/activity" },
  { key: "networks", label: "Network registry", symbol: "⬡", href: "/console/networks" },
  { key: "sources", label: "Data sources", symbol: "⌁", href: "/console/sources" },
];

export default function ConsoleShell({
  active,
  eyebrow,
  title,
  description,
  children,
}: {
  active: Section;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="console-root">
      <aside className="console-sidebar">
        <div>
          <Link href="/" className="console-brand" aria-label="DXJ Labs home">
            <span className="console-brand-symbol">D<span>✳</span></span>
            <span><b>DXJ LABS</b><small>ECOSYSTEM CONSOLE</small></span>
          </Link>
          <div className="console-sidebar-caption">WORKSPACE / PUBLIC</div>
          <nav className="console-nav" aria-label="Console navigation">
            {sections.map(item => (
              <Link key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined} className={active === item.key ? "console-nav-item selected" : "console-nav-item"}>
                <span aria-hidden="true">{item.symbol}</span>{item.label}<b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>
        </div>
        <div className="console-sidebar-bottom">
          <div className="console-sidebar-separator" />
          <p>PUBLIC DATA WORKSPACE</p>
          <span>Development telemetry from GitHub. No private investor records are exposed here.</span>
          <Link href="/ecosystem">← Back to ecosystem</Link>
        </div>
      </aside>
      <div className="console-content">
        <div className="console-topbar">
          <div className="console-topbar-title"><span className="console-pulse" /> DXJ LABS / SYSTEMS / {active.toUpperCase()}</div>
          <div className="console-topbar-actions"><span>PUBLIC READ-ONLY</span><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GITHUB ↗</a></div>
        </div>
        <main className="console-main">
          <div className="console-page-intro">
            <div className="console-eyebrow">{eyebrow}</div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
          <footer className="console-footer">
            <span>DXJ LABS · OPEN DEVELOPMENT TELEMETRY</span>
            <span>GitHub data ≠ on-chain or financial performance</span>
            <Link href="/">STUDIO WEBSITE ↗</Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
