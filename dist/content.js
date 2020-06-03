const UnnecessaryParams = [
  '_ga',
  'action_object_map',
  'action_ref_map',
  'action_type_map',
  'fb_action_ids',
  'fb_action_types',
  'fb_aggregation_id',
  'fb_comment_id',
  'fb_ref',
  'fb_source',
  'fb_xd_fragment',
  'gclid',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_place',
  'utm_reader',
  'utm_source',
  'utm_term'
];
const UnnecessaryParamRegex = /^ga_/;

function isNecessaryParam(param) {
  const name = param.split('=')[0];
  return !(UnnecessaryParams.includes(name) || UnnecessaryParamRegex.test(name));
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

  if (canonical.origin != original.origin) {
    return State('other-origin', `Open the "${canonical.href}"`, canonical.href);
  }
  else if (current.href != canonical.href) {
    const title = canonical.href == original.href
      ? 'Return to original (canonical) URL'
      : `Change to ${UrlInfo.linkUrl ? 'canonical' : 'pure'} URL`
      ;
    return State('non-canonical', title, canonical.href);
  }
  else if (current.href != original.href) {
    return State('canonical', 'Return to original URL', original.href);
  }
  else if (UrlInfo.previousUrl) {
    return State('canonical', 'Change to previous URL', UrlInfo.previousUrl);
  }
  else if (UrlInfo.linkUrl) {
    return State('canonical', 'This is canonical URL');
  }
  else {
    return State('disabled', '');
  }
}

const handler = {
  update({url}) {
    if (!UrlInfo.originalUrl) {
      const linkUrl = getCanonicalLinkUrl();
      const pureUrl = getPureUrl(url);
      Object.assign(UrlInfo, {
        originalUrl: url,
        canonicalUrl: linkUrl || pureUrl,
        linkUrl, pureUrl
      });
    }
    UrlInfo.previousUrl = UrlInfo.currentUrl;
    UrlInfo.currentUrl = url;
    chrome.runtime.sendMessage(getState());
  },

  click() {
    if (UrlInfo.originalUrl) {
      const {state, url} = getState();
      if (state == 'other-origin') {
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
