import metadata from "@/data/metadata";
import Twemoji from "@/components/Twemoji";

const BigHi = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <h1 className="py-10 text-center font-title text-2xl font-bold text-red-500 sm:text-5xl">
        Hi, my name is{" "}
        <span className="text-black-readable dark:text-white-readable">
          {metadata.author.name}
        </span>
        .
      </h1>
      <div className="h-9 w-9">
        <Twemoji emoji="👋" />
      </div>
    </div>
  );
};

export default BigHi;
