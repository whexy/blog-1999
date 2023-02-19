import Twemoji from "@/components/Twemoji";

const UITitle = ({ title, emoji, subtitle, children }) => {
  return (
    <div>
      <div className="not-prose sticky top-16 z-30 mt-5 bg-white">
        <div className="h-4"></div>
        <div className="secondbg flex w-full items-center justify-between rounded-lg px-4 py-3 font-title shadow-lg">
          <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span className="h-4 w-4">
              <Twemoji emoji={emoji} />
            </span>
            <span>{subtitle}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UITitle;
