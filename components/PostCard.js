import Link from "next/link";

export default function PostCard({ title, date, url, excerpt }) {
  return (
    <>
      <div className="flex flex-col -space-y-1 autobg transition-all rounded p-4">
        <div className="text-sm tracking-wide text-red-600 dark:text-red-500 font-light pb-1">
          <time dateTime={date}>{date}</time>
        </div>
        <Link href={url ? url : "/"}>
          <a className="text-lg hover:underline">{title}</a>
        </Link>
        <div className="pt-2 flex flex-col-reverse sm:space-x-2 sm:flex-row">
          <div className="text-sm text-gray-700 dark:text-jbgray-light font-light">
            {excerpt}
          </div>
          <div className="flex-shrink-0 w-full sm:w-1/3 grid place-content-center object-cover pb-2">
            {/* {% image post.data.image, post.data.title, "", "", "rounded-xl w-full h-auto" %} */}
          </div>
        </div>
      </div>
    </>
  );
}
