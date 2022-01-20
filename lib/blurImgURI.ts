import lqip from "lqip-modern";
import path from "path";

export async function getPlaceholder(src: string): Promise<string> {
  src = path.join("public", src);
  return (await lqip(src)).metadata.dataURIBase64;
}
