import metadata from "@/data/metadata";

const BigHi = () => {
  return (
    <h1 className="py-10 text-center text-4xl font-bold text-red-500 sm:text-5xl">
      Hi, my name is{" "}
      <span className="text-black-readable dark:text-white-readable">
        {metadata.author.name}
      </span>
      .
    </h1>
  );
};

export default BigHi;
