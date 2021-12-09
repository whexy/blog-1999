import Image from "next/image";
import hello from "../../public/img/hello.webp";

export default function WelcomeCard() {
  return (
    <>
      <div className="max-w-3xl mx-auto bg-cover bg-mojave dark:bg-mojave_dark sm:h-[272px] rounded-xl w-full mt-10 overflow-hidden">
        <div className="grid sm:grid-cols-3 mx-auto">
          <div className="sm:col-span-1 grid place-items-center overflow-hidden">
            <div className="relative sm:mt-[32px] overflow-hidden">
              <Image className="rounded-b-full sm:rounded-none" width={194} height={240} alt="me waving" src={hello} />
            </div>
          </div>
          <div className="sm:col-span-2 place-self-center px-2 sm:px-5 rounded-xl relative flex items-center leading-5 mx-1 my-3 sm:ml-0 sm:mr-3 sm:pb-0 backdrop-blur-lg backdrop-brightness-50 select-none">
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
              className="absolute right-4 bottom-4 w-12 h-12 rounded-full grid place-content-center text-gray-400 hover:text-white"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
