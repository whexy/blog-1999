import { mdrender } from "../../lib/markdown";
import AnimatedFancyCard from "../AnimatedFancyCard";

export default function Callout({ title, content, children }) {
  return (
    <AnimatedFancyCard>
      <div className="callout">
        <div className="text-[1.1em] pt-4 font-semibold">{title}</div>
          <inner
            dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
          />
      </div>
    </AnimatedFancyCard>
  );
}
