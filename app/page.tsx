import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getConsoleSnapshot, readableDate } from "../lib/github-console";
import { activities, publishedArticles } from "../lib/platform";
import "./homepage.css";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "DXJ Labs — Multi-Chain Product Studio",
  description: "DXJ Labs builds privacy-first Web3 products and explores AI, finance, and interactive experiences across blockchain networks. Explore projects, public development progress, and research.",
};

function Arrow() {
  return <span className="dxj-arrow" aria-hidden="true">↗</span>;
}

function StudioNav() {
  return (
    <header className="dxj-nav nav">
      <div className="wrap dxj-nav-inner">
      <Link className="dxj-logo" href="/" aria-label="DXJ Labs homepage">DXJ<span>LABS</span><i aria-hidden="true">✳</i></Link>
      <nav className="dxj-nav-links" aria-label="Site navigation">
        <Link href="/ecosystem">Ecosystem</Link>
        <Link href="/activities">Activities</Link>
        <Link href="/blog">Journal</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/investors">Investors</Link>
      </nav>
      <Link href="/ecosystem" className="dxj-nav-action">Explore projects <Arrow /></Link>
      <details className="dxj-mobile-menu">
        <summary aria-label="Toggle navigation">Menu <span aria-hidden="true">☰</span></summary>
        <nav aria-label="Mobile navigation">
          <Link href="/ecosystem">Ecosystem</Link>
          <Link href="/activities">Activities</Link>
          <Link href="/blog">Blog & Research</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/investors">Investor Overview</Link>
          <a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
      </details>
      </div>
    </header>
  );
}

function NetworkGraphic() {
  return (
    <svg className="dxj-network-art" viewBox="0 0 620 590" role="img" aria-label="DXJ Labs connected to privacy, intelligent finance, and future blockchain products">
      <defs>
        <radialGradient id="dxj-node-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#d2fca1" stopOpacity=".36"/><stop offset="100%" stopColor="#d2fca1" stopOpacity="0"/></radialGradient>
        <linearGradient id="dxj-connect-line" x1="0" x2="1"><stop stopColor="#bdea8c" stopOpacity=".35"/><stop offset="1" stopColor="#bdea8c" stopOpacity=".85"/></linearGradient>
      </defs>
      <circle cx="307" cy="298" r="242" fill="none" stroke="#b4df9c" opacity=".15" strokeWidth="1.4"/>
      <circle cx="307" cy="298" r="184" fill="none" stroke="#a7d693" opacity=".28" strokeDasharray="4 11" strokeWidth="1.2"/>
      <circle cx="307" cy="298" r="117" fill="none" stroke="#a7d693" opacity=".45" strokeWidth="1.4"/>
      <circle cx="307" cy="298" r="160" fill="url(#dxj-node-glow)"/>
      <path d="M307 298 L145 157 M307 298 L487 193 M307 298 L458 455 M307 298 L155 445" stroke="url(#dxj-connect-line)" strokeWidth="2.3" fill="none"/>
      <circle cx="307" cy="298" r="74" fill="#bce990"/>
      <circle cx="307" cy="298" r="61" fill="#d9f6b8" stroke="#173c25" strokeWidth="1"/>
      <text x="307" y="310" fontFamily="Arial,sans-serif" fontSize="39" fill="#173622" fontWeight="800" textAnchor="middle">DXJ</text>
      <circle cx="145" cy="157" r="37" fill="#203e2a" stroke="#d1f2a6" strokeWidth="2"/>
      <path d="M130 150 V144 A15 15 0 0 1 160 144 V150 M127 149 H163 V168 H127 Z" fill="none" stroke="#d2f5b3" strokeWidth="2.3"/>
      <circle cx="487" cy="193" r="37" fill="#283d36" stroke="#d1f2a6" strokeWidth="2"/>
      <path d="M487 171 L493 184 L507 186 L497 196 L500 210 L487 204 L474 210 L477 196 L467 186 L481 184 Z" fill="none" stroke="#d9f7ba" strokeWidth="2"/>
      <circle cx="458" cy="455" r="19" fill="#6e985c" stroke="#d1f2a6"/>
      <circle cx="155" cy="445" r="19" fill="#6e985c" stroke="#d1f2a6"/>
      <text x="145" y="105" textAnchor="middle" fill="#e6f5e1" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="700">VINSS</text>
      <text x="487" y="136" textAnchor="middle" fill="#e6f5e1" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="700">CAREL</text>
      <text x="477" y="502" textAnchor="middle" fill="#bcd9b8" fontFamily="Arial,sans-serif" fontSize="12">FUTURE NETWORKS</text>
      <text x="155" y="489" textAnchor="middle" fill="#bcd9b8" fontFamily="Arial,sans-serif" fontSize="12">RESEARCH</text>
    </svg>
  );
}

