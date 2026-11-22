export type ProductStage = "in-development" | "exploration" | "prototype";
export type NetworkStage = "planned" | "testing" | "live";
export type TokenStage = "not-issued" | "issued";
export type Project = {
  slug: string;
  name: string;
  area: string;
  stage: ProductStage;
  affiliation: "dxjlabs" | "candidate";
  description: string;
  repositoryUrl?: string;
  appUrl?: string;
  proof?: { label: string; value: string; href: string; explanation: string }[];
  token: { status: TokenStage; note: string };
  networks: { name: string; stage: NetworkStage; note: string }[];
};

export const projects: Project[] = [
  {
    slug: "vinss",
    name: "VINSS",
    affiliation: "dxjlabs",
    area: "Privacy / Web3",
    stage: "in-development",
    description: "Private deal rooms connecting encrypted messaging, structured agreements, shielded escrow and verifiable settlement on Starknet.",
    repositoryUrl: "https://github.com/DXJLabs/vinss",
    proof: [
      { label: "DEPLOYMENT", value: "Starknet Mainnet", href: "https://github.com/DXJLabs/vinss#mainnet-verification", explanation: "Mainnet verification documented in VINSS repository." },
      { label: "CONTRACT EVIDENCE", value: "7 listed contracts", href: "https://github.com/DXJLabs/vinss#mainnet-contracts", explanation: "Seven distinct contract addresses listed in project README." },
      { label: "SETTLEMENT", value: "On-chain evidence", href: "https://github.com/DXJLabs/vinss/blob/main/strk20.json", explanation: "Machine-readable project evidence and transaction references." },
    ],
    token: { status: "not-issued", note: "No verified project token announced." },
    networks: [{ name: "Starknet Mainnet", stage: "live", note: "Deployment and workflow verification documented in official project README. Dashboard indexing is not yet connected." }],
  },
  {
    slug: "carel",
    name: "CAREL",
    affiliation: "dxjlabs",
    area: "AI / Digital finance",
    stage: "exploration",
    description: "Agentic DeFi workspace routing user goals through reviewed Swap, Bridge, Staking and Lending execution flows with wallet approval.",
    repositoryUrl: "https://github.com/DXJLabs/Carel",
    appUrl: "https://carel-v2-mock.vercel.app",
    proof: [
      { label: "PUBLIC APP", value: "Open CAREL", href: "https://carel-v2-mock.vercel.app", explanation: "Application URL published in the CAREL repository." },
      { label: "INTEGRATION MODEL", value: "AVNU · Vesu · Endur · STRK20", href: "https://github.com/DXJLabs/Carel#current-integrations", explanation: "Execution providers documented by the project." },
      { label: "REGRESSION", value: "117 tests reported", href: "https://github.com/DXJLabs/Carel#verified-baseline", explanation: "Repository reports 117/117 tests. Site does not independently attest this number." },
    ],
    token: { status: "not-issued", note: "No verified project token announced." },
    networks: [{ name: "Starknet Mainnet", stage: "live", note: "Mainnet integrations documented in project README; availability varies by feature." },{ name: "Starknet Sepolia", stage: "testing", note: "Testnet integration documented for bridge and privacy workflows." },{ name: "Additional chains", stage: "planned", note: "Multi-ecosystem architecture exists; no unsupported networks claimed live." }],
  },
  {
    slug: "growhaven",
    name: "Growhaven",
    affiliation: "candidate",
    area: "Games / Interactive",
    stage: "prototype",
    description: "An experimental game concept, currently being validated before entering the official product lineup.",
    token: { status: "not-issued", note: "A game token is not confirmed or deployed." },
    networks: [{ name: "Chain to be decided", stage: "planned", note: "No blockchain integration confirmed." }],
  },
];

export const ecosystemToken = {
  name: "DXJ",
  status: "not-issued" as const,
  description: "A possible ecosystem utility token. No deployed contract, supply, distribution, sale, or promised returns.",
};

export type Activity = {
  id: string;
  date: string;
  title: string;
  category: "Build update" | "Event" | "Community" | "Competition";
  status: "in-progress" | "completed" | "scheduled";
  summary: string;
  evidenceUrl?: string;
};

export const activities: Activity[] = [
  {
    id: "studio-platform-design",
    date: "2026-11-22",
    title: "DXJ Labs platform redesign",
    category: "Build update",
    status: "in-progress",
    summary: "Reworking the studio website and defining a public multi-chain ecosystem architecture. This is development work, not a product launch.",
    evidenceUrl: "https://github.com/DXJLabs/dxj-labs-site/pull/2",
  },
];

export type BlogCategory = "Engineering" | "Research" | "Ecosystem Updates" | "Studio Journal";
export type Article = {
  slug: string;
  title: string;
  category: BlogCategory;
  publishedAt: string;
  author: string;
  excerpt: string;
  paragraphs: string[];
  status: "published" | "draft";
};

export const articles: Article[] = [
  {
    slug: "building-the-dxj-labs-ecosystem",
    title: "Building the DXJ Labs ecosystem",
    category: "Studio Journal",
    publishedAt: "2026-11-22",
    author: "DXJ Labs Studio",
    excerpt: "Why our next chapter is a multi-chain platform for products, research, activities, and transparent progress.",
    status: "published",
    paragraphs: [
      "DXJ Labs started with a practical question: what happens when we keep building across different technologies instead of forcing every project into one category? Our direction is an independent product studio with a growing Web3 ecosystem.",
      "Our products explore different problems. VINSS focuses on privacy and deal rooms. CAREL explores AI interfaces in digital finance. Growhaven is a game prototype undergoing validation. They are at different stages, and our website should say so clearly.",
      "We intend to support multiple blockchains. That does not mean every chain is connected today. Networks will be recorded alongside evidence, implementation status, and links to contracts as integrations become real.",
      "We are also building a place to document activities, publish research notes, and eventually show verified metrics for partners and investor review. Financial and operational data will appear only when we have a verifiable source and a clear methodology.",
      "A DXJ ecosystem token and product-specific economies are ideas under evaluation, not issued assets. We will not publish fictional prices, market capitalizations, token contracts, or investment returns.",
      "Our guiding principle is simple: build the product, document the process, and make each claim checkable."
    ]
  }
];

export const publishedArticles = articles.filter(article => article.status === "published");

export type MetricDefinition = {
  key: string;
  label: string;
  unit: string;
  value: number | null;
  source: string | null;
  updatedAt: string | null;
  methodology: string;
  status: "unavailable" | "verified";
};
export const metrics: MetricDefinition[] = [
  { key: "active-wallets", label: "Active wallets", unit: "wallets", value: null, source: null, updatedAt: null, methodology: "Unique addresses interacting with verified contracts in a disclosed time window; wallet duplication across chains must be addressed.", status: "unavailable" },
  { key: "transactions", label: "On-chain activity", unit: "transactions", value: null, source: null, updatedAt: null, methodology: "Transaction events from approved chain indexers; excludes unrelated contracts and double-counted bridge events.", status: "unavailable" },
  { key: "treasury", label: "Reported treasury", unit: "USD", value: null, source: null, updatedAt: null, methodology: "Verified and attributable treasury holdings, valued using disclosed pricing sources and timestamps.", status: "unavailable" },
  { key: "revenue", label: "Reported product revenue", unit: "USD", value: null, source: null, updatedAt: null, methodology: "Recognized revenue by product and reporting period, reconciled to approved accounting records.", status: "unavailable" },
];
