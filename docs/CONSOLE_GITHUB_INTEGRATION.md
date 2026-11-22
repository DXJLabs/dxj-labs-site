# DXJ Labs — Ecosystem Console / Live GitHub Integration

**Status:** Implemented in branch `design/studio-rebrand-v4`, draft PR #2. Not a statement that main/production has been updated.  
**Audience:** Visitors, developers, prospective partners, and anyone verifying engineering progress.

## Routes

| Route | Function | Real source |
|---|---|---|
| `/console` | Dashboard: tracked repositories, stars, open items, last code push and recent commits | GitHub REST |
| `/console/projects` | Repository metadata, default branch and latest commit | GitHub REST |
| `/console/activity` | Filterable recent-commit feed, with source links | GitHub REST |
| `/console/networks` | Explicit staged network affiliation per product | Curated registry `lib/platform.ts` |
| `/console/sources` | Metric definitions, source list, limitations | Static methodology |
| `/api/console/overview` | Public JSON data access | GitHub REST |

## Public API

`GET /api/console/overview` returns:

- `schemaVersion` — protocol shape version
- `source` — `GitHub REST API`
- `checkedAt` — timestamp of server fetch/check
- `cacheSeconds` — intended response cache freshness
- `repositories[]` — source URL, availability, branch, stars, forks, issues+PRs, latest code push
- `commits[]` — repository, SHA, first-line title, author, timestamp and permalink

GitHub is queried on the **server**, not from a wallet or user's browser. All URLs are generated from an **explicit allowlist** of known repositories, not user-controlled input.

## Trusted data sources and scope

| Source | Why tracked | Evidence |
|---|---|---|
| `DXJLabs/vinss` | Official privacy/Web3 project | https://github.com/DXJLabs/vinss |
| `DXJLabs/Carel` | Official AI/finance exploration | https://github.com/DXJLabs/Carel |
| `DXJLabs/dxj-labs-site` | Platform's own development | https://github.com/DXJLabs/dxj-labs-site |

The **number of tracked repositories is not the number of launched products**. Other repositories are not automatically included.

Growhaven is **not** included in public engineering telemetry because it is a **candidate personal prototype**, not yet migrated to the organization.

## Fetch implementation

- Code: `lib/github-console.ts`
- Repository: `GET https://api.github.com/repos/{owner}/{repo}`
- Commits: `GET https://api.github.com/repos/{owner}/{repo}/commits?per_page=5`
- Cache: Next.js server fetch `next: { revalidate: 300 }`
- Optional: set a **server-side** `GITHUB_TOKEN` environment variable for larger API quotas. It must never be prefixed `NEXT_PUBLIC_`, returned in JSON, logged, or sent to frontend JS.
- If GitHub returns 403/429/404, the UI displays **unavailable** and keeps a transparent source link. It does not invent a number.
- **Private repository metadata and commits are explicitly suppressed**, even if a server-side token can access them.

Important GitHub semantics:
- `open_issues_count` includes open pull requests.
- A star is **not** a user, purchase, or adoption metric.
- `pushed_at` is code push activity, not a product release.
- Activity feed includes only five latest commits **per repository**, not a complete time-series.
- If some repositories are unavailable, displayed aggregate counts are partial and labeled with coverage.

## Security/privacy

Public read-only console; no authenticated investor functions or wallet provider connected yet.

- Do not put private financial statements into public routes or JSON.
- Never store signing private keys or blockchain secrets in frontend environment variables.
- Separate future `/investors/portal` server authorization and logs from open telemetry.
- No simulated transaction volume, token market cap, active wallets, TVL, revenue or DAO voting.

## Future adapters

1. Establish a verifiable per-chain registry with chain ID, block explorer, contract address, deployment transaction, project ownership and security review.
2. Ingest real chain events through appropriate verified RPC or indexers.
3. Normalize across networks using chain-aware addresses and deduplication methodology.
4. Store time series with provenance and update timestamps.
5. Add investor reporting separately with financial review and access controls.

## Release checklist

- [x] Public routes and JSON API implemented
- [x] GitHub source allowlist, server cache and errors
- [x] Clear GitHub vs chain/financial semantics
- [x] Responsive dashboard and navigation
- [ ] Verify live content in Vercel preview on desktop and mobile
- [ ] Verify preview runtime JSON contains populated repo data (GitHub request / rate-limit)
- [ ] Review claims with DXJ Labs owner
- [ ] Merge draft PR to production after approval

See also [Product Requirements](PRODUCT_REQUIREMENTS_V1.md) and [Sitemap & Architecture](SITEMAP_AND_ARCHITECTURE.md).
