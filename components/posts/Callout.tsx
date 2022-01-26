import { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

const Callout = ({ title, canFold, children }) => {
  const [fold, setfold] = useState(true);
  return (
    <div
      className="callout rounded-lg secondbg border px-4 py-1 sm:w-11/12 mx-auto break-inside-avoid-page"
      onClick={() => {
        setfold(!fold);
      }}
    >
      <div
        className={`pt-4 ${
          canFold && fold && "py-4"
        } flex justify-center items-center relative`}
      >
        <h5 className="text-[1.1em] font-semibold text-center text-red-700 dark:text-red-300">
          {title}
        </h5>
        {canFold && (
          <button className="absolute top-4 right-0">
            {fold ? (
              <ChevronDownIcon className="w-6 h-6" />
            ) : (
              <ChevronUpIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      {(canFold && fold) || (
        <div className="prose-p:mt-0 px-4 pb-4 prose-sm md:prose dark:prose-invert">
          {children}
        </div>
      )}
    </div>
  );
};

export default Callout;
