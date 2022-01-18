import { mdrender } from "../../lib/markdown";
// import AnimatedFancyCard from "../AnimatedFancyCard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Callout = ({ title, content, canFold, children }) => {
  const [fold, setfold] = useState(true);
  return (
    // <AnimatedFancyCard>
    <div
      className="rounded-lg secondbg border px-4 py-1 sm:w-11/12 mx-auto"
      onClick={() => {
        setfold(!fold);
      }}
    >
      <div
        className={`pt-4 ${
          canFold & fold && "py-4"
        } flex justify-center items-center relative`}
      >
        <h5 className="text-[1.1em] font-semibold text-center text-red-700 dark:text-red-300">
          {title}
        </h5>
        {canFold && (
          <button className="absolute top-4 right-0">
            {fold ? (
              <FontAwesomeIcon icon={faAngleUp} className="w-5 h-5"/>
            ) : (
              <FontAwesomeIcon icon={faAngleDown} className="w-5 h-5"/>
            )}
          </button>
        )}
      </div>
      {(canFold && fold) || (
        <div
          className="prose-p:mt-0 px-4 pb-4 prose-sm md:prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
        />
      )}
    </div>
    // </AnimatedFancyCard>
  );
};

export default Callout;
