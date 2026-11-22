import type { Metadata } from "next";
import Link from "next/link";
import ConsoleShell from "../../../components/ConsoleShell";
import { CommitFeed, SourceNote } from "../../../components/ConsoleWidgets";
import { getConsoleSnapshot, trackedRepositories } from "../../../lib/github-console";

export const revalidate = 300;
export const metadata: Metadata = { title: "Development feed" };

export default async function ConsoleActivity({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const [{ project }, snapshot] = await Promise.all([searchParams, getConsoleSnapshot()]);
  const selected = trackedRepositories.some(repo => repo.slug === project) ? project : "all";
  const commits = selected === "all" ? snapshot.commits : snapshot.commits.filter(item => item.slug === selected);
  return (
    <ConsoleShell active="activity" eyebrow="WORKSPACE / DEVELOPMENT" title="Latest changes." description="A timestamped, source-linked feed of the five most recent public commits per tracked repository. This is not a complete Git history or a transaction ledger.">
      <SourceNote checkedAt={snapshot.checkedAt} warning={snapshot.repositories.some(r => !!r.activityError)} />
      <section className="console-section">
        <div className="console-section-top"><h2>Public Git activity</h2><span>MAX 5 COMMITS / REPOSITORY</span></div>
        <nav className="console-filters" aria-label="Filter commits by repository">
          <Link href="/console/activity" aria-current={selected === "all" ? "page" : undefined}>All sources</Link>
          {trackedRepositories.map(repo => <Link key={repo.slug} href={"/console/activity?project=" + repo.slug} aria-current={selected === repo.slug ? "page" : undefined}>{repo.label}</Link>)}
        </nav>
        <div className="console-activity-layout">
          <CommitFeed commits={commits} emptyMessage="No recent commits were returned for this repository. It may be empty or the public API may be unavailable." />
          <aside className="console-activity-aside"><span>ABOUT THIS FEED</span><h3>Trace every change.</h3><p>Every entry links to a real GitHub commit. Commit timestamps are shown in UTC. The view combines the latest five commits from each public repository, refreshed by server cache.</p><p>This is engineering activity, not ecosystem users, trading volume or revenue.</p><Link href="/console/sources">Read data methodology ↗</Link></aside>
        </div>
      </section>
    </ConsoleShell>
  );
}
