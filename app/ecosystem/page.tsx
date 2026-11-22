import type { Metadata } from "next";
import Link from "next/link";
import PlatformPage from "../../components/PlatformPage";
import { ecosystemToken, projects } from "../../lib/platform";

export const metadata: Metadata = { title: "Ecosystem | DXJ Labs", description: "Explore DXJ Labs products, their real development stages, planned blockchain integrations and token status." };

const stageName = { "in-development": "In development", exploration: "Exploration", prototype: "Prototype" };
const networkName = { live: "Live", testing: "Testing", planned: "Planned" };

export default function EcosystemPage() {
  return (
    <PlatformPage number="01" tag="PRODUCT ECOSYSTEM" title="Many ideas. One ecosystem." description="An independent, multi-chain product studio. Every project has its own mission, development stage, and technology decisions. Network support and token status are shown without guesswork.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Products & experiments</h2><span>{String(projects.length).padStart(2, "0")} documented directions</span></div>
        <div className="ecosystem-list">
          {projects.map((product, index) => (
            <article key={product.slug} className="ecosystem-item">
              <div className="ecosystem-item-number">0{index + 1} / {product.area.toUpperCase()}</div>
              <div className="ecosystem-item-main"><h3>{product.name}</h3><p>{product.description}</p><span className="platform-status">{stageName[product.stage]}</span>{product.affiliation === "candidate" && <span className="candidate-label">Candidate · not yet transferred to DXJ Labs</span>}</div>
              <div className="ecosystem-item-info"><span className="info-label">NETWORKS</span>{product.networks.map(network => <div className="chain-row" key={network.name}><strong>{network.name}</strong><span>{networkName[network.stage]}</span><small>{network.note}</small></div>)}<div className="token-summary"><span className="info-label">PRODUCT TOKEN</span><strong>Not issued</strong><small>{product.token.note}</small></div></div>
              <div className="ecosystem-item-action"><Link href={`/ecosystem/${product.slug}`}>Project details <span aria-hidden="true">↗</span></Link></div>
            </article>
          ))}
        </div>
      </section>
      <section className="platform-section token-explainer">
        <div><span className="section-tag">DXJ / ECOSYSTEM TOKEN</span><h2>Utility first.<br /><em>Issuance later.</em></h2></div>
        <div><span className="platform-status status-pending">Not issued</span><p>{ecosystemToken.description}</p><p className="platform-fineprint">A planned token is not an investment offering. There is no DXJ contract address, token sale, live price, or fixed tokenomics to verify today.</p></div>
      </section>
    </PlatformPage>
  );
}
