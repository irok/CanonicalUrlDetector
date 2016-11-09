var tooltipHint = {
    canonical: 'Change to original URL',
    original:  'Change to canonical URL',
    otherOrigin: 'Open the canonical URL'
};

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'clicked', function(status) {
        change_action(tab, status);
    });
});

// first time only
chrome.runtime.onMessage.addListener(function(status, sender) {
    change_action(sender.tab, status);
});

function change_action(tab, status) {
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
