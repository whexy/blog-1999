/* eslint-disable @next/next/no-img-element */
"use client";

import { FastAverageColor } from "fast-average-color";
import { useState, useEffect } from "react";
import { colord } from "colord";

import { useSpring, animated, config } from "@react-spring/web";

function makeColorLighterUntilReadable(hex: string) {
  const color = colord(hex);
  const hsl0 = color.toHsl();
  hsl0.l = 80 - 20;
  const hsl1 = color.toHsl();
  hsl1.l = 88 - 20;
  const hsl2 = color.toHsl();
  hsl2.l = 95 - 20;
  return [
    colord(hsl0).toHex(),
    colord(hsl1).toHex(),
    colord(hsl2).toHex(),
  ];
}

const BlurBg = ({
  url,
  children,
  className = "",
}: {
  url: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const [color, setColor] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    async function getColorAsync() {
      if (url.startsWith("#")) {
        setColor(makeColorLighterUntilReadable(url));
        return;
      }
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const color = await fac.getColorAsync(canvas);
        setColor(makeColorLighterUntilReadable(color.hex));
        canvas.remove();
      };
    }
    getColorAsync();
  }, [url]);

  const animationProps = useSpring({
    "--gradient-from": "white",
    "--gradient-via": color ? (hover ? color[1] : color[2]) : "white",
    "--gradient-to": color ? (hover ? color[0] : color[1]) : "white",

    config: config.gentle,
  });

  // return a div, which has a gradient background from color to white
  return (
    <div
      className={`relative ${className}`}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <div className="absolute inset-0 z-[5] opacity-40 bg-blend-exclusion backdrop-blur-lg"></div>
      <animated.div
        className="bg-noise-r absolute inset-0 z-0 from-[--gradient-from] via-[--gradient-via] to-[--gradient-to] opacity-40 bg-blend-exclusion shadow backdrop-blur-lg"
        style={animationProps as React.CSSProperties}
      />
      {children}
    </div>
  );
};

export default BlurBg;
