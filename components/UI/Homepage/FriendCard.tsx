import Image from "next/image";
import BlurBg from "@/components/UI/Animation/BlurBg";
import Depth3D from "@/components/UI/Animation/Depth3D";
export const FriendCard = ({ friend }) => {
  return (
    <Depth3D>
      <BlurBg
        url={friend.icon}
        className="primary group relative flex h-full w-full flex-row items-center gap-5 overflow-hidden rounded-lg py-8">
        <div className="z-10 ml-8 h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-black/50 transition-transform duration-300 group-hover:scale-[120%]">
          <Image
            src={friend.icon}
            alt={friend.name}
            width={64}
            height={64}
            placeholder="blur"
            blurDataURL="/img/smile.svg"
          />
        </div>
        <div className="z-10">
          <p className="text-xl">{friend.name}</p>
          <p className="w-full truncate text-sm opacity-80 transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300">
            <a
              href={"https://" + friend.url}
              target="_blank"
              rel="noreferrer">
              {friend.url.replace(/^www\./, "")}
            </a>
          </p>
          <p className="pr-6 pt-2 text-sm opacity-70">
            {friend.description}
          </p>
        </div>
      </BlurBg>
    </Depth3D>
  );
};
export default FriendCard;
