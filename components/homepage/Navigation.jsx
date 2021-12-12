import Link from "next/link";

const NavigationItem = ({ link, icon, enName, zhName }) => {
  return (
    <Link href={link}>
      <a className="text-center mb-2 sm:mb-0 whitespace-nowrap py-2 px-4 autobg transition-all rounded-lg">
        <div aria-label={enName}>
          <i className={icon}></i>
        </div>
        <div className="text-sm opacity-80">
          {enName}
          <span>/</span>
          {zhName}
        </div>
      </a>
    </Link>
  );
};

const NavigationNotAvailable = ({ link, icon, enName, zhName }) => {
  return (
    <a className="opacity-10 text-center mb-2 sm:mb-0 whitespace-nowrap py-2 px-4 autobg transition-all rounded-lg">
      <div aria-label={enName}>
        <i className={icon}></i>
      </div>
      <div className="text-sm opacity-80">
        {enName}
        <span>/</span>
        {zhName}
      </div>
    </a>
  );
};

const NavigationView = () => {
  return (
    <div className="my-5">
      <div className="py-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-black-readable dark:text-white-readable">
        <NavigationItem
          link="/keys"
          icon="fas fa-key"
          enName="Keys"
          zhName="公钥"
        />
        <NavigationItem
          link="/about"
          icon="fas fa-user"
          enName="About"
          zhName="关于"
        />
        <NavigationItem
          link="/music"
          icon="fas fa-headphones"
          enName="Playlist"
          zhName="歌单"
        />
        <NavigationItem
          link="/friends"
          icon="fas fa-users"
          enName="Friends"
          zhName="友链"
        />
      </div>
    </div>
  );
};

export default NavigationView;
