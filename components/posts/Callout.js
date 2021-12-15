import { mdrender } from "../../lib/markdown";
import AnimatedFancyCard from "../AnimatedFancyCard";

export default function Callout({ title, content, children }) {
  return (
    <AnimatedFancyCard>
      <div className="rounded-lg bg-gray-100/50 dark:bg-gray-700 border border-black/10 dark:border-white/10 px-4 py-1 sm:w-11/12 mx-auto">
        <div className="text-[1.1em] pt-4 font-semibold">{title}</div>
        <div
          className="p-4 prose-sm dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
        />
      </div>
    </AnimatedFancyCard>
  );
}
