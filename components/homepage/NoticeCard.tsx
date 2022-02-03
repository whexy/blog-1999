import Link from "next/link";
export default function NoticeCard() {
  return (
    <div>
      <div className="my-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-yellow-600 sm:dark:divide-yellow-300">
          <div className="sm:shrink-0 w-full sm:w-2/12 whitespace-nowrap sm:pr-2 dark:bg-black-readable">
            <div className="uppercase font-semibold text-sm text-yellow-600 dark:text-yellow-300">
              Notice
            </div>
            <div className="font-black text-lg text-black-readable dark:text-white-readable">
              公告
            </div>
          </div>
          <div className="sm:pl-3 flex-1 font-light">
            <div className="secondbg p-4 rounded-xl">
              I am currently seeking a PhD position outside of
              mainland China. For more information about my academic
              background, please check{" "}
              <Link href="/about">
                <a className="underline text-yellow-600 dark:text-yellow-300">
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
