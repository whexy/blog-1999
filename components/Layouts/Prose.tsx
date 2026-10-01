interface ProseProps {
  children?: React.ReactNode;
}

const Prose = ({ children }: ProseProps) => {
  return (
    <div className="paper mx-auto w-full max-w-full py-10 sm:px-8">
      <div className="prose prose-neutral md:prose-lg prose-headings:font-title prose-a:break-words prose-a:no-underline prose-a:shadow-[inset_0_-0.4rem_0_var(--color-highlight)] prose-a:transition-all prose-a:duration-[0.25s] prose-a:hover:bg-highlight mx-auto !max-w-none px-4 break-words">
        {children}
      </div>
    </div>
  );
};

export default Prose;
