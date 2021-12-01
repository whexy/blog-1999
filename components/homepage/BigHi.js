import metadata from "../../metadata";

const BigHi = () => {
  return (
    <h1 class="font-bold text-red-500 text-4xl sm:text-5xl pt-10 text-center">
      Hi, my name is{" "}
      <span class="text-black-readable dark:text-white-readable">
        {metadata.author.name}
      </span>
      .
    </h1>
  );
};

export default BigHi;
