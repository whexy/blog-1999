import Link from "next/link";
export default function NoticeCard() {
  return (
    <div>
      <div className="my-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-yellow-600 sm:dark:divide-yellow-300">
          <div className="w-full whitespace-nowrap dark:bg-black-readable sm:w-2/12 sm:shrink-0 sm:pr-2">
            <div className="text-sm font-semibold uppercase text-yellow-600 dark:text-yellow-300">
              Notice
            </div>
            <div className="text-lg font-black text-black-readable dark:text-white-readable">
              公告
            </div>
          </div>
          <div className="flex-1 font-light sm:pl-3">
            <div className="secondbg rounded-xl p-4">
              I am currently seeking a PhD position outside of
              mainland China. For more information about my academic
              background, please check{" "}
              <Link href="/about">
                <a className="text-yellow-600 underline dark:text-yellow-300">
                  https://shiwx.org
                </a>
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
