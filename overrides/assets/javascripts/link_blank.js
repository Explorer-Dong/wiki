function link_blank() {
    // 获取当前页面的域名
    const currentHostname = window.location.hostname;

    // 选择文档中所有的 a 标签
    const allLinks = document.querySelectorAll("a[href]");

    // 给外链添加 _blank 属性
    allLinks.forEach(link => {
        const linkUrl = new URL(link.href);
        if (linkUrl.protocol === "http:" || linkUrl.protocol === "https:") {
            if (linkUrl.hostname !== currentHostname) {
                link.setAttribute("target", "_blank");
            }
        }
    });
}

// 在页面加载完成后执行
window.addEventListener("load", link_blank);
