export interface Friend {
  /** URL for avatar on Github */
  github: string;
  /** URL of blog website */
  url: string;
  feed?: string;
}

export const friends: Friend[] = [
  {
    github: "cla7aye15I4nd",
    url: "dataisland.org",
  },
  {
    github: "Eveneko",
    url: "eveneko.com",
    feed: "https://eveneko.com/atom.xml",
  },
  {
    github: "Gogomoe",
    url: "blog.gogo.moe",
  },
  {
    github: "MstMoonshine",
    url: "mstmoonshine.github.io",
    feed: "https://mstmoonshine.github.io/index.xml",
  },
  {
    github: "macromogic",
    url: "macromogic.xyz",
    feed: "https://macromogic.xyz/atom.xml",
  },
  {
    github: "Tert-Butyllithium",
    url: "haonan.me",
  },
  {
    github: "Tonny-Gu",
    url: "nekodaemon.com",
    feed: "https://nekodaemon.com/atom.xml",
  },
  {
    github: "WHALEEYE",
    url: "www.whale3ye.com",
  },
  {
    github: "whexy",
    url: "whexy.com",
    feed: "https://www.whexy.com/feed.xml",
  },
];

export default friends;
