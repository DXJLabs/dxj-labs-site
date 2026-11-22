import type { Metadata } from "next";
import Link from "next/link";
import ConsoleShell from "../../components/ConsoleShell";
import { CommitFeed, RepositoryGrid, SourceNote } from "../../components/ConsoleWidgets";
import { formatNumber, getConsoleSnapshot, readableDate } from "../../lib/github-console";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Overview",
  description: "Real GitHub development metrics and repository activity for DXJ Labs.",
};

export default async function ConsolePage() {
  const snapshot = await getConsoleSnapshot();
  const available = snapshot.repositories.filter(r => r.metadata);
  const complete = available.length === snapshot.repositories.length && snapshot.repositories.every(r => !r.activityError);
  const stars = available.reduce((sum, r) => sum + (r.metadata?.stargazers_count || 0), 0);
  const openItems = available.reduce((sum, r) => sum + (r.metadata?.open_issues_count || 0), 0);
  const lastPush = available.map(r => r.metadata?.pushed_at).filter((x): x is string => !!x).sort().at(-1) || null;
  const covered = available.length === snapshot.repositories.length ? "ALL PUBLIC REPOS" : available.length + " OF " + snapshot.repositories.length + " AVAILABLE";
  return (
    <ConsoleShell active="overview" eyebrow="OVERVIEW / GITHUB CONNECTED SYSTEM" title="Build in the open." description="Real development signals from the DXJ Labs organization. Explore repository health, published code activity, and integration plans without fabricated blockchain statistics.">
      <SourceNote checkedAt={snapshot.checkedAt} warning={!complete} />
      <section className="console-section">
        <div className="console-section-top"><h2>Repository pulse</h2><span>GITHUB REST API · 5-MIN CACHE</span></div>
        <div className="console-stats-grid">
          <div className="console-stat"><span>TRACKED REPOSITORIES</span><strong>{String(snapshot.repositories.length).padStart(2, "0")}</strong><small>Official organization repositories</small></div>
          <div className="console-stat"><span>PUBLIC STARS</span><strong>{available.length ? formatNumber(stars) : "—"}</strong><small>{covered}</small></div>
          <div className="console-stat"><span>OPEN ISSUES + PULL REQUESTS</span><strong>{available.length ? formatNumber(openItems) : "—"}</strong><small>GitHub repository counter · {covered.toLowerCase()}</small></div>
          <div className="console-stat"><span>LATEST CODE PUSH</span><strong className="console-stat-date">{readableDate(lastPush)}</strong><small>Most recently pushed public repository</small></div>
        </div>
        <p className="console-metric-footnote">These figures describe GitHub repositories only. Stars do not equal users; repository updates are not financial results. Aggregate counts are partial if GitHub data is unavailable.</p>
      </section>
      <section className="console-section">
        <div className="console-section-top"><h2>Tracked repositories</h2><Link href="/console/projects">EXPLORE ALL REPOSITORIES ↗</Link></div>
        <RepositoryGrid repositories={snapshot.repositories} />
      </section>
      <section className="console-dash-grid">
        <section className="console-section">
          <div className="console-section-top"><h2>Recent development</h2><Link href="/console/activity">FULL COMMIT FEED ↗</Link></div>
          <CommitFeed commits={snapshot.commits.slice(0, 7)} />
        </section>
        <aside className="console-side-panel">
          <div className="console-section-top"><h2>Integration status</h2><Link href="/console/networks">REGISTRY ↗</Link></div>
          <div className="console-integration-card"><div className="console-integrated-icon">⬡</div><span>STARKNET / VINSS</span><strong>Development</strong><p>Documented work in progress. No verified live analytics feed or production contract connected to this console.</p></div>
          <div className="console-integration-card"><div className="console-integrated-icon">⌁</div><span>MULTI-CHAIN ADAPTERS</span><strong>Not connected</strong><p>EVM and other network integrations will be recorded only after concrete deployments and verified data sources exist.</p></div>
          <Link className="console-integrations-link" href="/analytics">On-chain metrics methodology ↗</Link>
        </aside>
      </section>
    </ConsoleShell>
  );
}
