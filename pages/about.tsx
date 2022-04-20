import Image from "next/image";
import portrait from "@/public/img/portrait-transparent.webp";
import AnimatedFancyCard from "@/components/AnimatedFancyCard";
import { MailIcon } from "@heroicons/react/solid";
import { allAbouts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

// tiny
import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";
import Twemoji from "@/components/Twemoji";

const AboutMDX = allAbouts[0];

const InfoSection = () => {
  return (
    <div className="flex-shrink-0">
      <div className="flex flex-col items-center pr-2 sm:pt-5">
        <Image
          src={portrait}
          alt="Shi Wenxuan"
          width={208}
          height={208}
          className=" rounded-full bg-gradient-to-b from-white-readable via-white-readable to-gray-200/80"
        />
        <div className="mt-4 text-center">
          <h1 className="text-3xl">Shi Wenxuan</h1>
          <p className="font-light text-jbgray-light">
            Senior Undergraduate Student
          </p>
        </div>
        <div className="flex flex-row items-center justify-center justify-items-center space-x-5 pt-5 text-2xl">
          <a
            href="mailto://gwhexy@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MailIcon className="h-6 w-6 text-[#0c74d4]" />
          </a>
          <a
            href="https://github.com/whexy"
            target="_blank"
            rel="noreferrer"
          >
            <div className="h-6 w-6 fill-[#24292e] dark:fill-white-readable">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
          </a>
          <a
            href="https://twitter.com/whexyshi"
            target="_blank"
            rel="noreferrer"
          >
            <div className="h-6 w-6 fill-[#4d9feb]">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
          </a>
        </div>
        <div className="mx-4 pt-4 sm:mx-0">
          <a
            href="/files/WenxuanSHI_CV.pdf"
            target="_blank"
            className="inline-flex items-center space-x-1 font-light underline"
          >
            <span>Full CV download</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const Content = useMDXComponent(AboutMDX.body.code);

  return (
    <Main>
      <PageTitle title="About" emoji="👨‍💻" />
      <div className="mx-auto flex max-w-4xl flex-col space-y-5 pb-10 sm:flex-row sm:space-x-4 sm:divide-x sm:divide-jbgray-light sm:divide-opacity-20">
        <InfoSection />
        {/* 内容栏 */}
        <div className="prose-lg mx-2 prose-headings:font-title prose-headings:font-bold sm:mx-0 sm:pl-8">
          <Content components={{ Callout, HeadWithIcon }} />
        </div>
      </div>
    </Main>
  );
};

const HeadWithIcon = ({ title, icon }) => {
  return (
    <div className="flex items-baseline space-x-2">
      <p className="h-8 w-8">
        <Twemoji emoji={icon} />
      </p>
      <h3>{title}</h3>
    </div>
  );
};

const Callout = ({ title, items, fancy }) => {
  const callout = (
    <div className="not-prose">
      <div className="secondbg mx-auto max-w-lg rounded-lg p-4 font-sans">
        <h3 className="pb-1 text-lg font-semibold">{title}</h3>
        {items.map(item => (
          <div
            key={item.title}
            className="flex flex-row items-center gap-2 py-1 pl-2"
          >
            <div>
              <p className="text-sm">{item.title}</p>
              <p className="text-xs font-medium text-jbgray-light dark:text-gray-300">
                {item.emphasis}
              </p>
              <p
                className="text-xs font-light text-jbgray-light dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  if (!fancy) {
    return callout;
  }
  return <AnimatedFancyCard>{callout}</AnimatedFancyCard>;
};

export default AboutPage;
