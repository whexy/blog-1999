import Twemoji from "@/components/Twemoji";
import Image from "@/components/Image99";

interface CalloutProps {
  pic?: string;
  icon?: string;
  title?: string;
  children?: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({
  pic,
  icon,
  title,
  children,
}) => {
  // const Callout = ({ pic, icon, title, children }) => {
  return (
    <div className="callout secondbg relative z-20 mx-auto my-2 break-inside-avoid-page rounded-lg px-4 py-1">
      {icon && (
        <span className="absolute top-4 right-4 h-24 w-24 opacity-20">
          <Twemoji emoji={icon} />
        </span>
      )}
      {pic && (
        <span className="not-prose absolute top-4 right-4 opacity-20">
          <Image src={pic} alt="" height={96} width={96} />
        </span>
      )}
      <div className="py-1 sm:px-4">
        {title && (
          <div className="not-prose">
            <p className="my-1 font-sans text-base font-semibold md:-mb-2 md:mt-4 md:text-lg">
              {title}
            </p>
          </div>
        )}
        <div className="prose-sm relative z-10 max-w-none md:prose md:max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
