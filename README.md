# whexy.com (wenxuan<sup>1999</sup>)

<p align="center">
<img src="https://img.shields.io/github/license/whexy/blog-1999" />
<img src="https://img.shields.io/github/deployments/whexy/blog-1999/production?label=vercel&logo=vercel&logoColor=vercel" />
<img src="https://img.shields.io/badge/Powered%20by-React-blue" />
</p>

<p align="center">
  Yet Another Blog system with <b>Next.js</b>
</p>

- Framework: Next.js
- Deployment: Vercel
- Content: MDX
- Styling: Tailwind CSS

## Learn more
I've written a post discussing how to design a blog system.

- [个人博客搭建指北](https://www.whexy.com/posts/blog-diy) (in Chinese)

## Overview

- `data/*` - MDX data that is used for blogs and the "about page". Some structed data supporting "Key" and "Friend" pages.
- `layouts/*` - The page layout used to render data (blog posts).
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - API routes of Next Server Function.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/*` - All other static pages.
- `public/*` - Static assets including images, files, etc.
- `styles/*` - Fonts and Tailwind CSS config.

## Running Locally
```shell
$ git clone https://github.com/whexy/blog-1999.git
$ cd blog-1999
$ yarn
$ yarn dev
```

## Cloning / Fork
Please follow the MIT license and remove all of my personal information (resume, blog posts, images, etc.).

## Special Thanks
The blog system is inspired by Leerob, the Director of Developer Relations at Vercel. His Next.js blog repo: [https://github.com/leerob/leerob.io](github.com/leerob/leerob.io)