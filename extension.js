chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("./src/welcome.html")
    });
});