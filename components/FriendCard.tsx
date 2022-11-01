import Image from "@/components/Image99";
const FriendCard = ({ friend }) => {
  return (
    <a href={friend.url} target="_blank" rel="noreferrer">
      <div className="group py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={friend.icon}
                alt={friend.name}
                width={64}
                height={64}
              />
            </div>
            <p>{friend.name}</p>
          </div>
          <div>
            <p className="truncate text-jbgray-light transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300">
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6Z"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default FriendCard;
