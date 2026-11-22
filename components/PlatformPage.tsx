import type { ReactNode } from "react";
import PlatformHeader from "./PlatformHeader";
import PlatformFooter from "./PlatformFooter";

type Props = { number: string; tag: string; title: string; description: string; children: ReactNode };

export default function PlatformPage({ number, tag, title, description, children }: Props) {
  return (
    <>
      <PlatformHeader />
      <main className="platform-main">
        <div className="layout">
          <section className="platform-hero">
            <div className="platform-hero-meta"><span>{number} / {tag}</span><span>DXJ LABS · MULTI-CHAIN ECOSYSTEM</span></div>
            <h1>{title}</h1>
            <p>{description}</p>
          </section>
          {children}
        </div>
      </main>
      <PlatformFooter />
    </>
  );
}
