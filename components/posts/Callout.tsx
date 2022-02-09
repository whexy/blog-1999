const Callout = ({ icon, title, children }) => {
  return (
    <div className="callout secondbg relative mx-auto break-inside-avoid-page rounded-lg px-4 py-1 md:w-11/12">
      {icon && (
        <span className="absolute top-0 right-2 text-[80px] opacity-20">
          {icon}
        </span>
      )}
      <div className="relative z-20 px-4 py-1">
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
