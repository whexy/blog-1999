import Avatar from "@/public/img/notion-avatar.svg";

export const Dialog = ({ children }) => {
  return (
    <div className="ml-4 not-prose flex justify-end items-center break-inside-avoid-page">
      <div className="p-3 rounded bg-red-200/20 border border-red-200/80 font-article text-sm">
        {children}
      </div>
      <div className="flex-shrink-0">
        <div>
          <Avatar className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};

export const DialogBack = ({ children }) => {
  return (
    <div className="mr-4 not-prose flex justify-start items-center">
      <div
        style={{ transform: `scale(-1, 1)` }}
        className="flex-shrink-0"
      >
        <Avatar className="w-16 h-16" />
      </div>
      <div className="p-3 rounded bg-blue-200/20 border border-blue-200/80 font-article text-sm">
        {children}
      </div>
    </div>
  );
};
