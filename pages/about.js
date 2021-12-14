import fs from "fs";
import Head from "next/head";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import portrait from "../public/img/portrait-transparent.webp";
import AnimatedFancyCard from "../components/AnimatedFancyCard";

const InfoSection = () => {
  return (
    <div className="flex-shrink-0">
      <div className="sm:sticky sm:top-0 flex flex-col sm:pt-5 pr-2 items-center">
        <Image
          src={portrait}
          alt="SHI Wenxuan"
          width={208}
          height={208}
          className=" rounded-full bg-gradient-to-b from-white-readable via-white-readable to-gray-200/80"
        />
        <div className="text-center mt-4">
          <h1 className="text-3xl">SHI Wenxuan</h1>
          <p className="font-light text-jbgray-light">
            Senior Undergraduate Student
          </p>
        </div>
        <div className="pt-5 flex flex-row items-center justify-center justify-items-center space-x-5 text-2xl">
          <a href="mailto://gwhexy@gmail.com" target="_blank" rel="noreferrer">
            <i className="fas fa-envelope text-[#0c74d4]"></i>
          </a>
          <a href="https://github.com/whexy" target="_blank" rel="noreferrer">
            <i className="fab fa-github text-[#24292e] dark:text-white-readable"></i>
          </a>
          <a
            href="https://twitter.com/whexyshi"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-twitter text-[#4d9feb]"></i>
          </a>
        </div>
        <div className="pt-4 mx-4 sm:mx-0">
          <a
            href="/files/WenxuanSHI_CV.pdf"
            target="_blank"
            className="font-light underline"
          >
            <i className="far fa-file"></i> Full CV download
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutPage = ({ mdx }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-white-readable text-black-readable dark:bg-black-readable dark:text-white-readable font-display">
        <div className="py-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row space-y-5 sm:divide-x sm:divide-opacity-20 sm:divide-jbgray-light">
            <InfoSection />
            {/* 内容栏 */}
            <div className="mx-2 sm:mx-0 sm:pl-4 prose-lg">
              <MDXRemote {...mdx} components={{ Callout }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Callout = ({ title, icon, items, fancy }) => {
  const callout = (
    <div className="not-prose">
      <div className="rounded-xl bg-gray-200/80 dark:bg-slate-700/50 p-4 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold pb-1">{title}</h3>
        {items.map((item) => (
          <div
            key={item.title}
            className="pl-2 py-1 flex flex-row items-center gap-2"
          >
            <i className={icon}></i>
            <div>
              <p className="text-sm -mb-2">{item.title}</p>
              <p className="text-xs -mb-2 font-medium text-jbgray-light dark:text-gray-300">
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
  return (
    <AnimatedFancyCard>
      {callout}
    </AnimatedFancyCard>
  )
};

export async function getStaticProps() {
  const rawData = fs.readFileSync("./data/about.mdx", "utf8");
  const mdxSource = await serialize(rawData);
  return {
    props: {
      mdx: mdxSource,
    },
  };
}

export default AboutPage;
