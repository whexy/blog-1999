import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/posts/")[1];

  if (slug) {
    redirect(`/en/posts/${slug}`);
  } else {
    redirect("/en");
  }
}
