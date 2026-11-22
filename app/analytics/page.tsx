import type { Metadata } from "next";
import PlatformPage from "../../components/PlatformPage";
import { metrics } from "../../lib/platform";
import { getConsoleSnapshot, readableDate } from "../../lib/github-console";

export const revalidate = 300;
export const metadata: Metadata = { title: "Analytics | DXJ Labs", description: "Public GitHub engineering activity and honest availability of on-chain and business metrics at DXJ Labs." };

export default async function AnalyticsPage() {
  const snapshot = await getConsoleSnapshot();
  const available = snapshot.repositories.filter(repo => repo.metadata);
  const allAvailable = available.length === snapshot.repositories.length;
  const stars = available.reduce((total, repo) => total + (repo.metadata?.stargazers_count || 0), 0);
  const forks = available.reduce((total, repo) => total + (repo.metadata?.forks_count || 0), 0);
  const pushes = available.map(repo => repo.metadata?.pushed_at).filter((date): date is string => !!date).sort();
  return (
    <PlatformPage number="04" tag="ECOSYSTEM ANALYTICS" title="Public data. Clear sources." description="Engineering activity is available from GitHub today. Financial, investor and blockchain metrics will appear only after their sources are independently verified.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Development metrics</h2><span>GITHUB REST API · UPDATED WITHIN 5 MINUTES</span></div>
        <div className="public-data-preamble"><span className="status-indicator" /><p>Real repository telemetry, not token performance or financial data. {allAvailable ? "All tracked public repositories are accessible." : "Some sources are unavailable; totals may be incomplete."}</p></div>
        <div className="public-metric-grid">
          <div><span>OFFICIAL REPOSITORIES TRACKED</span><strong>{snapshot.repositories.length}</strong><small>VINSS, CAREL and the DXJ Labs website</small></div>
          <div><span>GITHUB STARS</span><strong>{available.length ? stars : "—"}</strong><small>{available.length} of {snapshot.repositories.length} sources available</small></div>
          <div><span>GITHUB FORKS</span><strong>{available.length ? forks : "—"}</strong><small>Source-control community signals</small></div>
          <div><span>MOST RECENT PUSH</span><strong className="public-metric-date">{readableDate(pushes.at(-1) || null)}</strong><small>Verified repository update time</small></div>
        </div>
        <p className="platform-fineprint">Sources: <a href="https://github.com/DXJLabs/vinss" target="_blank" rel="noopener noreferrer">VINSS ↗</a>, <a href="https://github.com/DXJLabs/Carel" target="_blank" rel="noopener noreferrer">CAREL ↗</a>, <a href="https://github.com/DXJLabs/dxj-labs-site" target="_blank" rel="noopener noreferrer">DXJ website ↗</a>. GitHub stars are not customers, forks are not revenue, and commit activity is not a measure of profitability.</p>
      </section>
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Blockchain & business metrics</h2><span>NOT YET CONNECTED</span></div>
        <div className="metrics-grid">{metrics.map(m => <article className="metric-card" key={m.key}><span>{m.label.toUpperCase()}</span><strong>—</strong><p>Not available</p><small>{m.methodology}</small></article>)}</div>
      </section>
      <section className="platform-section platform-empty-section"><div><span className="section-tag">MEASUREMENT POLICY</span><h2>Evidence before numbers.</h2></div><div><p>Future multi-chain metrics must disclose their network, source, date, reporting window and aggregation methodology.</p><p className="platform-fineprint">Wallets are not necessarily users. On-chain transactions do not equal revenue. Bridge events need careful cross-chain reconciliation.</p></div></section>
    </PlatformPage>
  );
}
