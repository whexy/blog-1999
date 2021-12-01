import { mdrender } from "../../lib/markdown";

export default function Warn({ content }) {
  return (
    <>
      <div className="warn">
        <inner dangerouslySetInnerHTML={{ __html: mdrender(content) }} />
      </div>
    </>
  );
}
