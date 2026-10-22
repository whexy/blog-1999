"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import type { Language } from "@/lib/site";

interface ReadTrackerProps {
  slug: string;
  /** Language of the post body actually shown. */
  lang: Language;
}

/**
 * Sends `post-read` once per page view, when the reader scrolls this
 * marker (placed right after the post body) into or past view.
 */
export default function ReadTracker({
  slug,
  lang,
}: ReadTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Not an IntersectionObserver: a jump (End key, scrollbar drag)
    // can move the marker from below the viewport to above it between
    // frames, which it reports as no change.
    const onScroll = () => {
      const top = ref.current?.getBoundingClientRect().top;
      if (top === undefined || top > window.innerHeight) return;
      window.removeEventListener("scroll", onScroll);
      track("post-read", { slug, lang });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, lang]);

  return <div ref={ref} aria-hidden="true" />;
}
