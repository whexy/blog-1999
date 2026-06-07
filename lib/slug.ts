/**
 * Deterministic, GitHub-style slugify used for heading anchor ids.
 *
 * The SAME function must be used by both the table-of-contents
 * extractor (lib/toc.ts) and the rendered heading overrides
 * (components/MDX/MDXComponents.tsx), otherwise jump-table links
 * will not resolve to the rendered heading ids.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-") // whitespace / underscores -> dash
    .replace(/[^\p{L}\p{N}-]+/gu, "") // drop everything but letters/numbers/dash
    .replace(/-{2,}/g, "-") // collapse repeated dashes
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

/**
 * Creates a stateful slugifier that de-duplicates collisions by
 * appending an incrementing suffix (`-1`, `-2`, ...), matching the
 * behaviour of rehype-slug / GitHub.
 *
 * Because MDX headings render in document order, replaying this
 * counter in the same order (extractor + heading overrides) yields
 * identical ids on both sides.
 */
export function createSlugger() {
  const seen = new Map<string, number>();
  return function slug(text: string): string {
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}
