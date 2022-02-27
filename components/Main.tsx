const Main = ({ children }) => {
  return (
    <div>
      <div className="min-h-[70vh] bg-white text-black-readable dark:bg-black-readable dark:text-white-readable">
        <div className="mx-auto max-w-6xl">
          <div className="mx-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
