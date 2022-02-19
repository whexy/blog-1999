import Image from "next/image";
import helloPic from "@/public/img/hello.webp";
import BigHi from "@/components/homepage/BigHi";

const WelcomeCard = () => {
  return (
    <div className="pt-5 sm:pt-0">
      <div className="secondbg mx-auto w-full overflow-hidden rounded-xl border sm:max-w-3xl">
        <div className="mx-auto grid sm:grid-cols-3 ">
          <div className="flex space-x-2 bg-[#ebebeb] px-4 dark:bg-[#1a1a1a] sm:justify-center sm:px-0">
            <ImageCircle />
            <div className="sm:hidden">
              <BigHi />
            </div>
          </div>
          <div className="relative border-t border-black/10 p-5 dark:border-white/10 sm:col-span-2 sm:border-l sm:border-t-0">
            <ContentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCircle = () => {
  return (
    <div className="grid place-items-center py-2 sm:col-span-1">
      <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-[#e4e4e4] transition-transform duration-500 hover:rotate-6 hover:scale-105 dark:border dark:border-white/10 dark:bg-[#1d1d20] sm:h-[200px] sm:w-[200px]">
        <Image
          alt="me waving"
          src={helloPic}
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

const ContentCard = () => {
  return (
    <>
      <div>
        <div className="flex flex-col space-y-2 overflow-ellipsis py-4 text-black dark:text-white">
          <div>
            <p className="text-lg sm:text-base">
              I work on topics related to{" "}
              <b className="text-yellow-600 dark:text-yellow-300">
                system
              </b>
              .
            </p>
            <p className="text-sm font-light opacity-70">
              I fight with the compiler, linker, OS, firmware,
              bootloader, etc.
            </p>
          </div>
          <div>
            <p className="text-lg sm:text-base">
              I work on topics related to{" "}
              <b className="text-yellow-600 dark:text-yellow-300">
                security
              </b>
              .
            </p>
            <p className="text-sm font-light opacity-70">
              I keep eyes on the CVEs, vulnerabilities, malicious
              codes, etc.
            </p>
          </div>
          <div>
            <p className="text-lg sm:text-base">
              I know nothing about artificial intelligence.
            </p>
            <p className="text-sm font-light opacity-70">
              I do know something about embedded devices.
            </p>
          </div>
          <div>
            <p className="text-lg sm:text-base">
              I use Vim. I love Rust.
            </p>
            <p className="text-sm font-light opacity-70">
              I design this website myself.
            </p>
          </div>

          <p className="font-mono text-sm tracking-tighter text-yellow-600 dark:text-yellow-300">
            <a
              href="https://matrix.to/#/@whexy:matrix.org"
              target="_blank"
              rel="noreferrer"
              title="Matrix is an open, lightweight protocol for decentralized, real-time communication."
            >
              @whexy:matrix.org
            </a>
          </p>
        </div>
      </div>
      <a
        href="https://github.com/whexy"
        target="_blank"
        rel="noreferrer"
        className="absolute right-4 bottom-4 grid place-items-center rounded-full"
      >
        <div className="h-10 w-10 rounded-full p-2">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-black dark:fill-white"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </div>
      </a>
    </>
  );
};

export default WelcomeCard;
