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
