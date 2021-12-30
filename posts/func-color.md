---
title: "函数颜色理论"
date: "2021-12-25"
image: /images/func-color-title.png
---

2015 年，著名程序员 Bob Nystrom 在博客上发表文章 What Color is Your Function，振聋发聩，发人深省，引发了行业内的激烈讨论。6 年过去了，它在各大编程语言的论坛上历久弥新。

<!-- more -->

原文地址: [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) 我得提醒你原文很长，对编程基础要求很高，而且充满了*英文梗*。我强烈建议你读完我的这篇“文言文解析”，再去品析原文的奥妙。

<Callout title="😁 声明">
这篇文章不是对原文的翻译。我补充了非常多的代码样例，用于论证作者的想法。在文章的后半部分，针对 2021 年的语言现状增加了一些内容。最有趣的是，这篇文章和我的系列文章《细究内存管理》产生了奇妙的交集。在最后“调用栈与时间循环”一节，我脱离作者文稿加入了一些自己的思考。
</Callout>

## 一门新语言

为了不冒犯特定语言爱好群体，作者发明了一门新语言。不要慌张，它读起来就像伪代码一样：括号、分号，以及类似 `if`, `while` 之类的关键词。

```js
function thisIsAFunction() {
  return "It's Awesome!";
}
```

这门**新**语言当然也支持现代语言特性，例如高阶函数。高阶函数的特点是允许函数作为参数。例如下面的例子中，`predicate` 是一个返回布尔值的低阶函数，高阶函数 `filter` 接受它作为参数。

```js
// predicate 是一个低阶函数，作为参数传入 filter。
function filter(arr, predicate) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) result.push(arr[i]);
  }
  return result;
}

// 例如，我们用 positive 函数判断一个值是否为正数。
let positive = (x) => x > 0;
// 接着我们将 positive 传到 filter 中
filter([-1, 0, 1], positive);
// 最终的结果就是 [1, ]
```

朋友们，高阶函数写起来也太爽了。久而久之，我们会在程序里塞满高阶函数。

```js
// 例如，我开始用高阶函数写测试框架
describe("An Apple", function () {
  it("ain't no orange", function () {
    expect("Apple").not.toBe("Orange");
  });
});

// 又例如，我开始用高阶函数写编译器
tokens.match(TOKEN.LEFT_BRACKET, function (token) {
  // 解析数组序列
  tokens.consume(TOKEN.RIGHT_BRACKET);
});
```

走火入魔之后，我开始写一些返回函数的函数（包装器），一些链式调用。我最喜欢 `iterator().filter().map().collect()`，这样我的代码里就没有那些菜鸟才写的 `for` 和 `while` 了。

## 函数的颜色

刚才只是新手村。这门新语言看起来和 JavaScript/Python 没什么区别。我们即将遇到第一个 Boss。现在规定：**每个函数都有一个颜色，要么是红色，要么是蓝色。**不管是具名函数还是匿名函数都必须遵守这个规则。

<Dialog>
匿名函数……听说你们更喜欢叫“闭包”，或者“lambda”。
</Dialog>

现在我们不能用 `function` 定义函数了，只能用 <code className="!text-red-500">red function</code> 和 <code className="!text-blue-500">blue function</code> 两个关键词，显式的指明函数的颜色。

```
blue function doSometingBlue() {
  // 这是蓝色函数
}
red function doSomethingRed() {
  // 这是红色函数
}
```

没有无色函数！如果你想要定义一个函数，必须选一个颜色！

作者一狠心，加入了四条更讨厌的规则：

1. 调用函数的时候，也必须在括号后面加上对应的颜色。

   ```
   doSomethingBlue()blue; // 调用蓝色函数
   doSomethingRed()red; // 调用红色函数
   ```

