---
title: "FaaS：为静态博客添加点赞功能"
date: "2021-10-29"
tags:
	- Project
image: https://whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com/uPic/jFXNDx.jpg
---

2021 年，我的学生认证陆续过期。借此机会，我退租了国内所有的服务器。行业正在“云服务器”迈向“云服务”，我们也必须紧跟时代的步伐。这篇博客介绍如何使用利用 FaaS (Function As A Service) 为静态博客添加点赞功能。

<!-- more -->

## 背景介绍

对于创作者而言，没有交流就没有写作的动力。上个月，博客加入评论功能，初步打开了作者读者交互的通道。然而评论的操作门槛较高。首先读者必须有自己的 GitHub 账号，且同意授权登录。其次他得愿意打字分享自己的想法。相比之下，点赞是几乎零成本的交互方式。

静态博客的评论功能有很多开箱即用的框架，例如我使用的 Utteranc。点赞功能没有类似的框架。乐观地看，点赞的实现比评论简单太多。所以，我们可以自己动手写一个。

<Warn content={`引入评论区的一个月里，其实一条评论也没有。`} />

### Serverless Function & FaaS

首先简单介绍一下这个博客的技术背景。它依赖静态网页托管，由一套 CI/CD 完成页面的自动渲染和部署，最终靠 CDN 分发。在不依赖中心服务器的情况下，为这套体系加入点赞功能是困难的。

- 没有后端数据库，缺少**存储**功能
- 需要单独统计每篇文章的点赞数量，缺少**计算**功能

但如果为了一点破事就要加一个后端服务（即使是诸如此类的微服务），技术人员会非常崩溃。尤其是对于我们个人开发者而言，简单的点赞功能需要进行一整套工作：

1. 写一个后端 Web HTTP 服务器，监听 URI 接口并提供服务
2. 配置一个数据库，维护表关系

当然，我们也可以用 Python 快速写一个原型程序出来，跑在服务器的某个端口。但是为了让这个功能在生产环境长久稳定运行，我们还需要：

3. 制作镜像，配置宿主和容器的端口映射
4. 使用 Nginx/Apache 反向代理
5. 维护服务器，定期打漏洞补丁
6. 制定服务中断的通知与快速响应方案

做这么多事情，核心其实只是一个自增的计数器而已。用牛刀杀鸡已经是互联网应用的常态。随着 Serverless 概念的兴起，云服务商给程序员找到了一套低代码、高可用的解决方案——Serverless Function。简单来说，就是使用厂商提供的 API 完成全套开发。因此程序员不再关心数据的存储、系统的运行状态、架构的横向拓展，只需要关心具体的逻辑。

云服务厂商进一步提出了 FaaS (Function as a Service)，把**计算**和**存储**抽象成一组函数 API。FaaS 是各种 XaaS 的终极形态，是达到“人人可编程”目标的起点。以后的计算机应用技术职业教育可以把重点从体系架构转移到 FaaS 上，FaaS 是真正能促进产业发展的概念。

<Callout title={`🉑 我看 Serverless`} content={`拥有云服务器相当于买一辆车，使用 Serverless Function 相当于租一辆车。买车你需要上牌照、交保险、关心油费和年检，而租来的车可以直接放心开。当然，我们只能完全支配属于自己的车，所以租车和买车之间需要权衡。`} />

### AWS Lambda

