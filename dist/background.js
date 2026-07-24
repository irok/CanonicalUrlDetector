chrome.tabs.onUpdated.addListener((tabId, {status}) => {
  if (status === 'complete') {
    chrome.tabs.sendMessage(tabId, {type: 'update'}).catch(() => {});
  }
});

const IconTypes = ['canonical', 'non-canonical', 'disabled', 'other-origin'];

chrome.runtime.onMessage.addListener(({type, title}, {frameId, tab: {id: tabId}}) => {
  if (frameId === 0 && IconTypes.includes(type)) {
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
