---
title: "Try to Sideload an App to iOS"
date: "2021-11-29"
tags: Tricks
image: https://i.loli.net/2021/11/29/kNxHmjTCLG3tnAX.jpg
---

So I want to sideload an App *(illegally, both the behavior and the app)* to my new iPhone 13 Pro. I found a tool called Sideloadly, which I cannot even open in the first place... Here's the whole story about me fixing a cracking tool.

<!-- more -->

The story might be boring to you. Maybe you want to read my [thundering against apple](#my-comments).

## Sideload

Sideloading means installing an App that is not in the App Store. Perhaps it's the easiest way to install applications on Windows and Androids. But when it comes to Apple, especially for their "best-ever-made" iOS devices, you cannot install Apps like that! Apple seriously controls their customers' apps that they can't even install an app on their phones without the App Store.

<Warn content={`But Tim Cook literally asked me to use an Android device [^1].`} />

[^1]: [Tim Cook: Users Who Want to Sideload Apps Can Use Android, While the iPhone Experience Maximizes 'Security and Privacy' - MacRumors](https://www.macrumors.com/2021/11/09/tim-cook-users-sideloading-use-an-android/)

There're two steps you need to follow to sideload an App to your iOS devices.

1. Get the IPA file and reverse engineer it to remove the crypto protection (called *shell*).
2. Sign the App with your developer's signature.

Simply put, sideloading is pulling a shrimp out of its shell and stuffing it into the new home we've prepared. Isn't that super easy? Wait, wait, wait... Noob, you don't need to do all of the things on your own! [Sideloadly](https://sideloadly.io/) says it can help you do this with just one click.

<Warn content={`If it's really "one click," as they said, you won't have the luck to read the blog.`} />

## Dependency

I've been using the Macbook Air (2020, M1, 16GB) for a while. Thanks to its <span class="text-[#3e8dba] font-black">arm</span>-based CPU, it's super fast compared to my previous Macbook Pro (2018, i5, 8GB).

<Warn content={`Intel, shame on you!`} />

The challenge to transfer products to arm-based architecture is the ecosystem. Programs aimed to run on x86/x64 cannot magically runs on arm. Apple tries to solve this problem with its Rosetta 2.

So here comes a messy. On our computer, there are two types of applications that run in different modes! I'll be okay if they are not interacting with each other. But in the real world, programs depend on other programs! **An arm program cannot rely on an intel library.** That is what you always meet when you're trying to use the so-called "Universal App."

### Sideloadly Dependency issue

Here is the issue I first met when opening sideloadly.

<div class="mx-auto max-w-[400px]">
  ![](https://i.loli.net/2021/11/29/VZrPKABMv9RebnT.png)
</div>

The error is basically described as sideloadly's inability to find a correct version of `_rust.abi3.so`, which is used for the python library  `cryptography`. Usually, the solution is to install the missing requirements with pip. But I do have `cryptography` on my Mac, and so did the error message say:

> tried ... (mach-o file, but is an incompatible architecture arm-64, need x86_64)

Again, that is what you always meet when you're trying to use the so-called "Universal App". I looked into Activity and found out that sideloadly is an Intel App running on Rosetta 2. It's okay that it depends on an intel version of `cryptography`.

But I have the library installed as an arm version because other arm programs want to use it! What do you expected me to do? Replace them with an intel version? Indeed. The developer suggests to remove Python on my mac to get it fixed [^2].

[^2]:  [[Help/Support\] Sideloadly M1 Max: Failed to init layer 2 - Help & Support - iOSGods](https://iosgods.com/topic/152249-sideloadly-m1-max-failed-to-init-layer-2/#comment-4910001)

### Temporary Fix

Of cause I don't want to remove Python. My life depends on it. I found the default Python on my Mac is `/usr/bin/python3`. And guess what, it is an Universal App!

```shell
❯ file /usr/bin/python3
/usr/bin/python3: Mach-O universal binary with 2 architectures: [x86_64:Mach-O 64-bit executable x86_64] [arm64e:Mach-O 64-bit executable arm64e]
/usr/bin/python3 (for architecture x86_64):	Mach-O 64-bit executable x86_64
/usr/bin/python3 (for architecture arm64e):	Mach-O 64-bit executable arm64e
```

Librarys are in the folder at `~/Library/Python/3.8/lib/python/site-packages`. My temporary work-around is to replace the `cryptography` library with its <span class="text-[#2a61a6] font-black">intel</span> version when using the tool and switch back after using it. To install the <span class="text-[#2a61a6] font-black">intel</span> version library, you need to use the <span class="text-[#2a61a6] font-black">intel</span> version Python to run the <span class="text-[#2a61a6] font-black">intel</span> version pip.

```shell
cd ~/Library/Python/3.8/lib/python/site-packages
# remove or backup these two folders
mv cryptography cryptography_arm64
mv cryptography-3.4.7.dist-info cryptography-3.4.7.dist-info_arm64
# install cryptography with x86 version
arch -x86_64 /usr/bin/python3 -m pip install cryptography
```

<div class="mx-auto max-w-[400px]">
![](https://i.loli.net/2021/11/29/q4QAxhYasvDm17n.jpg)
</div>

LGTM. Now I can open Sideloadly and see the GUI.

### OpenSSL issue

Apparently, fooling with the way the launcher works during the initialization phase is not enough. I keep seeing this error message when sideloading.

```
ERROR: Guru Meditation 90837e@94:01234a cffi library '_openssl' has no function, constant or global variable named 'Cryptography_HAS_SIGALGS'
```

It seems we got the correct CFFI (C Foreign Function Interface), but with a wrong binary version. I'm running out of patience. So I went to the forum and asked the maintainers about this. They said Sideloadly shipped with the correct version of openssl, cryptography and cffi.

So the main reason is that my Python library overrides theirs. When the program tries to locate the library, it first goes to my default Python library path. To overcome this default behavior without changing the program, I have some ideas.

1. Try using terminal to remove `/usr/bin` from `$PATH` when launching Sideloadly. For example, use `PATH=/usr/local/bin open ~/Applications/Sideloadly.app`. It doesn't work because obviously it depends on other binaries in that folder.
2. Try renaming `/usr/bin/python3` to something else. It doesn't work because macOS rejects every attempt  to modify protected area. (even if you are root and even if SIP is disabled)
3. Remove the fucking Python from my Mac. It doesn't work because my sanity tells me not.
4. Remove `cffi` and `cryptography` libraries from the library folder. It works.

## My Comments

I'm writing this blog to share my work around sideloading. It's not very helpful, as Sideloadly promises to fix the program in an upcoming update.

But you might find it interesting because we've basically been struggling with the closed Apple ecosystem. Every problem we've encountered has been caused by Apple's so-called "security and privacy" policies.

- Apple doesn't allow sideloading Apps.
- Apple uses Rosetta 2 to mess up your dependencies.
- Apple doesn't allow modifying files under  `/usr/bin`.

I have to admit, as a developer, I'm a little pissed off. I used to believe in Apple because they brought me the best experience. However, the fact that it went closed has led to a discounting of that experience. It's true that users can be tricked into closing SIP, and they might choose to "trust the certificate" or "grant permission" without knowing the potential consequences. But I think what Apple should be doing is **educating users** rather than simply prohibiting them from making a choice.
