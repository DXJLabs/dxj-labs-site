import { NextResponse } from "next/server";
import { getConsoleSnapshot } from "../../../../lib/github-console";

export const revalidate = 300;

export async function GET() {
  const snapshot = await getConsoleSnapshot();
  // Public data only. The GitHub API token is never returned or exposed.
  return NextResponse.json({
    schemaVersion: 1,
    source: snapshot.source,
    checkedAt: snapshot.checkedAt,
    cacheSeconds: 300,
    disclaimer: "GitHub development data, not on-chain, financial, token, or investor metrics.",
    repositories: snapshot.repositories.map(repo => ({
      slug: repo.config.slug,
      label: repo.config.label,
      source: "https://github.com/DXJLabs/" + repo.config.name,
      available: !!repo.metadata,
      error: repo.metadataError,
      defaultBranch: repo.metadata?.default_branch ?? null,
      stars: repo.metadata?.stargazers_count ?? null,
      forks: repo.metadata?.forks_count ?? null,
      openIssuesAndPulls: repo.metadata?.open_issues_count ?? null,
      lastPush: repo.metadata?.pushed_at ?? null,
    })),
    commits: snapshot.commits.map(commit => ({
      repository: commit.slug,
      sha: commit.sha,
      title: commit.title,
      date: commit.date,
      author: commit.author,
      url: commit.url,
    })),
  }, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
