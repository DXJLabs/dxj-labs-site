import type { Metadata } from "next";
import PlatformPage from "../../components/PlatformPage";
import { activities } from "../../lib/platform";
import { getConsoleSnapshot, readableDate } from "../../lib/github-console";

export const revalidate = 300;

export const metadata: Metadata = { title: "Activities | DXJ Labs", description: "DXJ Labs build updates, community activities, events and verified evidence of work." };

export default async function ActivitiesPage() {
  const snapshot = await getConsoleSnapshot();
  const recentChanges = snapshot.commits.slice(0, 8);
  return (
    <PlatformPage number="02" tag="ACTIVITIES & EVENTS" title="Work happens in public." description="Real build updates, collaborations, workshops and events. Each entry explains what actually happened, what is still in progress, and where to verify it.">
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Activity log</h2><span>Evidence-linked updates</span></div>
        <div className="activity-list">{activities.map(activity => <article className="activity-row" key={activity.id}><time dateTime={activity.date}>{activity.date}</time><div><span className="activity-kind">{activity.category.toUpperCase()}</span><h3>{activity.title}</h3><p>{activity.summary}</p>{activity.evidenceUrl && <a className="platform-inline-link" href={activity.evidenceUrl} target="_blank" rel="noopener noreferrer">View supporting record ↗</a>}</div><span className="platform-status">{activity.status === "in-progress" ? "In progress" : activity.status}</span></article>)}</div>
      </section>
      <section className="platform-section">
        <div className="platform-section-heading"><h2>Engineering activity</h2><span>PUBLIC GITHUB COMMITS / 5-MIN CACHE</span></div>
        <p className="activity-source-intro">Recent changes from VINSS, CAREL and the DXJ Labs website. Each entry links to its original commit. This is source-control activity, not an on-chain transaction feed.</p>
        {recentChanges.length > 0 ?
          <div className="public-commit-list">
            {recentChanges.map(commit => <article className="public-commit-item" key={commit.slug + commit.sha}>
              <span className="public-commit-project">{commit.project}</span>
              <div><a href={commit.url} target="_blank" rel="noopener noreferrer">{commit.title} <span aria-hidden="true">↗</span></a><p>{commit.author} · <time dateTime={commit.date || undefined}>{readableDate(commit.date, true)}</time> · {commit.shortSha}</p></div>
            </article>)}
          </div>
        : <div className="activity-unavailable">Recent GitHub data is temporarily unavailable. <a href="https://github.com/DXJLabs" target="_blank" rel="noopener noreferrer">Check the organization repositories ↗</a></div>}
      </section>
      <section className="platform-section platform-empty-section">
        <div><span className="section-tag">EVENT CALENDAR</span><h2>Upcoming activities.</h2></div><div><p>No public events have been announced yet.</p><p className="platform-fineprint">When a hackathon, workshop or community event is confirmed, we will show the actual date, location or link, organizer, and attendance details here.</p></div>
      </section>
    </PlatformPage>
  );
}
