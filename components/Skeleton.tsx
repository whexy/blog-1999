// import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { AppState } from "@/store/store";

const MySkeleton = (props: SkeletonProps) => {
  // const darkMode = useSelector(
  //   (state: AppState) => state.theme.darkMode,
  // );

  // if (!darkMode) return <Skeleton {...props} />;
  // else
  //   return (
  //     <Skeleton
  //       baseColor="#3f3f46"
  //       highlightColor="#52525b"
  //       {...props}
  //     />
  //   );
  return <Skeleton {...props} />;
};

export default MySkeleton;
