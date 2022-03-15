import Twemoji from "@/components/Twemoji";

const Callout = ({ icon, title, children }) => {
  return (
    <div className="callout secondbg relative z-20 mx-auto break-inside-avoid-page rounded-lg px-4 py-1 md:w-11/12">
      {icon && (
        <span className="absolute top-4 right-4 h-24 w-24 opacity-20">
          <Twemoji emoji={icon} />
        </span>
      )}
      <div className="px-4 py-1">
        <div className="not-prose">
          <p className="my-1 font-sans text-base font-semibold md:-mb-2 md:mt-4 md:text-lg">
            {title}
          </p>
        </div>
        <div className="prose-sm dark:prose-invert md:prose">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
