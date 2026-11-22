import Link from "next/link";
import { readableDate, type CommitRecord, type RepositoryRecord } from "../lib/github-console";

export function SourceNote({ checkedAt, warning }: { checkedAt: string; warning?: boolean }) {
  return (
    <div className={warning ? "console-source-note warning" : "console-source-note"}>
      <span className="console-source-icon">{warning ? "!" : "✓"}</span>
      <span><strong>{warning ? "Some GitHub data is unavailable" : "Data sourced from public GitHub repositories"}</strong><small>Checked {readableDate(checkedAt, true)} · Cached for up to 5 minutes · <Link href="/console/sources">View methodology ↗</Link></small></span>
    </div>
  );
}

export function CommitFeed({ commits, emptyMessage = "No public commits could be loaded." }: { commits: CommitRecord[]; emptyMessage?: string }) {
  if (commits.length === 0) return <div className="console-empty">{emptyMessage} <Link href="/console/sources">How data is fetched ↗</Link></div>;
  return (
    <div className="console-commit-list">
      {commits.map(commit => (
        <article key={commit.slug + ":" + commit.sha} className="console-commit-row">
          <span className="console-commit-node" aria-hidden="true" />
          <div className="console-commit-body">
            <div className="console-commit-overline"><span className="console-project-pill">{commit.project}</span><time dateTime={commit.date || undefined}>{readableDate(commit.date, true)}</time></div>
            <a href={commit.url} target="_blank" rel="noopener noreferrer" className="console-commit-title">{commit.title} <span aria-hidden="true">↗</span></a>
            <div className="console-commit-meta"><span>{commit.author}</span><code>{commit.shortSha}</code></div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function RepositoryGrid({ repositories }: { repositories: RepositoryRecord[] }) {
  return (
    <div className="console-repo-grid">
      {repositories.map(item => (
        <article key={item.config.slug} className="console-repo-card">
          <div className="console-repo-card-top"><span className="console-repo-avatar">{item.config.label.slice(0, 1)}</span><span className="console-repo-role">{item.config.role}</span></div>
          <div><h3>{item.config.label}</h3><p>{item.metadata?.description || item.config.role}</p></div>
          <div className="console-repo-kpis">
            <div><span>STARS</span><strong>{item.metadata ? item.metadata.stargazers_count : "—"}</strong></div>
            <div><span>FORKS</span><strong>{item.metadata ? item.metadata.forks_count : "—"}</strong></div>
            <div><span>LAST PUSH</span><strong className="console-repo-date">{readableDate(item.metadata?.pushed_at || null)}</strong></div>
          </div>
          <div className="console-repo-card-bottom">
            <span className={item.metadata ? "console-repo-status ok" : "console-repo-status"}>{item.metadata ? "● Public API connected" : "○ Data unavailable"}</span>
            <a href={"https://github.com/" + item.config.owner + "/" + item.config.name} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
          </div>
          {!item.metadata && <p className="console-repo-error">{item.metadataError}</p>}
        </article>
      ))}
    </div>
  );
}
