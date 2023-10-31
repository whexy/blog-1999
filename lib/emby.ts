const EMBY_SERVER = "https://emby.shiwx.org/emby";

async function getEmbyAPI(url: string) {
  const header = {
    "X-Emby-Token": process.env.EMBY_TOKEN,
  };

  const response = await fetch(url, {
    headers: header,
    next: { revalidate: 600 },
  });
  return response;
}

export async function getRecentPlayed() {
  const userId = process.env.EMBY_USER;

  const url = `${EMBY_SERVER}/Users/${userId}/Items?Limit=5&Recursive=true&SortBy=DatePlayed&SortOrder=Descending`;

  const resp = await getEmbyAPI(url);

  if (!resp.ok) {
    console.log("Emby API Error: " + resp.status);
    return [];
  }

  const data = await resp.json();
  const recentPlayed = [];

  if ("Items" in data) {
    for (const item of data.Items) {
      if (item["Type"] == "Movie") {
        recentPlayed.push({
          Name: item["Name"],
          Id: item["Id"],
          Type: item["Type"],
        });
      } else if (item["Type"] == "Episode") {
        recentPlayed.push({
          Name:
            item["SeriesName"] +
            "(" +
            item["SeasonName"] +
            ") " +
            item["Name"],
          Id: item["Id"],
          Type: item["Type"],
        });
      }
    }
  } else {
    console.log("Emby API Error: " + data);
  }

  return recentPlayed;
}

export async function getImage(Id: string) {
  const url = `${EMBY_SERVER}/Items/${Id}/Images/Primary`;
  const resp = await getEmbyAPI(url);
  return resp;
}
