const Diagram = ({ src, alt }) => {
  return (
    <div>
      <div className="dark:hue-rotate-180 dark:invert">
        <object
          width="100%"
          data={`/${src}`}
          type="image/svg+xml"
          title={alt}
        ></object>
      </div>
      {alt && (
        <div className="text-center font-sans text-sm font-light opacity-80">
          {alt}
        </div>
      )}
    </div>
  );
};

export default Diagram;
