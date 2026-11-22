import type { Metadata } from "next";
import Link from "next/link";
import ConsoleShell from "../../../components/ConsoleShell";
import { ecosystemToken, projects } from "../../../lib/platform";

export const metadata: Metadata = { title: "Network registry" };

export default function ConsoleNetworks() {
  return (
    <ConsoleShell active="networks" eyebrow="WORKSPACE / CHAIN ARCHITECTURE" title="Multi-chain by design." description="Network intentions are documented per product. This registry distinguishes engineering work from verified live deployments; it is not a blockchain indexer.">
      <div className="console-chain-notice"><span>● INTEGRATION STATUS</span><strong>No production on-chain data adapter is connected to this console.</strong><p>Links to verified contracts, transaction history, treasury addresses and network analytics will be added after their sources are established.</p></div>
      <section className="console-section"><div className="console-section-top"><h2>Product network registry</h2><span>DEVELOPMENT PLANS · NOT LIVE NETWORK SUPPORT</span></div>
        <div className="console-chain-grid">
          {projects.map(project => <article className="console-chain-card" key={project.slug}>
            <div className="console-chain-head"><div><span>{project.affiliation === "candidate" ? "CANDIDATE PROTOTYPE" : "DXJ LABS PRODUCT"}</span><h3>{project.name}</h3></div><Link href={"/ecosystem/" + project.slug}>PRODUCT ↗</Link></div>
            {project.networks.map(network => <div className="console-chain-network" key={network.name}><div><span>NETWORK / DIRECTION</span><strong>{network.name}</strong></div><span className={"console-network-stage " + network.stage}>{network.stage}</span><p>{network.note}</p></div>)}
            <div className="console-chain-token"><span>TOKEN</span><strong>Not issued</strong></div>
          </article>)}
        </div>
      </section>
      <section className="console-section console-network-footer"><div><span>DXJ TOKEN / ECOSYSTEM</span><h2>Infrastructure before tokens.</h2></div><div><strong>Not issued</strong><p>{ecosystemToken.description}</p><p>Multi-chain supply controls, bridge security, verification and legal review are prerequisites to any future issuance.</p></div></section>
    </ConsoleShell>
  );
}
