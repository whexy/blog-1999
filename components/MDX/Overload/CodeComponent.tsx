"use client";

import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

const CodeComponent = ({ props, children }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const animationProps = useSpring({
    "--opacity-value": hover ? 1 : 0,
    "--background-color": isCopied ? "#10B981" : "#ffffff",
    "--scale": focus ? "2.5rem" : "1.5rem",
  });

  const copyToClipboard = () => {
    const preElement = ref.current;
    navigator.clipboard.writeText(
      preElement.innerText.split("\n\n").join("\n"),
    );
    setIsCopied(true);
    setFocus(false);
    // Reset the state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div
      id="pre-container"
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <animated.div
        className="not-prose absolute right-4 top-4 grid h-[--scale] w-[--scale] place-items-center overflow-hidden rounded-lg bg-[--background-color] p-1 opacity-[--opacity-value] shadow hover:cursor-pointer"
        style={animationProps as React.CSSProperties}
        onClick={() => copyToClipboard()}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}>
        {!isCopied ? (
          <ClipboardDocumentListIcon className="text-gray-500" />
        ) : (
          <ClipboardDocumentCheckIcon className="text-white" />
        )}
      </animated.div>
      <pre {...props} ref={ref}>
        {children}
      </pre>
    </div>
  );
};
export default CodeComponent;
