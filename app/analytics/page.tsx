import type { Metadata } from "next";
import PlatformPage from "../../components/PlatformPage";
import { metrics } from "../../lib/platform";

export const metadata: Metadata = { title: "Analytics | DXJ Labs", description: "A transparent methodology for DXJ Labs ecosystem analytics. No fabricated transaction volume, wallet counts or financial metrics." };

export default function AnalyticsPage() {
  return (
    <PlatformPage number="04" tag="ECOSYSTEM ANALYTICS" title="Data that earns trust." description="This reporting layer is being prepared for verified, cross-chain data. Unavailable numbers stay unavailable until trustworthy sources and aggregation methods are in place.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Metrics overview</h2><span>No verified data feed connected</span></div>
        <div className="metrics-grid">{metrics.map(m => <article className="metric-card" key={m.key}><span>{m.label.toUpperCase()}</span><strong>—</strong><p>Not available</p><small>{m.methodology}</small></article>)}</div>
      </section>
      <section className="platform-section platform-empty-section"><div><span className="section-tag">MEASUREMENT POLICY</span><h2>Sources before charts.</h2></div><div><p>Future metrics must disclose their network, source, date, reporting window and aggregation methodology.</p><p className="platform-fineprint">Wallets are not necessarily users. On-chain transaction count is not revenue. Multi-chain totals must avoid double-counting cross-chain transfers.</p></div></section>
    </PlatformPage>
  );
}
