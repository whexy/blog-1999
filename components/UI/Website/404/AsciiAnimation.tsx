"use client";

import { useEffect, useRef, useState } from "react";
import { frames } from "./frames";

interface AsciiAnimationProps {
  className?: string;
}

export default function AsciiAnimation({
  className = "",
}: AsciiAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // FPS = 24, so frame time = 1000ms / 24 = ~41.67ms
    const frameTime = 1000 / 24;

    // Start animation on mount
    intervalRef.current = setInterval(() => {
      setCurrentFrame(prev => {
        // Loop back to 0 when reaching the end
        return prev + 1 >= frames.length ? 0 : prev + 1;
      });
    }, frameTime);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={`terminal-window ${className}`}>
      {/* Terminal header with window controls */}
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button terminal-button-close"></span>
          <span className="terminal-button terminal-button-minimize"></span>
          <span className="terminal-button terminal-button-maximize"></span>
        </div>
        <div className="terminal-title">Terminal</div>
      </div>

      {/* Terminal content */}
      <div
        className="ascii-frame"
        dangerouslySetInnerHTML={{ __html: frames[currentFrame] }}
      />
    </div>
  );
}
