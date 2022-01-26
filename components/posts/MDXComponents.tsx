import Callout from "@/components/posts/Callout";
import { Dialog, DialogBack } from "@/components/posts/Dialog";
import ImgComponent from "@/components/posts/ImgComponent";
import QuoteComponent from "@/components/posts/QuoteComponent";
import GithubRepo from "@/components/GithubRepo";

// Special Components
import AnimatedFancyCard from "@/components/AnimatedFancyCard";
import WasmRiscvEmu from "@/components/posts/projects/wasm-riscv-emu";

const MDXComponents = {
  img: ImgComponent,
  Quote: QuoteComponent,
  Callout,
  Dialog,
  DialogBack,
  GithubRepo,
  AnimatedFancyCard, // 《个人博客搭建指北》中使用
  WasmRiscvEmu, // 《WASM RISC-V 模拟器》中使用
};

export default MDXComponents;
