import Avatar from "@/components/UI/Graphic/icons/Avatar";
import Depth3D from "@/components/UI/Animation/Depth3D";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-[25vh] select-none">
      <Depth3D hardness={20}>
        <div className="relative mb-2.5 w-full overflow-hidden rounded-3xl border border-black/5 bg-white/10 p-4 shadow-sm shadow-black/5 backdrop-blur-md">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-100/40 via-purple-50/30 to-pink-100/40" />
          <div className="absolute left-4 top-4 -z-10 h-24 w-24 rounded-full bg-gradient-to-r from-blue-200/30 to-cyan-200/30 blur-xl" />
          <div className="absolute bottom-4 right-6 -z-10 h-20 w-20 rounded-full bg-gradient-to-r from-purple-200/25 to-pink-200/25 blur-lg" />
          <div className="absolute right-4 top-8 -z-10 h-16 w-16 rounded-full bg-gradient-to-r from-yellow-200/25 to-orange-200/25 blur-lg" />
          <div className="flex items-center justify-center font-mono text-[8rem]">
            <p>4</p>
            <Avatar className="h-32 w-32" />
            <p>4</p>
          </div>
          <div className="flex justify-center">
            <Link
              className="rounded-xl border border-white/30 bg-black-readable px-4 py-2 font-title text-sm font-medium tracking-wide text-white-readable"
              href="/">
              Return to Homepage
            </Link>
          </div>
        </div>
      </Depth3D>
    </div>
  );
}
