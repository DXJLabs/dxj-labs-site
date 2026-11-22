import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlatformPage from "../../../components/PlatformPage";
import { projects } from "../../../lib/platform";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find(item => item.slug === slug);
  return p ? { title: `${p.name} | DXJ Labs Ecosystem`, description: p.description } : { title: "Project not found | DXJ Labs" };
}
const stageName = { "in-development": "In development", exploration: "Exploration", prototype: "Prototype" };
const networkName = { live: "Live", testing: "Testing", planned: "Planned" };

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = projects.find(item => item.slug === slug);
  if (!product) notFound();
  return (
    <PlatformPage number="01" tag={product.area.toUpperCase()} title={product.name} description={product.description}>
      <section className="platform-section detail-panel">
        <div className="detail-intro"><span className="section-tag">CURRENT STATUS</span><h2>{stageName[product.stage]}</h2><p>Product stages describe development progress, not availability of a released commercial service.</p></div>
        <div className="detail-content"><h3>Networks and integrations</h3>{product.networks.map(network => <div className="chain-row" key={network.name}><strong>{network.name}</strong><span>{networkName[network.stage]}</span><small>{network.note}</small></div>)}
        <h3>Token status</h3><p><strong>Not issued.</strong> {product.token.note}</p>
        <h3>Public development evidence</h3>
        {product.repositoryUrl ? <a className="platform-inline-link" href={product.repositoryUrl} target="_blank" rel="noopener noreferrer">View project repository ↗</a> : <p>No official DXJ Labs organization repository is listed yet. This prototype is undergoing validation.</p>}
        </div>
      </section><div className="platform-back"><Link href="/ecosystem">← Back to ecosystem</Link></div>
    </PlatformPage>
  );
}
