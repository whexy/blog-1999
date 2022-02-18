export default function NoticeCard() {
  return (
    <div>
      <div className="my-3">
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
              Purple Pride 💜
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
