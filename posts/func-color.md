---
title: "函数颜色理论"
date: "2021-12-25"
preview: true
---

2015 年，著名程序员 Bob Nystrom 在博客上发表文章《What Color is Your Function?》，振聋发聩，发人深省，引发了行业内的激烈讨论。6 年过去了，它在各大编程语言的论坛上历久弥新。

<!-- more -->

原文地址: [What Color is Your Function?](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) 我得提醒你原文很长，对编程基础要求很高，而且充满了*英文梗*。我强烈建议你读完我的这篇“文言文解析”，再去品析原文的奥妙。

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
let positive = (x) => (x > 0);
// 接着我们将 positive 传到 filter 中
filter([-1,0,1], positive)
// 最终的结果就是 [1, ]
```

朋友们，高阶函数写起来也太爽了。久而久之，我们会在程序里塞满高阶函数。

```js
// 例如，我开始用高阶函数写测试框架
describe("An Apple", function() {
  it("ain't no orange", function() {
    expect("Apple").not.toBe("Orange");
  });
});

// 又例如，我开始用高阶函数写编译器
tokens.match(TOKEN.LEFT_BRACKET, function(token) {
  // 解析数组序列
  tokens.consume(TOKEN.RIGHT_BRACKET);
})
```

走火入魔之后，我开始写一些返回函数的函数（包装器），一些流式编程。我最喜欢 `iterator.filter.map.collect`，这样我的代码里就没有哪些菜鸟才写的 `for` 和 `while` 了。

## 函数的颜色

刚才只是新手村。这门新语言看起来和 JavaScript/Python 没什么区别。我们即将遇到第一个 Boss。现在规定：**每个函数都有一个颜色，要么是红色，要么是蓝色。**不管是具名函数还是匿名函数都必须遵守这个规则。

匿名函数……听说你们更喜欢叫“闭包”，或者“lambda”。

现在我们不能用 `function` 定义函数了，只能用 `red function` 和 `blue function` 两个关键词，显式的指明函数的颜色。

```js
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

	```js
	doSomethingBlue()blue; // 调用蓝色函数
	doSomethingRed()red; // 调用红色函数
	```

2. 红色函数只能在红色里调用，蓝色函数不能调用红色函数。

   ```js
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

3. 有一些核心的库函数（比如发送网络请求）是红色的。

## 都是函数式惹的祸

一定是我高阶函数写多了，上天要如此捉弄我。现在我的代码根本无法编译：蓝色红色在代码里混乱不堪，编译器不停地报错。如果当初乖乖地写 `for` 和 `while`，现在就不会这么头疼。

如果所有函数都是同一种颜色，那倒也好办。全部定义成红色？我可不想浪费几万块钱（参见规则 3）。要不就，尽量全部定义成蓝色？编程也不难：**我们定义新的函数时，如果确定只需要调用蓝函数，那就定义成蓝色，否则就定义成红色。**只要我们不写高阶函数，那就不用去关心“多态”。

好，默念口诀：优先蓝色，优先蓝色，优先蓝色，实在不行再用红色。

转念一想，是这样吗？假设我们写了一个核心功能（例如，向服务器发送数据），它会在整个项目中复用无数次。我当然希望它是蓝色的。不过，因为它调用了红色的核心库函数，所以必须是红色函数。

好家伙，现在只有红色函数才能使用这个核心功能。如果我的同事正在写一个蓝色函数 `blue function foo()`，突然需要调用这个核心功能，他该怎么做？

1. 把蓝色函数 `blue function foo()` 改成红色 `red function foo()`。把所有调用语句从 `foo()blue;` 换成 `foo()red;`
2. 把所有调用 `foo()` 的蓝色函数改成红色函数。
3. 把所有调用调用 `foo()` 的蓝色函数的蓝色函数改成红色函数。
4. 把所有调用调用调用……

你发现了吗，**红色具有传染性**。代码里一红俱红，使用红色是不可避免的事情。

## 色彩隐喻

好啦，我们还是不打谜语了。颜色在这里只是一种比喻，下面揭晓谜底：

红色函数就是异步函数。