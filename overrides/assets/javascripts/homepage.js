(function () {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // 创建 <style> 标签并注入 CSS
        const style = document.createElement('style');
        style.textContent = `
            .md-content:not(.mermaid) {
                max-width: 1024px !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
        `;

        // 插入到 <head> 最前面，确保优先级
        document.head.insertBefore(style, document.head.firstChild);
    }
})();