# DXJ Labs — Product Requirements Document (PRD) V1

**Status:** Baseline / proposed implementation, not a claim of delivered functionality  
**Updated:** 2026-11-22  
**Owner:** DXJ Labs  
**Product:** DXJ Labs Multi-Chain Web3 Product Ecosystem  
**Repository:** `DXJLabs/dxj-labs-site`

## 1. Product identity

DXJ Labs is an independent product studio building a **multi-chain Web3 product ecosystem**. It is **not** limited to Starknet, and it is **not** a token-only project. Each product chooses chains based on technical and business requirements. DXJ Labs provides a single discovery, reporting, publication and access layer.

Core principles:
1. **Truth before marketing:** never show fabricated metrics, nonexistent wallet connections, fictional funding totals, or token supply.
2. **Chain-neutral product registry:** network support is per-product, with explicit stages: `planned`, `testing`, `live`, `retired`.
3. **Independent products:** VINSS, CAREL, Growhaven, and future products have their own lifecycles and potentially their own economic systems.
4. **DXJ ecosystem token is planned, not launched.** A product token is optional, conditional on a genuine utility case and legal/security review.
5. **Public transparency, controlled investor documents:** public on-chain records are distinct from private business records.
6. **Content publishing is core:** Activities documents what happened or is scheduled; Blog & Research explains insights and technical work.

## 2. Audiences and key jobs

| Role | Jobs to be done | Access |
|---|---|---|
| Visitor | Understand studio and real products; verify claims | Public |
| Developer / contributor | Explore build progress, repos, docs, communities | Public, optional collaborator |
| Community member | Read events, attend activities, propose ideas | Public, optional account later |
| Investor prospect | Compare project health, roadmap, traction, treasury provenance | Public summary |
| Verified investor | Read approved confidential reports and due diligence materials | Identity-verified + assigned grant |
| Editor | Publish and manage approved activities/articles | Authenticated editorial access |
| Analyst | Submit verified data sources; approve metric provenance | Authenticated internal |
| Admin | Manage project registry, users, permissions and audit logs | Privileged internal |

No public role should see private financial records, personal information, or passwords/secrets.

## 3. Information architecture and routes

| Route | Public purpose | V1 scope |
|---|---|---|
| `/` | Brand + featured project + navigation | Existing redesigned landing |
| `/ecosystem` | Products, chain affiliations, token lifecycle status | Build registry page, curated content |
| `/ecosystem/[slug]` | Detailed product, addresses, roadmap, evidence | Next phase |
| `/analytics` | Verified metrics and source transparency | Read-only honest empty-state |
| `/activities` | Events, hackathons, build logs, community activities | Structured activity index |
| `/activities/[slug]` | Event detail, date, organizer and proof | Next phase |
| `/blog` | Publications, category filters, research | Editorial index |
| `/blog/[slug]` | Article with date, author, sources and revision | Build first verified editorial note |
| `/investors` | Public due-diligence overview & access explanation | Public informational portal; **no login fiction** |
| `/investors/portal` | Restricted reports and data room | **Not in V1** until real auth and policy |
| `/governance` | Future community governance | Planned / not actionable |
| `/admin` | Internal publishing/data workflows | Not in V1 |

An unimplemented route must **not** expose a simulated interactive screen that implies it works.

## 4. Functional requirements and acceptance tests

### FR-01 Ecosystem catalog — P0
- Display product name, summary, real development stage, sectors, links, and chain affiliations.
- Products: VINSS (in development; Starknet is a documented integration direction), CAREL (exploration), Growhaven (prototype).
- Network affiliation must be explicit and not masquerade as deployed contracts.
- Token status is `not-issued` until verified contract address, chain, issuer, and audit data exist.
- **Accept:** every product has a stage and source link or clearly marked unavailable data; no false token icons or prices.

### FR-02 Activities — P0
- Activity record fields: `id`, `title`, `type`, `date`, `status`, `summary`, `evidenceUrl`, `organizer`.
- Allowed types: build update, hackathon, event, workshop, community, announcement.
- Upcoming events only when an organizer and confirmed date exist.
- Empty state must say no events announced; never generate fictional event names/dates.
- **Accept:** each recorded achievement or event has proof / a primary source; no claims of winning without evidence.

