const Prose = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-full bg-white py-10 sm:rounded-lg sm:px-8 sm:shadow-lg">
      <div className="prose prose-neutral mx-auto !max-w-none break-words px-3 md:prose-lg prose-headings:font-title prose-a:break-words prose-a:no-underline prose-a:shadow-[inset_0_-0.4rem_0_#eecfcf] prose-a:transition-all prose-a:duration-[0.25s] hover:prose-a:bg-[#eecfcf]">
        {children}
      </div>
    </div>
  );
};

export default Prose;
