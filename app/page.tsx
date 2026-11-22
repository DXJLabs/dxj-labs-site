import PlatformHeader from "../components/PlatformHeader";
import { getConsoleSnapshot, readableDate } from "../lib/github-console";
import { articles, activities } from "../lib/platform";

export const revalidate = 300;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow-glyph">{diagonal ? "↗" : "→"}</span>;
}

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="DXJ Labs, back to top">
      <span className="brand-monogram" aria-hidden="true"><span>D</span><i /></span>
      <span className="brand-wordmark">DXJ<span>LABS</span><small>INDEPENDENT PRODUCT STUDIO</small></span>
    </a>
  );
}

function VinssPreview() {
  return (
    <div className="product-screen vinss-screen" aria-label="Concept visualization of a VINSS private deal room">
      <div className="screen-topbar"><span className="screen-dots"><i /><i /><i /></span><span>VINSS / WORKSPACE</span><span className="screen-security">◈ PRIVATE SESSION</span></div>
      <div className="deal-body">
        <aside className="deal-sidebar">
          <span className="ui-kicker">WORKSPACE</span>
          <span className="sidebar-line active">◇ &nbsp; Overview</span>
          <span className="sidebar-line">≡ &nbsp; Messages</span>
          <span className="sidebar-line">▣ &nbsp; Agreements</span>
          <span className="sidebar-line">⬡ &nbsp; Settlement</span>
          <div className="sidebar-bottom">● &nbsp; Connected securely</div>
        </aside>
        <div className="deal-main">
          <div className="deal-top"><span>DEAL ROOM <b> / 001</b></span><span className="status-chip">● IN PROGRESS</span></div>
          <h3>Private by design.</h3>
          <p>One place to discuss, agree, and settle.</p>
          <div className="deal-metric-row"><div><small>AGREEMENT</small><strong>Pending review</strong></div><div><small>WORKSPACE</small><strong>Encrypted room</strong></div></div>
          <div className="deal-message"><span className="message-avatar">V</span><div><small>SECURE MESSAGE · JUST NOW</small><p>Proposal details are ready for your review.</p></div><span className="message-check">✓✓</span></div>
          <div className="deal-compose"><span>Write a private message...</span><b>↑</b></div>
        </div>
      </div>
      <span className="screen-disclaimer">ILLUSTRATIVE INTERFACE · NOT A LIVE PRODUCT SCREENSHOT</span>
    </div>
  );
}

function CarelPreview() {
  return (
    <div className="product-screen carel-screen" aria-label="Concept visualization of an AI-assisted financial interface">
      <div className="carel-ui-top"><span className="carel-ui-brand">carel <i>✳</i></span><span>RESEARCH INTERFACE / 02</span></div>
      <div className="carel-ui-card">
        <span className="carel-orbit-icon">✳</span>
        <span className="ui-kicker">INTELLIGENCE LAYER</span>
        <h3>Insights, not noise.</h3>
        <p>What would you like to understand today?</p>
        <div className="carel-prompt"><span>Analyze this market pattern</span><b>↗</b></div>
      </div>
      <div className="carel-ui-bottom"><span><i /> SYSTEM EXPLORATION</span><span>AI / EXPERIMENT</span></div>
      <span className="screen-disclaimer">ILLUSTRATIVE INTERFACE</span>
    </div>
  );
}

function GrowhavenPreview() {
  return (
    <div className="product-screen grow-screen" aria-label="Concept visualization of the Growhaven game world">
      <div className="grow-hud"><span>GROWHAVEN <i>✦</i></span><span>WORLD / 001</span></div>
      <div className="grow-scene" aria-hidden="true">
        <span className="grow-sun" /><span className="grow-hill hill-one" /><span className="grow-hill hill-two" />
        <div className="grow-garden">
          {Array.from({ length: 12 }, (_, i) => <span key={i} className={"grow-plot plot-" + (i % 4)}><i /></span>)}
        </div>
      </div>
      <div className="grow-bottom"><span>◈ &nbsp; BUILD YOUR OWN LITTLE WORLD</span><span>EXPLORATION · V0.1</span></div>
      <span className="screen-disclaimer">ILLUSTRATIVE CONCEPT VISUAL</span>
    </div>
  );
}

