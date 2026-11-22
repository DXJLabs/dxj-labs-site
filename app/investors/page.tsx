import type { Metadata } from "next";
import Link from "next/link";
import PlatformPage from "../../components/PlatformPage";

export const metadata: Metadata = { title: "Investor Overview | DXJ Labs", description: "Public information about DXJ Labs products, milestones, planned reporting and future due-diligence access." };

export default function InvestorsPage() {
  return (
    <PlatformPage number="05" tag="INVESTOR INFORMATION" title="Progress. With proof." description="A clear starting point for prospective partners and investors to understand DXJ Labs. Verified metrics, business reports and confidential documents will be added only when approved and available.">
      <section className="platform-section"><div className="platform-section-heading"><h2>Public due diligence</h2><span>Current access: public information only</span></div>
        <div className="investor-grid"><Link href="/ecosystem"><span>01 / PRODUCT DIRECTORY</span><h3>Explore the portfolio ↗</h3><p>See project stages, repositories, and network plans.</p></Link><Link href="/analytics"><span>02 / VERIFIED METRICS</span><h3>Understand our reporting ↗</h3><p>What we will measure and why no unsupported totals are shown.</p></Link><Link href="/activities"><span>03 / ACTIVITY & EVIDENCE</span><h3>Review build progress ↗</h3><p>Follow actual work, not an inflated milestones list.</p></Link></div>
      </section>
      <section className="platform-section platform-empty-section"><div><span className="section-tag">RESTRICTED DATA ROOM</span><h2>Private access.<br /><em>Not open yet.</em></h2></div><div><p>Confidential reports, financial statements, investor documents and identity-verified access are future features. There is no active login or private document service on this website today.</p><p className="platform-fineprint">No DXJ token issuance, ownership right, security offering, equity claim or return is represented by this page.</p></div></section>
    </PlatformPage>
  );
}
