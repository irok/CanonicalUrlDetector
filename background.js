var tooltipHint = {
    canonical: 'Change to original URL',
    original:  'Change to canonical URL',
    otherOrigin: 'Open the canonical URL'
};

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'clicked');
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.sendMessage(details.tabId, 'changed');
});

chrome.runtime.onMessage.addListener(function(status, sender) {
    changeAction(sender.tab, status);
});

function changeAction(tab, status) {
    chrome.pageAction.setIcon({
        path: 'img/icon-' + status.code + '.png',
        tabId: tab.id
    });
    chrome.pageAction.setTitle({
        title: status.code === 'otherOrigin' ? status.url.canonical : tooltipHint[status.code],
        tabId: tab.id
    });
    chrome.pageAction.show(tab.id);
}
