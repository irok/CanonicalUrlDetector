const UnnecessaryParams = [
  /^action_[a-z]+_map$/,
  /^fb(?:_[a-z]+)+$/,
  /^ga_/,
  /^utm_[a-z]+$/,
  '_fbc',
  '_fbp',
  '_ga',
  '_gl',
  'dclid',
  'fbclid',
  'gclid',
  'gclsrc',
  'gbraid',
  'msclkid',
  'ref_src',
  'ref_url',
  'ttclid',
  'twclid',
  'wbraid',
  'yclid',
];

function isUnnecessaryParam(name) {
  return UnnecessaryParams.some(pattern =>
    pattern instanceof RegExp ? pattern.test(name) : pattern === name
  );
}

function isNecessaryParam(param) {
  const name = param.split('=')[0];
  return !isUnnecessaryParam(name);
}

function getPureUrl(url) {
  const _ = new URL(url);
  const params = _.search.length ? _.search.substr(1).split('&').filter(isNecessaryParam) : [];
  const query = params.length ? `?${params.join('&')}` : '';
  return `${_.protocol}//${_.host}${_.pathname}${query}`;
}

function getCanonicalLinkUrl() {
  const link = document.querySelector('link[rel="canonical"]');
  return link && link.href;
}

const UrlInfo = {};
const State = (type, title, url) => ({type, title, url});

function getState() {
  const canonical = new URL(UrlInfo.canonicalUrl);
  const original = new URL(UrlInfo.originalUrl);
  const current = new URL(UrlInfo.currentUrl);

  // current has fragment that canonical doesn't have: click to remove fragment
  if (current.hash && !canonical.hash) {
    const currentWithoutHash = `${current.protocol}//${current.host}${current.pathname}${current.search}`;
    if (currentWithoutHash === canonical.href) {
      return State('non-canonical', 'Remove fragment', canonical.href);
    }
  }

  // canonical == original: no action needed
  if (canonical.href == original.href) {
    return State('disabled', '');
  }

  // current == canonical: click to return to original
  if (current.href == canonical.href) {
    return State('canonical', 'Return to original URL', original.href);
  }

  // different origin: click to open in new window
  if (canonical.origin != current.origin) {
    return State('other-origin', `Open the "${canonical.href}"`, canonical.href);
  }

  // otherwise: click to change to canonical
  const title = `Change to ${UrlInfo.linkUrl ? 'canonical' : 'pure'} URL`;
  return State('non-canonical', title, canonical.href);
}

const handler = {
  update() {
    const url = location.href;
    if (!UrlInfo.originalUrl) {
      const linkUrl = getCanonicalLinkUrl();
      const pureUrl = getPureUrl(url);
      Object.assign(UrlInfo, {
        originalUrl: url,
        canonicalUrl: linkUrl || pureUrl,
        linkUrl, pureUrl
      });
    }
    UrlInfo.currentUrl = url;
    chrome.runtime.sendMessage(getState());
  },

  click() {
    if (UrlInfo.originalUrl) {
      const {type, url} = getState();
      if (type == 'other-origin') {
        window.open(url, '_blank');
      }
      else if (url) {
        history.replaceState(null, null, url);
      }
    }
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (handler[message.type]) {
    handler[message.type](message);
  }
});

window.addEventListener('hashchange', () => {
  handler.update();
});
