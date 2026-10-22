import type { Language } from "@/lib/site";

declare global {
  interface Window {
    /** Set by the Umami tracker script once it has loaded. */
    umami?: {
      track(
        event: string,
        data?: Record<string, string>,
      ): Promise<void>;
    };
  }
}

/**
 * Custom Umami events and their properties. Umami goals match on the
 * event name alone, so each outcome worth a goal has its own name;
 * properties feed funnel step filters and the event breakdown.
 */
export interface AnalyticsEvents {
  /** The reader scrolled to the end of a post's body. */
  "post-read": { slug: string; lang: Language };
  /** A signed-in reader added a top-level comment. */
  comment: { slug: string };
  /** A link to another post in the series box. */
  "series-click": { series: string; to: string };
  "language-switch": { from: Language; to: Language };
  /** A link to one of the author's profiles (`rel="me"`). */
  "profile-click": { url: string; domain: string };
  /** Any other link that leaves the site. */
  "outbound-click": { url: string; domain: string };
}

/**
 * Sends a custom event. Use this rather than `data-umami-event` on
 * internal links: the tracker cancels such clicks and sets
 * `location.href` itself, turning client navigation into a full
 * page load.
 */
export function track<E extends keyof AnalyticsEvents>(
  event: E,
  data: AnalyticsEvents[E],
) {
  window.umami?.track(event, data);
}
