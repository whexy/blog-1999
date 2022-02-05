const Main = ({ children }) => {
  return (
    <div>
      <div className="bg-white text-black-readable dark:bg-black-readable dark:text-white-readable">
        <div className="mx-auto max-w-3xl">{children}</div>
      </div>
    </div>
  );
};

export default Main;
