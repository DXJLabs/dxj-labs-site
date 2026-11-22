"use client";

import { useState } from "react";

export type HeroSignalProject = {
  name: string;
  slug: string;
  category: string;
  stage: string;
  headline: string | null;
  commitUrl: string | null;
  updated: string;
  repositoryUrl: string;
  available: boolean;
};

/**
 * Interactive source-control display: only GitHub-backed project data.
 * SVG signals are illustrative motion, not transaction volume or live chain connectivity.
 */
export default function HeroSignal({ projects }: { projects: HeroSignalProject[] }) {
  const [active, setActive] = useState(0);
  const [motionPlaying, setMotionPlaying] = useState(true);
  const project = projects[active] ?? null;

  return (
    <div className={motionPlaying ? "signal-scene" : "signal-scene is-paused"}>
      <div className="signal-orbit-field" aria-hidden="true">
        <svg viewBox="0 0 600 410" preserveAspectRatio="xMidYMid meet" role="presentation">
          <defs>
            <radialGradient id="signalBloom" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#b4f181" stopOpacity=".28" />
              <stop offset="100%" stopColor="#b4f181" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="302" cy="185" r="175" fill="url(#signalBloom)" />
          <circle cx="302" cy="185" r="148" className="signal-orbit-ring" />
          <circle cx="302" cy="185" r="111" className="signal-orbit-ring signal-orbit-ring-in" />
          <circle cx="302" cy="185" r="62" className="signal-orbit-ring" />
          <path d="M303 185 C 210 80, 142 85, 92 132" className="signal-wire" />
          <path d="M303 185 C 410 63, 479 85, 520 143" className="signal-wire signal-wire-b" />
          <path d="M303 185 C 338 275, 429 295, 490 335" className="signal-wire signal-wire-c" />
          <path d="M303 185 C 211 262, 169 300, 111 327" className="signal-wire signal-wire-d" />
          <path d="M303 185 C 210 80, 142 85, 92 132" className="signal-wire-flow" />
          <path d="M303 185 C 410 63, 479 85, 520 143" className="signal-wire-flow signal-flow-late" />
          <path d="M303 185 C 338 275, 429 295, 490 335" className="signal-wire-flow signal-flow-slow" />
          <circle cx="303" cy="185" r="37" className="signal-central-node" />
          <circle cx="303" cy="185" r="5" className="signal-center-dot" />
          <circle cx="92" cy="132" r="7" className="signal-outer-node" />
          <circle cx="520" cy="143" r="7" className="signal-outer-node" />
          <circle cx="490" cy="335" r="5" className="signal-muted-node" />
          <circle cx="111" cy="327" r="5" className="signal-muted-node" />
        </svg>
        <span className="signal-graph-label label-core">DXJ / SYSTEM</span>
        <span className="signal-graph-label label-vinss">VINSS</span>
        <span className="signal-graph-label label-carel">CAREL</span>
        <span className="signal-graph-label label-next">FUTURE / OPEN</span>
      </div>

      <div className="signal-workspace">
        <div className="signal-workspace-bar">
          <span className="signal-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>DXJ LABS / DEVELOPMENT</span>
          <span className="signal-record-marker"><i /> SOURCE-LINKED</span>
        </div>
        <div className="signal-workspace-body">
          <div className="signal-workspace-intro">
            <span>01 / PRODUCT ACTIVITY</span>
            <p className="signal-headline">Latest project commits.</p>
            <p>Follow verified source-code changes across our projects.</p>
          </div>

          <div className="signal-project-selector" role="tablist" aria-label="Select a repository">
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.slug}
                role="tab"
                id={"signal-tab-" + item.slug}
                aria-selected={active === index}
                aria-controls="signal-current-project"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={event => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    const delta = event.key === "ArrowRight" ? 1 : -1;
                    const next = (index + delta + projects.length) % projects.length;
                    setActive(next);
                    document.getElementById("signal-tab-" + projects[next].slug)?.focus();
                  }
                }}
              >
                <span>{item.name}</span>
                <small>{item.category}</small>
              </button>
            ))}
          </div>

          {project && (
            <div id="signal-current-project" role="tabpanel" aria-labelledby={"signal-tab-" + project.slug} className="signal-project-data" key={project.slug}>
              <div className="signal-data-head">
                <span>RECENT COMMIT</span>
                <span className={project.available ? "signal-api-available" : "signal-api-unavailable"}>{project.available ? "● GITHUB" : "○ UNAVAILABLE"}</span>
              </div>
              <h3>{project.headline || "Recent public activity unavailable"}</h3>
              <div className="signal-data-meta">
                <span>{project.stage}</span>
                <time>{project.updated}</time>
              </div>
              <a href={project.commitUrl || project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                {project.commitUrl ? "Inspect original commit" : "Open public repository"} <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
          <div className="signal-workspace-bottom">
            <span>VERIFIABLE GITHUB RECORDS</span>
            <span>REFRESH / 5 MIN</span>
          </div>
        </div>
      </div>
      <div className="signal-scene-bottom"><span className="signal-beacon" /> NETWORK MAP IS ILLUSTRATIVE · NOT LIVE CHAIN TELEMETRY</div>
      <button type="button" className="signal-motion-toggle" aria-pressed={!motionPlaying} onClick={() => setMotionPlaying(value => !value)}>{motionPlaying ? "Pause motion" : "Resume motion"}</button>
    </div>
  );
}
