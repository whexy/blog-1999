const Callout = ({ title, children }) => {
  return (
    <div className="callout rounded-lg secondbg px-4 py-1 sm:w-11/12 mx-auto break-inside-avoid-page">
      <div className="px-4 py-1 prose-sm md:prose dark:prose-invert">
        <p className="font-sans text-[1.1em] font-semibold">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Callout;
