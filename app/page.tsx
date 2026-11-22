import Script from "next/script";
import Link from "next/link";
import PlatformHeader from "../components/PlatformHeader";
import PlatformFooter from "../components/PlatformFooter";
import { getConsoleSnapshot, readableDate } from "../lib/github-console";
import { articles, activities } from "../lib/platform";
import { vinssContracts, contractExplorerUrl, evidenceUrls } from "../lib/evidence";

export const revalidate = 300;

const chainStages = [
  { name: "Starknet Mainnet", state: "Documented deployment", detail: "VINSS contracts & CAREL integrations" },
  { name: "Starknet Sepolia", state: "Development / testing", detail: "CAREL testing workflows" },
  { name: "Additional networks", state: "Architecture / planned", detail: "Adapters are evaluated per product" },
];

function UpArrow() { return <span aria-hidden="true" className="real-arrow">↗</span>; }

export default async function Home() {
  const data = await getConsoleSnapshot();
  const tracked = data.repositories.filter(repo => repo.config.slug === "vinss" || repo.config.slug === "carel");
  const recentCommits = tracked.flatMap(repo => repo.commits.slice(0, 2)).sort((a,b) => (b.date || "").localeCompare(a.date || "")).slice(0, 3);
  const studioArticle = articles.find(a => a.status === "published");
  const activity = activities[0];

  return (
    <div className="rebrand-app" id="top">
      <PlatformHeader />
      <Script src="/taste/motion/motion.js" type="module" strategy="afterInteractive" />
      <Script src="/taste/moments/moments.js" type="module" strategy="afterInteractive" />
      <main id="main-content">
        <section className="real-hero" aria-labelledby="real-hero-title">
          <div className="layout">
            <div className="real-hero-meta"><span><i /> DXJ LABS / ECOSYSTEM</span><span>INDEPENDENT PRODUCT STUDIO — EST. 2026</span></div>
            <div className="real-hero-grid">
              <div className="real-hero-story">
                <p className="real-overline">01 / WE BUILD THE INFRASTRUCTURE AND THE EXPERIENCE</p>
                <h1 id="real-hero-title">More than<br />an idea.<br /><em>On-chain.</em></h1>
                <p className="real-hero-intro">A multi-chain Web3 product studio creating privacy infrastructure, agentic finance, and the next generation of digital experiences.</p>
                <div className="real-hero-actions">
                  <Link href="#products" className="real-button real-button-primary">Explore our products <UpArrow /></Link>
                  <Link href="/ecosystem" className="real-button-text">Ecosystem directory <UpArrow /></Link>
                </div>
                <div className="real-hero-location"><span>BASED IN EAST KALIMANTAN, INDONESIA</span><span>SCROLL TO EXPLORE ↓</span></div>
              </div>

              <div className="real-hero-intel">
                <div className="real-intel-top"><span>DXJ / PRODUCT STATUS</span><span className="real-indicator"><i /> PUBLIC RECORDS</span></div>
                <div className="real-intel-center">
                  <div className="real-intel-orbit" aria-hidden="true"><span>DXJ</span><i className="real-satellite one"/><i className="real-satellite two"/><i className="real-satellite three"/></div>
                  <div className="real-intel-heading"><span>OUR ECOSYSTEM</span><h2>Build.<br/>Verify.<br/><em>Expand.</em></h2></div>
                </div>
                <div className="real-product-status-grid">
                  <Link href="/ecosystem/vinss" className="real-status-tile">
                    <span>01 / PRIVACY</span><strong>VINSS</strong><small>Starknet Mainnet · documented</small><span className="real-status-arrow">↗</span>
                  </Link>
                  <a href={evidenceUrls.carelApp} target="_blank" rel="noopener noreferrer" className="real-status-tile">
                    <span>02 / AGENTIC DEFI</span><strong>CAREL</strong><small>Public application available</small><span className="real-status-arrow">↗</span>
                  </a>
                </div>
                <div className="real-intel-bottom"><span>RECORDS LINK TO OFFICIAL SOURCES</span><span>V1.0 / WEB3 ECOSYSTEM</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="real-proofline" aria-label="DXJ Labs public evidence">
          <div className="layout real-proofline-inner">
            <div><strong>02</strong><span>Official product<br/>repositories</span></div>
            <div><strong>07</strong><span>VINSS mainnet contracts<br/>listed in repository</span></div>
            <div><strong>01</strong><span>CAREL public<br/>application</span></div>
            <a href={evidenceUrls.vinssMainnet} target="_blank" rel="noopener noreferrer">Source-linked proof <UpArrow /></a>
          </div>
        </section>

        <section className="real-products" id="products">
          <div className="layout">
            <div className="real-section-top"><div><p className="real-overline">02 / OUR PRODUCTS</p><h2>Technology made<br/><em>tangible.</em></h2></div><p>Different products. Different technical challenges. One standard: make the progress inspectable.</p></div>
            <article className="real-vinss">
              <div className="real-vinss-content">
                <div className="real-project-topline"><span>01 / PRIVACY INFRASTRUCTURE</span><span className="real-project-state"><i/> MAINNET DEPLOYMENT DOCUMENTED</span></div>
                <div className="real-project-mark">V<span>◈</span></div>
                <h3>VINSS</h3>
                <p className="real-project-lead">The private deal room for the on-chain economy.</p>
                <p className="real-project-body">From encrypted conversation to structured offers and shielded escrow—one connected deal lifecycle with verifiable settlement evidence.</p>
                <div className="real-deal-lifecycle" aria-label="VINSS lifecycle: message, offer, escrow, settlement">
                  <span>MESSAGE</span><b>→</b><span>OFFER</span><b>→</b><span>ESCROW</span><b>→</b><span>PROOF</span>
                </div>
                <div className="real-project-actions">
                  <Link href="/ecosystem/vinss" className="real-button real-button-lime">Explore VINSS <UpArrow /></Link>
                  <a href={evidenceUrls.vinssRepo} target="_blank" rel="noopener noreferrer" className="real-quiet-link">Technical repository <UpArrow /></a>
                </div>
                <p className="real-project-footnote">Mainnet status and contracts are documented by the product team. Always verify on an independent explorer.</p>
              </div>
              <div className="real-vinss-evidence">
                <div className="real-evidence-header"><span>VINSS / DEPLOYMENT RECORDS</span><span>STARKNET MAINNET</span></div>
                <div className="real-evidence-banner"><span><i/> CONTRACT REGISTRY</span><strong>07</strong><small>Distinct addresses published by VINSS</small></div>
                <div className="real-contract-list">
                  {vinssContracts.map((contract,i) => (
                    <a href={contractExplorerUrl(contract.address)} target="_blank" rel="noopener noreferrer" key={contract.address} className="real-contract">
                      <span>{String(i+1).padStart(2,"0")}</span><div><strong>{contract.name}</strong><small>{contract.purpose} / {contract.address.slice(0,10)}…{contract.address.slice(-6)}</small></div><i aria-hidden="true">↗</i>
                    </a>
                  ))}
                </div>
                <div className="real-evidence-footer"><span>SOURCE: OFFICIAL VINSS README</span><a href={evidenceUrls.vinssSprint} target="_blank" rel="noopener noreferrer">View sprint evidence ↗</a></div>
              </div>
            </article>

            <article className="real-carel">
              <div className="real-carel-copy">
                <div className="real-project-topline"><span>02 / AGENTIC FINANCE</span><span className="real-project-state"><i/> PUBLIC APP</span></div>
                <div className="real-carel-glyph" aria-hidden="true">✳</div>
                <h3>CAREL<span>®</span></h3>
                <p className="real-project-lead">DeFi, directed by intent.</p>
                <p className="real-project-body">A goal-driven financial interface that routes supported swaps, lending, staking and privacy workflows through explicit review and wallet approval.</p>
                <div className="real-carel-integrations"><span>AVNU</span><span>Vesu</span><span>Endur</span><span>STRK20</span></div>
                <div className="real-project-actions">
                  <a className="real-button real-button-dark" href={evidenceUrls.carelApp} target="_blank" rel="noopener noreferrer">Open CAREL app <UpArrow /></a>
                  <Link href="/ecosystem/carel" className="real-quiet-link">Product details <UpArrow /></Link>
                </div>
                <p className="real-project-footnote">Public application URL and integrations are cited in the official CAREL repository.</p>
              </div>
              <div className="real-carel-visual">
                <div className="real-browser-toolbar"><span className="real-browser-dots"><i/><i/><i/></span><span>carel-v2-mock.vercel.app</span><a href={evidenceUrls.carelApp} target="_blank" rel="noopener noreferrer" aria-label="Open CAREL app">↗</a></div>
                <div className="real-browser-window" role="img" aria-label="Screenshot area of the published CAREL application">
                  <div className="real-browser-fallback"><strong>carel<span>✳</span></strong><p>Agentic DeFi execution</p><small>OPEN THE PUBLIC APPLICATION TO EXPLORE</small></div>
                </div>
                <div className="real-browser-bottom"><span>PUBLIC PRODUCT EXPERIENCE</span><span>CAREL / DXJ LABS</span></div>
              </div>
            </article>
            <div className="real-candidate"><div><span className="real-overline">EXPERIMENTAL / NOT YET AN OFFICIAL DXJ LABS RELEASE</span><h3>Growhaven <span>↗</span></h3><p>A personal game prototype under validation. No blockchain deployment or game token is claimed.</p></div><Link href="/ecosystem/growhaven">Read prototype status <UpArrow /></Link></div>
          </div>
        </section>

        <section className="real-buildfeed" id="buildfeed">
          <div className="layout">
            <div className="real-buildfeed-head"><div><p className="real-overline">03 / TRANSPARENT DEVELOPMENT</p><h2>Not just promises.<br/><em>Public commits.</em></h2></div><Link href="/activities" className="real-text-action">Full activity log <UpArrow /></Link></div>
            <div className="real-buildfeed-grid">
              <div className="real-feed-statement"><span className="real-green-dot"/> FROM THE DXJ LABS GITHUB ORGANIZATION <p>We publish source-linked development signals. This is engineering activity, not user adoption, token trading volume, or revenue.</p><div><strong>{data.repositories.filter(repo=>repo.metadata).length}/{data.repositories.length}</strong><span>Public sources accessible at last data fetch</span></div></div>
              <div className="real-feed-list">
                {recentCommits.length ? recentCommits.map(commit=><a href={commit.url} key={commit.sha+commit.slug} target="_blank" rel="noopener noreferrer" className="real-feed-item"><div><span>{commit.project.toUpperCase()} / {readableDate(commit.date)}</span><strong>{commit.title}</strong><small>{commit.author} · {commit.shortSha}</small></div><span aria-hidden="true">↗</span></a>) : <div className="real-feed-empty">GitHub is temporarily unavailable. <a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">Browse source repositories ↗</a></div>}
                <div className="real-feed-source">SOURCE: GITHUB REST API · 5-MIN CACHE · NO FAKE DATA</div>
              </div>
            </div>
          </div>
        </section>

        <section className="real-manifesto" data-moment="word-highlight">
          <div className="layout"><span className="real-overline">OUR ECOSYSTEM IS NOT LIMITED TO ONE CHAIN</span><p className="mo-wh__text">Different products will live on different networks. DXJ Labs connects the experience, while every deployment and metric must remain <strong>verifiable at the source.</strong></p><Link href="/ecosystem" className="real-text-action">Explore our network strategy <UpArrow /></Link></div>
        </section>

        <section className="real-beyond">
          <div className="layout">
            <div className="real-section-top"><div><p className="real-overline">04 / MORE THAN PRODUCTS</p><h2>Inside the <em>studio.</em></h2></div><p>Follow what we build, what we learn, and the information we share with our ecosystem.</p></div>
            <div className="real-beyond-grid">
              <Link href="/activities" className="real-beyond-card"><span>01 / ACTIVITY</span><span className="real-card-symbol">↗</span><h3>Development<br/>& events.</h3><p>{activity?.summary || "Documented project updates and upcoming activities."}</p><strong>View activities <UpArrow /></strong></Link>
              <Link href="/blog" className="real-beyond-card"><span>02 / PUBLICATIONS</span><span className="real-card-symbol">≡</span><h3>Blog<br/>& research.</h3><p>{studioArticle?.excerpt || "Technical writing and research from DXJ Labs."}</p><strong>Read the journal <UpArrow /></strong></Link>
              <Link href="/investors" className="real-beyond-card real-investor-card"><span>03 / INVESTOR INFORMATION</span><span className="real-card-symbol">◈</span><h3>Proof<br/>& progress.</h3><p>Public project evidence and reporting methodology. Private investor records are not available yet.</p><strong>Investor overview <UpArrow /></strong></Link>
            </div>
          </div>
        </section>

        <section className="real-network-table">
          <div className="layout"><div className="real-network-heading"><div><p className="real-overline">05 / NETWORK ROADMAP</p><h2>Built to cross<br/><em>boundaries.</em></h2></div><p>Each integration is labeled according to what its project documents—not what a concept diagram suggests.</p></div><div className="real-networks">{chainStages.map((n,i)=><div key={n.name}><span>{String(i+1).padStart(2,"0")}</span><strong>{n.name}</strong><em>{n.state}</em><small>{n.detail}</small></div>)}</div></div>
        </section>
      </main>
      <section className="real-final-cta"><div className="layout"><span>DXJ LABS / INDEPENDENT PRODUCT STUDIO</span><h2>Ideas are easy.<br/><em>Building is the point.</em></h2><div><Link href="/ecosystem">Explore our ecosystem <UpArrow /></Link><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">Follow the build <UpArrow /></a></div><p>DXJ token is not issued. No investment returns, token prices or confidential investor data are claimed.</p></div></section>
      <PlatformFooter />
    </div>
  );
}
