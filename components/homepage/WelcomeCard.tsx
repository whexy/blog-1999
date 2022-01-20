import Image from "next/image";
import hello from "../../public/img/hello.webp";
import { useSpring, animated } from "react-spring";
import { useRef } from "react";

const calc = (x, y, rect) => [
  (y - rect.top - rect.height / 2) / 20,
  -(x - rect.left - rect.width / 2) / 40,
  1.05,
];

const trans = (x, y, s) => `scale(${s})`;

const shadowTrans = (x, y, s) => {
  return `drop-shadow(${y}px ${-x}px ${120 * (s - 1)}px rgba(0, 0, 0, 0.65))`;
};

const WelcomeCard = () => {
  const ref = useRef(null);
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
  }));
  return (
    <div
      ref={ref}
      onMouseMove={({ clientX: x, clientY: y }) =>
        api.start({ xys: calc(x, y, ref.current.getBoundingClientRect()) })
      }
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
    >
      <div className="max-w-sm md:max-w-3xl mx-auto bg-gradient-to-b md:bg-gradient-to-r from-red-500 to-yellow-500 md:h-[272px] rounded-xl w-full overflow-hidden">
        <div className="grid md:grid-cols-3 mx-auto">
          <div className="md:col-span-1 grid place-items-center overflow-hidden">
            <animated.div
              style={{
                transform: props.xys.to(trans),
                filter: props.xys.to(shadowTrans),
              }}
              className="relative md:mt-[32px] overflow-hidden"
            >
              <Image
                className="rounded-b-full md:rounded-none"
                width={194}
                height={240}
                alt="me waving"
                src={hello}
                priority
              />
            </animated.div>
          </div>
          <div className="md:col-span-2 place-self-center px-2 md:px-5 rounded-xl relative flex items-center leading-5 mx-1 my-3 md:ml-0 md:mr-3 md:pb-0 backdrop-blur-lg backdrop-brightness-50">
            <div>
              <div className="py-4 text-white-readable flex flex-col space-y-2 overflow-ellipsis">
                <p>
                  I work on topics related to{" "}
                  <b className="text-yellow-300">system</b>.
                  <br />
                  <span className="text-md text-white-readable/50 font-serif">
                    I fight with the compiler, linker, OS, firmware, bootloader,
                    etc.
                  </span>
                </p>
                <p>
                  I work on topics related to{" "}
                  <b className="text-yellow-300">security</b>.
                  <br />
                  <span className="text-md text-white-readable/50 font-serif">
                    I keep eyes on the CVEs, vulnerabilities, malicious codes,
                    etc.
                  </span>
                </p>
                <p>
                  I know nothing about artificial intelligence.
                  <br />
                  <span className="text-md text-white-readable/50 font-serif">
                    I do know something about embedded devices.
                  </span>
                </p>
                <p>
                  I use Vim. I love Rust.
                  <br />
                  <span className="text-md text-white-readable/50 font-serif">
                    I design this website myself.
                  </span>
                </p>

                <div className="flex space-x-2 flex-wrap text-yellow-300 text-sm tracking-tighter font-mono">
                  <span>#Rustacean</span>
                  <span>#AppleFan</span>
                  <span>#Blogger</span>
                </div>
              </div>
            </div>
            <a
              href="https://github.com/whexy"
              target="_blank"
              rel="noreferrer"
              className="absolute right-4 bottom-4 rounded-full grid place-items-center"
            >
              <div className="w-10 h-10 p-2 bg-white/10 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
