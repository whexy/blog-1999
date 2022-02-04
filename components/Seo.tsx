import { VFC } from "react";
import Head from "next/head";
import Script from "next/script";

export interface SeoProps {
  title: string;
  path: string;
  description: string;
  image: string;
}

const Seo: VFC<SeoProps> = props => {
  const { title, path, description, image } = props;
  const rootPath = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  const url = rootPath + path;
  const imgUrl = rootPath + image;

  return (
    <>
      <Head>
        {/* Facebook Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:description" content={description} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@whexyshi" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={imgUrl} />
        <meta name="twitter:description" content={description} />

        {/* QQ Sharing */}

        <meta itemProp="name" content={title} />
        <meta itemProp="image" content={imgUrl} />
        <meta
          name="description"
          itemProp="description"
          content={description}
        />
      </Head>

      {/* WeChat Sharing */}
      <Script id="wechat-sharing">
        {`var WECHAT_TITLE = '${title}';
          var WECHAT_DESC = '${description}';
          var WECHAT_IMAGE = '${imgUrl}'; 
          var WCHAT_NO_GA = '';
        `}
      </Script>
    </>
  );
};

export default Seo;
