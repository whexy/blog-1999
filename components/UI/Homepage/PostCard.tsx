import Link from "next/link";
const PostCard = ({ title, url, summary, showSummary = false }) => {
  return (
    <div className="flex w-full flex-col gap-2.5 text-black">
      <Link href={url ? url : "/"} className="group">
        <div className="-m-4 rounded-2xl p-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-gray-100/60 group-hover:shadow-lg group-hover:shadow-black/5">
          <h3 className="font-article text-lg font-bold leading-relaxed transition-colors duration-200 group-hover:text-gray-800 sm:text-xl">
            {title}
          </h3>
          {showSummary && summary && (
            <p className="mt-2.5 font-article text-sm leading-relaxed opacity-60 transition-opacity duration-200 group-hover:opacity-80 sm:text-base">
              {summary}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
