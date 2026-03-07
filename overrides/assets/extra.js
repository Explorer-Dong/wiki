/**
 * 给外链加上小箭头
 */
document$.subscribe(function () {
    const currentHostname = window.location.hostname;
    const allLinks = document.querySelectorAll("a[href]");

    allLinks.forEach(link => {
        try {
            const linkUrl = new URL(link.href);
            // 判断是否为外链：协议为 http/https 且 域名不一致
            if (linkUrl.hostname !== currentHostname) {
                link.setAttribute("target", "_blank");
                // 建议同时添加 rel="noopener" 以增强安全性
                link.setAttribute("rel", "noopener");
            }
        } catch (e) {
            // 忽略无效或相对路径解析错误
        }
    });
});

/**
 * 在页脚显示备案信息
 */
document$.subscribe(() => {
    const container = document.querySelector(".md-copyright");
    if (!container) return;

    const record = document.createElement("div");
    record.innerHTML = `
    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
      苏ICP备2024087610号-1
    </a>
    `;

    container.appendChild(record);
});

/**
 * 百度统计
 */
document$.subscribe(function () {
    if (window._hmt_initialized) {
        return
    }
    window._hmt_initialized = true

    window._hmt = window._hmt || []

    const hm = document.createElement("script")
    hm.src = "https://hm.baidu.com/hm.js?2671a19c27555d4fe9a537eb8b224efc"
    hm.async = true

    const s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore(hm, s)
})

/**
 * 在图片下方显示 alt 文本
 */
document$.subscribe(() => {
    const container = document.querySelector(".md-content__inner.md-typeset");
    if (!container) return;

    const images = container.querySelectorAll("img");

    images.forEach((img) => {
        const altText = img.getAttribute("alt");
        if (!altText) return;

        const caption = document.createElement("div");
        caption.className = "markdown-img-caption";
        caption.textContent = altText;

        const parent = img.parentElement;
        if (parent && parent.tagName === "A" && parent.classList.contains("glightbox")) {
            // 如果启用了 glightbox，则在 img 外层的 a 标签后插入
            parent.insertAdjacentElement("afterend", caption);
        } else {
            // 否则直接在 img 后插入
            img.insertAdjacentElement("afterend", caption);
        }
    });
});

/**
 * 公式支持
 */
document$.subscribe(({ body }) => {
    renderMathInElement(body, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
        ],
    })
})

/**
 * 在文章标题 TOC 上方自定义内容块
 */
document$.subscribe(() => {
    const page_key = location.pathname;

    // 若当前页面已关闭内容块，则不再渲染
    if (sessionStorage.getItem(page_key)) return;

    // 将内容快插入到右侧文章标题 TOC 的上方
    const sidebar = document.querySelector(".md-sidebar--secondary");
    if (sidebar) {
        const toc = sidebar.querySelector(".md-nav--secondary");
        if (!toc) return;

        // 创建内容块
        const block = document.createElement("div");
        block.className = "toc-above-block";
        block.innerHTML = `
            <button class="toc-above-block__close" aria-label="关闭">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
            <p>📣活动</p>
            <p>1.
                <a target="_blank" href="https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=jpec1z57" style="color: orange;">
                    阿里云服务器 38 元一年
                </a>
            </p>
            <p>2.
                <a target="_blank" href="https://www.aliyun.com/minisite/goods?userCode=jpec1z57" style="color: orange;">
                    阿里云 9 折商品链接
                </a>
            </p>
            <p>3.
                <a target="_blank" href="https://s.qiniu.com/IJNj2u" style="color: lightblue;">
                    七牛云 AI token 免费送
                </a>
            </p>
        `;
        // 插入内容块
        toc.parentNode.insertBefore(block, toc);
        // 监听内容块关闭事件
        block.querySelector(".toc-above-block__close").addEventListener("click", () => {
            block.remove();
            sessionStorage.setItem(page_key, "1");
        });
    };
})
