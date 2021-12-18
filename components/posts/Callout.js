import { mdrender } from "../../lib/markdown";
// import AnimatedFancyCard from "../AnimatedFancyCard";
import { useState } from "react";

const Callout = ({ title, content, canFold, children }) => {
  const [fold, setfold] = useState(true);
  return (
    // <AnimatedFancyCard>
    <div
      className="rounded-lg bg-gray-100/50 dark:bg-gray-700 border border-black/10 dark:border-white/10 px-4 py-1 sm:w-11/12 mx-auto"
      onClick={() => {
        setfold(!fold);
      }}
    >
      <div className="py-4 flex justify-between items-center">
        <div className="text-[1.1em] font-semibold">{title}</div>
        {canFold && (
          <button>
            {fold ? (
              <i className="fas fa-angle-down"></i>
            ) : (
              <i className="fas fa-angle-up"></i>
            )}
          </button>
        )}
      </div>
      {(canFold && fold) || (
        <div
          className="px-4 pb-4 prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
        />
      )}
    </div>
    // </AnimatedFancyCard>
  );
};

export default Callout;
