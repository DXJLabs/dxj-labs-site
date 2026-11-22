import type { Metadata } from "next";
import ConsoleShell from "../../../components/ConsoleShell";
import { trackedRepositories } from "../../../lib/github-console";

export const metadata: Metadata = { title: "Data sources" };

export default function ConsoleSources() {
  return (
    <ConsoleShell active="sources" eyebrow="WORKSPACE / SOURCE PROVENANCE" title="Know the source." description="A useful dashboard lets you verify every important claim. Here's what this console measures, where it comes from, and what it deliberately does not report.">
      <section className="console-section">
        <div className="console-section-top"><h2>Connected source</h2><span>01 / GITHUB REST API</span></div>
        <div className="console-source-description"><div><span>CONNECTION</span><h3>GitHub public API</h3><p>Read-only, server-side requests to public repositories. Individual responses are cached for five minutes by Next.js and Vercel. A server-side GITHUB_TOKEN may optionally increase rate limits; tokens never reach the browser.</p></div><div><span>PROVENANCE</span>{trackedRepositories.map(repo => <a key={repo.slug} target="_blank" rel="noopener noreferrer" href={"https://github.com/" + repo.owner + "/" + repo.name}>{repo.owner}/{repo.name} <b>↗</b></a>)}<a href="/api/console/overview" target="_blank" rel="noopener noreferrer">Public machine-readable JSON <b>↗</b></a></div></div>
      </section>
      <section className="console-section">
        <div className="console-section-top"><h2>Metric definitions</h2><span>READ BEFORE INTERPRETATION</span></div>
        <div className="console-definitions">
          <div><strong>Tracked repositories</strong><p>Three explicitly registered public DXJ Labs organization repositories. This is not a count of released products.</p></div>
          <div><strong>Stars and forks</strong><p>Values supplied by GitHub repository metadata, summed across accessible tracked repositories. No inference about user adoption or value.</p></div>
          <div><strong>Open issues + pull requests</strong><p>GitHub&apos;s open_issues_count includes pull requests. The count does not represent unresolved bugs alone.</p></div>
          <div><strong>Latest code push</strong><p>Most recent pushed_at field among tracked repositories with available public GitHub metadata.</p></div>
          <div><strong>Development feed</strong><p>Up to five latest commits per repository, ordered by commit author timestamp. Older commits are intentionally omitted.</p></div>
          <div><strong>Unavailable data</strong><p>When GitHub denies access or rate-limits requests, fields show an unavailable state instead of invented numbers or cached sample values.</p></div>
        </div>
      </section>
      <section className="console-chain-notice"><span>NOT CONNECTED</span><strong>On-chain analytics, investor accounts, treasury, token data and financial reporting.</strong><p>None of these is included in this GitHub telemetry console. They require their own independently verified sources, security controls and reporting policies.</p></section>
    </ConsoleShell>
  );
}
