const Prose = ({ children }) => {
  return (
    <div className="prose prose-slate mx-2 overscroll-contain prose-headings:font-title prose-a:text-red-700 prose-a:no-underline hover:prose-a:underline dark:prose-invert dark:prose-a:text-red-300 sm:mx-auto md:prose-lg">
      {children}
    </div>
  );
};

export default Prose;
