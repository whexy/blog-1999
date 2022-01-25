/* eslint-disable @typescript-eslint/no-explicit-any */
export const pageview = url => {
  (window as any).gtag(
    "config",
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    {
      page_path: url,
    },
  );
};

export const event = ({ action, params }) => {
  (window as any).gtag("event", action, params);
};
