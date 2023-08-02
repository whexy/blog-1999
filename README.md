# whexy.com (whexy<sup>1999</sup>)

<p align="center">
<img src="https://img.shields.io/github/license/whexy/blog-1999?" />
<img src="https://img.shields.io/github/deployments/whexy/blog-1999/production?label=vercel&logo=vercel&logoColor=vercel?" />
<img src="https://img.shields.io/badge/Powered%20by-React-blue" />
</p>

<p align="center">
  Yet Another Blog system with <b>Next.js</b>
</p>

- Framework: Next.js 13
- Deployment: Vercel
- Content: MDX with [contentlayer](https://github.com/contentlayerdev/contentlayer), Notion with [react-notion-x](https://github.com/NotionX/react-notion-x)
- Styling: Tailwind CSS

## Live Demo

- [Whexy's Blog](https://www.whexy.com)

## Overview

- `app/*` - All pages, layouts, static and dynamic routes, with [Next.js 13 Layouts RFC](https://nextjs.org/blog/layouts-rfc).
  - `app/posts/*` - Blog posts with **Markdown X** and server-side customized components.
  - `app/dyn/*` - Realtime updated posts (I call them "dynamic blogs") with **Notion** as the backend CMS.
- `components/*` - React components designed for boosting the reading experience.
- `lib/*` - Collection of helpful utilities or code for external services.
- `public/*` - Static assets including images, files, etc.
- `styles/*` - Customized code highlighting, LaTeX math support, and global CSS config.

### Dynamic Content with Static Speed

From version 2.0, All data, even for GitHub star numbers and Bilibili video information, is fetched, updated and processed on the edge server in real-time.
When you open the page, there will be no local API calls. You will immediately receive pure HTML content with cached data from the server. As you read, the data on the page will continuously update with the latest version streamed from an edge server behind-the-scenes.

## Learn more

I've written a post discussing how to design a blog system.

- [构建自己的博客系统](https://www.whexy.com/posts/blog-diy) (in Chinese)

## Running Locally

```shell
$ git clone https://github.com/whexy/blog-1999.git
$ cd blog-1999
$ pnpm install
$ pnpm run dev
```

## Cloning / Fork

Please follow the MIT license and remove all of my personal information (resume, blog posts, images, etc.).

## Special Thanks

The blog system is inspired by Leerob, the Director of Developer Relations at Vercel. His Next.js blog repo: [https://github.com/leerob/leerob.io](https://github.com/leerob/leerob.io)