function VinssGraphic() {
  return (
    <svg viewBox="0 0 590 310" className="dxj-product-art" role="img" aria-label="Illustrative VINSS encrypted deal room interface">
      <rect width="590" height="310" rx="7" fill="#e9f0e6"/>
      <rect x="0" width="590" height="41" rx="7" fill="#cddfc8"/>
      <circle cx="22" cy="21" r="5" fill="#56885b"/><circle cx="39" cy="21" r="5" fill="#789a74"/><circle cx="56" cy="21" r="5" fill="#a1b69c"/>
      <text x="85" y="26" fill="#24422f" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">VINSS / SECURE WORKSPACE</text>
      <rect x="0" y="41" width="149" height="269" fill="#d7e5d3"/>
      <text x="19" y="77" fontSize="10" fill="#527357" fontFamily="Arial,sans-serif">WORKSPACE</text>
      <rect x="12" y="94" width="125" height="32" fill="#b4d1ab" rx="3"/>
      <text x="25" y="114" fontSize="13" fill="#1d4530" fontFamily="Arial,sans-serif" fontWeight="700">Overview</text>
      <text x="25" y="154" fontSize="12" fill="#4b7054" fontFamily="Arial,sans-serif">Messages</text>
      <text x="25" y="189" fontSize="12" fill="#4b7054" fontFamily="Arial,sans-serif">Agreements</text>
      <text x="25" y="224" fontSize="12" fill="#4b7054" fontFamily="Arial,sans-serif">Settlement</text>
      <text x="179" y="81" fontSize="12" fontFamily="Arial,sans-serif" fill="#577b5d">DEAL ROOM  /  001</text>
      <text x="179" y="127" fontSize="31" fontWeight="700" fontFamily="Arial,sans-serif" fill="#1a3c27">Private by design.</text>
      <text x="179" y="151" fontSize="13" fontFamily="Arial,sans-serif" fill="#365842">A workspace for confidential agreements</text>
      <rect x="179" y="178" width="177" height="72" rx="3" fill="#fff" stroke="#bdd3b9"/>
      <rect x="368" y="178" width="194" height="72" rx="3" fill="#fff" stroke="#bdd3b9"/>
      <text x="192" y="201" fontSize="11" fill="#486b4e" fontFamily="Arial,sans-serif">AGREEMENT</text>
      <text x="192" y="230" fontSize="15" fontWeight="700" fill="#1e452d" fontFamily="Arial,sans-serif">Pending review</text>
      <text x="381" y="201" fontSize="11" fill="#486b4e" fontFamily="Arial,sans-serif">SESSION</text>
      <text x="381" y="230" fontSize="15" fontWeight="700" fill="#1e452d" fontFamily="Arial,sans-serif">Encrypted room</text>
      <rect x="179" y="266" width="383" height="29" rx="3" fill="#d4e5d0"/>
      <text x="193" y="285" fontSize="12" fill="#2c593a" fontFamily="Arial,sans-serif">Proposal ready for review</text>
    </svg>
  );
}

