import Avatar from "@/components/UI/Graphic/icons/Avatar";

interface DialogProps {
  children?: React.ReactNode;
}

export const Dialog = ({ children }: DialogProps) => {
  return (
    <div className="not-prose my-3 ml-4 flex break-inside-avoid-page items-end justify-end gap-2">
      <div className="bubble bubble-me">
        {/* iMessage-style glassy overlay */}
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative">{children}</div>
      </div>
      <div className="flex-shrink-0">
        <Avatar className="h-12 w-12" />
      </div>
    </div>
  );
};

export const DialogBack = ({ children }: DialogProps) => {
  return (
    <div className="not-prose my-3 mr-4 flex items-end justify-start gap-2">
      <div className="flex-shrink-0">
        <Avatar
          className="h-12 w-12"
          style={{ transform: `scale(-1, 1)` }}
        />
      </div>
      <div className="bubble bubble-peer">
        {/* iMessage-style glassy overlay */}
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
