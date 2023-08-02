const Diagram = ({ src, alt, width = "100%" }) => {
  return (
    <div>
      <div className="dark:hue-rotate-180">
        <object
          width={width}
          data={`/${src}`}
          type="image/svg+xml"
          title={alt}
          className="mx-auto"
          style={{ maxWidth: "100%" }}></object>
      </div>
      {alt && (
        <div className="text-center font-sans text-sm opacity-80">
          {alt}
        </div>
      )}
    </div>
  );
};

export default Diagram;
