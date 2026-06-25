/**
 * Remark plugin: compile <Typst> MDX blocks to inline SVG.
 *
 * MDX usage:
 *
 *   <Typst>
 *   ```typst
 *   $F = G (m_1 m_2) / r^2$
 *   ```
 *   </Typst>
 *
 * The fenced code block is used so markdown editors apply Typst syntax
 * highlighting to the content. At compile time this plugin intercepts
 * the raw AST — before rehype/prism runs — extracts the code string,
 * compiles it via the typst binary, and replaces the entire <Typst>
 * block with a <TypstDiagram svg={...} /> element whose `svg` prop
 * carries the SVG markup as a JS string literal.
 *
 * The resulting SVG is inlined into the rendered HTML by TypstDiagram;
 * no files are written to the source tree. Next.js caches the compiled
 * page in .next/ as normal build artifacts.
 */

import { visit } from "unist-util-visit";
import { compileTypstToSvg } from "@/lib/typst";
import type { Root, Code, Parent } from "mdast";
import type {
  MdxJsxFlowElement,
  MdxJsxAttribute,
} from "mdast-util-mdx-jsx";

/**
 * Returns a remark plugin that transforms <Typst> JSX blocks.
 * Add to `remarkPlugins` in the @mdx-js/mdx `compile()` call.
 */
export function remarkTypst() {
  return (tree: Root) => {
    visit(
      tree,
      "mdxJsxFlowElement",
      (
        node: MdxJsxFlowElement,
        index: number | undefined,
        parent: Parent | undefined,
      ) => {
        if (node.name !== "Typst") return;
        if (index === undefined || !parent) return;

        // Find the fenced code block child with lang "typst".
        const codeNode = node.children.find(
          (child): child is Code =>
            child.type === "code" && (child as Code).lang === "typst",
        );

        if (!codeNode) {
          throw new Error(
            `<Typst> block is missing an inner \`\`\`typst code fence.\n` +
              `Expected:\n` +
              `  <Typst>\n` +
              `  \`\`\`typst\n` +
              `  // your typst program\n` +
              `  \`\`\`\n` +
              `  </Typst>`,
          );
        }

        const svg = compileTypstToSvg(codeNode.value);

        // Build the replacement <TypstDiagram svg="..." /> AST node.
        //
        // A plain *string* attribute value (not an expression) is used
        // deliberately: MDX turns it directly into a JSX string Literal,
        // handling all escaping of quotes/angle brackets itself. An
        // expression value would require an accompanying parsed estree,
        // which we cannot provide here.
        const svgAttr: MdxJsxAttribute = {
          type: "mdxJsxAttribute",
          name: "svg",
          value: svg,
        };

        const replacement: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: "TypstDiagram",
          attributes: [svgAttr],
          children: [],
        };

        // Replace the <Typst> node in-place.
        (parent.children as unknown[])[index] = replacement;
      },
    );
  };
}
