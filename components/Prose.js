const Prose = ({ children }) => {
  return (
    <div className="prose md:prose-lg dark:prose-invert prose-slate mx-2 sm:mx-auto overscroll-contain prose-headings:font-sans">
      {children}
    </div>
  );
};

export default Prose;
