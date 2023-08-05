// a tiny library to access freshrss (google reader compatible API)

interface Article {
  title: string;
  url: string;
  originTitle?: string;
  author?: string;
  published?: Date;
}

async function getAuthToken(): Promise<string> {
  const email = process.env.FRESHRSS_USERNAME;
  const password = process.env.FRESHRSS_PASSWORD;

  if (!email || !password) {
    throw new Error("Freshrss configuration not found");
  }

  const loginUrl = `${
    process.env.FRESHRSS_URL
  }/api/greader.php/accounts/ClientLogin?Email=${encodeURIComponent(
    email,
  )}&Passwd=${encodeURIComponent(password)}`;

  try {
    const response = await fetch(loginUrl);

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${response.statusText}`,
      );
    }

    const data: string = await response.text();
    const match = data.match(/Auth=(.+)/);

    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error(
        "Authentication failed. Check your email and password.",
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export async function getSavedArticles(): Promise<Article[]> {
  const authToken = await getAuthToken();

  const url = `${process.env.FRESHRSS_URL}/api/greader.php/reader/api/0/stream/contents/user/-/state/com.google/starred?output=json`;
  const headers = { Authorization: `GoogleLogin auth=${authToken}` };

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const articles: Article[] = [];
      data.items.forEach(item => {
        articles.push({
          title: item.title,
          url: item.alternate[0].href,
          originTitle: item.origin ? item.origin.title : undefined,
          author: item.author,
          published: item.published
            ? new Date(item.published * 1000)
            : undefined,
        });
      });

      // sort by published date
      articles.sort((a, b) => {
        if (a.published && b.published) {
          return b.published.getTime() - a.published.getTime();
        } else {
          return 0;
        }
      });

      // return only the 10 most recent articles
      return articles.slice(0, 10);
    } else {
      console.log("No saved articles found.");
      return [];
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
