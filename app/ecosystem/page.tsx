import type { Metadata } from "next";
import Link from "next/link";
import PlatformPage from "../../components/PlatformPage";
import { ecosystemToken, projects } from "../../lib/platform";
import { getConsoleSnapshot, readableDate } from "../../lib/github-console";

export const revalidate = 300;

export const metadata: Metadata = { title: "Ecosystem | DXJ Labs", description: "Explore DXJ Labs products, their real development stages, planned blockchain integrations and token status." };

const stageName = { "in-development": "In development", exploration: "Exploration", prototype: "Prototype" };
const networkName = { live: "Documented", testing: "Testing", planned: "Planned" };

export default async function EcosystemPage() {
  const snapshot = await getConsoleSnapshot();
  return (
    <PlatformPage number="01" tag="PRODUCT ECOSYSTEM" title="Many ideas. One ecosystem." description="An independent, multi-chain product studio. Every project has its own mission, development stage, and technology decisions. Mainnet deployments, live application links, and future networks are separated by source and stage.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Products & experiments</h2><span>{String(projects.length).padStart(2, "0")} documented directions</span></div>
        <div className="ecosystem-list">
          {projects.map((product, index) => {
            const repo = snapshot.repositories.find(item => item.config.slug === product.slug);
            return (
            <article key={product.slug} className="ecosystem-item">
              <div className="ecosystem-item-number">0{index + 1} / {product.area.toUpperCase()}</div>
              <div className="ecosystem-item-main"><h3>{product.name}</h3><p>{product.description}</p><span className="platform-status">{stageName[product.stage]}</span>{product.affiliation === "candidate" && <span className="candidate-label">Candidate · not yet transferred to DXJ Labs</span>}{repo && <div className="project-code-signal"><span>ENGINEERING / GITHUB</span>{repo.commits[0] ? <a href={repo.commits[0].url} target="_blank" rel="noopener noreferrer">{repo.commits[0].title} ↗</a> : <p>Recent activity not available</p>}<small>Last public push: {readableDate(repo.metadata?.pushed_at || null)}</small></div>}</div>
              <div className="ecosystem-item-info"><span className="info-label">NETWORKS</span>{product.networks.map(network => <div className="chain-row" key={network.name}><strong>{network.name}</strong><span>{networkName[network.stage]}</span><small>{network.note}</small></div>)}<div className="token-summary"><span className="info-label">PRODUCT TOKEN</span><strong>Not issued</strong><small>{product.token.note}</small></div></div>
              <div className="ecosystem-item-action"><Link href={`/ecosystem/${product.slug}`}>Proof & details <span aria-hidden="true">↗</span></Link>{product.appUrl && <a href={product.appUrl} target="_blank" rel="noopener noreferrer">Open application <span aria-hidden="true">↗</span></a>}{product.proof && <p className="ecosystem-proof-count">{product.proof.length} source-backed records</p>}</div>
            </article>
          );})}
        </div>
      </section>
      <div className="ecosystem-evidence"><span>PROJECT STATUS / VERIFIED SOURCES</span><p>Repository details and commit signals are fetched from public GitHub sources with a five-minute cache. Blockchain integrations include documented mainnet deployments and testing stages, with source URLs for independent inspection.</p><a href="/activities">View development activity ↗</a></div>
      <section className="platform-section token-explainer">
        <div><span className="section-tag">DXJ / ECOSYSTEM TOKEN</span><h2>Utility first.<br /><em>Issuance later.</em></h2></div>
        <div><span className="platform-status status-pending">Not issued</span><p>{ecosystemToken.description}</p><p className="platform-fineprint">A planned token is not an investment offering. There is no DXJ contract address, token sale, live price, or fixed tokenomics to verify today.</p></div>
      </section>
    </PlatformPage>
  );
}
