/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { ImageProps } from "next/image";

const Image99 = (props: ImageProps) => {
  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
    />
  );
};

export default Image99;
