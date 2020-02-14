const UnnecessaryParams = [
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

function getCanonicalUrl() {
  const link = document.querySelector('link[rel="canonical"]');
  return link && link.href;
}

const UrlInfo = {};
const State = (type, title, url) => ({type, title, url});

function getState() {
  const original = new URL(UrlInfo.originalUrl);
  const canonical = new URL(UrlInfo.canonicalUrl || UrlInfo.pureUrl);
  const current = new URL(UrlInfo.currentUrl);

  if (canonical.origin != original.origin) {
    return State('other-origin', `Open the "${canonical.href}"`, canonical.href);
  }
  else if (canonical.href != current.href) {
    const type = UrlInfo.canonicalUrl ? 'canonical' : 'pure';
    return State('non-canonical', `Change to ${type} URL`, canonical.href);
  }
  else if (canonical.href != original.href) {
    return State('canonical', 'Return to original URL', original.href);
  }
  else {
    return State('disabled', '');
  }
}

const handler = {
  complete({url}) {
    if (!UrlInfo.originalUrl) {
      Object.assign(UrlInfo, {
        originalUrl: location.href,
        canonicalUrl: getCanonicalUrl(),
        pureUrl: getPureUrl(location.href),

      });
    }
    UrlInfo.currentUrl = url;
    chrome.runtime.sendMessage(getState());
  },

  click() {
    const {state, url} = getState();
    if (state == 'other-origin') {
      window.open(url, '_blank');
    }
    else if (url) {
      history.replaceState(null, null, url);
    }
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (handler[message.type]) {
    handler[message.type](message);
  }
});
