---
title: 基础设施
---

稳定、低成本地训练与服务大模型。关注并行策略、内存/带宽、批量化、编译/内核优化与可观测性。

## A. 训练体系

1. **并行范式全景**：数据并行（DP）、模型并行（TP/PP）、ZeRO/FSDP 混合；通信拓扑与带宽约束。
    - 参考：Shoeybi et al., 2019（Megatron-LM）；Rajbhandari et al., 2020（ZeRO）。
2. **混合精度与数值**：FP16/BF16/FP8；损失标度；溢出诊断；检查点恢复策略。
3. **高效数据管线**：多进程/异步预取、压缩格式、样本混洗与重复控制。

## B. 推理加速

1. **KV Cache 工程**：布局、重用与跨请求共享；连续批处理（Continuous Batching）。
2. **PagedAttention 与内存管理**：分页化 KV、减少碎片；流量突发与尾延迟治理。
    - 参考：vLLM（Kwon et al., 2023）。
3. **推理编译与内核**：TensorRT-LLM、Triton kernel、CUDA Graph；Flash-Decoding。
4. **解码加速策略**：投机解码（Speculative Decoding）、多草稿（Medusa/EAGLE）与质量回退。
    - 参考：Leviathan et al., 2023（Speculative Decoding）。

## C. 量化与蒸馏

1. **后训练量化（PTQ）**：INT8/GPTQ/AWQ 的差异与适用场景。
2. **量化感知训练（QAT）与 QLoRA**：适配器微调在有限显存下的性价比。
    - 参考：Hu et al., 2022（LoRA）；Dettmers et al., 2023（QLoRA）。

## D. 服务化与可运维

1. **服务路由与多租户**：模型选择器、容量规划、弹性伸缩与成本控制（P50/P95、吞吐/成本曲线）。
2. **可靠性与观测**：灰度与 A/B、SLO/SLA、漂移监测、数据反馈闭环（Eval→Guardrail→ 迭代）。
3. **合规与安全**：审计/脱敏/水印；提示注入与越狱防护的工程手段。

