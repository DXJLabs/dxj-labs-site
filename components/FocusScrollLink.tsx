"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Keeps an external engineering-source link visible when keyboard navigation
 * moves into a later, full-viewport section. This is a real accessibility fix:
 * focus is scrolled into the document viewport, never visually hidden.
 */
export default function FocusScrollLink({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) {
  return (
    <a
      {...props}
      onFocus={(event) => {
        event.currentTarget.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "auto",
        });
        props.onFocus?.(event);
      }}
    >
      {children}
    </a>
  );
}
