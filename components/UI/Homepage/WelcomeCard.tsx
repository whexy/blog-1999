import Depth3D from "@/components/UI/Animation/Depth3D";
import Image from "next/image";
import helloPic from "@/public/img/face.png";
import Link from "next/link";

interface WelcomeCardProps {
  showButtons?: boolean;
}

const WelcomeCard = ({ showButtons = true }: WelcomeCardProps) => {
  return (
    <Depth3D hardness={60}>
      <div
        className={`relative mb-2.5 w-full overflow-hidden rounded-3xl border border-black/5 bg-white/10 shadow-sm shadow-black/5 backdrop-blur-md ${showButtons ? "p-6 lg:p-8" : "p-4"}`}>
        {/* Background decoration - contained within card */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-100/30 via-purple-50/20 to-pink-100/30" />
        <div className="absolute left-4 top-4 -z-10 h-24 w-24 rounded-full bg-gradient-to-r from-blue-200/20 to-cyan-200/20 blur-xl" />
        <div className="absolute bottom-4 right-6 -z-10 h-20 w-20 rounded-full bg-gradient-to-r from-purple-200/15 to-pink-200/15 blur-lg" />
        <div className="absolute right-4 top-8 -z-10 h-16 w-16 rounded-full bg-gradient-to-r from-yellow-200/15 to-orange-200/15 blur-lg" />
        {/* Glass shine effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        <div
          className={`relative z-10 ${showButtons ? "flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8" : "flex flex-row items-center gap-4"}`}>
          <div
            className={`shrink-0 ${showButtons ? "md:order-2" : "order-1"}`}>
            <div
              className={
                showButtons
                  ? "h-32 w-32 sm:h-36 sm:w-36"
                  : "h-16 w-16"
              }>
              <Image
                src={helloPic}
                alt="a photo of Whexy"
                className="h-full w-full rounded-full object-cover shadow-sm"
                priority
                width={showButtons ? 144 : 64}
                height={showButtons ? 144 : 64}
              />
            </div>
          </div>
          <div
            className={`flex flex-col ${showButtons ? "gap-4 md:order-1 md:gap-5" : "order-2 gap-1"}`}>
            <div
              className={`flex flex-col text-black-readable ${showButtons ? "gap-2" : "gap-1"}`}>
              <h1
                className={`font-title font-bold leading-tight tracking-tight ${showButtons ? "text-3xl sm:text-4xl" : "text-lg"}`}>
                Wenxuan
              </h1>
              <p
                className={`font-article leading-relaxed text-black-readable/80 ${showButtons ? "text-base sm:text-lg" : "text-sm"}`}>
                CyberSecurity Researcher at{" "}
                <span className="whitespace-nowrap text-black-readable">
                  Northwestern University
                </span>
              </p>
            </div>
            {showButtons && (
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="https://github.com/whexy"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2 font-title text-sm font-medium tracking-wide text-gray-800 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/40 hover:shadow-lg hover:shadow-white/20 hover:backdrop-blur-md">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Github
                </Link>
                <Link
                  href="https://twitter.com/whexyshi"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2 font-title text-sm font-medium tracking-wide text-gray-800 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/40 hover:shadow-lg hover:shadow-white/20 hover:backdrop-blur-md">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 300 300"
                    fill="currentColor">
                    <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
                  </svg>
                  Twitter
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Depth3D>
  );
};

export default WelcomeCard;
