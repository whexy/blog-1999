import Callout from "@/components/MDX/Layouts/Callout";
import { Dialog, DialogBack } from "@/components/MDX/Layouts/Dialog";
import ImgComponent from "@/components/MDX/Overload/ImgComponent";
import Diagram from "@/components/MDX/Layouts/Diagram";
import QuoteComponent from "@/components/MDX/Layouts/QuoteComponent";
import Small from "@/components/MDX/Layouts/Small";
import GithubRepo from "@/components/MDX/Extern/GithubRepo";
import Bilibili from "@/components/MDX/Extern/Bilibili";
import Tweet from "@/components/MDX/Extern/Tweet";

// Special Components
import Depth3D from "@/components/UI/Animation/Depth3D";
import Twemoji from "@/components/UI/Graphic/Twemoji";

const MDXComponents = {
  img: ImgComponent,
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
};

export default MDXComponents;