2. 红色函数只能在红色里调用，蓝色函数不能调用红色函数。

   ```
   // 这是一个红色函数
   red function doSomethingRed() {
     doSomethingBlue()blue; // 可以调用蓝色函数
     doSomeRedThing()red; // 也可以调用红色函数
   }

   // 这是一个蓝色函数
   blue function doSomethingBlue() {
     doSomethingBlue()blue; // 只能调用蓝色函数
   }
   ```

3. 红色函数代价高昂。每调用一次红色函数，程序员就要缴税 100 元。

4. 有一些核心的库函数（比如发送网络请求）是红色的。

## 都是函数式惹的祸

一定是我高阶函数写多了，上天要如此捉弄我。现在我的代码根本无法编译：蓝色红色在代码里混乱不堪，编译器不停地报错。如果当初乖乖地写 `for` 和 `while`，现在就不会这么头疼。

如果所有函数都是同一种颜色，那倒也好办。全部定义成红色？我可不想浪费几万块钱（参见规则 3）。要不就，尽量全部定义成蓝色？编程也不难：**我们定义新的函数时，如果确定只需要调用蓝色函数，那就定义成蓝色，否则就定义成红色。**只要我们不写高阶函数，那就不用去关心“多态”。

好，默念口诀：优先蓝色，优先蓝色，优先蓝色，实在不行再用红色。

转念一想，是这样吗？假设我们写了一个核心功能（例如，向服务器发送数据），它会在整个项目中复用无数次。我当然希望它是蓝色的。不过，因为它调用了红色的核心库函数，所以必须是红色函数。

好家伙，现在只有红色函数才能使用这个核心功能。如果我的同事正在写一个蓝色函数 <code>blue function foo()</code>，突然需要调用这个核心功能，他该怎么做？

1. 把蓝色函数 <code className="!text-blue-500">blue function foo()</code> 改成红色 <code className="!text-red-500">red function foo()</code>。把所有调用语句从 <code className="!text-blue-500">foo()blue;</code> 换成 <code className="!text-red-500">foo()red;</code>
2. 把所有调用 <code className="!text-red-500">foo()red</code> 的蓝色函数改成红色函数。
3. 把所有调用调用 <code className="!text-red-500">foo()red</code> 的蓝色函数的蓝色函数改成红色函数。
4. 把所有调用调用调用……

你发现了吗，**红色具有传染性**。星星之火可以燎原，使用红色是不可避免的事情。

## 色彩隐喻

好啦，我们还是不打谜语了。颜色在这里只是一种比喻，下面揭晓谜底：

<p className="text-center font-bold text-lg">红色函数就是异步函数。</p>

如果你熟悉 JavaScript 编程就能意识到：每当你通过一个“回调函数”传递返回值时，你就创建了一个红色函数。

```js
// 觉得熟悉吗？
function SendMsg(url, params, cb) {
  http.post(url, params, (response) => {
    // 👈 回调地狱
    let reply = response.data.msg;
    cb(reply);
  });
}
```

1. 同步函数返回一个值。异步函数无返回值，而是调用一个“回调函数”。
2. 调用同步函数使用 `let rtval = foo(a, b)`，调用异步函数使用 `foo(a, b, (x)=> {this.rtval = x;})`。
3. 同步函数无法调用异步函数，因为异步函数没有返回值。
4. 异步函数非常难处理，它的错误捕获、控制流语句都和同步函数不一样。
5. 整个 JS 就是一个 EventLoop！Node.js 本身就是一个巨大的异步函数！

什么是回调地狱？也许是写一堆大括号，逐层缩进，最后超出了屏幕的显示范围……回调地狱的本质是代码中红色函数过多。如今有上万个第三方库是红色（异步）的。这就是如今的现状。

## Promise 和 Await

很多编程语言引入了 Promise 和 Async/Await 语法糖用于缓解异步问题。这些语法糖无疑解决了一些异步函数使用上的痛点。

```js
async function SendMsg(url, params) {
  let resp = await http.post(url, params);
  return resp.data.msg;
}

async function invoker() {
  let reply = await SendMsg(url, params);
  // 此处直接展开 cb() 函数
}
```