export default async function Home() {
  const snapshot = await getConsoleSnapshot();
  const featuredRepos = snapshot.repositories.filter(repo => repo.config.slug === "vinss" || repo.config.slug === "carel");
  const article = articles.find(item => item.status === "published");
  const activity = activities[0];
  return (
    <main id="main-content">
      <PlatformHeader />

      <section className="hero">
        <div className="layout hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-indicator" /> MULTI-CHAIN WEB3 PRODUCT STUDIO <span className="eyebrow-index">/ EAST KALIMANTAN, INDONESIA</span></p>
            <h1>Web3 products.<br /><em>One studio.</em></h1>
            <p className="hero-description">DXJ Labs develops VINSS and CAREL across emerging technology. Explore each product, its blockchain plans, and development activity sourced from GitHub.</p>
            <div className="hero-actions">
              <a className="button-primary" href="/ecosystem">View our products <Arrow diagonal /></a>
              <a className="button-text" href="/activities">See development updates <Arrow /></a>
            </div>
            <div className="hero-bottomline"><span>VINSS</span><span>CAREL</span><span>PUBLIC BUILD LOG</span><span className="hero-bottom-no">2026 / DXJ LABS</span></div>
          </div>
          <div className="hero-showcase hero-source-showcase">
            <div className="hero-feed-top"><span>DXJ / ENGINEERING SIGNAL</span><span>PUBLIC GITHUB DATA ↗</span></div>
            <div className="hero-feed-card">
              <div className="hero-feed-header"><span>PROJECT ACTIVITY / 2026</span><span className="feed-status">● SOURCE LINKED</span></div>
              <div className="hero-feed-heading"><h2>Work you can verify.</h2><p>Latest development changes from our official repositories.</p></div>
              <div className="hero-feed-projects">
                {featuredRepos.map(repo => (
                  <div className="hero-feed-project" key={repo.config.slug}>
                    <div className="hero-feed-project-head">
                      <span>{repo.config.label}</span>
                      <span>{repo.metadata ? "PUBLIC REPOSITORY" : "SOURCE UNAVAILABLE"}</span>
                    </div>
                    {repo.commits[0] ? <a href={repo.commits[0].url} target="_blank" rel="noopener noreferrer">{repo.commits[0].title}<span aria-hidden="true">↗</span></a> : <p>Recent activity unavailable from GitHub.</p>}
                    <time dateTime={repo.commits[0]?.date || undefined}>{readableDate(repo.commits[0]?.date || null)}</time>
                  </div>
                ))}
              </div>
              <div className="hero-feed-summary"><span>GitHub REST API · cached 5 min</span><a href="/activities">Read activity log ↗</a></div>
            </div>
            <div className="hero-feed-note"><span>NO SIMULATED USERS, VOLUME OR REVENUE</span><span>EST. 2026</span></div>
          </div>
        </div>
      </section>

      <div className="expertise-ribbon" aria-label="Focus areas"><div className="layout expertise-inner"><span>PRODUCT ENGINEERING</span><i>✳</i><span>PRIVACY &amp; WEB3</span><i>✳</i><span>AI &amp; EXPERIMENTATION</span><i>✳</i><span>INTERACTIVE WORLDS</span></div></div>

      <div className="platform-proof-band" aria-label="Verified product information">
        <div className="layout platform-proof-grid">
          <div><strong>02</strong><span>Official product repositories<br />VINSS + CAREL</span></div>
          <div><strong>{snapshot.repositories.filter(r => r.metadata).length}/{snapshot.repositories.length}</strong><span>Tracked public repositories<br />accessible from GitHub</span></div>
          <div><strong>5 min</strong><span>GitHub data refresh interval<br />with source links</span></div>
          <a href="/ecosystem">Explore the ecosystem <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <section className="work-section" id="work">
        <div className="layout">
          <div className="section-intro">
            <div><p className="section-tag">01 / SELECTED WORK</p><h2>Proof of <em>curiosity.</em></h2></div>
            <p>Real ideas in different stages of development. We&apos;re more interested in building useful things than pretending every experiment is a finished product.</p>
          </div>

          <article className="featured-project">
            <div className="featured-copy">
              <div className="project-overline"><span>01 — FEATURED BUILD</span><span className="project-stage"><i /> IN DEVELOPMENT</span></div>
              <div><p className="project-category">PRIVACY / WEB3 / DIGITAL TRUST</p><h3>VINSS<span>↗</span></h3><p>Private deal rooms for conversations, agreements, and settlement. Exploring how digital trust can work without giving up privacy.</p><a className="project-action" href="https://github.com/DXJLabs/vinss" target="_blank" rel="noopener noreferrer">View the project <Arrow diagonal /></a></div>
              <div className="project-bottom-index">DXJ LABS <span>/</span> PRODUCT EXPERIMENT 001</div>
            </div>
            <div className="featured-visual"><VinssPreview /></div>
          </article>

          <div className="secondary-project-grid">
            <article className="secondary-project card-carel">
              <CarelPreview />
              <div className="secondary-project-body"><div className="project-overline"><span>02 / AI &amp; FINANCE</span><span className="project-stage"><i /> EXPERIMENTAL</span></div><h3>CAREL</h3><p>Exploring intelligent interfaces and new ways to navigate decentralized finance.</p><a className="project-action" href="https://github.com/DXJLabs/Carel" target="_blank" rel="noopener noreferrer">View repository <Arrow diagonal /></a></div>
            </article>
            <article className="secondary-project card-grow">
              <GrowhavenPreview />
              <div className="secondary-project-body"><div className="project-overline"><span>03 / GAMES &amp; EXPERIENCES</span><span className="project-stage"><i /> PROTOTYPE</span></div><h3>Growhaven</h3><p>An experimental game world built around playful ideas, exploration, and iteration.</p><span className="project-action muted-action">Prototype in development <Arrow /></span></div>
            </article>
          </div>
          <p className="work-note">* The interface previews above are conceptual visualizations. Project maturity varies; they are not claims of released commercial products.</p>
        </div>
      </section>

      <section className="home-journal-section" id="updates">
        <div className="layout">
          <div className="home-journal-head"><div><p className="section-tag">02 / PUBLISHING & ACTIVITY</p><h2>From the studio.</h2></div><p>Follow documented development, research, and what happens across DXJ Labs.</p></div>
          <div className="home-journal-grid">
            {article && <a className="home-journal-card" href={"/blog/" + article.slug}><span>BLOG / {article.category.toUpperCase()}</span><h3>{article.title}</h3><p>{article.excerpt}</p><div><time dateTime={article.publishedAt}>{article.publishedAt}</time><b>Read article ↗</b></div></a>}
            {activity && <a className="home-journal-card home-journal-card-activity" href="/activities"><span>ACTIVITY / {activity.category.toUpperCase()}</span><h3>{activity.title}</h3><p>{activity.summary}</p><div><time dateTime={activity.date}>{activity.date}</time><b>See activity ↗</b></div></a>}
          </div>
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="layout studio-grid">
          <div className="studio-left"><p className="section-tag">03 / ABOUT DXJ LABS</p><span className="studio-insignia">D<span>✳</span></span></div>
          <div className="studio-right"><h2>Independent minds.<br /><em>Real-world ambition.</em></h2><p>DXJ Labs is an independent product studio based in East Kalimantan, Indonesia. We move between research, product design, engineering, and experimentation to turn promising ideas into working systems.</p><div className="studio-facts"><div><span>LOCATION</span><strong>East Kalimantan, Indonesia</strong></div><div><span>WAY OF WORKING</span><strong>Research → Build → Validate</strong></div><div><span>FOCUS</span><strong>Products, not pitch decks</strong></div></div></div>
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="layout approach-grid">
          <div><p className="section-tag">04 / OUR APPROACH</p><h2>Less talk.<br /><em>More making.</em></h2></div>
          <div className="approach-steps">
            <div><span>01</span><h3>Find the question</h3><p>Start with a problem worth understanding, not a trend worth chasing.</p></div>
            <div><span>02</span><h3>Build something tangible</h3><p>Prototype early. Make the idea concrete enough to test and learn from.</p></div>
            <div><span>03</span><h3>Let reality shape it</h3><p>Improve through feedback, useful constraints, and honest iteration.</p></div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="layout">
          <div className="footer-top"><p className="section-tag">05 / STAY CURIOUS</p><p>NEW IDEAS. REAL EXPERIMENTS.</p></div>
          <div className="footer-feature"><h2>What&apos;s<br /><em>next?</em></h2><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer" aria-label="Explore DXJ Labs on GitHub"><Arrow diagonal /></a></div>
          <div className="footer-end"><Brand /><p>Independent product studio<br />East Kalimantan, Indonesia</p><div><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div><span>© {new Date().getFullYear()} DXJ LABS</span></div>
        </div>
      </footer>
    </main>
  );
}
