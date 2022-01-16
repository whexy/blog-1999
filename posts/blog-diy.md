---
title: "个人博客搭建指北"
date: "2022-01-09"
series: 博客搭建手记
---

2014 年，我注册了这个域名用来自建博客发表文章，相继用过了 WordPress，Hexo，Hugo 等等博客系统。去年突发奇想，想要 DIY 一个。迭代更新了半年时间，收到了不少朋友们的好评。本文主要介绍一下这个博客系统开发过程中总结的经验。

<!-- more -->

文章分为四个部分。

1. **设计**：文章排版、组件定义、页面设计，构思一个兼具观赏性和实用性的的阅读页面。
2. **创作**：写什么文章、该怎么写，如何制作有风格的配图，以及怎样引导读者互动。
3. **技术**：在 DIY 博客系统过程中尝试过的各类框架和开源项目。
4. **分发**：搜索引擎 SEO 优化、CDN 选型、RSS 订阅和友情链接。

## 设计

自建博客系统最大的好处就是：博主可以完全掌握站点的设计，而不是在 theme library 里面矮个子选将军。你的设计甚至可以细化到一个组件在鼠标悬浮时的动画效果。举一个例子，这是主页上自我介绍小卡片的动画效果预览。鼠标悬浮并缓慢移动时会有 3D 特效。使用手机浏览本文的读者朋友们可以~~去买一个电脑~~用手指戳戳代替鼠标。

