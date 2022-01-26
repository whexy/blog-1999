import Callout from "@/components/posts/Callout";
import { Dialog, DialogBack } from "@/components/posts/Dialog";
import ImgComponent from "@/components/posts/ImgComponent";
import QuoteComponent from "@/components/posts/QuoteComponent";
import AnimatedFancyCard from "@/components/AnimatedFancyCard";
import GithubRepo from "@/components/GithubRepo";

const MDXComponents = {
  img: ImgComponent,
  Quote: QuoteComponent,
  Callout,
  Dialog,
  DialogBack,
  AnimatedFancyCard, // 《个人博客搭建指北》中使用
  GithubRepo,
};

export default MDXComponents;
