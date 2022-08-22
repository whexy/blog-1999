import Avatar from "@/components/icons/Avatar";

export const Dialog = ({ children }) => {
  return (
    <div className="not-prose ml-4 flex break-inside-avoid-page items-center justify-end">
      <div className="rounded border border-red-400/80 bg-red-200/10 p-3 font-sans text-sm">
        {children}
      </div>
      <div className="flex-shrink-0">
        <div>
          <Avatar className="h-16 w-16" />
        </div>
      </div>
    </div>
  );
};

export const DialogBack = ({ children }) => {
  return (
    <div className="not-prose mt-2 mr-4 flex items-center justify-start">
      <div
        style={{ transform: `scale(-1, 1)` }}
        className="flex-shrink-0"
      >
        <Avatar className="h-16 w-16" />
      </div>
      <div className="rounded border border-blue-400/80 bg-blue-200/10 p-3 font-sans text-sm">
        {children}
      </div>
    </div>
  );
};