这次我使用的就是亚马逊的 AWS Lambda。AWS Lambda 可以让开发人员只需编写包含逻辑要求的代码函数，并可部署、调用代码，确保代码的可靠性高、延展性强，而无需管理其他基础架构。这里，我们使用 [AWS SAM](https://docs.aws.amazon.com/lambda/latest/dg/serverless_app.html) 定义一个无服务器代码函数。这个代码函数将被部署至 AWS Lambda，使用 Python 编写，然后处理经由传输流接收到的点赞记录。

<Warn content={`鄙人不才，正好有一位即将在亚马逊供职的漂亮女友。`} />


## 需求与 API 设计

我想放在博客里的点赞功能非常简单。用户点击按钮给计数器加一。深思熟虑后我打算放弃一个用户只能点赞一次的后端校验，因为这实现起来有一些难度。当然，前端上还是做了小小的限制，相信绕过它是非常容易的事情。

<Warn content={`这绝对不是为了刷赞故意为之。`} />

对于这个需求，我打算开发两个 API：

| API         | Parameters | Description    |
| ----------- | ---------- | -------------- |
| /thumb/view | page_id    | 页面的点赞总数 |
| /thumb/up   | page_id    | 用户点赞       |

前端实现上，将每篇博客的 URL 经过编码后作为 page_id。后端实现上，用 DynamoDB 做点赞数记录。DynamoDB 是一个 NoSQL 数据库，可以理解成一个拥有超能力的 HashMap。

<Callout title={`🤔 如何实现点赞限制`} content={`如果没有用户注册与登录的功能，用户指纹也可以用来判断身份。指纹算法有非常丰富的实现，因为这是广告联盟做追踪器 (Tracker) 常见的伎俩。用户指纹不是真的指纹，而是通过各种设备信息，如浏览器版本、操作系统、IP 地址等算出的唯一 ID。`} />

## 实现

正如前文一直强调的一样——Lambda 的实现理应非常简单，而且也确实非常简单。这篇博客旨在强调 FaaS 在特定情形下的优势。

<Warn content={`下次遇到相同的需求的时候，记得用 FaaS 去实现。人生苦短，省点时间干点别的吧。`} />


### AWS 配置

根据掘金文章[^1]，一个名为 serverless 的框架可以帮助我们远离冗长文档、节约理解各种概念的时间。在阅读完冗长 AWS 文档和尝试理解 AWS 各种概念后，我选择相信它。

[^1]: [快速上手Aws Lambda：有了serverless，小学生也能写后端 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903879243481101)

AWS Lambda 函数可以用各种语言书写。这里我们就用 Python 来写一遍。我在腾讯实习期间用 Python 写过很多 CRUD，一直羞于启齿。为了进一步展示 FaaS 低代码的特性，我决定 ~~放下身段~~ 当众写一遍 CRUD。请你不要笑话我，使用动态语言本身就是一种低代码行为。

<Warn content={`后文会谈到，这篇文章原本的基调是 Go 语言…`} />

首先在 GitHub 上找找有没有可以抄的案例。不出所料，serverless 框架的 example 里就有这么一项[^2]。它用 Python 实现了 AWS DynamoDB 的调用，并且配置了 HTTP API 的触发器。serverless 框架可以帮助我们自动完成 AWS 中的各种配置。

我们复制它作为模板。直接输入命令 `sls deploy` 就可以将样例函数部署到 AWS 上，其中涉及到的 API Gateway, Trigger, DynamoDB 也已经全部自动配置好了。

[^2]: [github.com/serverless/examples/aws-python-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-python-rest-api-with-dynamodb)

### Lambda 实现

两个 API 一共两个函数。

-  `view` 负责展示页面点赞数。如果点赞数不存在，则初始化一个点赞数为 0 的条目。
-  `up` 负责为页面点赞数加一。如果点赞数不存在，则初始化一个点赞数为 1 的条目。

这里我贴出 `view` 函数的实现。可以看到代码很短，充分体现 Serverless 加速开发的优势。

```python filename=thumbs/view.py
import os
import json
from thumbs import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')
def view(event, context):
  table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
  result = table.get_item(
    Key={ 'id': event['pathParameters']['id'] }
  )
  if 'Item' not in result:
    item = { 'id': event['pathParameters']['id'], 'num': 0 }
    table.put_item(Item=item)
    response = { "statusCode": 200, "body": json.dumps(item) }
  else:
    response = {
    "statusCode": 200,
    "body": json.dumps(result['Item'],
                       cls=decimalencoder.DecimalEncoder)
    }
  return response
```

## 效果

在 Gateway 里绑定域名。添加证书，配置好 DNS——💥boom，一个点赞 API 就诞生了。这个 API 不依赖任何私有服务器，完完全全托管在云上。

![](/images/0CtP59.png)

你也可以直接试试页面下方的点赞功能。点击 +1 图标，就可以为这篇博客增加一个 <span className="text-pink-500"><i className="fas fa-heart"></i></span>。

## 讨论

虽然前面一直说简单，其实第一次上手还是遇到了不少问题。

1. Serverless 经过几次版本变更，网上流传的各种配置文件结构混乱不堪。最让我吃惊的是，同一个大版本下的配置文件竟然不能向前兼容。其实我本来打算全程用 Go 语言实现这个功能，而且代码已经写了一半。但最后因为 Serverless 配置文件版本问题一直没能在 AWS 上成功部署。所以被迫换成了 Python。
2. Lambda 难以调试。函数代码与平台运行时 (runtime) 紧耦合，本地没有这样的条件。例如，在 AWS 里进行数据库查询就不能在本地运行，更不用提调试。这是因为本地没有调用远端数据库的权限。况且 DynamoDB 是私有 NoSQL 数据库，这种简单的小程序不可能专门为它写一个 mock-up 做测试。在开发过程中，数据交互层 (DAO) 的正确性全部靠**运气**和**耐心**。AWS 平台的卡顿程度也令人印象深刻。
3. 此外，竟然遇到了 Python Json 库的陈年酱香老 Bug[^3]。这个 Bug 出现的时间是2012 年，2020 年 12 月进入 patch-review 阶段，不知何时才能修复。函数在调用`json.dumps()`时一定要实现自己的 JsonEncoder 才能正常返回。

[^3]: [Issue 16535: json encoder unable to handle decimal - Python tracker](https://bugs.python.org/issue16535)



瑕不掩瑜，在开发这些小功能时，LaaS 就是最好的选择。相信这篇文章的介绍可以让你或多或少了解 LaaS 的现状，以及程序开发正在走向的未来。最后，如果你喜欢，请给这篇文章点个赞。你的支持就是我最大的动力。

