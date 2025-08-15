import Twemoji from "@/components/UI/Graphic/Twemoji";
import Image from "next/image";

interface CalloutProps {
  pic?: string;
  icon?: string;
  title?: string;
  children?: React.ReactNode;
}

const Callout = ({ pic, icon, title, children }: CalloutProps) => {
  // const Callout = ({ pic, icon, title, children }) => {
  return (
    <div className="callout relative mx-auto my-2 break-inside-avoid-page">
      {/* Icon/pic background - outside the blurred container */}
      {icon && (
        <span className="absolute right-4 top-4 z-0 h-24 w-24 opacity-30">
          <Twemoji emoji={icon} />
        </span>
      )}
      {pic && (
        <span className="not-prose absolute right-4 top-4 z-0 opacity-20">
          <Image src={pic} alt="" height={96} width={96} />
        </span>
      )}

      {/* Glassy container */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-black/5 bg-white/10 px-4 py-1 shadow-sm shadow-black/5 backdrop-blur-sm">
        <div className="py-1 sm:px-4">
          {title && (
            <div className="not-prose">
              <p className="my-1 font-sans text-base font-semibold md:-mb-2 md:mt-4 md:text-lg">
                {title}
              </p>
            </div>
          )}
          <div className="prose-sm relative z-10 max-w-none md:prose">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
