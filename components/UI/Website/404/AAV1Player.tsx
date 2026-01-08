"use client";

import { AAV1Player as AAV1PlayerCore } from "./aav1-player.es.js";

interface AAV1PlayerProps {
  url: string;
  fps?: number;
  width?: number;
  height?: number;
  className?: string;
}

export default function AAV1Player({
  url,
  fps = 24,
  width,
  height,
  className = "",
}: AAV1PlayerProps) {
  // Create props object, only including width/height if provided
  const coreProps: Record<string, unknown> = { url, fps };

  if (width !== undefined) {
    coreProps.width = width;
  }
  if (height !== undefined) {
    coreProps.height = height;
  }

  return (
    <div className={className}>
      <AAV1PlayerCore {...(coreProps as any)} />
    </div>
  );
}
