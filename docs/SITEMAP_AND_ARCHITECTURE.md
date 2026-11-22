# DXJ Labs — Sitemap & System Architecture V1

## Sitemap

```mermaid
flowchart TD
  H["Home /"] --> E["Ecosystem /ecosystem"]
  H --> A["Activities /activities"]
  H --> B["Blog & Research /blog"]
  H --> AN["Analytics /analytics"]
  H --> I["Investor Portal /investors"]
  E --> P["Product detail /ecosystem/[slug] (phase 2)"]
  A --> AD["Activity detail /activities/[slug] (phase 2)"]
  B --> BD["Article /blog/[slug]"]
  I --> IP["Verified Investor Room (phase 4)"]
  H --> G["Governance (future)"]
```

**Navigation:** Home / Ecosystem / Activities / Blog / Analytics / Investors / GitHub.

## System boundaries

```mermaid
flowchart TB
  subgraph PUBLIC["Public DXJ Labs Web"]
    UI["Next.js website: pages, articles, ecosystem"]
    VIS["Public data visualization"]
  end
  subgraph INTERNAL["Internal services — future phases"]
    CMS["CMS + editorial approval"]
    IDX["Indexing & metric normalization"]
    API["Authenticated investor API"]
    DB["Database & audit history"]
  end
  subgraph CHAINS["Independent blockchain networks"]
    EV["EVM: Ethereum, Base, others"]
    ST["Starknet"]
    OT["Other networks via adapters"]
  end
  subgraph SOURCES["Business-side sources"]
    FIN["Approved financial statements"]
    PROD["Product analytics"]
  end
  EV --> IDX
  ST --> IDX
  OT --> IDX
  IDX --> DB
  PROD --> DB
  CMS --> UI
  DB --> VIS
  FIN --> API
  DB --> API
  UI --> VIS
```

**Important:** This diagram represents a **target architecture**, not a statement that indexers, a CMS, investor API, or token infrastructure are running.

## Data contracts

- `ChainReference`: CAIP-2 ID; display name; namespace; environment; explorer URL; support stage.
- `Product`: ID, slug, development stage, categories, chain affiliations, source repositories, proof links, token lifecycle.
- `Activity`: date, organizer, type, current state, evidence URL and summary.
- `Article`: slug, category, publication date, author, body, editorial status.
- `Metric`: nullable value, provenance, update time, aggregation rule, verification status.
- `InvestorDocument` (later): owner, access policy, confidentiality level, timestamp, audit trail.

## Safety boundaries
- Public pages are public by intent. Do not embed investor secrets into HTML, JSON, static output or CDN assets.
- Real token contract entries require chain ID, address, deployment evidence, admin controls, and legal signoff before the UI changes from "planned".
- Cross-chain aggregates must not double count bridging or repeated wallets.
- Activity claims should link to first-party records, event pages, or project commits.

## Initial implementation
Content-first static routes with typed data objects; no fake APIs or simulated login. Subsequent CMS/indexers replace the data source behind the same UI contracts.

**References:** Chain-agnostic naming: https://standards.chainagnostic.org/CAIPs/caip-2 ; Next.js App Router: https://nextjs.org/docs/app/getting-started/layouts-and-pages .
