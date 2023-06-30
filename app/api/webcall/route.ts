import { sendMessage } from "@/lib/telegram";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const msg = searchParams.get("msg");

  const response = await sendMessage(msg);
  if (response.status === 200) {
    return NextResponse.json({ status: "ok" });
  } else {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