function CarelGraphic() {
  return (
    <svg viewBox="0 0 590 310" className="dxj-product-art" role="img" aria-label="Illustrative CAREL AI financial research interface">
      <rect width="590" height="310" fill="#252133" rx="7"/>
      <circle cx="460" cy="105" r="91" fill="#554765" opacity=".4"/>
      <circle cx="460" cy="105" r="60" fill="none" stroke="#a78dc2" strokeWidth="1.5" opacity=".7"/>
      <path d="M460 55 V155 M410 105 H510 M424 69 L496 141 M424 141 L496 69" stroke="#e2b9fb" strokeWidth="1.6"/>
      <text x="31" y="46" fill="#eedafa" fontFamily="Arial,sans-serif" fontSize="25" fontWeight="700">carel ✳</text>
      <text x="31" y="93" fill="#ceb5e6" fontFamily="Arial,sans-serif" fontSize="11">RESEARCH / INTELLIGENCE</text>
      <text x="31" y="158" fill="#f3e6ff" fontFamily="Arial,sans-serif" fontSize="38" fontWeight="700">Insights,</text>
      <text x="31" y="202" fill="#f3e6ff" fontFamily="Arial,sans-serif" fontSize="38" fontWeight="700">not noise.</text>
      <rect x="31" y="245" rx="4" width="528" height="43" fill="#e2d0f0"/>
      <text x="49" y="272" fill="#4c3960" fontFamily="Arial,sans-serif" fontSize="14">Explore an AI research workflow</text>
      <text x="534" y="272" fill="#4c3960" fontFamily="Arial,sans-serif" fontSize="23" textAnchor="end">↗</text>
    </svg>
  );
}

