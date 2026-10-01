/** The subset of the bilibili `web-interface/view` payload we use. */
export interface BilibiliVideo {
  title: string;
  pic: string;
  desc: string;
  owner: {
    name: string;
  };
}

interface BilibiliViewResponse {
  /** 0 on success; e.g. -404 (no such video), -412 (blocked). */
  code: number;
  message?: string;
  data: BilibiliVideo | null;
}

const viewEndpoint =
  "https://api.bilibili.com/x/web-interface/view?bvid=";

/**
 * Fetch video metadata for a BV id. Returns `null` on any failure
 * (network error, HTTP error, or the API's in-band `code != 0`,
 * which it reports with HTTP 200 and `data: null`), so the embed can
 * render a plain-link fallback instead of breaking the build.
 */
export const getBilibiliData = async (
  bvid: string,
): Promise<BilibiliVideo | null> => {
  try {
    const response = await fetch(
      `${viewEndpoint}${encodeURIComponent(bvid)}`,
      {
        // The API rejects obviously non-browser clients (-412).
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/126.0 Safari/537.36",
          Referer: "https://www.bilibili.com/",
        },
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) {
      console.warn(
        `Bilibili API error for ${bvid}: ` +
          `${response.status} ${response.statusText}`,
      );
      return null;
    }
    const json = (await response.json()) as BilibiliViewResponse;
    if (json.code !== 0 || !json.data) {
      console.warn(
        `Bilibili API returned code ${json.code} for ${bvid}: ` +
          `${json.message ?? "no data"}`,
      );
      return null;
    }
    return json.data;
  } catch (error) {
    console.warn(`Network error fetching Bilibili ${bvid}:`, error);
    return null;
  }
};
