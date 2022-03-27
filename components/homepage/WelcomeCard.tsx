import Image from "next/image";
import helloPic from "@/public/img/face.png";

const WelcomeCard = () => {
  return (
    <div className="flex flex-col-reverse justify-between py-5 sm:flex-row sm:py-10">
      <div>
        <h1 className="pb-2 font-title text-4xl font-bold tracking-tight">
          Wenxuan Shi
        </h1>
        <p className="text-lg">
          <span className="opacity-80">Senior student at </span>
          SUSTech
        </p>
        <p className="text-lg opacity-80">
          Working on topics related to system security.
        </p>
      </div>
      <div className="mb-6 h-[80px] w-[80px] sm:mb-0 sm:h-[120px] sm:w-[120px]">
        <Image
          src={helloPic}
          alt="Wenxuan Shi"
          objectFit="cover"
          className="secondbg overflow-hidden rounded-full"
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
