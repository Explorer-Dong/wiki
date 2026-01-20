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

        // 避免重复插入
        if (img.dataset.hasCaption === "true") return;

        const caption = document.createElement("div");
        caption.className = "markdown-img-caption";
        caption.textContent = altText;

        // 插入到图片后面
        img.insertAdjacentElement("afterend", caption);

        // 标记已处理
        img.dataset.hasCaption = "true";
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
