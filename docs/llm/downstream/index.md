---
title: 下游应用
---

随着模型能力的演进，仅仅在网页上对话已经无法发挥出其全部实力了，需要结合一些工程策略来彻底释放 AI 的能力。目前常见的有：

- 检索生成增强 (Retrieval-Augmented Generation, RAG)：一种提示词策略，通过向量检索来丰富大模型的输入，从而降低模型幻觉。比较著名的开源 RAG 工具有 [RAGFlow](https://github.com/infiniflow/ragflow) 等。当然，随着大模型的上下文越来越大，RAG 的作用逐渐存疑。
- 工作流 (Workflow)：用户自定义一个工作流程，然后让大模型在其中起决策性作用。常见的 Workflow 编排工具有 [Dify](https://dify.ai/zh)、[扣子](https://code.coze.cn/home) 等。
- 智能体 (Agent)：相较于 Workflow 需要编排任务流程，Agent 则是直接基于任务让大模型自己做各种行动和决策，大模型的自主性更高。目前智能体能力 (Agentic) 也已经成为大模型能力的核心评判标准之一。比较常见的智能体就是 [代码智能体](./code-agent.md) (Code Agent)，例如 [Cursor](https://cursor.com/)、[Claude Code](https://code.claude.com/docs/zh-CN/overview)、[Codex](https://chatgpt.com/codex)、[OpenCode](https://opencode.ai/)、[iFlow](https://iflow.cn/) 等。其他诸如办公、金融等类型的智能体本质上就是把提示词从代码切换为了其它类型的数据源，工作逻辑都是类似的。

无论形式如何，大模型的下游应用本质上都是一种 [提示词工程](https://developers.openai.com/api/docs/guides/prompt-engineering) (Prompt Engineering)，即通过合适的提示词引导大模型输出想要的结果。OpenAI 是这样解释 Prompt Engineering 的：

> Prompt engineering is the process of writing effective instructions for a model, such that it consistently generates content that meets your requirements.
