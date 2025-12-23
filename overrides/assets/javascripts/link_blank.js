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