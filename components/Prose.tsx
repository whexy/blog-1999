const Prose = ({ children }) => {
  return (
    <div className="bg-white py-10 dark:bg-neutral-900 sm:mx-auto sm:rounded-lg sm:shadow-lg sm:dark:shadow-none md:max-w-4xl">
      <div className="prose prose-neutral mx-auto overscroll-contain px-3 prose-headings:font-title prose-a:no-underline prose-a:shadow-[inset_0_-0.4rem_0_#eecfcf] prose-a:transition-all prose-a:duration-[0.25s] hover:prose-a:bg-[#eecfcf] dark:prose-invert dark:prose-a:shadow-[inset_0_-0.4rem_0_#7a2e2e] dark:hover:prose-a:bg-[#7a2e2e] md:max-w-3xl md:prose-lg">
        {children}
      </div>
    </div>
  );
};

export default Prose;