export default async function Home() {
  const snapshot = await getConsoleSnapshot();
  const vinss = snapshot.repositories.find(item => item.config.slug === "vinss");
  const carel = snapshot.repositories.find(item => item.config.slug === "carel");
  const latest = snapshot.commits.slice(0, 2);
  const article = publishedArticles[0] ?? null;
  const activity = activities[0] ?? null;

  return (
    <div className="dxj-home">
    <StudioNav />
    <main id="main-content" className="dxj-main">
      <Script src="/taste/motion/motion.js" type="module" strategy="afterInteractive"/>
      <Script src="/taste/moments/moments.js" type="module" strategy="afterInteractive"/>

      <section id="top" className="dxj-screen dxj-hero hero" data-enter>
        <div className="wrap dxj-wrap dxj-hero-wrap">
          <div className="dxj-split dxj-hero-body">
            <div className="dxj-hero-copy">
              <p className="dxj-kicker"><span className="dxj-live-dot"/> EAST KALIMANTAN · INDONESIA / PRODUCT STUDIO</p>
              <h1>Building<br/><em>useful Web3.</em></h1>
              <p className="dxj-lead">Privacy products. Intelligent finance. Experimental experiences. One independent studio building across blockchain networks.</p>
              <div className="dxj-actions">
                <Link className="btn btn--primary btn--xl dxj-button" href="/ecosystem">Explore our ecosystem <Arrow /></Link>
                <Link className="dxj-text-link" href="/activities">See the build log <Arrow /></Link>
              </div>
              <p className="dxj-small-note">VINSS & CAREL · ACTIVE DEVELOPMENT DIRECTIONS</p>
            </div>
            <div className="dxj-hero-visual">
              <NetworkGraphic />
              <div className="dxj-evidence-label"><span>DXJ / SYSTEM MAP</span><span>VISUAL CONCEPT</span></div>
            </div>
          </div>
          <div className="dxj-hero-foot"><span>01 / PRODUCT STUDIO</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section id="work" className="dxj-screen dxj-work">
        <div className="wrap dxj-wrap dxj-section-wrap">
          <div className="dxj-section-head"><div><span className="dxj-section-no">02 / THE ECOSYSTEM</span><h2>DXJ Labs products.</h2></div><Link className="dxj-text-link" href="/ecosystem">All projects <Arrow /></Link></div>
          <div className="dxj-projects">
            <article className="dxj-product">
              <VinssGraphic />
              <div className="dxj-project-details">
                <div><span className="dxj-project-category">PRIVACY · STARKNET DEVELOPMENT</span><h3>VINSS</h3><p>Confidential deal rooms for digital agreements and settlement.</p></div>
                <a href="https://github.com/DXJLabs/vinss" target="_blank" rel="noopener noreferrer">Source repository <Arrow /></a>
              </div>
            </article>
            <article className="dxj-product">
              <CarelGraphic />
              <div className="dxj-project-details">
                <div><span className="dxj-project-category">AI · FINANCIAL RESEARCH</span><h3>CAREL</h3><p>Exploring AI-assisted research and digital financial interfaces.</p></div>
                <a href="https://github.com/DXJLabs/Carel" target="_blank" rel="noopener noreferrer">Source repository <Arrow /></a>
              </div>
            </article>
          </div>
          <p className="dxj-disclaimer">Interfaces above are illustrative concepts. Product tokens and deployment availability are separately verified in the Ecosystem directory.</p>
        </div>
      </section>

      <section id="multichain" className="dxj-screen dxj-multichain" data-moment="word-highlight">
        <div className="wrap dxj-wrap dxj-split dxj-multichain-body">
          <div className="dxj-multi-copy">
            <p className="dxj-section-no">03 / MULTI-CHAIN FOUNDATION</p>
            <h2 className="dxj-multichain-heading">Multi-chain development.</h2>
            <p className="mo-wh__text">Different products deserve different infrastructure. DXJ Labs builds across networks with <strong>real utility</strong> as the starting point.</p>
            <Link className="dxj-text-link dxj-link-light" href="/ecosystem">See integration stages <Arrow /></Link>
          </div>
          <div className="dxj-multi-visual">
            <NetworkGraphic />
            <div className="dxj-multi-sources">
              <span>STARKNET · DEVELOPMENT</span>
              <span>MULTI-CHAIN · PLANNED</span>
              <span>DXJ TOKEN · NOT ISSUED</span>
            </div>
          </div>
        </div>
      </section>

      <section id="activity" className="dxj-screen dxj-publishing">
        <div className="wrap dxj-wrap dxj-section-wrap">
          <div className="dxj-section-head"><div><span className="dxj-section-no">04 / PUBLIC PROGRESS</span><h2>DXJ Labs development.</h2></div><Link className="dxj-text-link" href="/activities">All activity <Arrow /></Link></div>
          <div className="dxj-publishing-grid">
            <article className="dxj-activity-feature">
              <svg viewBox="0 0 480 160" role="img" aria-label="Source code and development illustration" className="dxj-publishing-art">
                <rect x="20" y="21" width="440" height="121" rx="6" fill="#20402a"/>
                <path d="M134 46 L95 81 L134 116 M210 46 L249 81 L210 116 M189 41 L156 120" fill="none" stroke="#d0f1b0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M314 55 H425 M314 82 H403 M314 109 H425" fill="none" stroke="#81b16e" strokeWidth="6" strokeLinecap="round"/>
              </svg>
              <div><p className="dxj-project-category">DEVELOPMENT / GITHUB</p><h3>Recent source changes.</h3>
                {latest.length ? <div className="dxj-commits">{latest.map(item => <a href={item.url} key={item.sha} target="_blank" rel="noopener noreferrer"><span>{item.project} · {readableDate(item.date)}</span>{item.title}<Arrow /></a>)}</div> : <p>Public GitHub activity is temporarily unavailable. See the linked repositories for updates.</p>}
              </div>
            </article>
            <article className="dxj-journal-feature">
              <svg viewBox="0 0 480 160" role="img" aria-label="Technical journal illustration" className="dxj-publishing-art">
                <rect x="28" y="17" width="180" height="122" rx="5" fill="#cce4b9"/>
                <rect x="244" y="17" width="208" height="122" rx="5" fill="#b6d4a5"/>
                <path d="M55 45 H180 M55 69 H165 M55 93 H183 M55 117 H133" stroke="#375e3c" strokeWidth="7" strokeLinecap="square"/>
                <circle cx="344" cy="78" r="40" stroke="#3c6d43" strokeWidth="7" fill="none"/>
                <path d="M344 38 V118 M304 78 H384" stroke="#3c6d43" strokeWidth="5"/>
              </svg>
              <div><p className="dxj-project-category">JOURNAL / RESEARCH</p><h3>{article?.title || "Research from the studio"}</h3><p>{article?.excerpt || "Engineering notes and research will appear as they're published."}</p>
                <Link href={article ? "/blog/" + article.slug : "/blog"}>Read the journal <Arrow /></Link>
              </div>
            </article>
          </div>
          <div className="dxj-update-foot">{activity ? <Link href="/activities">Studio activity: {activity.title} <Arrow /></Link> : <Link href="/activities">Browse studio activities <Arrow /></Link>}<span>PUBLIC SOURCE-LINKED RECORDS</span></div>
        </div>
      </section>

      <section id="investors" className="dxj-screen dxj-closing">
        <div className="wrap dxj-wrap dxj-closing-wrap">
          <div className="dxj-split dxj-closing-main">
            <div>
              <p className="dxj-section-no">05 / TRANSPARENCY & PARTNERSHIPS</p>
              <h2>DXJ Labs<br/><em>transparency.</em></h2>
              <p>Explore our development progress today. Verified cross-chain metrics, financial reports, and private investor access will be published when their data sources and controls are ready.</p>
              <div className="dxj-actions">
                <Link className="btn btn--primary btn--xl dxj-button" href="/analytics">View public metrics <Arrow /></Link>
                <Link className="dxj-text-link dxj-link-light" href="/investors">Investor overview <Arrow /></Link>
              </div>
            </div>
            <div className="dxj-transparency-visual">
              <svg viewBox="0 0 470 345" role="img" aria-label="Verifiable code updates and analytics provenance diagram">
                <rect x="27" y="22" width="416" height="298" fill="#193a28" stroke="#658e6a" rx="5" strokeWidth="2"/>
                <text x="52" y="60" fill="#d8efca" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="700">PUBLIC DEVELOPMENT DATA</text>
                <text x="52" y="100" fill="#b0d3aa" fontFamily="Arial,sans-serif" fontSize="13">VERIFIABLE GITHUB SOURCES</text>
                <path d="M55 135 H412" stroke="#527956" strokeWidth="1.5"/>
                <text x="57" y="173" fill="#effae6" fontFamily="Arial,sans-serif" fontSize="24" fontWeight="700">VINSS</text>
                <text x="322" y="173" fill="#bbeba1" fontFamily="Arial,sans-serif" fontSize="14">SOURCE ↗</text>
                <path d="M55 193 H412" stroke="#527956" strokeWidth="1.5"/>
                <text x="57" y="230" fill="#effae6" fontFamily="Arial,sans-serif" fontSize="24" fontWeight="700">CAREL</text>
                <text x="322" y="230" fill="#bbeba1" fontFamily="Arial,sans-serif" fontSize="14">SOURCE ↗</text>
                <path d="M55 249 H412" stroke="#527956" strokeWidth="1.5"/>
                <text x="57" y="285" fill="#b0d3aa" fontFamily="Arial,sans-serif" fontSize="13">BLOCKCHAIN METRICS: NOT CONNECTED</text>
              </svg>
            </div>
          </div>
          <footer className="dxj-last-line">
            <Link href="/" className="dxj-logo">DXJ<span>LABS</span><i aria-hidden="true">✳</i></Link>
            <span>Independent studio · East Kalimantan, Indonesia</span>
            <a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a>
            <Link href="#top">Back to top ↑</Link>
          </footer>
        </div>
      </section>
    </main>
    </div>
  );
}
