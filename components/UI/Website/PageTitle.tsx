import Twemoji from "@/components/UI/Graphic/Twemoji";

const PageTitle = ({
  title,
  emoji,
}: {
  title: string;
  emoji: string | null;
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        {emoji && (
          <div className="h-9 w-9">
            <Twemoji emoji={emoji} />
          </div>
        )}
        <h1 className="py-10 font-title text-3xl font-bold tracking-tight text-black-readable md:text-5xl">
          {title}
        </h1>
      </div>
    </>
  );
};

export default PageTitle;
