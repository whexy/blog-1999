interface Friend {
  name: string;
  /** URL for avatar on Github */
  icon: string;
  /** URL of blog website */
  url: string;
  display_url: string;
  description: string;
}

const friends: Friend[] = [
  {
    name: "macromogic",
    icon: "https://avatars.githubusercontent.com/u/20332455?v=4",
    url: "https://blog.macromogic.xyz/",
    display_url: "blog.macromogic.xyz",
    description: "",
  },
  {
    name: "NekoDaemon",
    icon: "https://avatars.githubusercontent.com/u/29330054?v=4",
    url: "https://nekodaemon.com/",
    display_url: "nekodaemon.com",
    description: "",
  },
  {
    name: "mstmoonshine",
    icon: "https://avatars.githubusercontent.com/u/13410629?v=4",
    url: "https://mstmoonshine.github.io/",
    display_url: "mstmoonshine.github.io",
    description: "",
  },
  {
    name: "Tert-butyllithium",
    icon: "https://avatars.githubusercontent.com/u/40877238?v=4",
    url: "https://blog.lanran.work/",
    display_url: "blog.lanran.work",
    description: "",
  },
  {
    name: "Gogo",
    icon: "https://avatars.githubusercontent.com/u/12986936?v=4",
    url: "https://blog.gogo.moe/",
    display_url: "blog.gogo.moe",
    description: "",
  },
  {
    name: "gdjs2",
    icon: "https://avatars.githubusercontent.com/u/17545585?v=4",
    url: "https://gdjs2.cn/",
    display_url: "gdjs2.cn",
    description: "",
  },
  {
    name: "Arpels",
    icon: "https://avatars.githubusercontent.com/u/35730935?v=4",
    url: "http://blog.arpe1s.xyz/",
    display_url: "blog.arpe1s.xyz",
    description: "",
  },
];

export default friends;