### FR-03 Blog & Research — P0
- Public index + article detail.
- Article fields: `slug`, `title`, `category`, `date`, `author`, `summary`, `body`, `status`.
- Categories: Engineering, Research, Ecosystem Updates, Studio Journal.
- Only `published` articles appear publicly.
- **Accept:** URLs render with SEO metadata, published date and author; no fake article counters.

### FR-04 Analytics — P1
- Metrics: users, active wallets, transactions, fees/revenue, treasury balances, contract activity, milestones.
- Each metric MUST include: `value` (nullable), `unit`, `timeRange`, `chainId` (nullable), `source`, `asOf`, `methodology`, `verificationStatus`.
- Never convert `null` into zero, estimate, trend, or chart point.
- Cross-chain de-duplication methods must be documented before totals appear.
- **Accept:** UI shows "Not available" until verified data exists, and every populated value links to provenance.

### FR-05 Investor portal — P1/P2
- P1: public overview, projects, available milestones, published reports and disclosures.
- P2: private room with account auth, approval workflow, org membership, role-based checks **on server**, document access logs, signed/time-limited asset delivery.
- Authorization checked on every data request; never rely on hidden frontend links.
- **Accept:** no confidential report is included in public build/static bundle; no role-only CSS gating.

### FR-06 Multi-chain registry — P1
- Use a chain-agnostic ID model (CAIP-2 identifier) and chain-specific adapters/indexers.
- EVM and Starknet may be initial adapter candidates; any other chain is added by the same registry interface.
- Each integration has separate `planned/testing/live` status; chain listing does not indicate production integration.
- **Accept:** adding a new chain should not require changing the site's main content model.

### FR-07 Tokens & treasury — P2, strictly gated
- DXJ token: **planned**; no supply, market cap, price or expected investment return shown.
- Product token: **optional**, only with a clear product utility and verified chain address.
- Multichain DXJ supply design, canonical issuance, mint/burn or locked collateral, bridges and incident controls require dedicated engineering and security reviews.
- Legal classification, issuance and marketing in relevant jurisdictions require qualified counsel review before deployment or fundraising.
- **Accept:** nothing labeled live until verified on-chain and approved; no token sales or investment solicitation in V1.

## 5. Nonfunctional requirements
- Mobile, tablet, desktop responsive; AA contrast and keyboard navigation targets.
- Fast page load, semantic structure, meaningful metadata, reduced-motion support.
- No wallet requirement for reading public content.
- Sensitive keys are server-side only; no secret values in `NEXT_PUBLIC_*`.
- Editorial revisions are attributed and auditable.
- Consent and privacy policy before collecting personal visitor analytics.

## 6. Proposed delivery phases

**Phase 0 — Current baseline:** studio landing, source repository, GitHub/Vercel workflow.  
**Phase 1 — Public platform (this work):** PRD/sitemap, shared navigation, ecosystem index, activities index, blog index and editorial page, honest analytics/investor placeholders; typed data models.  
**Phase 2 — Content operations:** CMS, editor workflow, image library, real activity evidence links, automated tests.  
**Phase 3 — Verified analytics:** chain registry, EVM/Starknet adapters, indexing/storage, provenance, chain-specific & cross-chain metrics.  
**Phase 4 — Investor room:** private authentication, authorization, secure report ingestion, audit logs, legal compliance.  
**Phase 5 — Token/governance:** only after tokenomics, security audit, legal review and practical demand.

## 7. Explicit non-goals for V1
No deployed token, token price chart, DAO voting, bridge, live wallet connect, investment payment flow, confidential document access, fabricated hackathon wins or nonexistent calendar events.

## 8. Open decisions before later phases
- Which DXJLabs legal entity, jurisdiction, and investment instrument are intended?
- Which chains does each product actually deploy on, with verifiable addresses?
- Which financial and product metrics can legally and reliably be shared?
- Who owns editorial sign-off and investor access approvals?
- Does DXJ serve real utility or another purpose? No design should assume ownership or revenue rights.

## 9. Definition of done for Phase 1
- All new routes exist and share clear navigation.
- The product catalog is readable on desktop/mobile with truthful statuses.
- Activities show documented work and no imaginary upcoming events.
- Blog has an accurately attributed studio direction note, with no invented results.
- Analytics and investors explicitly identify what is unavailable.
- Build/preview checks pass **in Vercel**, not Termux.
- Human review before merging the redesign to `main`.
