import Callout from "./Callout";
import { Dialog, DialogBack } from "./Dialog";
import ImgComponent from "./ImgComponent";
import QuoteComponent from "./QuoteComponent";
import PreComponent from "./PreComponent";
import AnimatedFancyCard from "../AnimatedFancyCard";

const MDXComponents = {
  img: ImgComponent,
  pre: PreComponent,
  Quote: QuoteComponent,
  Callout,
  Dialog,
  DialogBack,
  AnimatedFancyCard, // 《个人博客搭建指北》中使用
};

export default MDXComponents;