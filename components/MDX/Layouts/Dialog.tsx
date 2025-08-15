import Avatar from "@/components/UI/Graphic/icons/Avatar";

export const Dialog = ({ children }) => {
  return (
    <div className="not-prose my-3 ml-4 flex break-inside-avoid-page items-end justify-end gap-2">
      <div className="relative max-w-xs overflow-hidden rounded-3xl rounded-br-md bg-gradient-to-br from-blue-500/90 to-blue-600/90 px-4 py-3 shadow-md backdrop-blur-xl">
        {/* iMessage-style glassy overlay */}
        <div className="absolute inset-0 rounded-3xl rounded-br-md bg-white/10" />

        {/* Speech bubble tail */}
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-br-md bg-gradient-to-br from-blue-500/90 to-blue-600/90"></div>

        <div className="relative text-base leading-snug text-white [&_a]:text-blue-100 [&_a]:underline [&_a]:transition-colors [&_a]:after:ml-1 [&_a]:after:text-xs [&_a]:after:content-['↗'] [&_a]:hover:text-white">
          {children}
        </div>
      </div>
      <div className="flex-shrink-0">
        <Avatar className="h-12 w-12" />
      </div>
    </div>
  );
};

export const DialogBack = ({ children }) => {
  return (
    <div className="not-prose my-3 mr-4 flex items-end justify-start gap-2">
      <div className="flex-shrink-0">
        <Avatar
          className="h-12 w-12"
          style={{ transform: `scale(-1, 1)` }}
        />
      </div>
      <div className="relative max-w-xs overflow-hidden rounded-3xl rounded-bl-md bg-gradient-to-br from-gray-200/90 to-gray-300/80 px-4 py-3 shadow-md backdrop-blur-xl">
        {/* iMessage-style glassy overlay */}
        <div className="absolute inset-0 rounded-3xl rounded-bl-md bg-white/20" />

        {/* Speech bubble tail */}
        <div className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-bl-md bg-gradient-to-br from-gray-200/90 to-gray-300/80"></div>

        <div className="relative text-base leading-snug text-gray-800 [&_a]:text-gray-600 [&_a]:underline [&_a]:transition-colors [&_a]:after:ml-1 [&_a]:after:text-xs [&_a]:after:content-['↗'] [&_a]:hover:text-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};
