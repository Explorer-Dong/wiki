<div align="center">
    <a href="https://wiki.dwj601.cn/">
        <img src="./overrides/assets/cover-image.png" alt="Site Cover Image" />
    </a>
</div>

本网站以体系化的 AI/CS 学习笔记为基础，旨在构建一个 **开放知识社群 (Open Wiki Community)**。如果您觉得内容不错，欢迎⭐！

笔记按照 Markdown 格式记录，站点采用 MkDocs 框架编译，云端基于 Aliyun OSS 服务部署。访问链接：<https://wiki.dwj601.cn/>。

## 站点预览 / Site Preview

<div align="center">

```mermaid
graph LR
    %% 实体定义
    aics_base(学科基础专栏)
    data_science(数据科学专栏)
    ds_and_algo(传统算法专栏)
    dev_tools(开发工具专栏)
    front_end(前端开发专栏)
    back_end(后端开发专栏)
    dev_ops(运维开发专栏)

    %% 关系定义
    aics_base --> data_science
    ds_and_algo --> data_science & back_end
    dev_tools --> front_end & back_end & dev_ops
```

<caption> 站点内容拓扑图 </caption>

</div>

## 贡献名单 / Contributors

<a href="https://github.com/Explorer-Dong/wiki/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Explorer-Dong/wiki" />
</a>

## 星标历史 / Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Explorer-Dong/wiki&type=Date)](https://www.star-history.com/#Explorer-Dong/wiki&Date)
