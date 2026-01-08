"use client";

import Link from "next/link";
import AAV1Player from "@/components/UI/Website/404/AAV1Player";
import "../styles/globals.css";

export default function NotFound() {
  return (
    <div className="bg-white-readable flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-4xl">
        {/* Terminal window */}
        <div className="mb-10 overflow-hidden rounded-lg border border-[#333] bg-[#1a1a1a] shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
          {/* Terminal header with window controls */}
          <div className="flex items-center gap-3 border-b border-[#1a1a1a] bg-gradient-to-b from-[#3c3c3c] to-[#2b2b2b] px-3 py-2.5">
            <div className="flex gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-[#ff5f57]"></span>
              <span className="inline-block h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="inline-block h-3 w-3 rounded-full bg-[#28ca42]"></span>
            </div>
            <div className="mr-[60px] flex-1 text-center font-mono text-xs text-[#999]">
              Terminal
            </div>
          </div>

          {/* Terminal content with AAV1Player */}
          <div className="flex items-center justify-center bg-black p-3 sm:p-5">
            <div className="aspect-square w-full max-w-[40vh]">
              <AAV1Player url="/animation.aav1" fps={24} />
            </div>
          </div>
        </div>

        {/* 404 Message */}
        <div className="text-center">
          <h1 className="text-black-readable mb-4 text-5xl font-bold sm:text-7xl">
            404
          </h1>
          <p className="text-black-readable mb-2 text-xl sm:text-2xl">
            Page Not Found
          </p>
          <p className="mb-8 text-sm text-[#666] sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="bg-black-readable text-white-readable inline-block rounded-xl px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-base">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
