import Skeleton from "react-loading-skeleton";
import { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MySkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} />;
};

export default MySkeleton;
