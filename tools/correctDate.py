import argparse
import os
from datetime import datetime

correctDate = [
    {
        "id": "blog-diy",
        "excerpt": "2014 年，我注册了这个域名用来自建博客发表文章，相继用过了 WordPress，Hexo，Hugo 等等博客系统。去年突发奇想，想要 DIY 一个。迭代更新了半年时间，收到了不少朋友们的好评。本文主要介绍一下这个博客系统开发过程中总结的经验。",
        "title": "个人博客搭建指北",
        "date": "2022-01-09",
        "series": "博客搭建手记",
        "vol": 2,
        "url": "/posts/blog-diy"
    },
    {
        "id": "2021-summary",
        "excerpt": "在备考 GRE 的期间，我认识了 axiomatic 这个词。公理的、无疑的、不证自明的。它蕴含着巨大的通畅，一种泥沙俱下的快感。2021 年结束，我终于认识了 axiomatic 的反义词，生活。",
        "title": "2021 年总结 · 寻找答案",
        "date": "2022-01-03",
        "image": "/images/2021_summary/Title.png",
        "vol": 1,
        "url": "/posts/2021-summary"
    },
    {
        "id": "SUSTechWifiIoT",
        "excerpt": "在南科大的四年，每学期都会遇到 IoT 设备连接校园网的难题。这篇博客主要介绍如何让智能设备绕过认证直接接入校园网，以及这些操作的原理。",
        "title": "智能设备连接南科大校园网",
        "date": "2021-12-28",
        "series": "折腾南科大校园网",
        "vol": 18,
        "url": "/posts/SUSTechWifiIoT"
    },
    {
        "id": "func-color",
        "excerpt": "2015 年，著名程序员 Bob Nystrom 在博客上发表文章 What Color is Your Function，振聋发聩，发人深省，引发了行业内的激烈讨论。6 年过去了，它在各大编程语言的论坛上历久弥新。",
        "title": "函数颜色理论",
        "date": "2021-12-25",
        "image": "/images/func-color-title.png",
        "vol": 17,
        "url": "/posts/func-color"
    },
    {
        "id": "xmas-security",
        "excerpt": "圣诞节又到了。中国的前端程序员一定不会忘记这个节日。3 年前的这一天，阿里巴巴 AntD 团队在开源项目中掩埋的圣诞彩蛋引发了开源世界信任链的崩溃。前端程序员在节日当天面对客户投诉、老板指责，甚至有人被直接开除……",
        "title": "圣诞节与“供应链安全”",
        "date": "2021-12-24",
        "tags": "Other",
        "image": "/images/xmas/Title.png",
        "vol": 16,
        "url": "/posts/xmas-security"
    },
    {
        "id": "malloc1",
        "excerpt": "《细究内存管理》系列文章之首。这一系列的博客文章将从原理出发探究内存管理的本质，并且介绍如何综合常见的手段分析与预防内存安全性漏洞。这篇文章里，我主要介绍了堆、栈模式与内存管理的关系。",
        "title": "细究内存管理（一）",
        "date": "2021-12-18",
        "tags": "Project",
        "image": "/images/malloc/Title1.png",
        "series": "细究内存管理",
        "vol": 15,
        "url": "/posts/malloc1"
    },
    {
        "id": "malloc2",
        "excerpt": "大学四年间，遇到过两个有挑战性的课程项目：一个是计算机网络课程的手撸 RDT 通信，一个是操作系统课程的系统设计挑战赛。挑战赛有两大主题：一个是用 Rust 重写 xv6 内核，另一个是制作监控内...",
        "title": "细究内存泄露（二）",
        "date": "2021-12-18",
        "tags": "Project",
        "series": "细究内存管理",
        "vol": 14
    },
    {
        "id": "keys",
        "excerpt": "I published my keys on the website yesterday. It contains two kinds of keys: PGP and SSH. Both of them are public keys in the asymmetric encryption algorithm RSA. I'll show how to use these keys to prove I am me.",
        "title": "How to prove I am me: a digital way",
        "date": "2021-12-13",
        "image": "/images/digital-signature.png",
        "vol": 13,
        "url": "/posts/keys"
    },
    {
        "id": "sideload",
        "excerpt": "So I want to sideload an App (illegally, both the behavior and the app) to my new iPhone 13 Pro. I found a tool called Sideloadly, which I cannot even open in the first place... Here's the whole story about me fixing a cracking tool.",
        "title": "Try to Sideload an App to iOS",
        "date": "2021-11-29",
        "tags": "Tricks",
        "image": "/images/kNxHmjTCLG3tnAX.jpg",
        "vol": 12
    },
    {
        "id": "blog-dilemma",
        "excerpt": "胡，項下的垂肉。跋胡疐尾指前進就踏著垂肉，後退又被尾巴絆倒。語本《詩經．豳風．狼跋》：「狼跋其胡，載疐其尾」。作为技术博客的创作者，我现在就面临着这样两难的局面。",
        "title": "技术博客创作的两难局面",
        "date": "2021-11-25",
        "tags": "Other",
        "image": "/images/FMYK81ojCNy6LV5.png",
        "series": "博客搭建手记",
        "vol": 11
    },
    {
        "id": "fork",
        "excerpt": "Forking is how a process in Linux is created. Even though the fork has been improved over the years to use the COW (copy-on-write) semantics, it still has to copy a certain amount of data from parent to child. Some students in the lab are working with a fuzzing machine, and they encounter some problems...",
        "title": "Stop Forkin' Around: Faster Creating of Large Processes on Linux",
        "date": "2021-11-04",
        "tags": [
            "Coding"
        ],
        "image": "/images/46ktn0.jpg",
        "vol": 10,
        "url": "/posts/fork"
    },
    {
        "id": "faas",
        "excerpt": "2021 年，我的学生认证陆续过期。借此机会，我退租了国内所有的服务器。行业正在“云服务器”迈向“云服务”，我们也必须紧跟时代的步伐。这篇博客介绍如何使用利用 FaaS (Function As A Service) 为静态博客添加点赞功能。",
        "title": "FaaS：为静态博客添加点赞功能",
        "date": "2021-10-29",
        "tags": [
            "Project"
        ],
        "image": "/images/jFXNDx.jpg",
        "series": "博客搭建手记",
        "vol": 9,
        "url": "/posts/faas"
    },
    {
        "id": "PMU",
        "excerpt": "PMU interrupts act as an essential role between hardware and software. It gives the software the ability to gain insight into its execution on the hardware. In this article, I introduce you to the power of PMU and PMI and how to use them to achieve your goal.",
        "title": "PMU Interrupts: How to handle them",
        "tags": [
            "Coding"
        ],
        "date": "2021-10-23",
        "vol": 8,
        "url": "/posts/PMU"
    },
    {
        "id": "asynchronous",
        "excerpt": "Asynchronous programs can also be applied on multi-thread system through \"thread pool\". However, using mutex in it might be a problem.",
        "title": "Asynchronous Mutex",
        "tags": "Coding",
        "date": "2021-09-05",
        "vol": 7,
        "url": "/posts/asynchronous"
    },
    {
        "id": "m1qemu",
        "excerpt": "As a student who is fond of system programming, I always want to develop Linux kernel directly on the M1 Macbook without nested VMs. This blog is a set-up Coding of the developing environment. The target is to run a  Linux kernel in the QEMU on macOS with Apple Silicon.",
        "title": "Using QEMU to run Linux images on M1 Macbook",
        "date": "2021-08-16",
        "tags": "Tricks",
        "vol": 6,
        "url": "/posts/m1qemu"
    },
    {
        "id": "investigator",
        "excerpt": "Now I am going to introduce our recent work. We call it \"Investigator\". Investigator uses hardware features to diagnose concurrency bugs on Arm.",
        "title": "Alligator In Vest - My first research work",
        "tags": [
            "Research"
        ],
        "date": "2021-07-24",
        "vol": 5,
        "url": "/posts/investigator"
    },
    {
        "id": "usingLatexAddons",
        "excerpt": "本文总结了一些在写论文期间遇到的较为复杂的 LaTeX 问题。其中包括 latexdiff 在多文件环境的使用技巧，以及如何解决 latexindent 的依赖冲突。",
        "title": "复杂 LaTeX 项目中几个插件的使用心得",
        "date": "2021-05-06",
        "tags": "Tricks",
        "vol": 4,
        "url": "/posts/usingLatexAddons"
    },
    {
        "id": "Variance-in-Rust",
        "excerpt": "I’m watching Jon Gjengset’s live coding stream. And the topic is “Subtyping and Variance”. This is my note.",
        "title": "Variance in Rust (Rust 中的协变、逆变与不变)",
        "date": "2021-02-21",
        "tags": "Coding",
        "vol": 3,
        "url": "/posts/Variance-in-Rust"
    },
    {
        "id": "RUST-Generic-Trait",
        "excerpt": "在 Rust 中，特征(trait)也可以是泛型。引入泛型特征，一是希望特征不受具体类别的限制，二是希望特征具有更广泛的约束性。",
        "title": "理解 Rust 泛型特征 (Generic Trait)",
        "date": "2021-02-01",
        "tags": "Coding",
        "vol": 2,
        "url": "/posts/RUST-Generic-Trait"
    },
    {
        "id": "SUSTEAM",
        "excerpt": "大三时期做的游戏平台。主要语言是 Kotlin 和 TypeScript。回头看觉得做得还行，反正当时拿了满分 :)",
        "title": "SUSTeam: Ultimate Gaming Platform",
        "date": "2021-01-28",
        "demo": "http://susteam.gogo.moe",
        "tags": "Project",
        "vol": 1,
        "url": "/posts/SUSTEAM"
    },
    {
        "id": "inlineAssembly",
        "excerpt": "Writing assembly code is hard and boring! However, if you want to set regisiters, read memories, sometimes you must do the \"dirty work\".",
        "title": "Inline Assembly Language in C",
        "date": "2020-11-14",
        "tags": "Coding",
        "vol": 5,
        "url": "/posts/inlineAssembly"
    },
    {
        "id": "learningReact",
        "excerpt": "React 几乎利用了原生 JavaScript 的所有特质。在对 JavaScript 比较熟练的情况下，React 不会给你带来更多的惊喜。不过，相较于 Vue，写 React 也给人一种踏实的感觉。",
        "title": "React 学习笔记",
        "date": "2020-10-21",
        "tags": "Tutorial",
        "vol": 4,
        "url": "/posts/learningReact"
    },
    {
        "id": "AppleWatchSchoolBus1",
        "excerpt": "2020 年 WWDC，苹果更新了 SwiftUI 的第二版。我惊呼：Swift 终于能用了！这次我们不写 Web 和小程序！这是一篇 Native Code 的教程。",
        "title": "为 Apple Watch 写一个校巴时刻表工具",
        "date": "2020-07-09",
        "tags": "Project",
        "image": "/images/IAiKNDH3ykGw4WR.jpg",
        "vol": 3,
        "url": "/posts/AppleWatchSchoolBus1"
    },
    {
        "id": "12307",
        "excerpt": "大二课程数据库原理的期末项目。有查票、中转、订票、余票查询、线路管理等等功能。后端使用了 Flask 框架，前端使用了 Vue。项目最终获得了满分。",
        "title": "12307 火车票购买平台",
        "date": "2020-05-28",
        "tags": "Project",
        "image": "/images/12307_Title.png",
        "vol": 2,
        "url": "/posts/12307"
    },
    {
        "id": "sakai",
        "excerpt": "学校老师经常用来发布课件和作业的 Sakai 系统竟也支持使用 WebDAV 协议。通过配置本地的 WebDAV 服务，就能轻松下载课程资源，省时省力。",
        "title": "Sakai 和本地文件夹同步",
        "date": "2020-02-27",
        "tags": "Tricks",
        "vol": 1,
        "url": "/posts/sakai"
    },
    {
        "id": "keyboard",
        "excerpt": "键盘这玩意，的确是有门道的。但是对于我等这些连计算机行业门道都没摸清楚的人来说，傻乎乎跟风追求某种所谓“键盘”的感觉是没有必要的。同样，倘若连大鼓和军鼓的声音都无法区分，却畅谈某某耳机“低音准高音稳中音甜”，只会让人好一顿嘲笑。",
        "title": "谈谈我的键盘",
        "date": "2019-11-12",
        "vol": 5,
        "url": "/posts/keyboard"
    },
    {
        "id": "wannaAC",
        "excerpt": "大二刚开学，为了服务广大深受数据结构与算法课程折磨的同学。写了一个帮助 debug 的平台。代码一塌糊涂，不过产品思路还是不错的。",
        "title": "用两个晚上做超简易OpenJudge",
        "date": "2019-09-26",
        "tags": "Project",
        "vol": 4,
        "url": "/posts/wannaAC"
    },
    {
        "id": "timemachine",
        "excerpt": "macOS 有一个神奇的功能，叫做“时间机器”。当激活这个功能的时候，你可以将系统里的任意文件回滚到之前的任意状态。换句话说，macOS 存档了你每隔一段时间的系统的整个状态。使用这个功能通常需要定期插入硬盘。这篇文章里我通过配置一些网络协议实现了 macOS 局域网内的无感知备份。",
        "title": "搭建 macOS 的远程备份机",
        "date": "2019-08-25",
        "series": "折腾南科大校园网",
        "vol": 3,
        "url": "/posts/timemachine"
    },
    {
        "id": "SUSTechWifiLogin",
        "excerpt": "我校的校园网还就是与众不同，Post 发出的数据包不是轻易就能弄明白的。本文提出了一种黑魔法 bash 脚本用于类 Unix 系统登录校园网。",
        "title": "自动登录南科大校园网的 shell 脚本",
        "date": "2019-08-22",
        "tags": "Tricks",
        "series": "折腾南科大校园网",
        "vol": 2,
        "url": "/posts/SUSTechWifiLogin"
    },
    {
        "id": "movie_streaming",
        "excerpt": "今天得空，介绍上个月的成果——一套宿舍电影放映系统的构建。寝室里有一台大屏显示器，晚上关了灯，连上蓝牙低音炮，大家围坐一起看一部电影，真是美滋滋的体验~ 床上有一个支架，用iPad连接AirPods，晚上拉上遮光帘一个人欣赏一部电影，也是美滋滋的体验…",
        "title": "在寝室搭建一套电影播放系统",
        "date": "2019-08-03",
        "series": "折腾南科大校园网",
        "vol": 1,
        "url": "/posts/movie_streaming"
    }
]


def find_ctime(filename):
    for post in correctDate:
        if post["id"] == filename:
            return post["date"]


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-d", "--dir", required=True)
    args = vars(ap.parse_args())

    dir = args["dir"]
    for root, dir, files in os.walk(dir):
        for file in files:
            if file.endswith(".mdx"):
                flattenFileName = file.replace(".mdx", "")
                fileCreatedTime = datetime.strptime(find_ctime(flattenFileName), "%Y-%m-%d").strftime('%m/%d/%Y')
                path = os.path.join(root, file)
                os.system(f"setfile -m '{fileCreatedTime}' {path}")