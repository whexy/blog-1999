const PreComponent = ({ className, children }) => (
  <div>
    {children.props.filename && (
      <div className="text-gray-800 px-5 py-3 border border-b-0 border-gray-200 dark:border-gray-200/10 rounded-t bg-gray-100 dark:bg-[#383a57] dark:text-white text-xs font-mono">
        {children.props.filename}
      </div>
    )}
    <pre className={className + " !mt-0 !rounded-t-none"}>{children}</pre>
  </div>
);
export default PreComponent;
