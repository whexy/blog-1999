import Twemoji from "@/components/Twemoji";

const Callout = ({ icon, title, children }) => {
  return (
    <div className="callout secondbg relative z-20 mx-auto break-inside-avoid-page rounded-lg px-4 py-1">
      {icon && (
        <span className="absolute top-4 right-4 h-24 w-24 opacity-20">
          <Twemoji emoji={icon} />
        </span>
      )}
      <div className="px-4 py-1">
        {title && (
          <div className="not-prose">
            <p className="my-1 font-sans text-base font-semibold md:-mb-2 md:mt-4 md:text-lg">
              {title}
            </p>
          </div>
        )}
        <div className="prose-sm max-w-none dark:prose-invert md:prose md:max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
