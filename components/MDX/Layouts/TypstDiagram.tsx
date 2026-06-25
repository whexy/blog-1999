/**
 * Renders a Typst-generated SVG inline.
 *
 * The SVG string is produced at compile time by lib/remark-typst.ts
 * and injected as a prop. Using dangerouslySetInnerHTML is safe here
 * because the content originates from the typst compiler, not from
 * user-supplied runtime input.
 */

interface TypstDiagramProps {
  /** Raw SVG markup string produced by the typst compiler. */
  svg: string;
}

const TypstDiagram = ({ svg }: TypstDiagramProps) => {
  return (
    <div
      className="typst-diagram not-prose my-6"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default TypstDiagram;
