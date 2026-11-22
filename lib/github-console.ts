import { cache } from "react";

/**
 * Public GitHub telemetry for the DXJ Labs console.
 * Source: GitHub REST API. This is development activity, NOT on-chain
 * volume, users, revenue, token price, or investor performance.
 *
 * Server-only credentials may be supplied with GITHUB_TOKEN, never NEXT_PUBLIC.
 */
export type TrackedRepository = {
  slug: "vinss" | "carel" | "dxj-labs-site";
  owner: "DXJLabs";
  name: string;
  label: string;
  role: string;
};

export const trackedRepositories: readonly TrackedRepository[] = [
  { slug: "vinss", owner: "DXJLabs", name: "vinss", label: "VINSS", role: "Privacy & Web3" },
  { slug: "carel", owner: "DXJLabs", name: "Carel", label: "CAREL", role: "AI & Digital Finance" },
  { slug: "dxj-labs-site", owner: "DXJLabs", name: "dxj-labs-site", label: "DXJ Platform", role: "Studio infrastructure" },
];

type ApiRepository = {
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string | null;
  updated_at: string | null;
  language: string | null;
  archived: boolean;
};

type ApiCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string | null; name: string | null } | null };
  author: { login: string } | null;
};

export type CommitRecord = {
  sha: string;
  shortSha: string;
  title: string;
  date: string | null;
  author: string;
  url: string;
  project: string;
  slug: string;
};

export type RepositoryRecord = {
  config: TrackedRepository;
  metadata: ApiRepository | null;
  commits: CommitRecord[];
  metadataError: string | null;
  activityError: string | null;
};

export type ConsoleSnapshot = {
  repositories: RepositoryRecord[];
  commits: CommitRecord[];
  source: "GitHub REST API";
  refreshMinutes: number;
  checkedAt: string;
};

const REVALIDATE_SECONDS = 300;

async function getJson<T>(path: string): Promise<{ data: T | null; error: string | null }> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "DXJLabs-Ecosystem-Console",
  };
  if (token) headers.Authorization = "Bearer " + token;
  try {
    const response = await fetch("https://api.github.com" + path, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) {
      const reason = response.status === 404
        ? "Repository is not publicly accessible."
        : response.status === 403 || response.status === 429
          ? "GitHub API access temporarily limited."
          : "GitHub API returned HTTP " + response.status + ".";
      return { data: null, error: reason };
    }
    return { data: (await response.json()) as T, error: null };
  } catch {
    return { data: null, error: "GitHub API could not be reached." };
  }
}

async function readRepository(config: TrackedRepository): Promise<RepositoryRecord> {
  const base = "/repos/" + encodeURIComponent(config.owner) + "/" + encodeURIComponent(config.name);
  const [metaResult, commitsResult] = await Promise.all([
    getJson<ApiRepository>(base),
    getJson<ApiCommit[]>(base + "/commits?per_page=5"),
  ]);
  const metadata = metaResult.data && typeof metaResult.data.full_name === "string" ? metaResult.data : null;
  const rawCommits = Array.isArray(commitsResult.data) ? commitsResult.data : [];
  const commits: CommitRecord[] = rawCommits
    .filter(c => c && typeof c.sha === "string" && c.commit && typeof c.commit.message === "string")
    .map(c => ({
      sha: c.sha,
      shortSha: c.sha.slice(0, 7),
      title: c.commit.message.split("\n")[0].slice(0, 180),
      date: c.commit.author?.date || null,
      author: c.author?.login || c.commit.author?.name || "Unknown contributor",
      url: "https://github.com/" + config.owner + "/" + config.name + "/commit/" + encodeURIComponent(c.sha),
      project: config.label,
      slug: config.slug,
    }));
  return {
    config,
    metadata,
    commits,
    metadataError: metaResult.error || (metadata ? null : "Repository metadata unavailable."),
    activityError: commitsResult.error || (Array.isArray(commitsResult.data) ? null : "Commit history unavailable."),
  };
}

export const getConsoleSnapshot = cache(async (): Promise<ConsoleSnapshot> => {
  const repositories = await Promise.all(trackedRepositories.map(readRepository));
  const commits = repositories
    .flatMap(repo => repo.commits)
    .sort((a, b) => (b.date ? Date.parse(b.date) || 0 : 0) - (a.date ? Date.parse(a.date) || 0 : 0));
  return {
    repositories,
    commits,
    checkedAt: new Date().toISOString(),
    source: "GitHub REST API",
    refreshMinutes: REVALIDATE_SECONDS / 60,
  };
});

export function readableDate(date: string | null, includeTime = false): string {
  if (!date || Number.isNaN(Date.parse(date))) return "Not available";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit", hourCycle: "h23" as const } : {}),
  }).format(new Date(date)) + (includeTime ? " UTC" : "");
}

export function formatNumber(value: number | null): string {
  return value === null || !Number.isFinite(value) ? "—" : new Intl.NumberFormat("en-US").format(value);
}
