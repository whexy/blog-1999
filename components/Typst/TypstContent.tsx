/**
 * Renders compiled Typst HTML content.
 *
 * The HTML string is the inner body produced by `typst compile
 * --features html`. It is injected via dangerouslySetInnerHTML —
 * this is safe here because the content is generated at build time
 * from trusted .typ source files, never from user input.
 *
 * Typst HTML export notes:
 * - `=` headings → <h2>, `==` → <h3>, `===` → <h4>
 * - Code blocks carry syntax highlighting via inline style attributes
 * - Standard HTML elements are used throughout, so Tailwind Typography
 *   (applied by the parent <Prose> wrapper) styles them automatically
 * - The heading <id> attributes are added by TypstContent so anchor
 *   links from the TOC resolve correctly
 */

import { createSlugger } from "@/lib/slug";

interface TypstContentProps {
  /** Inner body HTML from compileTypstToHtml(). */
  html: string;
}

/**
 * Inject id attributes onto h2/h3/h4 elements so TOC anchor links
 * resolve. IDs are generated with the same slugger logic used for
 * MDX headings (createSlugger from lib/slug.ts).
 */
function injectHeadingIds(html: string): string {
  const slug = createSlugger();
  return html.replace(
    /<(h[234])([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_, tag: string, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = slug(text);
      // Preserve any existing attributes (Typst currently emits none,
      // but be defensive in case future versions add them).
      return `<${tag}${attrs} id="${id}" class="scroll-mt-24">${inner}</${tag}>`;
    },
  );
}

const TypstContent = ({ html }: TypstContentProps) => {
  const processedHtml = injectHeadingIds(html);
  return (
    <div
      className="typst-content"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};

export default TypstContent;
