/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function GithubLangBar({ repo }) {
  const [language, setLanguage] = useState("");
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 20;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = `https://opengraph.githubassets.com/1/${repo}`;
    image.onload = () => {
      context.drawImage(image, 0, 580, 1200, 20, 0, 0, 1200, 20);
      const keyPixel = context.getImageData(0, 0, 1, 1).data;
      if (
        keyPixel[0] == 255 &&
        keyPixel[1] == 255 &&
        keyPixel[2] == 255
      ) {
        //do nothing
        // if pixel is white, don't draw
      } else {
        const base64 = canvas.toDataURL();
        setLanguage(base64);
      }
      canvas.remove();
    };
  }, [repo]);

  return <>{language && <img src={language} alt="languages" />}</>;
}
