const CodeComponent = ({ props, children }) => {
  return (
    <div id="pre-container" className="w-full overflow-x-auto">
      <pre {...props}>{children}</pre>
    </div>
  );
};
export default CodeComponent;
