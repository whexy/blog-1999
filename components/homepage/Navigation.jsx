import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKey,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const NavigationItem = ({ link, icon, enName, zhName }) => {
  return (
    <Link href={link}>
      <a className="text-center mb-2 sm:mb-0 whitespace-nowrap py-2 px-4 autobg transition-all rounded-lg">
        <FontAwesomeIcon icon={icon} className="h-6 py-1 mx-auto" />
        <div className="text-sm opacity-80">
          {enName}
          <span>/</span>
          {zhName}
        </div>
      </a>
    </Link>
  );
};

const NavigationView = () => {
  library.add(faKey, faUser, faUsers);
  return (
    <div className="my-5">
      <div className="py-2 grid grid-cols-3 sm:grid-cols-3 gap-2 text-black-readable dark:text-white-readable">
        <NavigationItem link="/keys" icon="key" enName="Keys" zhName="公钥" />
        <NavigationItem
          link="/about"
          icon="user"
          enName="About"
          zhName="关于"
        />
        <NavigationItem
          link="/friends"
          icon="users"
          enName="Friends"
          zhName="友链"
        />
      </div>
    </div>
  );
};

export default NavigationView;
