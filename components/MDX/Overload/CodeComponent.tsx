import type { ComponentPropsWithoutRef } from "react";

type CodeComponentProps = ComponentPropsWithoutRef<"pre">;

/**
 * `<pre>` override. Forwards every attribute (notably rehype-prism's
 * `className="language-*"`, which the Prism theme keys on). The
 * wrapper lets globals.css square off the top corners when a
 * `.rehype-code-title` precedes the block; it is a class, not an id,
 * because a post contains many code blocks.
 */
const CodeComponent = ({
  children,
  ...props
}: CodeComponentProps) => {
  return (
    <div className="pre-container">
      <pre {...props}>{children}</pre>
    </div>
  );
};

export default CodeComponent;
