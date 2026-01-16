chrome.tabs.onUpdated.addListener((tabId, {status}) => {
  if (status === 'complete') {
    chrome.tabs.sendMessage(tabId, {type: 'update'}).catch(() => {});
  }
});

chrome.runtime.onMessage.addListener(({type, title}, {frameId, tab: {id: tabId}}) => {
  if (frameId === 0) {
    const path = `img/icon-${type}.png`;
    chrome.action.setIcon({tabId, path});
    chrome.action.setTitle({tabId, title});
    if (type === 'disabled') {
      chrome.action.disable(tabId);
    } else {
      chrome.action.enable(tabId);
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {type: 'click'}).catch(() => {});
});
