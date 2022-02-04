import { useContext } from "react";
import { ThemeContext } from "../pages/_app";
import Skeleton from "react-loading-skeleton";
import { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MySkeleton = (props: SkeletonProps) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  if (!isDark) return <Skeleton {...props} />;
  else
    return (
      <Skeleton
        baseColor="#3f3f46"
        highlightColor="#52525b"
        {...props}
      />
    );
};

export default MySkeleton;
