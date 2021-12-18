const Prose = ({ children }) => {
  return (
    <div className="prose dark:prose-invert prose-slate mx-2 sm:mx-auto overscroll-contain">
      {children}
    </div>
  );
};

export default Prose;
