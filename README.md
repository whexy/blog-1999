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
- Content: MDX with [contentlayer](https://github.com/contentlayerdev/contentlayer)
- Styling: Tailwind CSS

## Live Demo

- [Whexy's Blog](https://www.whexy.com)

## Learn more

I've written a post discussing how to design a blog system.

- [构建自己的博客系统](https://www.whexy.com/posts/blog-diy) (in Chinese)

## Overview

- `app/*` - All pages in [Next.js 13 Layouts RFC](https://nextjs.org/blog/layouts-rfc).
- `app/blog/*` - Blog posts using MDX and a lot of customized components.
- `data/*` - MDX data that is used for blogs.
- `layouts/*` - The page layout used to render data (blog posts).
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - API routes of Next Server Function.
- `public/*` - Static assets including images, files, etc.
- `styles/*` - Fonts and Tailwind CSS config.

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
