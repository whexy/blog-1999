const Callout = ({ title, children }) => {
  return (
    <div className="callout secondbg mx-auto break-inside-avoid-page rounded-lg px-4 py-1 sm:w-11/12">
      <div className="prose-sm px-4 py-1 dark:prose-invert md:prose">
        <p className="font-sans text-[1.1em] font-semibold">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Callout;