<AnimatedFancyCard>
<Callout title="移动鼠标到四个顶点处">
{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \r\n
滚滚长江东逝水，浪花淘尽英雄，是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风，一壶浊酒喜相逢。古今多少事，都付笑谈中。`}
</Callout>
</AnimatedFancyCard>

是不是很酷？当然，这篇《指北》不会告诉你怎么制作动画。我只会泛泛而谈，你负责设计出自己满意的效果。在你设计的过程中，留意下面提到的三个要点。

### 文章排版

排印（Typography）是一种职业，我们作为业余的设计者自然排不出媲美书籍的精美程度。不过，就像编程语言需要遵循范式一样，只要牢记前人总结的经验，就不至于设计出太过离谱的版面。这里我推荐 GitHub 上过万 Star 的[中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)。排版指引文档包含中英文混排空格、标点符号全半角、英文名词大小写等等规则。

### 自定义组件

相比于只能使用标准 Markdown 语法的博客生成器，自建博客系统中可以方便地添加自己喜欢的样式。例如我经常使用的对话气泡。

<div className="flex flex-col space-y-2">
<Dialog>他说的是我们吗？</Dialog>
<DialogBack>我觉得是。</DialogBack>
</div>

以及模仿 Notion `/callout` 风格的卡片，很适合用作 warning 或者 tips 。

<Callout title="组件">
在博客文章中方便地加入组件有两种方式。一种是我现在使用的 [MDX](https://mdxjs.com/)，一种 markdown 的拓展格式，可以在其中添加 React 组件。另一种是我之前使用的小 trick，即修改 Markdown 渲染器，加入一些自定义语法，使之渲染出指定的 HTML 标签。
</Callout>

### 页面设计

**主题色**。因为缺乏美术功底，我不能驾驭色彩复杂的页面。这时候选用一个主题颜色作为博客的主色调是最讨巧的设计方式。我的博客主页用了<b className="text-red-500">红色（#dc252b）</b>作为主色调，并且在文章的组件里经常使用这两个颜色。

<Dialog>确实</Dialog>

**移动端优先**。现在使用小屏幕设备（视口宽度小于 640px）阅读的人越来越多。根据 Google Analysis 的统计数据，我的博客有 70% 的流量来自移动端。后面会提到，可以用 CSS 的 media 查询方便地进行移动端适配。

**深色模式**。无论是 Windows 还是 Mac，Android 还是 iOS，都会在晚上切换到深色模式。在黑色的大环境下里浏览白底黑字内容对眼睛是一种摧残，所以博客需要单独适配深色模式。深色模式不是把背景换成黑色、文本调成白色这么简单：为了不影响文本的辨别，文本与背景的颜色对比度至少需要达到 4.5:1。这里我推荐 Google Material Design 团队的深色模式设计指南 [Dark theme - Material Design](https://material.io/design/color/dark-theme.html)，里面有更加详细的设计规则。

## 创作

博客的核心在于创作。克隆一个 Hexo，配置 NeXT 主题，然后在文章里粘贴上一堆根本跑不了的代码，最后把博客链接往简历里面一放——这和在 CSDN 里塞垃圾有什么区别？

### 写什么

写博客不仅是一种自娱自乐，也是讨论技术、结交朋友的方式。我有一个巨大的选题库，里面都是我想探索的新技术、和朋友讨论的怪点子、还有开坑系列文章后流下的泪水。

不过我的内容还是太散太零碎了，很多地方不够深入。这里介绍两个我最喜欢的中文博客：

- [面向信仰编程 (draveness.me)](https://draveness.me/)
- [编程技术系列文章 · 构建我的被动收入 (bmpi.dev)](https://www.bmpi.dev/dev/)

### 配图

配图是博客耐看的关键！除了受过训练的 PhD 们，没有人想看大段文字和大段公式。就连最艰深的技术文章也需要图片加以说明。

不过，随意的配图会增加阅读难度，而且会引起读者的反感。在我的文章里配图尽量遵循同一个风格。例如在[《Faster Creating of Large Processes on Linux》](/posts/fork)文章里使用的“内存栈”的配图：

![内存栈的配图](/images/FwRw4r.jpg)

在另一篇文章[《细究内存管理（一）》](/posts/malloc1)中，同一个风格（或者说色系，配色方案）的配图：

![堆操作的配图](/images/malloc/heap_memory.png)

我的配图是用 Sketch 画的，导出成固定宽度的 PNG 位图。最近我想把图片换成 SVG 矢量图，这样可以通过一些简单的 CSS 获得在深色模式下的一致性阅读体验。关于博客的配图，这里我推荐[技术文章配图指南](https://draveness.me/sketch-and-sketch/)一文。

### 互动

因为作者（我）水平有限，读者往往会对文章的内容产生疑问。这时候需要博客有一个评论系统。评论需要强大的后端数据库支持注册、登录、富文本、广告封禁等功能，增加了我们博客系统开发的难度。好在现在可以使用通用评论平台。这是一种嵌入博客的 frame，调用第三方平台（例如 GitHub issues）完成评论。其中比较有名的是 discus 和 utterances，以及我正在使用的 [giscus](https://giscus.app/)。

一些小功能也可以基于 Serverless 自行开发。例如我给博客增加的点赞功能，详见[《FaaS：为静态博客添加点赞功能》](/posts/faas)。

## 技术

如果说后端技术是“日新月异”，那么前端技术可谓是“瞬息万变”。你应该挑选适合自己的框架进行开发。这里简单介绍一下我的博客中使用到的技术框架和开源项目，仅供参考。

### Tailwind CSS

项目地址：[Tailwind CSS](https://tailwindcss.com/)

我可太喜欢 Tailwind CSS 了！去年年初我参与了一个开源项目，项目组的成员向我介绍了这个 CSS 框架。点进项目地址里看看 Tailwind CSS 的 Demo 吧，你一定会爱上它的。

如果要实现一个 Flex 动态布局将方框居中。

<div>
  <div className="not-prose flex items-center justify-center border">
    <div className="w-[100px] h-[100px] bg-red-100" />
  </div>
</div>

你需要写很多样式：

```html filename=box.html
<style type="text/css">
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
  }

  .box div {
    width: 100px;
    height: 100px;
    background-color: rgb(220 252 231);
  }
</style>

<div class="box">
  <div></div>
</div>
```

如果用 Tailwind CSS，连 CSS 文件都不需要，只用写一个 HTML 页面：

```html filename=box.html
<div class="flex items-center justify-center border">
  <div class="w-[100px] h-[100px] bg-red-100"></div>
