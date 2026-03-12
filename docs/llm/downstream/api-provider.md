---
title: API 供应商
---

随着大模型基模团队越来越多，各种强势模型不断涌现，对应的推理服务供应商也越来越多。在权衡模型能力和模型价格的情况下，我们需要根据自己的情况选购对应的 AI 推理 API 服务。

关于模型能力，我们可以参考一个比较权威的大模型榜单：[Artificial Analysis](https://artificialanalysis.ai/)。

关于模型价格，除了直接去对应的开发者平台查看，也可以查看开源社区维护的 [Models.dev](https://models.dev/)。

## 官方平台

官方平台稳定可靠，但国外大模型有支付门槛。

### ChatGPT

开发者平台：<https://developers.openai.com/>

### Gemini

开发者平台：<https://aistudio.google.com>

### Claude

开发者平台：<https://platform.claude.com/dashboard>

### DeepSeek

开发者平台：<https://platform.deepseek.com/usage>

### Qwen

开发者平台：<https://bailian.console.aliyun.com/cn-beijing/#/home>

### GLM

开发者平台：<https://bigmodel.cn/>

### Minimax

开发者平台：<https://platform.minimaxi.com/docs/guides/models-intro>

## 中转站

第三方平台，价格相对较低，但稳定性有待考量。

- [OpenRouter](https://openrouter.ai/)：头部中转站，费用较高，较高的并发有累计充值门槛。
- [硅基流动](https://siliconflow.cn/zh-cn/models)：只支持部分模型。
- [阿里云百炼](https://bailian.console.aliyun.com/#/home)：只支持阿里系模型。
- [七牛云](https://portal.qiniu.com/home)、[七牛云支持的 Model](https://sufy.com/zh-CN/services/ai-inference/models)：模型列表比官网更全，懂得都懂。
- [PlanetZero API](https://api.planetzero.live/)：并发性不错，模型也比较全，价格也比较低，但稳定性不能保证。

## API 管理

除非特殊情况，否则不推荐只在一家消费，容易造成“学习偏差”，但多方注册往往意味着有很多 API Key 需要管理，这里我推荐一个开源工具 [octopus](https://github.com/bestruirui/octopus) 来管理 API Key。

一键部署：

```bash
docker volume octopus
docker run -d \
  --name octopus \
  -v octopus:/app/data \
  -p 8080:8080 \
  bestrui/octopus
```

!!! tip "部署方案"
    更推荐本地部署使用，因为当并发请求比较大时，对服务器的性能要求比较高，读者可根据自己的服务器情况自行选择，因为这个工具理论上可以作为中转站给第三方使用的，只要你有足够的低价 token。

服务启动后，把各 API 按照要求填到「渠道」中即可。一个比较好用的方法就是「分组」：在渠道添加好供应商后，可以把相同的模型设置到一个分组（池子）里，后续通过自定义的池子名称（这里是 ds-chat），就可以一个接口按照某种规则（这里是轮询）访问池子里的接口了：

![池子里有 DeepSeek 官方的 API，也有第三方供应商提供的 API](https://cdn.dwj601.cn/images/20260312100944505.png)

在设置里创建一个 API Key 后，就可以一个接口访问池子里的所有接口了：

![一个接口访问池子里的所有接口](https://cdn.dwj601.cn/images/20260312103919929.png)
