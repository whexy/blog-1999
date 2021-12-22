const Main = ({ children }) => {
  return (
    <div>
      <div className="text-black-readable bg-white-readable dark:text-white-readable dark:bg-black-readable">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Main;
