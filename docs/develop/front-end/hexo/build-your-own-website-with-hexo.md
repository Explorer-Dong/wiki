---
title: Hexo 建站指南
---

笔记记多了，想要分享给同学们一起交流进步，该怎么办？想要搭建一个属于自己的知识库，不仅仅局限在 PC 上，移动端也能随时查看与编辑，该怎么办？搭建一个属于自己的博客网站是是一个不错的选择！现在主流建站模式有两个：

1. 有后端：WordPress [^wp]；
2. 无后端：Hexo [^hexo]、VuePress [^vuepress]、Gatsby [^gatsby]。

[^wp]: [全球数百万网站（从创作者、小型企业到大型企业）的首选开源发布平台 | WordPress - (cn.wordpress.org)](https://cn.wordpress.org/)
[^hexo]: [快速、简洁且高效的博客框架 | Hexo - (hexo.io)](https://hexo.io/zh-cn/)
[^vuepress]: [Vue 驱动的静态网站生成器 | VuePress - (v2.vuepress.vuejs.org)](https://v2.vuepress.vuejs.org/zh/)
[^gatsby]: [Start building amazing web experiences | Gatsby - (www.gatsbyjs.com)](https://www.gatsbyjs.com/docs)

有后端的博客网站可以是可以，但是对于轻量化的个人知识博客显得有些笨重，而无后端的「静态站点」很适合更新不怎么频繁的中小型知识库场景。所谓的静态站点，其实就是利用一个转换工具将自己写好的 Markdown 笔记文件转换为 HTML 文件，打包部署后就可以全球共享了。也就是说我们只需要关注文章的内容本身，即可在极短的时间内构建一个所有人都可以访问的博客网站。

本博客以 Hexo 为例讲解如何从零开始搭建一个自己的博客网站 [^luke]。在开始之前，你需要确保本地机配置好了 Node 运行时环境、Git 工具链和一个 GitHub 账号。

[^luke]: [Luke 教你 20 分钟快速搭建个人博客 | Luke - (www.bilibili.com)](https://www.bilibili.com/video/BV1dt4y1Q7UE)

## 生成站点

我们需要创建一个虚拟环境用来管理我们博客网站的内容。

1）安装 Hexo 的命令行工具

```bash
npm install -g hexo-cli
```

2）初始化一个静态站点

```bash
hexo init
```

3）安装所有依赖

```bash
npm install
```

## 本地测试

1）生成静态文件

```bash
hexo generate  # 可简写为 hexo g
```

2）启动本地服务

```bash
hexo server  # 可简写为 hexo s
```

Hexo 服务默认占用 4000 端口。现在用浏览器访问 `http://localhost:4000`，如果可以看到 Hexo 的默认博客网站，那么你已经成功了大半。

## 部署云端

这里介绍一种容错率较高的部署方案。基于 Hexo 插件 hexo-deploy-git 将网站部署到 GitHub Pages 上。

> 简单介绍一下 GitHub Pages。这是 GitHub 官方提供的静态站点托管平台，其可以以「项目、个人和组织」三种形式进行托管，例如项目可以通过 `https://<username/orgname>.github.io/<project>/` 访问到；个人可以通过 `https://<username>.github.io/` 访问到；组织可以通过 `https://<orgname>.github.io/` 访问到。

下面以项目部署方式为例，将站点部署到 `https://<username>.github.io/<repo>`。

1）安装 Hexo 部署包 hexo-deployer-git

```bash
npm install hexo-deployer-git --save  # --save 是为了写入库依赖表 packge.json
```

2）创建一个 GitHub 仓库并将本地项目推送到 GitHub（如果想要以个人或组织的形式建站，就将仓库名取为 `<username/orgname>.github.io`，否则随意）

```bash
git add .
git commit -m 'init'
git remote add origin https://github.com/Explorer-Dong/demo.git
git push -u origin main
```

3）配置 _config.yml 文件（假设仓库名为 demo 并且将站点托管在推送到仓库的 public 分支下）

```yaml
# 网站地址
url: https://explorer-dong.github.io/demo

# 部署策略
deploy:
  type: git
  repo: https://github.com/Explorer-Dong/demo.git
  branch: public
```

4）部署（其实就是把生成的网站 push 到上述部署策略的仓库分支中）

```bash
hexo deploy  # 可简写为 hexo d
```

5）配置 GitHub Pages。选择 Source 为 Deploy from a branch 并选用 public 分支

![配置 GitHub Pages 页面](https://cdn.dwj601.cn/images/202501220201709.png)

现在访问 `https://<username>.github.io/demo/`，如果可以看到与之前本地测试时一样的界面，恭喜你，现在已经可以在项目的 `source/_post/` 目录下撰写博客并且全球共享了！
