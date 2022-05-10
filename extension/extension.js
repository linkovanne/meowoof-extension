const ANGULAR_HTML_URL = "../../frontend/dist/frontend/index.html";

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL(ANGULAR_HTML_URL)
    });
});

chrome.runtime.onConnect.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL(ANGULAR_HTML_URL)
    });
});
