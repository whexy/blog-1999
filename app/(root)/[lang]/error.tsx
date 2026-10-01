"use client";

import { useEffect } from "react";
import Link from "next/link";
import Avatar from "@/components/UI/Graphic/icons/Avatar";
import Depth3D from "@/components/UI/Animation/Depth3D";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-[25vh] select-none">
      <Depth3D hardness={20}>
        <div className="glass-card mb-2.5 w-full p-4 max-sm:rounded-none">
          <div className="glass-tint from-blue-100/40 via-purple-50/30 to-pink-100/40" />
          <div className="glow-blob top-4 left-4 h-24 w-24 from-blue-200/30 to-cyan-200/30 blur-xl" />
          <div className="glow-blob right-6 bottom-4 h-20 w-20 from-purple-200/25 to-pink-200/25 blur-lg" />
          <div className="glow-blob top-8 right-4 h-16 w-16 from-yellow-200/25 to-orange-200/25 blur-lg" />
          <div className="flex items-center justify-center font-mono text-9xl">
            <p>5</p>
            <Avatar className="h-32 w-32" />
            <p>0</p>
          </div>
          <div className="relative flex justify-center gap-3">
            <button
              type="button"
              className="btn-glass"
              onClick={() => reset()}>
              Try again
            </button>
            <Link className="btn-solid" href="/">
              Return to Homepage
            </Link>
          </div>
        </div>
      </Depth3D>
    </div>
  );
}
