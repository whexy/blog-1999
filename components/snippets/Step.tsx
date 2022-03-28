import { PropsWithChildren } from "react";

const Step = ({
  step,
  children,
}: PropsWithChildren<{ step: number }>) => {
  return (
    <h3 className="not-prose flex items-baseline space-x-2 font-title">
      <div className="h-8 w-8 rounded-lg border border-red-200/80 bg-red-200/20 text-center font-mono text-base [line-height:2rem]">
        {step}
      </div>
      <p className="text-lg font-semibold text-black dark:text-white md:text-xl">
        {children}
      </p>
    </h3>
  );
};

export default Step;