但是作者认为，无论是 Promise，还是 Async/Await，都只不过是为语言加入了更加漂亮的语法糖。本质上，我们的函数仍然有两种颜色——你仍然不能在同步函数里调用异步函数。创建红色函数也许是轻松了一些，但是蓝色函数仍然不能调用红色函数。

所以一旦我开始写高阶函数，或者开始重用代码，就回到了和之前一模一样的困境中。举一个例子。现在有一个数组存放了用户名。我想要将这些用户名依次发送到服务器上，获取他们的具体信息。让我们试着用高阶函数写写看~

```js
// 我们有一个 async/await 的异步函数
async function getInfoFromServer(user);

// 我们还有一个 call-back 版本
function getInfoFromServerCb(user, cb);

// 这是我们的主函数
function main() {
  let users = ["whexy", "macromogic", "mstmoonshine", "nekodaemon"];
  print(getUserInfo(users));
}

function getUserInfo(users) {
  let infoList = users.iter().map( (user) => {
    let info = await getInfoFromServer(user);
    return info;
    // ❌ 不能这么写，map 不是 async 函数！

    getInfoFromServerCb(user, (info) => {
      resultList.push(info);
      // ❌ 不能这么写，resultList 返回时还是一个空数组！
    })

    // Ahhh... 怎么写都不对
  })
}
```

你看，我们的高阶函数 `map()` 就是一个典型的蓝色函数，而 `getInfoFromServer` 是一个红色函数。即使用了语法糖，这个需求还是难以完成。

## 现实世界语言的颜色

所以，像 JavaScript，Dart，C#，Python 等等大多数语言都面临函数颜色的问题。

<Dialog>
从这里开始，之后的讨论和原文产生了差异。
</Dialog>

那么哪些语言没有颜色问题？Java 对不对？Java 曾经确实是没有颜色问题的语言。真可惜，Java 正在积极引入 Futures 和 Async I/O。不久的将来，Java 程序员也会面临颜色的抉择。

真正没有颜色问题的语言是：Go，Lua，Ruby。它们都有一个共同的特点——多线程。说得更清楚一点，它们都有**多个可以上下文切换的调用栈**。这里的线程不一定非要借助操作系统，Go 语言的 GoRoutine，Lua 的 coroutines，Ruby 的 fibers 都能避免颜色问题。

更多的语言属于两者之间的一类：它们可以避免颜色问题。例如 Swift，Rust，C++。前提是不使用**事件循环模型**。

## 调用栈与事件循环

我想我终于讲到最本质的问题了。当一个操作完成后，你如何接续到你离开的地方？

```js
foo();
bar();
let file = readLargeFile(); // 非常繁重的 IO 操作
// 我们从这里离开，去干别的
// IO 结束，我们回到这里继续工作
let size = file.length();
```

我们进行了一些 IO 操作，为了性能使用了操作系统底层的异步 API。在操作系统忙于进行 IO 操作时，程序必须切换到下一个任务处理，否则界面将会“冻结”。一旦操作系统完成任务，我们又需要恢复到原先离开的位置。

### 调用栈

最常见的方式是和操作系统搞好关系。它能帮助我们记录离开的位置，然后在工作结束后“恢复现场”，继续执行。这就是**调用栈**的记录方式。

如果我们不喜欢操作系统笨重的上下文切换，也可以让语言运行时充当记录者。例如，GoRoutine 的运行时能够管理自己的“线程”，或者叫它“用户态线程”，“绿色线程”，“纤程”等等。这般复杂的名字，其实背后仍然是线程模型，这和**调用栈**记录没有本质区别。

### 事件循环

但是这些带颜色的编程语言（尤其是解释型语言）不喜欢线程的概念。例如 JavaScript，作为一个运行在网页上的语言，设计之初就没有考虑多线程。但是偏偏我们需要在进行 IO 操作的同时处理其他事务，这就引入了“异步”。

