"use client";
import { useEffect, useState } from "react";

type Project = { num: string; name: string; category: string; stage: string; description: string; visual: string; href?: string };
const projects: Project[] = [
  { num: "01", name: "VINSS", category: "PRIVACY / WEB3", stage: "IN DEVELOPMENT", description: "A private deal room exploring confidential negotiation and settlement on decentralized infrastructure.", visual: "vinss", href: "https://github.com/DXJLabs/vinss" },
  { num: "02", name: "CAREL", category: "AI / EXPERIMENTS", stage: "EXPLORATION", description: "An experimental direction at the intersection of intelligent interfaces and decentralized finance.", visual: "carel", href: "https://github.com/DXJLabs/Carel" },
  { num: "03", name: "GROWHAVEN", category: "GAMES / INTERACTIVE", stage: "PROTOTYPE", description: "An interactive game concept built to test new ideas, playful systems, and engaging digital worlds.", visual: "growhaven" },
];
const capabilities = [
  { n: "01", title: "Product engineering", desc: "From early concepts to working digital products." },
  { n: "02", title: "Privacy & infrastructure", desc: "Systems designed with trust and user control in mind." },
  { n: "03", title: "AI & experimentation", desc: "Prototyping emerging interfaces and intelligent workflows." },
  { n: "04", title: "Interactive experiences", desc: "Digital ideas that move beyond conventional interfaces." },
];
function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>; }
export default function Home() {
 const [open, setOpen] = useState(false);
 const close = () => setOpen(false);
 useEffect(() => {
   const updateProgress = () => {
     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
     const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
     document.documentElement.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
   };
   let frame = 0;
   const onScroll = () => {
     if (frame) return;
     frame = window.requestAnimationFrame(() => { updateProgress(); frame = 0; });
   };
   updateProgress();
   window.addEventListener("scroll", onScroll, { passive: true });
   window.addEventListener("resize", onScroll);

   const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
   let observer: IntersectionObserver | undefined;
   if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
     observer = new IntersectionObserver((entries) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           entry.target.classList.add("is-revealed");
           observer?.unobserve(entry.target);
         }
       });
     }, { threshold: 0.09, rootMargin: "0px 0px -32px 0px" });
     elements.forEach((el) => {
       const b = el.getBoundingClientRect();
       if (b.top < window.innerHeight * 0.94) el.classList.add("is-revealed");
       else { el.classList.add("reveal-pending"); observer?.observe(el); }
     });
   }
   return () => {
     window.removeEventListener("scroll", onScroll);
     window.removeEventListener("resize", onScroll);
     if (frame) window.cancelAnimationFrame(frame);
     observer?.disconnect();
     document.documentElement.style.removeProperty("--scroll-progress");
   };
 }, []);
 return <main id="top">
  <div className="scroll-progress" aria-hidden="true" />
  <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="#top" aria-label="DXJ Labs, home" onClick={close}><span className="brand-symbol">D<span>✳</span></span><span className="brand-name">DXJ<span className="brand-light">LABS</span><small>INDEPENDENT PRODUCT STUDIO</small></span></a>
      <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
        <a href="#work" onClick={close}>Work</a><a href="#studio" onClick={close}>Studio</a><a href="#approach" onClick={close}>Approach</a>
        <a className="nav-contact" href="#contact" onClick={close}>Let’s connect <Arrow diagonal /></a>
      </nav>
      <button className="mobile-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close ×" : "Menu +"}</button>
    </div>
  </header>

  <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-topline"><span><i className="live-dot" /> INDEPENDENT DIGITAL PRODUCT STUDIO</span><span className="hero-location">BASED IN EAST KALIMANTAN, INDONESIA <span>↗</span></span></div>
    <div className="hero-main">
      <div className="hero-copy"><p className="mono eyebrow">RESEARCH <span>/</span> DESIGN <span>/</span> BUILD</p><h1 id="hero-title">Ideas into<br/><em>systems<span className="punctuation">.</span></em></h1><p className="hero-lede">We explore what’s possible, challenge what’s expected, and turn ambitious ideas into meaningful digital products.</p><a className="pill-link" href="#work">Explore selected work <span><Arrow diagonal /></span></a></div>
      <div className="hero-art" onPointerMove={(e) => { const box = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--pointer-x", `${e.clientX - box.left}px`); e.currentTarget.style.setProperty("--pointer-y", `${e.clientY - box.top}px`); }} aria-label="Abstract DXJ Labs orbital identity" role="img"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/><div className="orbit orbit-d"/><div className="orbit-dot dot-a"/><div className="orbit-dot dot-b"/><div className="orbit-dot dot-c"/><div className="core-ring"><span>DXJ<span className="core-star">✳</span></span><small>LABS / EST. 2026</small></div><div className="art-label art-label-one">FIG 01 — EXPLORATION</div><div className="art-label art-label-two">DESIGNED TO EVOLVE</div>
      <div className="signal-panel signal-panel-a" aria-hidden="true"><span>LAB / OPERATING MODE</span><strong><i /> EXPERIMENTING</strong><small>DESIGN — BUILD — ITERATE</small></div>
      <div className="signal-panel signal-panel-b" aria-hidden="true"><span>SYSTEM / DXJ — 001</span><div className="signal-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><small>EVERY IDEA STARTS SOMEWHERE</small></div></div>
    </div>
    <div className="hero-bottom"><span>INDEPENDENT BY DESIGN. CURIOUS BY DEFAULT.</span><a href="#studio">SCROLL TO EXPLORE <span>↓</span></a></div>
  </section>

  <div className="studio-ticker" aria-label="Our practice: product engineering, experimental technology, creative coding, and interactive experiences"><div className="ticker-track" aria-hidden="true">{Array.from({ length: 2 }, (_, i) => <div className="ticker-set" key={i}><span>PRODUCT ENGINEERING</span><b>✳</b><span>EXPERIMENTAL TECHNOLOGY</span><b>✳</b><span>CREATIVE CODE</span><b>✳</b><span>INTERACTIVE EXPERIENCES</span><b>✳</b></div>)}</div></div>

  <section id="studio" className="statement-section section-line"><div className="container statement-grid" data-reveal=""><div className="section-aside"><span className="square-bullet"/> 01 / THE STUDIO</div><div className="statement-body"><p className="statement">We turn ideas into useful products. <span>Research-led, independently built, and shaped through real experiments.</span></p><div className="statement-bottom"><p>DXJ Labs is an independent product studio working across software, emerging technology, and digital experiences. We believe the best way to discover what matters is to build, learn, and keep improving.</p><div className="signature">DXJ<span>✳</span></div></div></div></div></section>

  <section id="work" className="work-section section-line"><div className="container"><div className="section-heading" data-reveal=""><div className="section-aside"><span className="square-bullet"/> 02 / SELECTED WORK</div><div><h2>Work in <em>motion.</em></h2><p>An evolving selection of prototypes, experiments, and products in development. We share the process, not just the polished outcome.</p></div><span className="count-label">[ 001 — 003 ]</span></div><div className="work-grid">{projects.map(p => <article className={`project-card ${p.visual}`} data-reveal="" key={p.name} onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX-r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY-r.top}px`); }}><div className="project-art"><div className="project-art-top"><span>DXJ / {p.num}</span><span>EXPERIMENTAL DIVISION</span></div>{p.visual === "vinss" ? <div className="art-vinss"><div className="shield-outer"><div className="shield-inner">V</div></div><span className="trace trace-1"/><span className="trace trace-2"/><span className="trace trace-3"/></div> : p.visual === "carel" ? <div className="art-carel"><div className="carel-halo halo-1"/><div className="carel-halo halo-2"/><div className="carel-halo halo-3"/><strong>C<span>✳</span></strong></div> : <div className="art-grow"><div className="sun"/><div className="mountain mountain-1"/><div className="mountain mountain-2"/><div className="grow-mark">G<span>✦</span></div></div>}<span className="visual-footer">BUILD / TEST / ITERATE</span></div><div className="project-meta"><div className="project-tags"><span>{p.category}</span><span className="stage"><i/>{p.stage}</span></div><div className="project-title-row"><h3>{p.name}</h3>{p.href ? <a className="round-arrow" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${p.name} on GitHub`}><Arrow diagonal /></a> : null}</div><p>{p.description}</p></div></article>)}</div><p className="work-footnote">* Projects are early-stage and presented as explorations, not commercial releases.</p></div></section>

  <section id="approach" className="approach-section section-line"><div className="container"><div className="section-heading approach-heading" data-reveal=""><div className="section-aside"><span className="square-bullet"/> 03 / WHAT DRIVES US</div><div><h2>Built with<br/><em>intention.</em></h2></div><p>Different disciplines. A shared mindset. Every meaningful product begins with a question worth asking.</p></div><div className="capability-list" data-reveal="">{capabilities.map(c => <div className="capability" key={c.n}><span className="cap-num">{c.n}</span><h3>{c.title}</h3><p>{c.desc}</p><span className="cap-arrow">↗</span></div>)}</div></div></section>

  <section className="manifesto-section section-line"><div className="container manifesto" data-reveal=""><div className="manifesto-label">OUR WORKING PHILOSOPHY <span>✳</span></div><p>Stay curious.<br/><span>Make it real.</span><br/>Keep moving<span className="accent">↗</span></p><div className="manifesto-bottom"><span>GOOD IDEAS NEED MORE THAN GOOD INTENTIONS.</span><span>DXJ LABS — 2026</span></div></div></section>

  <section id="contact" className="contact-section section-line"><div className="container contact-grid" data-reveal=""><div className="section-aside"><span className="square-bullet"/> 04 / WHAT'S NEXT</div><div><p className="mono eyebrow">LET'S MAKE SOMETHING MATTER.</p><h2>Follow the<br/><em>build.</em></h2><p>Explore the ideas, experiments, and digital products taking shape at DXJ Labs.</p><a className="contact-cta" href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">Explore our GitHub <span>↗</span></a></div></div></section>
  <footer className="footer"><div className="container footer-inner"><a href="#top" className="footer-logo">DXJ<span>✳</span>LABS</a><span>INDEPENDENT PRODUCT STUDIO<br/>EAST KALIMANTAN, INDONESIA</span><div className="footer-links"><a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div><span className="copyright">© {new Date().getFullYear()} DXJ LABS</span></div></footer>
 </main>;
}
