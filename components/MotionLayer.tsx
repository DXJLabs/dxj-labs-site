"use client";

import { useEffect } from "react";

/** Progressive reveal: no content is hidden if JavaScript is unavailable. */
export default function MotionLayer() {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });

    for (const item of items) {
      if (item.getBoundingClientRect().top > window.innerHeight * 0.9) {
        item.classList.add("will-reveal");
        observer.observe(item);
      }
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
