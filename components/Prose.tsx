const Prose = ({ children }) => {
  return (
    <div className="prose md:prose-lg dark:prose-invert prose-slate mx-2 sm:mx-auto overscroll-contain prose-headings:font-sans prose-a:text-red-700 dark:prose-a:text-red-300">
      {children}
    </div>
  );
};

export default Prose;
