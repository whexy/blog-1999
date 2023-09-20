import Image from "next/image";
import Link from "next/link";
import helloPic from "@/public/img/face.jpeg";

const WelcomeCard = () => {
  return (
    <div className="pt-4 font-title">
      <div className="primary relative flex flex-col-reverse justify-between p-4 font-title sm:flex-row sm:p-8">
        <div className="z-20">
          <h1 className="pb-2 text-4xl font-bold tracking-tight">
            Whexy
          </h1>
          <p className="text-lg">
            <span className="opacity-80">CS student at </span>
            Northwestern
          </p>
          <div className="mt-5 flex">
            <a
              className="secondbg group mr-1 inline-flex space-x-1 rounded-lg px-3 py-2 font-title ring-red-500 transition-all hover:ring-2"
              href="https://github.com/whexy">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="h-6 w-6"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path>
              </svg>
              <p>Github</p>
            </a>
            <Link
              className="secondbg group mx-1 grid place-items-center space-x-1 rounded-lg px-3 py-2 font-title ring-red-500 transition-all hover:ring-2"
              href="https://twitter.com/whexyshi">
              <svg
                className="h-4 w-4"
                viewBox="0 0 300 300"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
              </svg>
            </Link>
          </div>
        </div>
        <Link
          href="https://shiwx.org"
          className="mb-6 h-[80px] w-[80px] transition-all duration-500 hover:rotate-2 hover:scale-105 sm:mb-0 sm:h-[120px] sm:w-[120px]">
          <Image
            src={helloPic}
            alt="a photo of Whexy"
            className="secondbg overflow-hidden rounded-full object-cover"
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default WelcomeCard;
