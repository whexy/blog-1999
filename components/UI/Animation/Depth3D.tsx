"use client";

import { useSpring, animated } from "@react-spring/web";

const trans = (x, y, s) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

import React from "react";

/**
 * A component that applies a 3D depth effect to its children based on mouse movement.
 * @param {React.ReactNode} children - The children to apply the effect to.
 * @param {number} [hardness=20] - The hardness of the effect. Higher values make the effect less pronounced.
 * @returns {JSX.Element} - The component.
 */
const Depth3D = ({
  children,
  hardness = 20,
}: {
  children: React.ReactNode;
  hardness?: number;
}) => {
  const calc = (x: number, y: number, rect: DOMRect) => [
    (y - rect.top - rect.height / 2) / hardness,
    -(x - rect.left - rect.width / 2) / (hardness * 2),
    0.95,
  ];

  const ref = React.useRef(null);
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
  }));

  return (
    <animated.div
      ref={ref}
      style={{ transform: props.xys.to(trans) }}
      onMouseMove={({ clientX: x, clientY: y }) =>
        api.start({
          xys: calc(x, y, ref.current.getBoundingClientRect()),
        })
      }
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}>
      {children}
    </animated.div>
  );
};

export default Depth3D;
