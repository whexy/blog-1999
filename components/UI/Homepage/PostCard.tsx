import Link from "next/link";
const PostCard = ({
  title,
  url,
  date,
  summary,
  showSummary = false,
}) => {
  return (
    <div
      className={`bg-white px-3 py-3 transition-all hover:bg-gray-50 ${
        showSummary && "rounded-lg"
      }`}>
      <Link href={url ? url : "/"}>
        <div className="flex items-baseline justify-between rounded-xl font-title transition-all">
          <p className={`${showSummary && `text-lg font-bold`}`}>
            {title}
          </p>
          <div
            className={`flex-shrink-0 pl-2 font-mono tracking-wide ${
              showSummary ? "opacity-80" : "opacity-60"
            }`}>
            {date}
          </div>
        </div>
        {showSummary && <p className="opacity-60">{summary}</p>}
      </Link>
    </div>
  );
};

export default PostCard;
