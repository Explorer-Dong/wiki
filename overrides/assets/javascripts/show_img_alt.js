document.addEventListener("DOMContentLoaded", function () {
  const mdContentDivs = document.querySelectorAll(".md-content");

  mdContentDivs.forEach((mdDiv) => {
    const imageLinks = mdDiv.querySelectorAll("a > img[alt]");

    imageLinks.forEach((img) => {
      // 跳过贡献者头像图片，位于 <aside class="md-source-file"> 内部的 img
      if (img.closest("aside.md-source-file")) {
        return;
      }

      const altText = img.getAttribute("alt");
      const aTag = img.parentElement;

      // 避免重复插入
      const alreadyInserted = aTag.nextElementSibling;
      if (
        altText.trim() !== "" &&
        aTag &&
        aTag.tagName.toLowerCase() === "a" &&
        !(alreadyInserted && alreadyInserted.classList.contains("markdown-img-caption"))
      ) {
        const caption = document.createElement("div");
        caption.className = "markdown-img-caption";
        caption.textContent = altText;
        aTag.insertAdjacentElement("afterend", caption);
      }
    });
  });
});
