import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import Skeleton from "react-loading-skeleton";
import { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MySkeleton = (props: SkeletonProps) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  if (!isDark)
    return (
      <div>
        <Skeleton {...props} />
      </div>
    );
  else
    return (
      <div>
        <Skeleton baseColor="#3f3f46" highlightColor="#52525b" {...props} />
      </div>
    );
};

export default MySkeleton;
