let isOpen = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("./src/welcome.html")
    });
});

chrome.action.onClicked.addListener((tab) => {
    isOpen = !isOpen;

    if (isOpen) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['./src/js/mark.min.js', './src/js/index.js']
        });
    }
});
