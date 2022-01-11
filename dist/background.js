chrome.tabs.onUpdated.addListener((tabId, {status}) => {
  if (status === 'complete') {
    chrome.tabs.sendMessage(tabId, {type: 'update'});
  }
});

chrome.runtime.onMessage.addListener(({type, title}, {frameId, tab: {id: tabId}}) => {
  if (frameId === 0) {
    const path = `img/icon-${type}.png`;
    chrome.pageAction.setIcon({tabId, path});
    chrome.pageAction.setTitle({tabId, title});
    chrome.pageAction[type == 'disabled' ? 'hide' : 'show'](tabId);
  }
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {type: 'click'});
});
