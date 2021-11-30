export default function WelcomeCard() {
  return (
    <>
      <div class="max-w-3xl mx-auto bg-cover bg-mojave dark:bg-mojave_dark md:h-[272px] rounded-xl w-full mt-10 overflow-hidden">
        <div class="grid md:grid-cols-3 mx-auto">
          <div class="md:col-span-1 grid place-items-center overflow-hidden">
            <img
              class="relative w-1/2 md:w-auto h-auto md:h-[240px] rounded-b-full md:rounded-none md:mt-[32px] overflow-hidden object-cover"
              alt="me waving"
              src="/img/hello.webp"
            />
          </div>
          <div class="md:col-span-2 place-self-center px-2 md:px-5 rounded-xl relative flex items-center leading-5 mx-1 my-3 md:ml-0 md:mr-3 md:pb-0 backdrop-blur-lg backdrop-brightness-50 select-none">
            <div>
              <div class="py-4 text-white-readable flex flex-col space-y-2 overflow-ellipsis">
                <p>
                  I work on topics related to{" "}
                  <b class="text-yellow-300">system</b>.
                  <br />
                  <span class="text-md text-white-readable/50 font-serif">
                    I fight with the compiler, linker, OS, firmware, bootloader,
                    etc.
                  </span>
                </p>
                <p>
                  I work on topics related to{" "}
                  <b class="text-yellow-300">security</b>.
                  <br />
                  <span class="text-md text-white-readable/50 font-serif">
                    I keep eyes on the CVEs, vulnerabilities, malicious codes,
                    etc.
                  </span>
                </p>
                <p>
                  I know nothing about artificial intelligence.
                  <br />
                  <span class="text-md text-white-readable/50 font-serif">
                    I do know something about embedded devices.
                  </span>
                </p>
                <p>
                  I use Vim. I love Rust.
                  <br />
                  <span class="text-md text-white-readable/50 font-serif">
                    I design this website myself.
                  </span>
                </p>

                <div class="flex space-x-2 flex-wrap text-yellow-300 text-sm tracking-tighter font-mono">
                  <span>#Rustacean</span>
                  <span>#AppleFan</span>
                  <span>#Blogger</span>
                </div>
              </div>
            </div>
            <a
              href="https://github.com/whexy"
              target="_blank"
              rel="noopener"
              class="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-black-readable/20 hover:bg-black-readable/30 grid place-content-center"
            >
              <i class="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
