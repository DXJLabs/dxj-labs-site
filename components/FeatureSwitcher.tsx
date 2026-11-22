"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Mobile: an accessible two-choice view with no half-clipped text.
 * Desktop: both full-width editorial cards remain visible.
 * The same server-rendered content is preserved in both layouts.
 */
export default function FeatureSwitcher({
  label,
  options,
  className,
  first,
  second,
}: {
  label: string;
  options: [string, string];
  className: string;
  first: ReactNode;
  second: ReactNode;
}) {
  const [active, setActive] = useState<0 | 1>(0);
  const id = useId().replace(/:/g, "");
  const panels = [first, second];

  return (
    <div className="dxj-feature-switcher">
      <div className="dxj-feature-choices" role="group" aria-label={label}>
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={active === index ? "is-current" : ""}
            aria-pressed={active === index}
            aria-controls={id + "-panel-" + index}
            onClick={() => setActive(index as 0 | 1)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {option}
          </button>
        ))}
      </div>
      <div className={className + " dxj-feature-panels"}>
        {panels.map((panel, index) => (
          <div
            className={"dxj-feature-panel" + (active === index ? " is-current" : "")}
            key={index}
            id={id + "-panel-" + index}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
