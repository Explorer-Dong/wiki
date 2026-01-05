---
title: TurboDiffusion
status: new
---

TurboDiffusion 是清华 MLSys 团队近日提出的视频生成加速方案。其基于 Wan2.1 T2V 和 Wan2.2 I2V 模型进行了百倍加速，且视频质量损失较小。本文尝试解读其使用的各种加速方案，并应用到其他模型上。

## Wan

### Wan2.1

[Code](https://github.com/Wan-Video/Wan2.1) [Paper](https://arxiv.org/pdf/2503.20314)

Wan2.1 模型架构：

![Wan 模型架构](https://cdn.dwj601.cn/images/20260105111949527.png)

Wan2.1 I2V 模型架构：

![Wan2.1 I2V 模型架构](https://cdn.dwj601.cn/images/20260105112623336.png)

### Wan2.2

[Code](https://github.com/Wan-Video/Wan2.2)

模型架构方面，相较于 Wan2.1，Wan2.2 主要引入了混合专家 (Mixture-of-Experts, MoE) 架构。

![Wan2.2 MoE 架构](https://cdn.dwj601.cn/images/20260105114028959.png)

## TurboDiffusion

[Code](https://github.com/thu-ml/TurboDiffusion) [Paper](https://arxiv.org/pdf/2512.16093) [Blog](https://zhuanlan.zhihu.com/p/1986292974531936666)

主要加速方案：

- **Attention acceleration**: TurboDiffusion uses low-bit SageAttention and trainable Sparse-Linear Attention (SLA) to speed up attention computation.
- **Step distillation**: TurboDiffusion adopts rCM for efficient step distillation.
- **W8A8 quantization**: TurboDiffusion quantizes model parameters and activations to 8 bits to accelerate linear layers and compress the model.
