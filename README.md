# DXJ Labs — Multi-Chain Web3 Product Ecosystem

DXJ Labs is an independent product studio and an emerging multi-chain Web3 ecosystem. The public platform documents its products, technical experiments, activities, editorial notes, and its approach to future verified reporting.

**Status:** Public information platform in development. Investor data room, chain indexers, governance, token infrastructure and wallet functionality are not live.

## Pages

| Path | Contents | State |
|---|---|---|
| `/` | Studio landing & portfolio | Implemented |
| `/ecosystem` | Multi-chain product catalog | Implemented / curated |
| `/console` | Public GitHub-backed engineering dashboard | Implemented / real GitHub API |
| `/console/projects` | Detailed official repository telemetry | Implemented / real GitHub API |
| `/console/activity` | Source-linked commit history feed | Implemented / real GitHub API |
| `/console/networks` | Planned/testing network registry | Implemented / curated, not connected |
| `/console/sources` | Data provenance and methodology | Implemented |
| `/api/console/overview` | Public JSON source telemetry | Implemented / real GitHub API |
| `/ecosystem/[slug]` | Product status and documented network direction | Implemented |
| `/activities` | Dated development updates with evidence | Implemented / curated |
| `/blog` | Studio Journal and research index | Implemented |
| `/blog/[slug]` | Editorial article | Implemented |
| `/analytics` | Metric methodology and availability states | UI only; no data pipeline |
| `/investors` | Public information and due-diligence direction | UI only; no restricted portal |

## Design & implementation

- Next.js App Router, React, TypeScript and CSS.
- Responsive desktop/tablet/mobile editorial interface.
- Shared `PlatformHeader`, `PlatformFooter`, `PlatformPage`.
- Typed curated product/content datasets in `lib/platform.ts`.
- GitHub-backed **server-side** telemetry in `lib/github-console.ts`, cached up to five minutes with explicit unavailable states and public JSON API.
- Engineering activity is **not** blockchain analytics, adoption, revenue, or financial performance.
- No generated fake token data, price charts, security rights or fundraising claims.
- The illustrated product interfaces on the landing page are labelled as **conceptual**, not actual product UI.

## Product and architecture decisions

- DXJ Labs is chain-neutral. Each product can use appropriate blockchains; network support is explicitly identified as planned, testing or live.
- The DXJ token is **not issued**; project tokens are not assumed to exist.
- Verified investor financial and operational records must use authenticated backend access, role-based authorization and audit trails.
- Activities must be grounded in evidence. A planned event is not presented as confirmed without an organizer and date.
- Articles have authors, category, publication date and editorial status.

For detailed plans see:
- [Product Requirements V1](docs/PRODUCT_REQUIREMENTS_V1.md)
- [Sitemap & Architecture V1](docs/SITEMAP_AND_ARCHITECTURE.md)
- [Live GitHub Console Integration](docs/CONSOLE_GITHUB_INTEGRATION.md)

## Deployment

The site is connected to GitHub and Vercel. `main` is production. Work is prepared in a branch / draft pull request first and should be reviewed through a **Vercel preview deployment** before merging.

No Termux build is required for normal updates; cloud builds are handled by Vercel. Local checks are optional for developers with a conventional development environment.

## Outstanding product decisions

1. Confirm content editor and article-approval process.
2. Document deployed smart-contract addresses and verifiable networks for each product.
3. Select CMS and provenance-aware analytics storage.
4. Define investor authentication, permission management and legal requirements.
5. Review token utility and compliance before any on-chain issuance.