函数式编程理论给我们介绍了“闭包”的概念。闭包是一种可以捕获上下文的匿名函数。

```rust
fn main() {
    let x = 4;
    let equal_to_x = |z| z == x;
    let y = 4;
    assert!(equal_to_x(y));
}
```

捕获上下文…捕获…上下文……这不就是记录离开位置的另一种方式吗？不少运行时会生成结构体存储闭包的环境信息。将闭包添加到事件循环中，就是另一种“恢复现场”的方式。

![Node.js 的事件循环模型](/images/Node.js-Event-Loop-1.png)

事件循环（EventLoop），本质上就是一个巨大的 while true 循环，一种不断轮训任务的机制。程序被抽象成“事件”（又叫做任务）的集合，添加到队列中，被一件件完成。事件的执行可以附带前置条件（例如执行事件 C 之前必须保证完成事件 A），这样就形成了事件的依赖关系——等价于函数调用链。记得我们前面写过的 call back 闭包吗？它就是执行过程中被添加到队列中的新事件。

想象我们要读取若干文件。主函数调用若干次操作系统的异步读取 API，并把对应的回调事件添加到 Loop 中。事件循环会不断在事件列表中寻找可以执行的任务，例如处理用户的点击事件、页面滚动。当某个文件加载完毕，它对应的回调事件在队列中被激活。在下一轮循环中，这个回调事件就能被及时执行。

<Dialog>
哇，读到这里真是买一赠一。我一不小心介绍了**协程**的原理：其实就是事件循环模型。
</Dialog>

你也许会好奇：这里所谓的“事件”，在操作系统看起来是什么？在内存中如何存在？与闭包的处理原则一致，这些“事件”就是存储在**堆**上的数据结构。这是一种特殊的内存管理模型，如果你感兴趣，可以关注我的《细究内存管理》系列文章。

事件循环听起来很酷，但是正如前文不断指出的那样——它必然收到红蓝函数颜色问题的影响。

## 总结

这篇文章里我先介绍了函数颜色理论。原文地址: [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) ，如果英文水平过关，我强烈建议品读一遍原文。原文的部分讨论我没有在文章中涉及到，但它们都令我叹为观止。

最后我们涉及到了三种异步模型：操作系统线程模型、“用户态线程”模型、事件循环模型。能坚持读到这里的读者一定能明白：不存在一种绝对优雅的模型。

- 使用操作系统线程是最简单的编程范式。操作系统能帮助记录和恢复现场。前提是编程语言支持。（很可笑不是吗，竟然有那么多“编程语言”不完全支持或根本不支持）
- 使用用户态线程，例如 GoRoutine。这是原文作者最欣赏的模型，在减少上下文切换的开销的同时，保持了函数的纯色性。兼具语言美感和现实效益。但是我要浇一盆冷水：当项目复杂度超过一个阈值时，**线程调度 = 并发漏洞**。这个模型下，我们不得不使用各种同步原语来保证数据流的一致性。“用户态线程”模型还增加了并发错误检测的难度。（见博客 [Alligator in Vest](/posts/investigator)）
- 使用事件循环模型。当然，会面临函数颜色的困境，不过训练有素的程序员能克服这个缺点。另一个缺点是：事件循环有额外的运行时开销。事件循环模型的优点是，不存在抢占式调度，大大减少了并发漏洞的存在。当然，一个事件的“冻结”将阻塞整个程序的执行。所以著名的 Kotlin 后端框架 Vertex 强调 Don't block me。编写使用事件循环模型的语言时，一定要注意不要写出会 block 的代码。（见博客 [SUSTeam: Ultimate Gaming Platform](/posts/SUSTEAM)）

如果你喜欢这篇博客，或想第一时间获得通知，可以通过 RSS 订阅更新。也欢迎关注我的 GitHub 和推特账号，我将分享更多关于计算机系统安全的优质内容。如果你对这篇文章有任何疑问或建议，请在下方留言。再会~