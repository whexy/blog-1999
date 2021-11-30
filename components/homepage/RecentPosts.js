import PostCard from "../PostCard";

export default function RecentPosts() {
  return (
    <>
      <div className="my-5 pb-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-red-600 sm:dark:divide-red-500">
          <div className="sm:flex-shrink-0 w-full sm:w-2/12 whitespace-nowrap sm:pr-2 dark:bg-black-readable">
            <div className="uppercase font-semibold text-sm text-red-600 dark:text-red-500">
              Recent Posts
            </div>
            <a href="/posts">
              <div className="font-black text-lg text-black-readable dark:text-white-readable">
                近期博客
              </div>
            </a>
          </div>
          <div className="pt-2 sm:pl-3 flex-1 flex-col space-y-5">
            {[...Array(5)].map((x, i) => (
              <PostCard
                title={`test-${i}`}
                date="2022-01-01"
                excerpt="lorem"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
