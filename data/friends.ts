export interface Friend {
  name: string;
  /** URL for avatar on Github */
  icon: string;
  /** URL of blog website */
  url: string;
  description: string;
}

export const friends: Friend[] = [
  {
    name: "NekoDaemon",
    icon: "https://avatars.githubusercontent.com/u/29330054?v=4",
    url: "https://nekodaemon.com",
    description: "",
  },
  {
    name: "mstmoonshine",
    icon: "https://avatars.githubusercontent.com/u/13410629?v=4",
    url: "https://mstmoonshine.github.io",
    description: "",
  },
  {
    name: "Gogo",
    icon: "https://avatars.githubusercontent.com/u/12986936?v=4",
    url: "https://blog.gogo.moe",
    description: "",
  },
  {
    name: "Dataisland",
    icon: "https://avatars.githubusercontent.com/u/17133261?v=4",
    url: "https://dataisland.org",
    description: "",
  },
];

export default friends;
