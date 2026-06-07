import { createSlugger } from "@/lib/slug";

export type Heading = {
  id: string;
  text: string;
  depth: number; // 2 = h2, 3 = h3
};

/**
 * Strip inline markdown from a heading's raw text so the visible
 * label (and the slug derived from it) matches what the browser
 * renders.
 */
function stripInlineMarkdown(raw: string): string {
  return raw
    .replace(/`([^`]+)`/g, "$1") // `code`
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [text](url)
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1") // [text][ref]
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // italic
    .replace(/~~(.*?)~~/g, "$1") // strikethrough
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract h2/h3 headings from raw MDX content.
 *
 * IMPORTANT: every ATX heading (h1-h6) advances the shared slugger so
 * the generated ids stay in lockstep with the heading overrides in
 * components/MDX/MDXComponents.tsx, which slugify in the same document
 * order. We only return h2/h3 for display, but still slug skipped
 * levels to keep the counters aligned.
 */
export function extractHeadings(content: string): Heading[] {
  const slug = createSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  let fenceMarker = "";

  for (const line of content.split("\n")) {
    const fenceMatch = /^\s*(```+|~~~+)/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1][0]; // ` or ~
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      continue;
    }
    if (inFence) continue;

    const headingMatch = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!headingMatch) continue;

    const depth = headingMatch[1].length;
    const text = stripInlineMarkdown(headingMatch[2]);
    if (!text) continue;

    // Advance the slugger for EVERY heading level to stay in sync
    // with the rendered overrides.
    const id = slug(text);

    if (depth === 2 || depth === 3) {
      headings.push({ id, text, depth });
    }
  }

  return headings;
}
