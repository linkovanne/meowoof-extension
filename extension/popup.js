const targetURL = '../frontend/popup.html'
chrome.windows.create(
    {
        url: chrome.runtime.getURL(targetURL),
    },
)
