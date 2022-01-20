import Callout from "@/components/posts/Callout";
import { Dialog, DialogBack } from "@/components/posts/Dialog";
import ImgComponent from "@/components/posts/ImgComponent";
import QuoteComponent from "@/components/posts/QuoteComponent";
import PreComponent from "@/components/posts/PreComponent";
import AnimatedFancyCard from "@/components/AnimatedFancyCard";

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