</div>
```

可以说 Tailwind CSS 就是这个博客系统诞生的原因。没有 CSS 的知识也能轻松排版。它能够用极短的 className 处理屏幕尺寸、深浅模式、鼠标悬浮或选中状态等等复杂排版场景。而这些场景用 CSS 写往往要数十行代码。

<Callout title="Tailwind CSS 实战" content={'举个例子，如果要让文字变成红色，直接用 `text-red-300` 就行了；\n\n<div class=\"text-red-300 text-center font-sans text-sm\">红色文字</div>\n\n 颜色深一点，用 `text-red-700`；\n\n<div class=\"text-red-700 text-center font-sans text-sm\">深红色文字</div>\n\n 在深色模式里用浅红，浅色模式里用深红： `text-red-700 dark:text-red-300`；\n\n<div class=\"text-red-700 dark:text-red-300 text-center font-sans text-sm\">根据深浅模式切换颜色的文字</div>\n\n 小屏幕设备用浅红，大屏幕设备用深红： `text-red-300 sm:text-red-700`。\n\n<div class=\"text-red-300 sm:text-red-700 text-center font-sans text-sm\">根据屏幕大小切换颜色的文字</div>\n\n 是不是非常方便？'} canFold></Callout>

### 11ty

最开始，我使用了 11ty 作为静态网页生成器。它基于 Mozilla Nunjucks 语法实现模板网页渲染。

项目地址：[11ty](https://www.11ty.dev/), [Mozilla Nunjucks](https://mozilla.github.io/nunjucks/)

简单来说，你需要写好一个 HTML 模板，在里面留空（告诉 11ty “这里填入标题”，“这里填入文章内容”）。11ty 会按照你指定的规则填空，生成最后的网页。这类静态网页生成器最适合用来写博客网站。

<Callout title="添加 Markdown 语法" content='Notion 风格的 Callout 也是在博客系统的 11ty 时期引入的。我魔改了 Markdown 渲染器 [markdown-it](https://github.com/markdown-it/markdown-it)，给 Markdown 增加了一个语法，让它遇到三个连续的等于号，就输出 `<div class="callout">...</div>`。接着给 `.callout` 类定义样式即可。' />

但是生成器也有缺点：

- 可以抽象组件，但只能抽一点点
- 无法控制渲染顺序，复杂逻辑实现困难

在我加入了更多页面之后，复用代码成了大问题。虽然 11ty 部分解决了组件抽象的问题，但编程复杂度、代码混乱程度让我难以继续维护博客网站。

### React 生态

目前博客系统是全面基于 React 制作的。React 是常年占据市场份额第一的前端框架。它将 HTML 嵌入 JS 中，利用函数计算动态返回 HTML。这种网站称为「单页面应用」。

<Dialog>看起来博客是多个页面组成，实际上只是单个页面，里面的组件被不断的替换更新而已。例如在博客网页间跳转时，重复的内容（如顶栏、底栏、LOGO 等）不会重新加载。</Dialog>

不过， React 会在浏览器里执行 JS 生成页面，这种「客户端渲染」的模式会导致部分低性能设备卡顿，甚至会出现页面渲染错位或空白。这时候需要用「服务端渲染」的框架来弥补 React 的缺点。

#### Next.js

Next.js 可以说是官方钦定的服务端渲染框架了，最近他们开了 [Next.js Conf 2021](https://nextjs.org/conf)，就是这个大会拉我入坑。听名字也可以看出，这个框架代表了未来前端技术发展的方向。

Next.js 的思路是，先在服务端渲染好一个 HTML 传递给用户，然后再运行 JS，把“过时”或“粗糙”的内容替换掉。这个过程被形象地称为「注水」——向一个干瘪的网页慢慢填充生动的内容。我的博客也运用了这种技术：

- 网页里的图片会先显示一个模糊的占位图，等到进入用户可视区域后再加载。
- 动态字体加载，没用到的字会从字体文件中剔除。

#### MDX

使用了 React 的好处是可以使用 MDX 了。直接在 Markdown 里嵌入 React 组件，不再需要魔改 Markdown 渲染器。例如我制作了 `Dialog` 的组件。如果需要在文章里插入对话气泡，可以直接用`<Dialog>content</Dialog>`。Typora 也会识别 HTML 标签，写文章时也有一个直观的排版。

<Dialog>content</Dialog>

![Typora识别自定义标签](/images/blog-diy/typora.png)

#### spring (弹簧)

另一个好处是可以享受 React 丰富的生态。比如文章开头那个 3D 效果动画，就是利用一个叫做 react-spring 的动画库制作的。

项目地址：[react-spring](https://react-spring.io/)

在博客里加入一些小动画效果可以增强互动性。对于一些很长的文章，需要一些轻巧的 break 来重新获得读者的注意力。

### Headless CMS

Headless 指“无头的”，一般来说就是“无界面的”“无系统的”。Headless CMS 是目前国外比较火的博客内容管理方案，通过 GraphQL 获取数据。本质上是博客后端服务器，只不过由厂商提供现成的 API。这里我推荐这篇文章 [Headless CMS explained in 1 minute](https://www.contentful.com/r/knowledgebase/what-is-headless-cms/)。

从前我们把文章存储在本地的 Markdown 文件里，然后让生成器生成静态网站。每次发新博客都需要 rebuild 一遍网站，再上传到服务器。而 Next.js 使用服务端渲染，它可以在渲染期自动从 CMS 服务器中拉取最新内容。通过配置，在 CMS 的更新（例如发布新文章，或修改旧文章）可以触发 Next.js 的重新渲染。重新渲染的结果立刻显示在读者的网页上。

不过我感觉使用 Headless CMS 的一般是多人共同写作的大博客网站，例如一个软件团队，或者一个实验室。每个人只用在 CMS 后台上传就能正常发布文章，不用去 rebuild 整个系统。作为个人博客，Headless CMS 属于杀鸡用牛刀。所以我试了一阵子就放弃了。

### 技术总结

目前博客使用的技术栈是：

- Tailwind CSS 用于样式设计
- React 用于封装组件、绘制页面
- Next.js 用于服务端渲染，优化浏览体验
- MDX 用于拓展 Markdown 的能力
- 自制 Serverless 用于实现点赞/阅读数功能

大致目录结构是：

```
├── components
│  ├── AnimatedFancyCard.js
│  ├── Footer.js
│  ├── Header.js
│  └── ...
├── data
│  ├── about.mdx
│  ├── friends.js
│  └── ...
├── lib
│  ├── date.js
│  ├── feed.js
│  └── ...
├── pages
│  ├── _app.js
│  ├── _document.js
│  ├── about.js
│  ├── friends.jsx
│  └── ...
├── posts
│  ├── 2021-summary.md
│  ├── asynchronous.md
│  ├── fork.md
│  ├── func-color.md
│  └── ...
├── styles
│  ├── all.min.css
│  ├── globals.css
└──└── webfonts
```

## 分发

如何评价一个博客？文章质量、读者数量、精美程度？作为一个博主，你需要对博客的总体情况有大致的了解。

### SEO 收录

SEO 收录表征博客文章在搜索引擎的收录情况。实话说我现在的 SEO 收录情况也不乐观。提高 SEO 的最好方法是让别的网站多多收录本网站的链接（例如交换友链、发布广告等等）。提升页面的 Metric 也有助于提升 SEO。

### Metric

来自谷歌团队的 [Lighthouse](https://developers.google.com/web/tools/lighthouse) 是一个测量网站表现的工具。使用 Chromium 内核的浏览器都在开发者工具里附带了这个功能。它测量的指标包括 Performance, Accessibility, Best Practices, SEO 等。你可以获得 First Contentful Paint, Max Potential First Input Delay 等等很细致的数据，用于优化网站的体验。它也会提示你的页面对于无障碍访问的优化情况，方便你制作一个有人情味的网站。

### CDN

在国内注册域名、购买服务器、部署网站，一个逃不过的事就是繁琐的备案。如果使用海外的服务器，国内的访问又会很慢。所以我的方案是使用国外的服务器（Vercel，Next.js 的母公司），并用全球 CDN 加速（Microsoft Azure）。这里我推荐这篇文章：[个人博客 CDN 选型和进阶玩法指北 | NekoDaemon's Blog](https://nekodaemon.com/2021/08/12/个人博客CDN选型和进阶玩法指北/)，文章里比对了各种个人博客 CDN 方案的优劣。

### 订阅

各种算法推荐看起来不错，但是久而久之会陷入“信息茧房”，得到一个只为了讨你开心的信息流。如果遇到了你喜欢的博客，应该用 RSS 订阅它的更新。本博客提供两种 RSS 非全文源。[RSS2.0](https://www.whexy.com/feed/feed.xml) 和 [JSON](https://www.whexy.com/feed/feed.json) 版本。

<div className="flex flex-col space-y-2">
<Dialog>为什么不是全文源？</Dialog>
<DialogBack>RSS 分发不支持 CSS，如果是全文源，我们的自定义组件就无法正常显示了。</DialogBack>
</div>

关于 RSS 阅读器，我推荐 iOS/macOS 平台的 Reeder。你也可以自架一个 RSS 订阅中心用于同步各设备之间的阅读数据，例如开源的 [FreshRSS](https://freshrss.org/)。

## 总结

这篇博客搭建指北就到这里结束了。我从四个角度出发介绍了构建自己博客系统时的构思和工作。这篇文章同时鼓励你自己搭建一套博客系统，因为这很有意思。我的感觉是：“码农”升级成了“互联网工匠”。这个过程伴随着一种成就感、自豪感。就和阅读、看电影、玩游戏一样，配置和优化博客系统成了我业余时间的乐趣之一。

如果你喜欢这篇博客，或想第一时间获得通知，可以通过 RSS 订阅更新。也欢迎关注我的 GitHub 和推特账号。我平时是主要分享关于计算机系统安全的内容。如果你对这篇文章有任何疑问或建议，请在下方留言。再会~
