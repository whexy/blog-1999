const Prose = ({ children }) => {
  return (
    <div className="bg-white py-10 sm:mx-auto sm:rounded-lg sm:shadow-lg md:max-w-4xl">
      <div className="prose prose-neutral mx-auto overscroll-contain px-3 md:prose-lg prose-headings:font-title prose-a:no-underline prose-a:shadow-[inset_0_-0.4rem_0_#eecfcf] prose-a:transition-all prose-a:duration-[0.25s] hover:prose-a:bg-[#eecfcf] md:max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default Prose;
