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
