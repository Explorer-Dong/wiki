---
title: 基础设施
---

AI 基础设施 (AI Infrastructure) 是 AI 研究与应用的命脉所在，决定了模型能否在「稳定、高效、低成本」的前提下完成「训练与部署」。自底向上可以划分为以下四个部分：

- [**硬件生态 (Hardware Ecosystem)**](./hardware-eco/index.md)：包括计算硬件（GPU、TPU、NPU、Ascend）、网络通信（InfiniBand、NVLink、RoCE）、存储系统（NVMe SSD）等。负责提供算力与高效通信，是整个 AI Infra 的底座；
- [**数据系统 (Data System)**](./data-sys/index.md)：包括数据采集与治理、分布式文件系统、开源数据仓库（Hugging Face、ModelScope 等）、向量数据库（FAISS、Milvus）等。支撑模型从数据获取到预处理再到高效加载的完整生命周期，是训练效率与模型质量的关键；
- [**训练框架 (Training Framework)**](./training-framework/index.md)。包括深度学习框架（PyTorch、TensorFlow、JAX）、分布式训练（DDP、FSDP、ZeRO、Megatron-LM、DeepSpeed）、编译与优化（TorchInductor、Triton、XLA、TVM）、训练效率提升（混合精度训练、动态调度）等。负责将硬件资源转化为模型能力，是算力与算法结合的桥梁；
- [**推理服务 (Inference & Serving)**](./inference-server/index.md)。包括模型压缩与加速（量化、蒸馏、剪枝）、高效推理机制（KV Cache 管理、PagedAttention、动态批处理）、算子与内核优化（CUDA Graph、FlashAttention、TensorRT）、模型编排与路由（多模型选择、负载均衡）、安全与治理（提示词防注入、内容过滤、访问控制）、部署框架（vLLM、SGLang）等。负责将模型部署为可用的服务，实现低延迟、高吞吐、低成本的在线推理。

部分参考：

- [大模型技术博客 - 知乎猛猿](https://zhuanlan.zhihu.com/p/654910335)
- [Infrasys-AI/AIInfra](https://github.com/Infrasys-AI/AIInfra)

??? tip "AI Infra 架构图参考"

    <a href="https://blog.segmind.com/the-generative-ai-infrastructure-landscape-by-segmind/">The Generative AI Infrastructure Landscape by Segmind</a>

    <img src="https://cdn.dwj601.cn/images/20251026131940988.png" alt="The Generative AI Infrastructure Landscape" />

    <a href="https://github.com/Infrasys-AI/AIInfra">Infrasys-AI/AIInfra</a>

    <img src="https://cdn.dwj601.cn/images/20251026131637435.jpg" alt="大模型系统全栈" />

    <a href="https://www.felicis.com/insight/ai-data-infrastructure">AI Data Infrastructure Value Chain</a>

    <img src="https://cdn.dwj601.cn/images/20251026131735769.png" alt="AI Data Infrastructure Value Chain" />
