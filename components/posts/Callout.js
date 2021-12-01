import { mdrender } from "../../lib/markdown";

export default function Callout({ title, content }) {
  return (
    <>
      <div className="callout">
        <div className="text-[1.1em] pt-4 -mb-4 font-semibold">{title}</div>
        <inner dangerouslySetInnerHTML={{ __html: mdrender(content) }} />
      </div>
    </>
  );
}
