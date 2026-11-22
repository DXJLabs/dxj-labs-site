import type { Metadata } from "next";
import ConsoleShell from "../../../components/ConsoleShell";
import { SourceNote } from "../../../components/ConsoleWidgets";
import { getConsoleSnapshot, readableDate } from "../../../lib/github-console";

export const revalidate = 300;
export const metadata: Metadata = { title: "Repositories" };

export default async function ConsoleProjects() {
  const snapshot = await getConsoleSnapshot();
  return (
    <ConsoleShell active="projects" eyebrow="WORKSPACE / SOURCE CONTROL" title="Project telemetry." description="Verified repository metadata from the DXJ Labs GitHub organization. See the current default branch, recent pushes, activity, and direct source links.">
      <SourceNote checkedAt={snapshot.checkedAt} warning={snapshot.repositories.some(r => !r.metadata || !!r.activityError)} />
      <section className="console-section">
        <div className="console-section-top"><h2>Official repository directory</h2><span>{snapshot.repositories.length} TRACKED SOURCES</span></div>
        <div className="console-detail-repos">
          {snapshot.repositories.map(repo => (
            <article key={repo.config.slug} className="console-detail-repo">
              <div className="console-detail-head">
                <div><span>{repo.config.role.toUpperCase()}</span><h3>{repo.config.label}</h3><p>{repo.metadata?.description || repo.config.role}</p></div>
                <a href={"https://github.com/DXJLabs/" + repo.config.name} target="_blank" rel="noopener noreferrer">OPEN GITHUB ↗</a>
              </div>
              {repo.metadata ? (
                <div className="console-detail-grid">
                  <div><span>VISIBILITY</span><strong>Public</strong></div>
                  <div><span>DEFAULT BRANCH</span><strong>{repo.metadata.default_branch}</strong></div>
                  <div><span>LAST PUSH</span><strong>{readableDate(repo.metadata.pushed_at, true)}</strong></div>
                  <div><span>STARS</span><strong>{repo.metadata.stargazers_count}</strong></div>
                  <div><span>FORKS</span><strong>{repo.metadata.forks_count}</strong></div>
                  <div><span>ISSUES + PULL REQUESTS</span><strong>{repo.metadata.open_issues_count}</strong></div>
                </div>
              ) : <div className="console-empty">{repo.metadataError}</div>}
              <div className="console-detail-latest"><span>LATEST PUBLIC COMMIT</span>{repo.commits[0] ? <a href={repo.commits[0].url} target="_blank" rel="noopener noreferrer">{repo.commits[0].title} <span>↗</span><small>{readableDate(repo.commits[0].date, true)} / {repo.commits[0].shortSha}</small></a> : <p>{repo.activityError || "No commit returned by GitHub."}</p>}</div>
            </article>
          ))}
        </div>
      </section>
    </ConsoleShell>
  );
}
