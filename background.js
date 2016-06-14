var tooltipHint = {
    canonical: 'Change to original URL',
    original:  'Change to canonical URL',
    otheOrigin: 'Open the canonical URL'
};

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'clicked', function(name) {
        change_action(tab, name);
    });
});

// first time only
chrome.runtime.onMessage.addListener(function(name, sender) {
    change_action(sender.tab, name);
});

function change_action(tab, name) {
    chrome.pageAction.setIcon({
        path: 'img/icon-' + name + '.png',
        tabId: tab.id
    });
    chrome.pageAction.setTitle({
        title: tooltipHint[name],
        tabId: tab.id
    });
    chrome.pageAction.show(tab.id);
}
