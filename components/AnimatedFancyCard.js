import { useSpring, animated, config } from "react-spring";
import { useRef } from "react";

const calc = (x, y, rect) => [
  (y - rect.top - rect.height / 2) / 20,
  -(x - rect.left - rect.width / 2) / 40,
  0.95,
];

const trans = (x, y, s) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const AnimatedFancyCard = ({ children }) => {
  const ref = useRef(null);
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
  }));

  return (
    <animated.div
      ref={ref}
      style={{ transform: props.xys.to(trans) }}
      onMouseMove={({ clientX: x, clientY: y }) =>
        api.start({ xys: calc(x, y, ref.current.getBoundingClientRect()) })
      }
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedFancyCard;
