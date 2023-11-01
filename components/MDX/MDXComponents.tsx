import Callout from "@/components/MDX/Layouts/Callout";
import { Dialog, DialogBack } from "@/components/MDX/Layouts/Dialog";
import ImgComponent from "@/components/MDX/Overload/ImgComponent";
import CodeComponent from "@/components/MDX/Overload/CodeComponent";
import Diagram from "@/components/MDX/Layouts/Diagram";
import QuoteComponent from "@/components/MDX/Layouts/QuoteComponent";
import Small from "@/components/MDX/Layouts/Small";
import GithubRepo from "@/components/MDX/Extern/GithubRepo";
import Bilibili from "@/components/MDX/Extern/Bilibili";
import Tweet from "@/components/MDX/Extern/Tweet";
import Spotify from "@/components/MDX/Extern/Spotify";
import AppleMusic from "@/components/MDX/Extern/AppleMusic";
import Food from "@/components/MDX/Extern/Food";
import Lyric from "@/components/Widgets/Lyric";

// Special Components
import Depth3D from "@/components/UI/Animation/Depth3D";
import Twemoji from "@/components/UI/Graphic/Twemoji";

const MDXComponents = {
  img: ImgComponent,
  pre: CodeComponent,
  Quote: QuoteComponent,
  Small,
  Callout,
  Diagram,
  Dialog,
  DialogBack,
  GithubRepo,
  Bilibili,
  AnimatedFancyCard: Depth3D,
  Twemoji,
  Tweet,
  Spotify,
  Lyric,
  AppleMusic,
  Food,
};

export default MDXComponents;
