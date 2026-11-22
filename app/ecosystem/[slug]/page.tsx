import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformPage from "../../../components/PlatformPage";
import { projects } from "../../../lib/platform";
import { vinssContracts, contractExplorerUrl, evidenceUrls } from "../../../lib/evidence";

export function generateStaticParams() { return projects.map(product => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find(item => item.slug === slug);
  return product ? { title: product.name + " | DXJ Labs Ecosystem", description: product.description } : { title: "Project not found | DXJ Labs" };
}
const stageName = { "in-development": "Continuing development", exploration: "Exploration", prototype: "Personal prototype" };
const networkName = { live: "Documented deployment", testing: "Development / testing", planned: "Planned" };

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = projects.find(item => item.slug === slug);
  if (!product) notFound();
  return (
    <PlatformPage number="01" tag={product.area.toUpperCase()} title={product.name} description={product.description}>
      <section className="platform-section detail-panel">
        <div className="detail-intro">
          <span className="section-tag">PRODUCT STATUS</span>
          <h2>{stageName[product.stage]}</h2>
          <p>Development stage describes ongoing engineering. It does not override the network-specific deployment information below.</p>
          {product.affiliation === "candidate" && <p><strong>Candidate only:</strong> this personal prototype has not yet been transferred into the DXJ Labs organization.</p>}
          {product.appUrl && <p><a className="platform-inline-link" href={product.appUrl} target="_blank" rel="noopener noreferrer">Open public {product.name} application ↗</a></p>}
        </div>
        <div className="detail-content">
          <h3>Networks & integrations</h3>
          {product.networks.map(network => <div className="chain-row" key={network.name}><strong>{network.name}</strong><span>{networkName[network.stage]}</span><small>{network.note}</small></div>)}
          <h3>Proof & source documents</h3>
          {product.proof?.map(proof => <a className="detail-proof-link" href={proof.href} key={proof.href} target="_blank" rel="noopener noreferrer"><span>{proof.label}</span><strong>{proof.value} ↗</strong><small>{proof.explanation}</small></a>) || <p>No published evidence links are available for this candidate prototype.</p>}
          <h3>Token status</h3>
          <p><strong>Not issued.</strong> {product.token.note}</p>
          <h3>Source code</h3>
          {product.repositoryUrl ? <a className="platform-inline-link" href={product.repositoryUrl} target="_blank" rel="noopener noreferrer">View official project repository ↗</a> : <p>No official DXJ Labs organization repository is listed yet.</p>}
        </div>
      </section>
      {product.slug === "vinss" && <section className="platform-section detail-contracts">
        <div className="platform-section-heading"><h2>VINSS mainnet contracts</h2><span>7 ADDRESSES / FROM OFFICIAL REPOSITORY</span></div>
        <p>These contract addresses are published by the VINSS team. Follow each link to inspect the blockchain explorer; this page does not represent an independent contract audit.</p>
        <div className="detail-contract-grid">
          {vinssContracts.map((contract,i)=><a href={contractExplorerUrl(contract.address)} target="_blank" rel="noopener noreferrer" key={contract.address}><span>{String(i+1).padStart(2,"0")} / {contract.purpose}</span><strong>{contract.name} ↗</strong><code>{contract.address.slice(0,20)}…{contract.address.slice(-9)}</code></a>)}
        </div>
        <a className="platform-inline-link" href={evidenceUrls.vinssSprint} target="_blank" rel="noopener noreferrer">Read machine-readable mainnet evidence ↗</a>
      </section>}
      <div className="platform-back"><Link href="/ecosystem">← Back to ecosystem</Link></div>
    </PlatformPage>
  );
}
