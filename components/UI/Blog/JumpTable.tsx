"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/toc";

interface JumpTableProps {
  headings: Heading[];
}

/**
 * Wide-screen "jump table" (table of contents).
 *
 * Renders as a fixed sidebar in the right gutter of the centered
 * 720px article column, so it never shifts the article. Hidden below
 * the `xl` breakpoint, where there isn't room for a gutter. Tracks
 * the active section with an IntersectionObserver and smooth-scrolls
 * on click.
 */
export default function JumpTable({ headings }: JumpTableProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map(h => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Pick the first heading (in document order) that is
        // currently visible; fall back to the last one scrolled past.
        const firstVisible = headings.find(h => visible.has(h.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
          return;
        }

        const scrollY = window.scrollY;
        let current = "";
        for (const el of elements) {
          if (el.offsetTop - 100 <= scrollY) current = el.id;
          else break;
        }
        if (current) setActiveId(current);
      },
      {
        // Account for the sticky header at the top of the viewport.
        rootMargin: "-96px 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-32 right-[max(1.5rem,calc((100vw-720px)/2-15rem))] z-10 hidden max-h-[70vh] w-56 overflow-y-auto font-sans xl:block">
      <p className="text-black-readable/40 mb-3 text-xs font-semibold tracking-wide uppercase">
        On this page
      </p>
      <ul className="space-y-1 border-l border-neutral-200">
        {headings.map(h => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={e => handleClick(e, h.id)}
                className={[
                  "-ml-px block border-l py-1 text-sm leading-snug transition-colors duration-200",
                  h.depth === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-[#d99] font-medium text-[#b66]"
                    : "border-transparent text-neutral-500 hover:text-neutral-900",
                ].join(" ")}>
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
