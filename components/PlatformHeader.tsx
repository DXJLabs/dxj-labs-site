"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/activities", label: "Activities" },
  { href: "/blog", label: "Blog" },
  { href: "/analytics", label: "Analytics" },
  { href: "/investors", label: "Investors" },
];

export default function PlatformHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header platform-header">
      <div className="layout header-inner">
        <Link href="/" className="brand" aria-label="DXJ Labs home" onClick={() => setOpen(false)}>
          <span className="brand-monogram" aria-hidden="true"><span>D</span><i /></span>
          <span className="brand-wordmark">DXJ<span>LABS</span><small>INDEPENDENT PRODUCT STUDIO</small></span>
        </Link>
        <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          {navigation.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <a className="nav-cta" href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)}>
          <span>{open ? "Close" : "Menu"}</span><span className="menu-glyph">{open ? "×" : "+"}</span>
        </button>
      </div>
    </header>
  );
}
